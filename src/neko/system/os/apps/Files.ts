import { NEKOAPI } from '../../kernel'
import FilesIcon from '../assets/apps/files.svg'

export default class FilesApp {
  static metadata = {
    name: 'Files',
    description: 'A file manager',
    icon: FilesIcon,
    pkg: 'net.neko.files'
  }

  constructor (private readonly api: NEKOAPI) {
    api.whenReady(async () => {
      await this.createWindow()
    })
  }

  private async createWindow (): Promise<void> {
    const { Div } = await this.api.loadLibrary('HTML')
    const { BrowserWindow } = await this.api.loadLibrary('App')

    const content = new Div()
      .text('Hello, world!')

    const mainWindow = new BrowserWindow(FilesApp.metadata.pkg, {
      title: FilesApp.metadata.name,
      width: 800,
      height: 600
    })

    console.log(mainWindow.getAllWindows().length)

    mainWindow.setContent(content)
  }
}
