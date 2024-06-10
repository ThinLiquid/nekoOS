import VirtualFileSystem, { FileSystemEntry, FileSystemEntryType, FileSystemRootDirectory } from '../sys/VirtualFileSystem'
import { SystemUser, User } from '../sys/services/UserService'

export default class FileSystem {
  constructor (private readonly fs: InstanceType<typeof VirtualFileSystem>, private readonly user: SystemUser | User) {}

  // Utility functions

  private async followPath (path: string, root?: FileSystemRootDirectory): Promise<FileSystemEntry<FileSystemEntryType> | null> {
    const parts = path.split('/').filter(x => x !== '')
    let current: FileSystemEntry<FileSystemEntryType> = root ?? await this.fs.root()
    for (const part of parts) {
      if (current.type !== 'directory' || typeof current.contents === 'string') return null
      const _current = current.contents[part]
      current = _current
    }
    return current
  }

  private async followParentPath (path: string, root?: FileSystemRootDirectory): Promise<FileSystemEntry<'directory'> | null> {
    const parts = path.split('/').filter(x => x !== '')
    if (parts.length === 0) return null
    const parentPath = parts.slice(0, -1).join('/')
    return (await this.followPath(parentPath, root)) as FileSystemEntry<'directory'>
  }

  // Data functions

  async readFile (path: string): Promise<FileSystemEntry<'file'>['contents']> {
    const entry = await this.followPath(path)
    if (entry == null) throw new Error('File not found')

    if (entry.type !== 'file') throw new Error('Not a file')
    const fileEntry = entry as FileSystemEntry<'file'>

    return fileEntry.contents
  }

  async writeFile (path: string, contents: string): Promise<void> {
    const root = await this.fs.root()
    const parent = await this.followParentPath(path, root)
    if (parent == null) throw new Error('Parent directory not found')

    const filename = path.split('/').pop() as string

    parent.contents[filename] = {
      type: 'file',
      contents,
      owner: this.user.username
    }

    await this.fs.write(root)
  }

  async mkdir (path: string): Promise<void> {
    const root = await this.fs.root()
    const parent = await this.followParentPath(path, root)
    if (parent == null) throw new Error('Parent directory not found')

    const dirname = path.split('/').pop() as string

    parent.contents[dirname] = {
      type: 'directory',
      contents: {},
      owner: this.user.username
    }

    await this.fs.write(root)
  }

  async exists (path: string): Promise<boolean> {
    const entry = await this.followPath(path)
    return entry != null
  }
}
