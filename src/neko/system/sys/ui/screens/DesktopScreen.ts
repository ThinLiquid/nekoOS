import DOMElement, { DOMImage, Div } from '../../../libraries/HTML'

import { NekoIconFilled } from '../components/CustomIcons'
import MaterialSymbol from '../components/MaterialSymbol'
import TaskbarItem from '../components/TaskbarItem'

import FilesIcon from '../../assets/apps/files.svg'
import NEKOKernel from '../../../kernel'

export default class DesktopScreen {
  element: Div

  taskbar: Div
  desktop: Div

  taskbarApps: Div
  taskbarClock: Div

  constructor (private readonly kernel: NEKOKernel) {
    this.element = new Div()
      .class('neko-screen')
      .style({
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      })

    this.taskbar = new Div()
      .class('neko-taskbar')
      .appendTo(this.element)

    this.desktop = new Div()
      .class('neko-desktop')
      .appendTo(this.element)

    this.taskbarClock = new Div()
      .class('neko-taskbar-clock')
      .text('3:00:26 AM\n6/10/2024')
      .appendTo(this.taskbar)

    this.taskbarApps = new Div()
      .class('neko-taskbar-apps')
      .appendTo(this.taskbar)
  }

  async init (): Promise<void> {
    this.element.appendTo(document.body)
    setTimeout(() => {
      this.element.style({ animation: 'unset' })
    }, 1000)

    this.taskbar.append(
      new Div()
        .class('taskbar-section')
        .class('left')
        .append(
          TaskbarItem(await NekoIconFilled(), 'Start'),
          TaskbarItem(MaterialSymbol('search'), 'Search'),
          TaskbarItem(MaterialSymbol('apps'), 'Apps')
        ),
      new Div()
        .class('taskbar-section')
        .class('center')
        .append(this.taskbarApps),
      new Div()
        .class('taskbar-section')
        .class('right')
        .append(
          TaskbarItem(this.taskbarClock, 'Monday, June 10, 2024', true),
          TaskbarItem(MaterialSymbol('notifications'), 'Notifications')
        )
    )

    this.taskbarApps.append(
      TaskbarItem(new DOMImage(FilesIcon), 'Files')
        .on('click', async () => await this.kernel.startApp('Files'))
    )
  }

  createWindow (title: string, content: DOMElement): void {
    const window = new Div()
      .class('neko-window')
      .attr('tabindex', '0')
      .style({
        top: '0',
        left: '0',
        width: '400px',
        height: '400px'
      })
      .append(
        new Div()
          .class('neko-window-title')
          .text(title),
        new Div()
          .class('neko-window-content')
          .append(content)
      )
      .appendTo(this.desktop)

    window.on('mousedown', () => {
      window.style({ zIndex: '9999' })
    })
  }
}
