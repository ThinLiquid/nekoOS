/*
 * CoreBIOS BIOS Loader
 */

const searchParams = new URLSearchParams(window.location.search)
;(async () => {
  if (searchParams.get('debug') != null) {
    const { default: eruda } = await import('eruda')
    eruda.init()
  }
})().catch(console.error)

declare global {
  interface Window {
    loadBootLoader: (directory: string) => Promise<void>
    updateBIOS: () => Promise<void>
    bootLoaderDirectories: Record<string, string>
  }
}

window.localStorage.setItem('BIOS_LOADER', '1.0.0')
const bios = window.localStorage.getItem('BIOS')

window.bootLoaderDirectories = {
  NEKOBootManager: 'neko',
  BIOSSetup: 'bios_cfg'
}

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

if (searchParams.get('boot_to_bios') != null) {
  window.loadBootLoader(window.bootLoaderDirectories.BIOSSetup).catch(console.error)
} else if (bios === null) {
  window.updateBIOS().catch(console.error)
} else {
  const script = document.createElement('script')
  script.textContent = bios
  script.type = 'module'
  document.body.appendChild(script)
}

export {}
