/*
 * CoreBIOS
 * An easy-to-use BIOS for webOSes.
 */

const BOOT_LOGO = 'PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzIpIj4KPHBhdGggZD0iTTc4Ljk1MTIgNTQuNDgwNVY1OS4wNzAzSDYxLjQyMTlWNjguMTUyM0g3Ny41MzUyVjcyLjc0MjJINjEuNDIxOVY4Mi40NTlINzguOTUxMlY4N0g1Ni41ODc5VjU0LjQ4MDVINzguOTUxMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxXzFfMikiPgo8cGF0aCBkPSJNMTguMDk5NiAyNS42NDI2QzE4LjA5OTYgMjMuMTM2MSAxOC40MjUxIDIwLjg3MzcgMTkuMDc2MiAxOC44NTU1QzE5Ljc1OTggMTYuODA0NyAyMC43MzYzIDE1LjA0NjkgMjIuMDA1OSAxMy41ODJDMjMuMjc1NCAxMi4xMTcyIDI0Ljc4OTEgMTAuOTk0MSAyNi41NDY5IDEwLjIxMjlDMjguMzA0NyA5LjM5OTA5IDMwLjI3NDEgOC45OTIxOSAzMi40NTUxIDguOTkyMTlDMzUuMDU5MiA4Ljk5MjE5IDM3LjM3MDQgOS40NjQxOSAzOS4zODg3IDEwLjQwODJDNDEuNDM5NSAxMS4zNTIyIDQzLjA4MzMgMTIuNzAzMSA0NC4zMjAzIDE0LjQ2MDlDNDUuNTU3MyAxNi4xODYyIDQ2LjI1NzIgMTguMjY5NSA0Ni40MTk5IDIwLjcxMDlINDEuNDM5NUM0MS4zNDE4IDE4LjQ2NDggNDAuNDc5MiAxNi43MDcgMzguODUxNiAxNS40Mzc1QzM3LjI1NjUgMTQuMTM1NCAzNS4xNDA2IDEzLjQ4NDQgMzIuNTAzOSAxMy40ODQ0QzMxLjAwNjUgMTMuNDg0NCAyOS42NzE5IDEzLjc2MTEgMjguNSAxNC4zMTQ1QzI3LjMyODEgMTQuODM1MyAyNi4zMzUzIDE1LjYxNjUgMjUuNTIxNSAxNi42NTgyQzI0LjcwNzcgMTcuNjk5OSAyNC4wODkyIDE4Ljk4NTcgMjMuNjY2IDIwLjUxNTZDMjMuMjQyOCAyMi4wMTMgMjMuMDMxMiAyMy43MjIgMjMuMDMxMiAyNS42NDI2QzIzLjAzMTIgMjkuNTQ4OCAyMy44NjEzIDMyLjU3NjIgMjUuNTIxNSAzNC43MjQ2QzI3LjE4MTYgMzYuODQwNSAyOS41MDkxIDM3Ljg5ODQgMzIuNTAzOSAzNy44OTg0QzM0LjIyOTIgMzcuODk4NCAzNS43NDI4IDM3LjYwNTUgMzcuMDQ0OSAzNy4wMTk1QzM4LjM3OTYgMzYuNDMzNiAzOS40MjEyIDM1LjYwMzUgNDAuMTY5OSAzNC41MjkzQzQwLjk1MTIgMzMuNDIyNSA0MS4zNzQzIDMyLjEyMDQgNDEuNDM5NSAzMC42MjNINDYuNDE5OUM0Ni4yNTcyIDMzLjA5NyA0NS41NDEgMzUuMjEyOSA0NC4yNzE1IDM2Ljk3MDdDNDMuMDM0NSAzOC43Mjg1IDQxLjM5MDYgNDAuMDc5NCAzOS4zMzk4IDQxLjAyMzRDMzcuMzIxNiA0MS45MzQ5IDM1LjAyNjcgNDIuMzkwNiAzMi40NTUxIDQyLjM5MDZDMjkuNTkwNSA0Mi4zOTA2IDI3LjA2NzcgNDEuNjkwOCAyNC44ODY3IDQwLjI5MUMyMi43MzgzIDM4Ljg5MTMgMjEuMDYxOCAzNi45MzgyIDE5Ljg1NzQgMzQuNDMxNkMxOC42ODU1IDMxLjkyNTEgMTguMDk5NiAyOC45OTU0IDE4LjA5OTYgMjUuNjQyNloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAyXzFfMikiPgo8cGF0aCBkPSJNMzEuOTUzMSA3NC4yMDdMMzQuNTQxIDcxLjkxMjFDMzYuNTkxOCA3MS45MTIxIDM4LjI1MiA3Mi4xNCAzOS41MjE1IDcyLjU5NTdDNDAuNzkxIDczLjAxODkgNDEuNzUxMyA3My43ODM5IDQyLjQwMjMgNzQuODkwNkM0My4wNTM0IDc1Ljk2NDggNDMuNDkyOCA3Ny40NDYgNDMuNzIwNyA3OS4zMzRMNDQuNTk5NiA4N0gzOS44MTQ1TDM4Ljk4NDQgNzkuODcxMUMzOC43NTY1IDc3Ljg4NTQgMzguMDg5MiA3Ni40NTMxIDM2Ljk4MjQgNzUuNTc0MkMzNS45MDgyIDc0LjY2MjggMzQuMjMxOCA3NC4yMDcgMzEuOTUzMSA3NC4yMDdaTTMzLjQ2NjggNTguNzI4NUgyNC45MjE5VjY5Ljk1OUgzMy40NjY4QzM0LjczNjMgNjkuOTU5IDM1LjgyNjggNjkuNzQ3NCAzNi43MzgzIDY5LjMyNDJDMzcuNjgyMyA2OC45MDEgMzguMzgyMiA2OC4yODI2IDM4LjgzNzkgNjcuNDY4OEMzOS4zMjYyIDY2LjYyMjQgMzkuNTcwMyA2NS42MTMzIDM5LjU3MDMgNjQuNDQxNEMzOS41NzAzIDYyLjY1MSAzOS4wMzMyIDYxLjI1MTMgMzcuOTU5IDYwLjI0MjJDMzYuODg0OCA1OS4yMzMxIDM1LjM4NzQgNTguNzI4NSAzMy40NjY4IDU4LjcyODVaTTM0LjU0MSA3Mi42OTM0TDM0LjE1MDQgNzQuMjA3SDI0LjkyMTlWODdIMjAuMDg3OVY1NC40ODA1SDM0LjE1MDRDMzYuMjMzNyA1NC40ODA1IDM4LjA0MDQgNTQuODcxMSAzOS41NzAzIDU1LjY1MjNDNDEuMTMyOCA1Ni40MzM2IDQyLjMzNzIgNTcuNTQwNCA0My4xODM2IDU4Ljk3MjdDNDQuMDI5OSA2MC4zNzI0IDQ0LjQ1MzEgNjIuMDMyNiA0NC40NTMxIDYzLjk1MzFDNDQuNDUzMSA2NS42Nzg0IDQ0LjA0NjIgNjcuMjA4MyA0My4yMzI0IDY4LjU0M0M0Mi40MTg2IDY5Ljg3NzYgNDEuMjYzIDcwLjkwMyAzOS43NjU2IDcxLjYxOTFDMzguMjY4MiA3Mi4zMzUzIDM2LjUyNjcgNzIuNjkzNCAzNC41NDEgNzIuNjkzNFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAzXzFfMikiPgo8cGF0aCBkPSJNNTIuNTk5NiAyNi4xMzA5QzUyLjU5OTYgMjMuNTU5MiA1Mi45NDE0IDIxLjIzMTggNTMuNjI1IDE5LjE0ODRDNTQuMzQxMSAxNy4wMzI2IDU1LjM1MDMgMTUuMjI1OSA1Ni42NTIzIDEzLjcyODVDNTcuOTg3IDEyLjE5ODYgNTkuNTY1OCAxMS4wMjY3IDYxLjM4ODcgMTAuMjEyOUM2My4yMTE2IDkuMzk5MDkgNjUuMjQ2MSA4Ljk5MjE5IDY3LjQ5MjIgOC45OTIxOUM3MC40NTQ0IDguOTkyMTkgNzMuMDQyMyA5LjcwODMzIDc1LjI1NTkgMTEuMTQwNkM3Ny41MDIgMTIuNTcyOSA3OS4yNDM1IDE0LjU3NDkgODAuNDgwNSAxNy4xNDY1QzgxLjcxNzQgMTkuNjg1NSA4Mi4zMzU5IDIyLjY4MDMgODIuMzM1OSAyNi4xMzA5QzgyLjMzNTkgMjkuMzg2MSA4MS43MTc0IDMyLjIzNDQgODAuNDgwNSAzNC42NzU4Qzc5LjI0MzUgMzcuMTE3MiA3Ny41MDIgMzkuMDIxNSA3NS4yNTU5IDQwLjM4ODdDNzMuMDQyMyA0MS43MjMzIDcwLjQ1NDQgNDIuMzkwNiA2Ny40OTIyIDQyLjM5MDZDNjQuNDk3NCA0Mi4zOTA2IDYxLjg3NyA0MS43MjMzIDU5LjYzMDkgNDAuMzg4N0M1Ny40MTczIDM5LjAyMTUgNTUuNjkyMSAzNy4xMTcyIDU0LjQ1NTEgMzQuNjc1OEM1My4yMTgxIDMyLjIzNDQgNTIuNTk5NiAyOS4zODYxIDUyLjU5OTYgMjYuMTMwOVpNNzcuMzU1NSAyNi4xMzA5Qzc3LjM1NTUgMjIuMTI3IDc2LjQ5MjggMTkuMDE4MiA3NC43Njc2IDE2LjgwNDdDNzMuMDQyMyAxNC41OTExIDcwLjYxNzIgMTMuNDg0NCA2Ny40OTIyIDEzLjQ4NDRDNjUuNDA4OSAxMy40ODQ0IDYzLjYxODUgMTMuOTg4OSA2Mi4xMjExIDE0Ljk5OEM2MC42MjM3IDE1Ljk3NDYgNTkuNDg0NCAxNy40MDY5IDU4LjcwMzEgMTkuMjk0OUM1Ny45MjE5IDIxLjE4MjkgNTcuNTMxMiAyMy40NjE2IDU3LjUzMTIgMjYuMTMwOUM1Ny41MzEyIDI5Ljg0MTggNTguMzkzOSAzMi43Mzg5IDYwLjExOTEgMzQuODIyM0M2MS44NzcgMzYuODczIDY0LjMzNDYgMzcuODk4NCA2Ny40OTIyIDM3Ljg5ODRDNjkuNTc1NSAzNy44OTg0IDcxLjM0OTYgMzcuNDQyNyA3Mi44MTQ1IDM2LjUzMTJDNzQuMjc5MyAzNS41ODcyIDc1LjQwMjMgMzQuMjM2MyA3Ni4xODM2IDMyLjQ3ODVDNzYuOTY0OCAzMC43MjA3IDc3LjM1NTUgMjguNjA0OCA3Ny4zNTU1IDI2LjEzMDlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMiI+CjxyZWN0IHdpZHRoPSIzNSIgaGVpZ2h0PSI0NSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDQ1KSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAxXzFfMiI+CjxyZWN0IHdpZHRoPSIzNSIgaGVpZ2h0PSI0NSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1KSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAyXzFfMiI+CjxyZWN0IHdpZHRoPSIzNSIgaGVpZ2h0PSI0NSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDQ1KSIvPgo8L2NsaXBQYXRoPgo8Y2xpcFBhdGggaWQ9ImNsaXAzXzFfMiI+CjxyZWN0IHdpZHRoPSIzNSIgaGVpZ2h0PSI0NSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg=='
const BIOS_VERSION = '1.0.0-indev'

window.localStorage.setItem('BIOS_VERSION', BIOS_VERSION)

const term = document.createElement('div')
term.id = 'term'
term.style.position = 'fixed'
term.style.top = '0'
term.style.left = '0'
term.style.backgroundColor = 'black'
term.style.color = 'white'
term.style.fontFamily = 'monospace'
term.style.display = 'none'
term.style.width = '100%'
term.style.height = '100%'
term.style.overflow = 'auto'
term.style.zIndex = '9999999999999999999999999999999999999999'
term.style.flexDirection = 'column'
document.body.appendChild(term)

if (window.localStorage.getItem('_') == null) {
  window.localStorage.setItem('BOOT_LOGO', BOOT_LOGO)

  window.localStorage.setItem('_', 'TRUE')
}

const captureConsole = () => {
  const consoleLog = console.log
  console.log = (...args) => {
    consoleLog(...args)
    const log = document.createElement('div')
    log.textContent = args.join(' ')
    log.style.whiteSpace = 'pre-wrap'
    log.style.minHeight = '1em'
    log.style.lineHeight = '1em'
    term.appendChild(log)
    term.scrollTop = term.scrollHeight
  }
}
captureConsole()

console.log(`CoreBIOS v${BIOS_VERSION}`)
console.log(`${new Date().getFullYear()} (c) ThinLiquid. All rights reserved.`)
console.log('')

document.body.style.backgroundColor = 'black'
document.body.style.color = 'white'
document.body.style.fontFamily = 'monospace'

const bootScreen = document.createElement('div')

const renderBootScreen = () => {
  bootScreen.style.position = 'fixed'
  bootScreen.style.top = '0'
  bootScreen.style.left = '0'
  bootScreen.style.width = '100%'
  bootScreen.style.height = '100%'
  bootScreen.style.zIndex = '1'
  document.body.appendChild(bootScreen)

  const bootImage = document.createElement('img')
  bootImage.src = `data:image/svg+xml;base64,${window.localStorage.getItem('BOOT_LOGO') ?? BOOT_LOGO}`
  bootImage.style.height = '25vh'
  bootImage.style.position = 'absolute'
  bootImage.style.top = '25%'
  bootImage.style.left = '50%'
  bootImage.style.transform = 'translate(-50%, -50%)'
  bootScreen.appendChild(bootImage)

  const bootText = document.createElement('div')
  bootText.textContent = 'Press Ctrl+1 to open boot menu.'
  bootText.style.position = 'absolute'
  bootText.style.bottom = '10px'
  bootText.style.right = '10px'
  bootScreen.appendChild(bootText)
}

const renderBootMenu = () => {
  bootScreen.innerHTML = ''
  const bootMenu = document.createElement('div')
  bootMenu.style.position = 'absolute'
  bootMenu.style.top = '50%'
  bootMenu.style.left = '50%'
  bootMenu.style.transform = 'translate(-50%, -50%)'
  bootMenu.style.display = 'flex'
  bootMenu.style.flexDirection = 'column'
  bootScreen.appendChild(bootMenu)

  // @ts-expect-error
  for (const [bootLoader, directory] of Object.entries(window.bootLoaderDirectories)) {
    const bootLoaderButton = document.createElement('button')
    bootLoaderButton.textContent = bootLoader
    bootLoaderButton.style.backgroundColor = 'black'
    bootLoaderButton.style.border = '1px solid white'
    bootLoaderButton.style.color = 'white'
    bootLoaderButton.style.cursor = 'pointer'
    bootLoaderButton.style.width = '100%'
    bootLoaderButton.addEventListener('click', () => {
      // @ts-expect-error
      window.loadBootLoader(directory).catch(console.error)
      unloadBIOS()
    })
    bootMenu.appendChild(bootLoaderButton)
  }
}

const handleKeydown = (e) => {
  if (e.ctrlKey && e.key === '1') {
    e.preventDefault()
    clearTimeout(timeout)
    renderBootMenu()
    return
  }
  if (e.altKey) {
    e.preventDefault()
    term.style.display = term.style.display === 'none' ? 'flex' : 'none'
  }
}

const loadBIOS = () => {
  document.addEventListener('keydown', handleKeydown)
  renderBootScreen()
}

const unloadBIOS = () => {
  document.removeEventListener('keydown', handleKeydown)
  bootScreen.remove()
  term.style.display = 'none'
  document.body.style.backgroundColor = ''
  document.body.style.color = ''
  document.body.style.fontFamily = ''
}

const timeout = setTimeout(() => {
  // @ts-expect-error
  window.loadBootLoader(Object.values(window.bootLoaderDirectories)[0]).catch(console.error)
  unloadBIOS()
}, 2500)

loadBIOS()
