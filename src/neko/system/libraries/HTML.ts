export default class DOMElement {
  element: HTMLElement

  constructor (tagNameOrElement: string | HTMLElement) {
    this.element = typeof tagNameOrElement === 'string' ? document.createElement(tagNameOrElement) : tagNameOrElement
  }

  // Children manipulation

  appendTo (element: DOMElement | HTMLElement): this {
    element.append(this.element)
    return this
  }

  append (...elements: Array<DOMElement | HTMLElement>): this {
    for (const element of elements) {
      this.element.append(element instanceof DOMElement ? element.element : element)
    }
    return this
  }

  prependTo (element: DOMElement | HTMLElement): this {
    element.prepend(this.element)
    return this
  }

  prepend (...elements: Array<DOMElement | HTMLElement>): this {
    for (const element of elements) {
      this.element.prepend(element instanceof DOMElement ? element.element : element)
    }
    return this
  }

  // Events

  on (event: string, listener: Function | EventListenerObject): this {
    this.element.addEventListener(event, listener as any)
    return this
  }

  off (event: string, listener: Function | EventListenerObject): this {
    this.element.removeEventListener(event, listener as any)
    return this
  }

  // Attributes

  attr (name: string, value: string): this {
    this.element.setAttribute(name, value)
    return this
  }

  removeAttr (name: string): this {
    this.element.removeAttribute(name)
    return this
  }

  // Styles

  style (styles: Partial<CSSStyleDeclaration>): this {
    Object.assign(this.element.style, styles)
    return this
  }

  // DOM

  remove (): this {
    this.element.remove()
    return this
  }

  // Content

  text (text: string): this {
    this.element.textContent = text
    return this
  }

  html (html: string): this {
    this.element.innerHTML = html
    return this
  }

  // Class manipulation

  class (className: string): this {
    this.element.classList.toggle(className)
    return this
  }

  addClass (className: string): this {
    this.element.classList.add(className)
    return this
  }

  removeClass (className: string): this {
    this.element.classList.remove(className)
    return this
  }
}

export class Div extends DOMElement {
  constructor () {
    super('div')
  }
}

export class Span extends DOMElement {
  constructor () {
    super('span')
  }
}

export class Button extends DOMElement {
  constructor () {
    super('button')
  }
}

export type InputValueType<e, T> = T extends undefined ? string : e

export class Input extends DOMElement {
  constructor () {
    super('input')
  }

  value <T extends string | undefined>(value?: T): InputValueType<this, T> {
    if (value === undefined) {
      return (this.element as HTMLInputElement).value as InputValueType<this, T>
    }
    (this.element as HTMLInputElement).value = value
    return this as InputValueType<this, T>
  }
}

export class _RemoteSVG extends DOMElement {
  constructor (private readonly url: string) {
    super('svg')
  }

  async render (): Promise<this> {
    const response = await fetch(this.url)
    if (!response.ok) throw new Error('Failed to fetch SVG')
    this.html(await response.text())
    return new DOMElement(this.element.firstElementChild as HTMLElement) as this
  }
}
export const RemoteSVG = async (url: string): Promise<_RemoteSVG> => await new _RemoteSVG(url).render()

export class DOMImage extends DOMElement {
  constructor (src: string) {
    super('img')
    this.src(src)
  }

  src (src: string): this {
    this.attr('src', src)
    return this
  }
}
