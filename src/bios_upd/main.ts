export default class BIOSUpdater {
  async init (): Promise<void> {
    document.body.style.backgroundColor = 'black'
    document.body.style.color = 'white'
    document.body.style.fontFamily = 'sans-serif'
    document.body.style.display = 'flex'
    document.body.style.flexDirection = 'column'
    document.body.style.justifyContent = 'center'
    document.body.style.alignItems = 'center'
    document.body.style.height = '100vh'
    document.body.style.margin = '0'

    const button = document.createElement('button')
    button.textContent = 'Update BIOS'
    button.style.backgroundColor = 'black'
    button.style.color = 'white'
    button.style.border = '1px solid white'
    button.addEventListener('click', () => {
      window.updateBIOS().catch(console.error)
    })
    document.body.appendChild(button)

    const exitButton = document.createElement('button')
    exitButton.textContent = 'Exit'
    exitButton.style.backgroundColor = 'black'
    exitButton.style.color = 'white'
    exitButton.style.border = '1px solid white'
    exitButton.addEventListener('click', () => {
      window.location.reload()
    })
    document.body.appendChild(exitButton)

    const currentVersion = document.createElement('p')
    currentVersion.textContent = `Current Version: ${window.localStorage.getItem('BIOS_VERSION') ?? 'Unknown'}`
    currentVersion.style.fontFamily = 'sans-serif'
    currentVersion.style.fontSize = '16px'
    currentVersion.style.margin = '10px'
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
      } else {
        // find version number
        const version = bios.match(/BIOS_VERSION = '(.*)'/)?.[1]
        latestVersion.textContent = `New BIOS version available (${version ?? 'Unknown'})`
      }
    })().catch(console.error)
  }
}
