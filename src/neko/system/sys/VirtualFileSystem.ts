export type FileSystemEntryType = 'directory' | 'lsFile' | 'file'
export type FileSystemEntryContents<T> =
  T extends 'directory'
    ? {
        [key: string]: FileSystemEntry<FileSystemEntryType>
      }
    : T extends 'lsFile' | 'file'
      ? string
      : never

export interface FileSystemEntry<T extends FileSystemEntryType> {
  type: T
  contents: FileSystemEntryContents<T>
  owner: string
}

export interface FileSystemRootDirectory extends FileSystemEntry<'directory'> {
  path: '/'
  owner: 'root'
}

export default class VirtualFileSystem {
  private fsObject: FileSystemRootDirectory = {
    path: '/',
    type: 'directory',
    contents: {},
    owner: 'root'
  }

  private async handleUpgrade (request: IDBOpenDBRequest): Promise<void> {
    const db = request.result
    const tx = request.transaction
    db.createObjectStore('files', { keyPath: 'path' })
    if (tx == null) throw new Error('Transaction is null')
    await this.initializeDB()
  }

  async init (): Promise<void> {
    const request = indexedDB.open('NEKOFS')

    request.onupgradeneeded = async () => { await this.handleUpgrade(request) }

    await new Promise((resolve) => {
      request.onsuccess = async () => {
        const db = request.result
        const tx = db.transaction('files', 'readwrite')
        if (tx == null) throw new Error('Transaction is null')
        this.fsObject = await this.root()
        resolve(null)
      }

      request.onerror = () => {
        throw new Error('Failed to initialize Virtual File System')
      }
    })
  }

  async initializeDB (): Promise<void> {
    const rootDirectory: FileSystemRootDirectory = {
      path: '/',
      type: 'directory',
      contents: {
        boot: {
          type: 'directory',
          contents: {
            'BIOS.js': {
              type: 'lsFile',
              contents: 'BIOS',
              owner: 'root'
            }
          },
          owner: 'root'
        },
        bin: {
          type: 'directory',
          contents: {},
          owner: 'root'
        },
        dev: { type: 'directory', contents: {}, owner: 'root' },
        etc: { type: 'directory', contents: {}, owner: 'root' },
        home: { type: 'directory', contents: {}, owner: 'root' }
      },
      owner: 'root'
    }

    await this.write(rootDirectory)
  }

  async root (): Promise<FileSystemRootDirectory> {
    const request = indexedDB.open('NEKOFS')

    return await new Promise((resolve, reject) => {
      request.onupgradeneeded = async () => { await this.handleUpgrade(request) }

      request.onsuccess = async () => {
        const db = request.result
        const tx = db.transaction('files', 'readwrite')
        const store = tx.objectStore('files')
        const rootRequest = store.get('/')

        rootRequest.onsuccess = () => {
          const root = rootRequest.result
          if (root == null) {
            resolve(this.fsObject)
            return
          }
          resolve(root)
        }

        rootRequest.onerror = () => {
          reject(rootRequest.error)
        }
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  async read (): Promise<FileSystemRootDirectory> {
    const request = indexedDB.open('NEKOFS')

    return await new Promise((resolve, reject) => {
      request.onsuccess = async () => {
        const db = request.result
        const tx = db.transaction('files', 'readwrite')
        const store = tx.objectStore('files')
        const rootRequest = store.get('/')

        request.onupgradeneeded = async () => { await this.handleUpgrade(request) }

        rootRequest.onsuccess = () => {
          const root = rootRequest.result
          if (root == null) throw new Error('Root directory is null')
          resolve(root)
        }

        rootRequest.onerror = () => {
          reject(rootRequest.error)
        }
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  async write (fsObject: FileSystemRootDirectory): Promise<void> {
    this.fsObject = fsObject
    await this.save()
  }

  async save (): Promise<void> {
    const request = indexedDB.open('NEKOFS')

    return await new Promise((resolve, reject) => {
      request.onupgradeneeded = async () => { await this.handleUpgrade(request) }

      request.onsuccess = async () => {
        const db = request.result
        const tx = db.transaction(['files'], 'readwrite') // Add 'files' as the object store name
        const store = tx.objectStore('files')
        const rootRequest = store.put({ ...this.fsObject })

        rootRequest.onsuccess = () => {
          resolve()
        }

        rootRequest.onerror = () => {
          reject(rootRequest.error)
        }
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }
}
