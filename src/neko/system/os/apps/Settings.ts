import { NEKOAPI } from '../../kernel'
import SettingsIcon from '../assets/apps/settings.svg'
import { Div } from '../libraries/HTML'

export default class SettingsApp {
  static metadata = {
    name: 'Settings',
    description: 'A settings app',
    icon: SettingsIcon,
    pkg: 'net.neko.settings'
  }

  private content: Div | null = null

  constructor (private readonly api: NEKOAPI) {
    api.whenReady(async () => {
      await this.createWindow()
    })
  }

  private async createWindow (): Promise<void> {
    const { Div } = await this.api.loadLibrary('HTML')
    const { BrowserWindow } = await this.api.loadLibrary('App')

    this.content = new Div()
      .text('Hello, world!')

    const mainWindow = new BrowserWindow(SettingsApp.metadata.pkg, {
      title: SettingsApp.metadata.name,
      width: 800,
      height: 600
    })

    mainWindow.once('closed', async () => {
      await this.api.end()
    })

    mainWindow.setContent(this.content)
  }
}
