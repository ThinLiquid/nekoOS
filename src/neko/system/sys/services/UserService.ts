import VirtualFileSystem from '../VirtualFileSystem'

import FileSystem from '../../libraries/FileSystem'

export interface SystemUser {
  type: 'system'
  username: string
}

export interface User {
  type: 'user'
  username: string
  passwordHash?: string
}

export default class UserService {
  fs: InstanceType<typeof FileSystem>
  constructor (vfs: InstanceType<typeof VirtualFileSystem>) {
    this.fs = new FileSystem(vfs, { type: 'system', username: 'root' })
  }

  async encryptPassword (password: string): Promise<string> {
    const { crypto } = window
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  async init (): Promise<void> {
    if (!await this.fs.exists('/etc/users')) {
      await this.fs.writeFile('/etc/users', JSON.stringify([
        {
          type: 'system',
          username: 'root'
        }
      ] as Array<User | SystemUser>))
      await this.initialAccountSetup()
    }
  }

  async initialAccountSetup (): Promise<void> {
    alert('Hello! Welcome to nekoOS. Please create a user account.')
    const username = prompt('Enter a username')
    const password = prompt('Enter a password')
    if (username == null || password == null) {
      await this.initialAccountSetup()
      throw new Error('Username or password not provided')
    }
    await this.addUser(username, password)
  }

  async addUser (username: string, password: string): Promise<void> {
    const users: Array<User | SystemUser> = JSON.parse(await this.fs.readFile('/etc/users'))
    users.push({
      type: 'user',
      username,
      passwordHash: await this.encryptPassword(password)
    })
    console.log(users)
    await this.fs.writeFile('/etc/users', JSON.stringify(users))
  }

  async authenticate (username: string, password: string): Promise<boolean> {
    const users: Array<User | SystemUser> = JSON.parse(await this.fs.readFile('/etc/users'))
    const user = users.find(u => u.username === username)
    if (user == null || user.type === 'system' || user.passwordHash == null) return false
    return user.passwordHash === await this.encryptPassword(password)
  }

  async getRegularUsers (): Promise<User[]> {
    const users: Array<User | SystemUser> = JSON.parse(await this.fs.readFile('/etc/users'))
    return users.filter(u => u.type === 'user') as User[]
  }
}
