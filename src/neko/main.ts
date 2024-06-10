export default class NEKOBootManager {
  async init (): Promise<void> {
    const { default: NEKOKernel } = await import('./system/kernel')
    const kernel = new NEKOKernel()
    await kernel.init()
  }
}
