export default class BIOSSetup {
  async init (): Promise<void> {
    document.body.style.backgroundColor = 'black'
    document.body.style.color = 'white'
    document.body.style.fontFamily = 'sans-serif'
    document.body.style.height = 'max-content'
    document.body.style.margin = '0'

    const upd = document.createElement('h3')
    upd.textContent = 'BIOS Update Utility'
    upd.style.fontFamily = 'sans-serif'
    document.body.appendChild(upd)

    const button = document.createElement('button')
    button.textContent = 'Update BIOS'
    button.style.backgroundColor = 'black'
    button.style.color = 'white'
    button.style.border = '1px solid white'
    button.addEventListener('click', () => {
      window.updateBIOS().catch(console.error)
    })
    document.body.appendChild(button)

    const currentVersion = document.createElement('p')
    currentVersion.textContent = `Current Version: ${window.localStorage.getItem('BIOS_VERSION') ?? 'Unknown'}`
    currentVersion.style.fontFamily = 'sans-serif'
    currentVersion.style.fontSize = '16px'
    document.body.appendChild(currentVersion)

    const latestVersion = document.createElement('p')
    latestVersion.textContent = 'Checking for updates...'
    latestVersion.style.fontFamily = 'sans-serif'
    latestVersion.style.fontSize = '16px'
    latestVersion.style.margin = '0px'
    document.body.appendChild(latestVersion)

    ;(async () => {
      const response = await fetch('./bios.js')
      const bios = await response.text()
      if (bios === window.localStorage.getItem('BIOS')) {
        latestVersion.textContent = 'BIOS is up to date'
        latestVersion.style.color = 'green'
      } else {
        // find version number
        const version = bios.match(/BIOS_VERSION = '(.*)'/)?.[1]
        latestVersion.textContent = `New BIOS version available (${version ?? 'Unknown'})`
        latestVersion.style.color = 'red'
      }
    })().catch(console.error)

    const def = document.createElement('h3')
    def.textContent = 'Default Bootloader'
    def.style.fontFamily = 'sans-serif'
    document.body.appendChild(def)

    const select = document.createElement('select')
    select.style.backgroundColor = 'black'
    select.style.color = 'white'
    select.style.border = '1px solid white'
    select.style.fontFamily = 'sans-serif'
    select.style.width = '200px'
    for (const directory in window.bootLoaderDirectories) {
      const option = document.createElement('option')
      option.value = directory
      option.textContent = directory
      select.appendChild(option)
    }
    select.addEventListener('change', () => {
      window.localStorage.setItem('BIOS_DEFAULT_BOOTLOADER', select.value)
    })
    select.value = window.localStorage.getItem('BIOS_DEFAULT_BOOTLOADER') ?? 'NEKOBootManager'
    document.body.appendChild(select)

    const time = document.createElement('h3')
    time.textContent = 'Set Boot Delay (ms)'
    time.style.fontFamily = 'sans-serif'
    document.body.appendChild(time)

    const p = document.createElement('p')
    p.textContent = 'Danger! Setting this to 0 will disable the BIOS screen.'
    p.style.fontFamily = 'sans-serif'
    document.body.appendChild(p)

    const input = document.createElement('input')
    input.type = 'number'
    input.style.backgroundColor = 'black'
    input.style.color = 'white'
    input.style.border = '1px solid white'
    input.style.fontFamily = 'sans-serif'
    input.style.width = '200px'
    input.value = window.localStorage.getItem('BIOS_BOOT_DELAY') ?? '5000'
    document.body.appendChild(input)

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'
    saveBtn.style.backgroundColor = 'black'
    saveBtn.style.color = 'white'
    saveBtn.style.border = '1px solid white'
    saveBtn.addEventListener('click', () => {
      window.localStorage.setItem('BIOS_BOOT_DELAY', input.value)
    })
    document.body.appendChild(saveBtn)

    const bootNow = document.createElement('h3')
    bootNow.textContent = 'Force Boot'
    bootNow.style.fontFamily = 'sans-serif'
    document.body.appendChild(bootNow)

    for (const directory in window.bootLoaderDirectories) {
      const button = document.createElement('button')
      button.textContent = directory
      button.style.backgroundColor = 'black'
      button.style.color = 'white'
      button.style.border = '1px solid white'
      button.style.width = '200px'
      button.addEventListener('click', () => {
        window.loadBootLoader(window.bootLoaderDirectories[directory]).catch(console.error)
      })
      document.body.appendChild(button)
    }

    const uploadBootLogo = document.createElement('h3')
    uploadBootLogo.textContent = 'Upload Boot Logo'
    uploadBootLogo.style.fontFamily = 'sans-serif'
    document.body.appendChild(uploadBootLogo)

    const m = document.createElement('p')
    m.textContent = 'Upload an SVG image to set as the boot logo.'
    m.style.fontFamily = 'sans-serif'
    document.body.appendChild(m)

    const upload = document.createElement('input')
    upload.type = 'file'
    upload.accept = 'image/svg+xml'
    upload.style.backgroundColor = 'black'
    upload.style.color = 'white'
    upload.style.border = '1px solid white'
    upload.style.fontFamily = 'sans-serif'
    document.body.appendChild(upload)

    const uploadBtn = document.createElement('button')
    uploadBtn.textContent = 'Upload'
    uploadBtn.style.backgroundColor = 'black'
    uploadBtn.style.color = 'white'
    uploadBtn.style.border = '1px solid white'
    uploadBtn.addEventListener('click', () => {
      const reader = new FileReader()
      reader.onload = () => {
        window.localStorage.setItem('BIOS_BOOT_LOGO', (reader.result as string).split(',')[1])
      }
      reader.readAsDataURL(upload.files?.[0] as Blob)
    })
    document.body.appendChild(uploadBtn)

    const end = document.createElement('h3')
    end.textContent = '--- END OF BIOS SETUP ---'
    end.style.fontFamily = 'sans-serif'
    document.body.appendChild(end)

    const exitButton = document.createElement('button')
    exitButton.textContent = 'Exit'
    exitButton.style.backgroundColor = 'black'
    exitButton.style.color = 'white'
    exitButton.style.border = '1px solid white'
    exitButton.addEventListener('click', () => {
      window.location.replace('/')
    })
    document.body.appendChild(exitButton)
  }
}
