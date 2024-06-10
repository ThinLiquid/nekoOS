import { Div } from '../../libraries/HTML'
import UserService from '../../services/UserService'
import Button from '../components/Button'
import Input from '../components/Input'

export default class LoginScreen {
  element: Div

  accountPicker: Div
  loginComponent: Div

  usernameElement: Div

  private currentUsername: string | null = null
  private set username (username: string) {
    this.currentUsername = username
    this.usernameElement.text(username)
  }

  private get username (): string {
    return this.currentUsername as string
  }

  constructor (private readonly userService: UserService, private readonly startDesktop: (username: string) => any) {
    this.element = new Div()
      .class('neko-screen')
      .class('blur')
      .attr('id', 'login-screen')
      .style({
        position: 'fixed',
        background: 'transparent',
        color: 'white',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
      })
      .appendTo(document.body)

    this.accountPicker = new Div()
      .style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        bottom: '50px',
        left: '50px',
        width: '200px'
      })
      .appendTo(this.element)

    this.loginComponent = new Div()
      .style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1em'
      })
      .appendTo(this.element)

    this.usernameElement = new Div()
      .style({
        fontSize: '1.5em'
      })
      .appendTo(this.loginComponent)

    const input = Input()
      .attr('type', 'password')
      .style({ width: '200px' })
      .appendTo(this.loginComponent)
      .on('keydown', async (e: KeyboardEvent) => {
        if (e.key !== 'Enter' || this.currentUsername == null) return
        const correct = await this.userService.authenticate(this.currentUsername, input.value() as string)
        if (correct) {
          this.startDesktop(this.currentUsername)
          return
        }
        input.addClass('incorrect')
      })
  }

  async init (): Promise<void> {
    this.element.appendTo(document.body)

    const users = await this.userService.getRegularUsers()
    this.username = users[0].username

    for (const user of await this.userService.getRegularUsers()) {
      this.accountPicker.append(
        Button()
          .style({ width: '200px' })
          .text(user.username)
          .on('click', async () => {
            const password = prompt('Enter your password')
            if (password == null) return
            this.username = user.username
          })
      )
    }
  }

  async remove (): Promise<void> {
    this.element.class('remove')
    setTimeout(() => this.element.remove(), 1000)
  }
}
