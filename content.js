if (typeof browser === 'undefined') var browser = chrome

let enabled = true

browser.storage.local.get('enabled').then(result => {
  if (result.enabled === false) {
    enabled = false
  }
})

function uncheckFollowBox() {
  if (!enabled) return

  const checkbox = document.querySelector('#follow-company-checkbox')
  if (!checkbox) return

  setTimeout(() => {
    if (checkbox.checked) {
      checkbox.checked = false
      checkbox.dispatchEvent(new Event('change', { bubbles: true }))
      console.log('Automatically unchecked "Follow company" box')
    }
  }, 250)
}

uncheckFollowBox()

const observer = new MutationObserver(() => {
  uncheckFollowBox()
})

observer.observe(document.body, { childList: true, subtree: true })

window.addEventListener('beforeunload', () => observer.disconnect())
