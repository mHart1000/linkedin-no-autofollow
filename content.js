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

// Watch for dynamically injected follow box
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if ([...mutation.addedNodes].some(n => n.nodeType === 1 && n.querySelector?.('#follow-company-checkbox'))) {
      uncheckFollowBox()
      break
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })

window.addEventListener('beforeunload', () => observer.disconnect())
