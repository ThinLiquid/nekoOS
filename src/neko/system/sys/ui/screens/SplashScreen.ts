import { Div } from '../../../libraries/HTML'
import Logo from '../components/Logo'

export default class SplashScreen {
  element: Div

  constructor () {
    const termElement: HTMLElement | null = document.querySelector('#term')
    if (termElement == null) throw new Error('Terminal element not found')
    termElement.style.display = 'none'

    this.element = new Div()
      .class('neko-screen')
      .style({
        position: 'fixed',
        background: 'black',
        color: 'white',
        top: '00',
        left: '0',
        width: '100%',
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
      })
      .append(
        Logo(true)
      )

    window.addEventListener('keydown', (e) => {
      if (!e.shiftKey || !e.altKey || e.key !== 'D') return
      e.preventDefault()
      termElement.style.display = termElement.style.display === 'none' ? 'flex' : 'none'
    })
  }

  async init (): Promise<void> {
    this.element.appendTo(document.body)
  }

  async remove (): Promise<void> {
    this.element.class('remove')
    setTimeout(() => this.element.remove(), 1000)
  }
}
