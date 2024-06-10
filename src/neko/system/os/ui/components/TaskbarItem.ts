import DOMElement, { Div } from '../../libraries/HTML'

const TaskbarItem = (image: DOMElement, name: string, maxContent?: boolean): Div => new Div()
  .attr('title', name)
  .class('neko-taskbar-item')
  .style({ width: maxContent === true ? 'max-content' : '40px' })
  .append(
    image
      .attr('width', '16')
      .attr('height', '16')
      .style({ fill: 'white' })
  )

export default TaskbarItem
