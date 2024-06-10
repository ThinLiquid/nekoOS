import { NEKOAPI } from '../../kernel'
import FilesIcon from '../assets/apps/files.svg'
import { Div } from '../libraries/HTML'

export default class FilesApp {
  static metadata = {
    name: 'Files',
    description: 'A file manager',
    icon: FilesIcon,
    pkg: 'net.neko.files'
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

    const mainWindow = new BrowserWindow(FilesApp.metadata.pkg, {
      title: FilesApp.metadata.name,
      width: 800,
      height: 600
    })

    mainWindow.once('closed', async () => {
      await this.api.end()
    })

    mainWindow.setContent(this.content)
  }
}
