function uncheckFollowBox() {
  const checkbox = document.querySelector('#follow-company-checkbox')
  if (!checkbox) return

  // Give it a tiny delay to allow LinkedIn scripts to bind or re-render
  setTimeout(() => {
    if (checkbox.checked) {
      checkbox.checked = false
      checkbox.dispatchEvent(new Event('change', { bubbles: true }))
      console.log('Automatically unchecked "Follow company" box')
    }
  }, 250)
}

// Run once on load
uncheckFollowBox()

// Watch for dynamically injected Easy Apply modals
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
