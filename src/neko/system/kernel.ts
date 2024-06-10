import VirtualFileSystem from './os/VirtualFileSystem'
import FileSystem from './os/libraries/FileSystem'

import UserService from './os/services/UserService'
import LoginScreen from './os/ui/screens/LoginScreen'
import SplashScreen from './os/ui/screens/SplashScreen'

import FontFaceObserver from 'fontfaceobserver'
import DesktopScreen from './os/ui/screens/DesktopScreen'
import Wallpaper from './os/ui/components/Wallpaper'

import defaultBG from './os/assets/defaultbg.jpg'

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

  static builtInApps = ['Settings', 'Files']

  instances: Record<string, any> = {}

  constructor () {
    this.vfs = new VirtualFileSystem()
    this.fs = new FileSystem(this.vfs, {
      type: 'system',
      username: 'root'
    })

    this.termElement = document.querySelector('#term') ?? document.createElement('div')
  }

  builtinApps: Record<string, any> = {}
  apps: Record<string, any> = {}
  async registerApp (builtin: boolean, appPath: string): Promise<void> {
    try {
      const { default: App } = await import(`./os/apps/${appPath}.ts`)
      const apps = builtin ? this.builtinApps : this.apps
      apps[App.metadata.pkg] = App
    } catch (e) {
      console.error(`Failed to register app ${appPath}:`, e)
    }
  }

  async init (): Promise<void> {
    await import('./os/ui/styles.scss')

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
    await this.log(NEKOKernelLogPrefix.EMPTY, 'Initialized DesktopScreen')

    await this.log(NEKOKernelLogPrefix.EMPTY, 'Registering Built-In Apps')
    for (const app of NEKOKernel.builtInApps) {
      await this.registerApp(true, app)
    }
    await this.log(NEKOKernelLogPrefix.OK, 'Registered Built-In Apps')

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
    const { default: App } = await import(`./os/apps/${app}.ts`)
    if (this.instances[App.metadata.pkg] != null) throw new Error('App already started')
    const api = new NEKOAPI(this)
    const appInstance = new App(api)

    this.instances[App.metadata.pkg] = appInstance
    await api.ready()
  }
}

export type Libraries = 'HTML' | 'App' | string
export type LibraryType<T> =
  T extends 'HTML'
    ? typeof import('./os/libraries/HTML')
    : T extends 'App'
      ? typeof import('./os/libraries/App')
      : any

export class NEKOAPI {
  filesystem: FileSystem

  constructor (kernel: NEKOKernel) {
    if (kernel.desktopScreen == null) throw new Error('DesktopScreen is null')
    this.filesystem = new FileSystem(kernel.vfs, {
      type: 'system',
      username: 'api'
    })
  }

  async loadLibrary <T extends Libraries>(library: T): Promise<LibraryType<T>> {
    if (library === 'FileSystem') throw new Error('Cannot load FileSystem library')
    return await import(`./os/libraries/${library}.ts`)
  }

  isReady = false
  readyListeners: Array<() => any> = []
  whenReady (cb: () => any): void {
    this.readyListeners.push(cb)
  }

  async ready (): Promise<void> {
    if (this.isReady) return await Promise.resolve()
    this.isReady = true
    await Promise.all(this.readyListeners.map(cb => cb()))
  }

  eventListeners: Record<string, Array<(...args: any[]) => any>> = {}
  on (event: string, cb: (...args: any[]) => any): void {
    if (this.eventListeners[event] == null) this.eventListeners[event] = []
    this.eventListeners[event].push(cb)
  }

  emit (event: string, ...args: any[]): void {
    if (this.eventListeners[event] == null) return
    for (const _cb of this.eventListeners[event]) _cb(...args)
  }
}
