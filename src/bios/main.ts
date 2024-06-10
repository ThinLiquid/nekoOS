/*
 * CoreBIOS BIOS Loader
 */

declare global {
  interface Window {
    loadBootLoader: (directory: string) => Promise<void>
    updateBIOS: () => Promise<void>
  }
}

window.localStorage.setItem('BIOS_LOADER', '1.0.0')
const bios = window.localStorage.getItem('BIOS')

window.loadBootLoader = async (directory: string) => {
  const { default: BootLoader } = await import(`../${directory}/main.ts`)
  const bootloader = new BootLoader()
  await bootloader.init()
}

window.updateBIOS = async () => {
  const response = await fetch('./bios.js')
  const bios = await response.text()
  window.localStorage.setItem('BIOS', bios)
  window.location.reload()
}

if (bios === null) {
  window.updateBIOS().catch(console.error)
} else {
  const script = document.createElement('script')
  script.textContent = bios
  script.type = 'module'
  document.body.appendChild(script)
}

export {}
