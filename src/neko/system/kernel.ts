import VirtualFileSystem from './sys/VirtualFileSystem'
import FileSystem from './libraries/FileSystem'

import UserService from './sys/services/UserService'
import LoginScreen from './sys/ui/screens/LoginScreen'
import SplashScreen from './sys/ui/screens/SplashScreen'

import FontFaceObserver from 'fontfaceobserver'
import DesktopScreen from './sys/ui/screens/DesktopScreen'
import Wallpaper from './sys/ui/components/Wallpaper'

import { v4 as uuid } from 'uuid'

import defaultBG from './sys/assets/defaultbg.jpg'
import DOMElement from './libraries/HTML'

export enum NEKOKernelLogPrefix {
  OK = '[  OK  ]',
  INFO = '[ INFO ]',
  WARN = '[ WARN ]',
  ERROR = '[ FAIL ]',
  EMPTY = '        '
}

// Kernel class
export default class NEKOKernel {
  vfs: InstanceType<typeof VirtualFileSystem>

  fs: InstanceType<typeof FileSystem>

  termElement: HTMLElement

  currentUsername: string | null = null
  desktopScreen: DesktopScreen | null = null

  instances: Record<string, any> = {}

  constructor () {
    this.vfs = new VirtualFileSystem()
    this.fs = new FileSystem(this.vfs, {
      type: 'system',
      username: 'root'
    })

    this.termElement = document.querySelector('#term') ?? document.createElement('div')
  }

  // Initialization function
  async init (): Promise<void> {
    await import('./sys/ui/styles.scss')

    const observer = new FontFaceObserver('Overused Grotesk')
    await observer.load()

    console.log('Welcome to nekoOS!')

    this.termElement.style.display = 'flex'

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await this.vfs.init()
    await this.log(NEKOKernelLogPrefix.OK, 'Reached target Virtual File System')

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Initializing User Service')
    const userService = new UserService(this.vfs)
    await userService.init()
    await this.log(NEKOKernelLogPrefix.OK, 'Initialized User Service')

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Starting Bootsplash')
    const splashScreen = new SplashScreen()
    await splashScreen.init()
    await this.log(NEKOKernelLogPrefix.OK, 'Started Bootsplash')

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Creating DesktopScreen')
    this.desktopScreen = new DesktopScreen(this)
    await this.log(NEKOKernelLogPrefix.OK, 'Created DesktopScreen')

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Initializing DesktopScreen')
    Wallpaper(`url(${defaultBG})`).appendTo(document.body)

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Starting LoginScreen')
    const loginScreen = new LoginScreen(userService, async (user: string) => {
      if (this.desktopScreen == null) throw new Error('DesktopScreen is null')
      this.currentUsername = user
      await loginScreen.remove()
      await this.desktopScreen.init()
    })
    await loginScreen.init()
    await this.log(NEKOKernelLogPrefix.OK, 'Started LoginScreen')

    await splashScreen.remove()
  }

  // Logging function
  async log (prefix: NEKOKernelLogPrefix, message: string): Promise<void> {
    console.log(prefix, message)
  }

  async startApp (app: string): Promise<void> {
    console.log('Starting app:', app)

    const { default: App } = await import(`./sys/apps/${app}.ts`)
    const appInstance = new App(new NEKOAPI(this))
    await appInstance.init()

    this.instances[uuid()] = appInstance
  }
}

export type Libraries = 'HTML' | string
export type LibraryType<T> = T extends 'HTML' ? typeof import('./libraries/HTML') : never

export class NEKOAPI {
  filesystem: FileSystem
  private readonly _desktop: InstanceType<typeof DesktopScreen>

  constructor (kernel: NEKOKernel) {
    if (kernel.desktopScreen == null) throw new Error('DesktopScreen is null')
    this.filesystem = new FileSystem(kernel.vfs, {
      type: 'system',
      username: 'api'
    })
    this._desktop = kernel.desktopScreen
  }

  desktop = {
    createWindow: (title: string, content: DOMElement) => this._desktop.createWindow(title, content)
  }

  async loadLibrary <T extends Libraries>(library: T): Promise<LibraryType<T>> {
    if (library === 'FileSystem') throw new Error('Cannot load FileSystem library')
    return await import(`./libraries/${library}.ts`)
  }
}
