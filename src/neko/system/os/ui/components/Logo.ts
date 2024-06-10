import DOMElement, { Div, Span } from '../../libraries/HTML'

const letterAnimation = (index: number): Partial<CSSStyleDeclaration> => {
  return {
    display: 'inline-block',
    animation: 'logo-letter 5s infinite',
    animationDelay: `${index * 0.1}s`
  }
}

const Logo = (animation?: boolean): Div => new Div()
  .style({
    textAlign: 'center',
    color: 'white',
    userSelect: 'none',
    position: 'relative',
    width: '250px',
    height: '100px',
    marginBottom: '1em'
  })
  .append(
    new Div()
      .style({
        fontSize: '5em'
      })
      .append(
        new Span().text('n').style(animation === true ? letterAnimation(0) : {}),
        new Span().text('e').style(animation === true ? letterAnimation(1) : {}),
        new Span().text('k').style(animation === true ? letterAnimation(2) : {}),
        new Span().text('o').style(animation === true ? letterAnimation(3) : {}),
        new DOMElement('sup').style({ fontSize: '0.25em', marginLeft: '0.25em' }).text('猫')
      ),
    new Div().text('os')
      .style({
        position: 'absolute',
        top: '75%',
        left: '75%',
        transform: 'scale(1, 1) translate(-50%, -50%)',
        transformOrigin: '50% 50%',
        fontWeight: '500',
        opacity: '0.125',
        fontStyle: 'italic',
        fontSize: '5em',
        whiteSpace: 'nowrap'
      })
  )

export default Logo
