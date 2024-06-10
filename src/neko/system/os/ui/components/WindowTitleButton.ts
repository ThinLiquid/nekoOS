import { Div } from '../../libraries/HTML'
import MaterialSymbol from './MaterialSymbol'

const WindowTitleButton = (icon: string, name: string): Div => new Div()
  .class('neko-window-title-button')
  .attr('title', name)
  .append(MaterialSymbol(icon))

export default WindowTitleButton
