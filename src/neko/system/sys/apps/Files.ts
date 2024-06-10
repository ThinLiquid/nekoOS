import { NEKOAPI } from '../../kernel'
import FilesIcon from '../assets/apps/files.svg'

export default class FilesApp {
  static metadata = {
    name: 'Files',
    description: 'A file manager',
    icon: FilesIcon
  }

  constructor (private readonly api: NEKOAPI) {}

  async init (): Promise<void> {
    const { Div } = await this.api.loadLibrary('HTML')
    this.api.desktop.createWindow('Files', new Div().text('Files'))
  }
}
