import 'material-symbols'
import { Div } from '../../libraries/HTML'

const MaterialSymbol = (icon: string): Div => new Div()
  .class('material-symbols-rounded')
  .text(icon)

export default MaterialSymbol
