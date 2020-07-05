// Global user prefs in context of the extension content script.
let userPrefs = {};

// Toggle pref IDs as corresponding class names on the <html> element.
// Used by CSS selectors in content.css to tweak the website interface.
function applyPrefs(prefs = {}) {
  userPrefs = { ...DEFAULT_PREFS, ...prefs };
  Object.entries(userPrefs).forEach(([id, pref]) => {
    document.documentElement.classList.toggle(id, pref.value);
  })
}

// Get user prefs and apply their class names to the <html> element
// immediately so the CSS tweaks apply as soon as the DOM is generated.
// Waiting for "DOMContentLoaded" will cause a flash of unwanted content.
chrome.storage.sync.get(['userPrefs'], (result) => {
  applyPrefs(result.userPrefs);
});

// Re-apply user prefs when they're changed.
chrome.storage.onChanged.addListener((changes, area) => {
  const { userPrefs } = changes;
  if (area === "sync" && userPrefs && userPrefs.newValue) {
    applyPrefs(userPrefs.newValue);
  }
});

/*
The new Twitter interface (circa 2019) uses auto-generated markup
with obfuscated class names which are not guaranteed to be stable over time.

In order to remove unwanted parts of the UI when they appear,
we use CSS selectors in the stylesheet (content.css) to identify
areas of interest, then apply a short fake animation to them.

Here in JavaScript, we listen for all `animationstart` events, check if they match
one of the areas of interest (`AnimationEvent.target` points to the element matched
by the CSS seletor), then mark the target element or one of its ancestors. This marker
then causes a CSS selector from content.css to match and hide the intended element.

This is a convoluted but viable workaround for missing ancestor selectors in CSS.
*/
document.addEventListener('animationstart', (e) => {
  switch (e.animationName) {
    case "bt-marker-promoted":
    e.target.closest('div:not([class])').setAttribute('bt-promoted', true)
      break;
    case "bt-marker-retweet":
    e.target.closest('div:not([class])').setAttribute('bt-retweet', true)
      break;
    case "bt-marker-wtf-sidebar":
      // Mark the container's parent for the "Who To Follow" in the sidebar.
      e.target.parentNode.classList.add(e.animationName)
      break;
    case "bt-marker-wtf":
      const container = e.target.closest('div:not([class])');
      container.setAttribute('bt-wtf', true);

      // If found, mark the container for the "Who to Follow" heading
      const prevContainer = container.previousElementSibling;
      if (prevContainer.querySelector('h2')) {
        prevContainer.setAttribute('bt-wtf', true);
      }

      // If found, mark the container for "show more" link
      const nextContainer = container.nextElementSibling;
      if (nextContainer.querySelector('[href^="/i/connect_people"]')) {
        nextContainer.setAttribute('bt-wtf', true);
      }
      break;

  }
});
