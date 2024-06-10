import { DOMImage, Div } from '../../libraries/HTML'

import { NekoIconFilled } from '../components/CustomIcons'
import MaterialSymbol from '../components/MaterialSymbol'
import TaskbarItem from '../components/TaskbarItem'

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
      TaskbarItem(new DOMImage(this.kernel.builtinApps['net.neko.files'].metadata.icon), this.kernel.builtinApps['net.neko.files'].metadata.name)
        .on('click', async () => await this.kernel.startApp('Files')),
      TaskbarItem(new DOMImage(this.kernel.builtinApps['net.neko.settings'].metadata.icon), this.kernel.builtinApps['net.neko.settings'].metadata.name)
        .on('click', async () => await this.kernel.startApp('Settings'))
    )
  }
}
