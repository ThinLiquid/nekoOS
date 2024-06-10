import { Div } from './HTML'

const windows: {
  [key: string]: BrowserWindow[]
} = {}

export class BrowserWindow {
  private readonly element: Div
  private readonly content: Div
  private readonly desktop: HTMLElement | null

  constructor (private readonly pkg: string, config: WindowConfig) {
    this.desktop = document.querySelector('.neko-desktop')
    if (this.desktop == null) throw new Error('Desktop not found')

    this.content = new Div()
      .class('neko-window-content')
    this.element = new Div()
      .class('neko-window')
      .attr('tabindex', '0')
      .style({
        top: '0',
        left: '0',
        width: `${config.width ?? 800}px`,
        height: `${config.height ?? 800}px`
      })
      .append(
        new Div()
          .class('neko-window-title')
          .text(config.title)
          .on('mousedown', (e: MouseEvent) => {
            const startX = e.clientX
            const startY = e.clientY
            const startLeft = this.element.element.offsetLeft
            const startTop = this.element.element.offsetTop

            const { parentElement } = this.element.element
            if (parentElement == null) throw new Error('Parent element not found')
            const parentWidth = parentElement.offsetWidth
            const parentHeight = parentElement.offsetHeight

            const mouseMove = (e: MouseEvent): void => {
              const dx = e.clientX - startX
              const dy = e.clientY - startY

              let newLeft = startLeft + dx
              let newTop = startTop + dy

              const minLeft = -(this.element.element.offsetWidth * 0.75)
              const maxLeft = parentWidth - (this.element.element.offsetWidth * 0.25)
              // const minTop = -(this.element.element.offsetHeight * 0.75);
              const maxTop = parentHeight - (this.element.element.offsetHeight * 0.25)

              // Ensure the element stays within the adjusted boundaries
              newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft))
              newTop = Math.max(0, Math.min(newTop, maxTop))

              this.element.style({ left: `${newLeft}px`, top: `${newTop}px` })
            }

            const mouseUp = (): void => {
              window.removeEventListener('mousemove', mouseMove)
              window.removeEventListener('mouseup', mouseUp)
            }

            window.addEventListener('mousemove', mouseMove)
            window.addEventListener('mouseup', mouseUp)
          }),
        this.content
      )
      .appendTo(this.desktop)

    this.element.on('focus', () => {
      this.element.style({ zIndex: '9999' })
    })

    this.addResizeCorners(config.maxWidth ?? 200, config.maxHeight ?? 32)

    if (!(pkg in windows)) windows[pkg] = []
    windows[pkg].push(this)
  }

  setContent (content: Div): this {
    this.content.element.replaceWith(content.element)
    return this
  }

  getAllWindows (): BrowserWindow[] {
    return windows[this.pkg]
  }

  private addResizeCorners (minWidth: number, minHeight: number): void {
    const resizeCorners = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'top',
      'right',
      'bottom',
      'left'
    ]

    for (const corner of resizeCorners) {
      const resize = new Div()
        .class('neko-resize-corner')
        .class(corner)
        .appendTo(this.element)
        .on('mousedown', (e: MouseEvent) => {
          resize.style({ pointerEvents: 'auto' })
          this.element.style({ pointerEvents: 'none', userSelect: 'none' })
          const startX = e.clientX
          const startY = e.clientY
          const startWidth = this.element.element.offsetWidth
          const startHeight = this.element.element.offsetHeight
          const startLeft = this.element.element.offsetLeft
          const startTop = this.element.element.offsetTop

          const mouseMove = (e: MouseEvent): void => {
            const dx = e.clientX - startX
            const dy = e.clientY - startY

            if (corner.includes('right')) {
              const newWidth = startWidth + dx
              if (newWidth >= minWidth) {
                this.element.style({ width: `${newWidth}px` })
              }
            } else if (corner.includes('left')) {
              const newWidth = startWidth - dx
              if (newWidth >= minWidth) {
                this.element.style({ width: `${newWidth}px`, left: `${startLeft + dx}px` })
              }
            }

            if (corner.includes('bottom')) {
              const newHeight = startHeight + dy
              if (newHeight >= minHeight) {
                this.element.style({ height: `${newHeight}px` })
              }
            } else if (corner.includes('top')) {
              const newHeight = startHeight - dy
              if (newHeight >= minHeight) {
                this.element.style({ height: `${newHeight}px`, top: `${startTop + dy}px` })
              }
            }
          }

          const mouseUp = (): void => {
            this.element.style({ pointerEvents: 'unset', userSelect: 'unset' })
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
          }

          window.addEventListener('mousemove', mouseMove)
          window.addEventListener('mouseup', mouseUp)
        })
    }
  }
}

export interface WindowConfig {
  title: string
  width?: number
  height?: number
  maxWidth?: number
  maxHeight?: number
  resizeable?: boolean
}
