if (typeof browser === 'undefined') var browser = chrome

const toggle = document.getElementById('linkedin-no-follow-plugin-toggle')

browser.storage.local.get('enabled').then(result => {
  if (result.enabled === undefined) {
    browser.storage.local.set({ enabled: true })
    toggle.checked = true
  } else {
    toggle.checked = result.enabled
  }
})

toggle.addEventListener('change', () => {
  browser.storage.local.set({ enabled: toggle.checked })
})
