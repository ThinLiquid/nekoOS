import { Div } from '../../../libraries/HTML'

const Wallpaper = (bg: string): Div => new Div()
  .style({
    position: 'fixed',
    background: bg,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '-1'
  })

export default Wallpaper
