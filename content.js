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

// Mark <html> element with a class name when viewing own profile page.
// Used to isolate prefs which can overlap with other profiles, like hide
// follower and tweet count, but should only apply on own profile page.
function markOwnProfile() {
  const link = document.querySelector('.DashUserDropdown-userInfoLink');
  isOwnProfile = link && link.pathname === window.location.pathname;
  document.documentElement.classList.toggle('bt--ownprofile', isOwnProfile);
}

// Hide or show retweets which mention the person retweeting.
function toggleBragging() {
  select
    .all('.tweet[data-retweeter]')
    .filter(el => {
      const mentions = el.dataset.mentions || "";
      const rewteeter = el.dataset.retweeter;

      return mentions.split(" ").includes(rewteeter);
    })
    .map(el => el.classList.toggle('bt--isbragging', userPrefs['bt--nobragging'].value));
}

// Get user prefs and apply their class names to the <html> element
// immediately so the CSS tweaks apply as soon as the DOM is generated.
// Waiting for "DOMContentLoaded" will cause a flash of unwanted content.
chrome.storage.sync.get(['userPrefs'], (result) => {
  applyPrefs(result.userPrefs);
  toggleBragging();
});

// Re-apply user prefs when they're changed.
chrome.storage.onChanged.addListener((changes, area) => {
  const { userPrefs } = changes;
  if (area === "sync" && userPrefs && userPrefs.newValue) {
    applyPrefs(userPrefs.newValue);
    toggleBragging();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  markOwnProfile();
  toggleBragging();
  observeEl('#stream-items-id', toggleBragging);
  observeEl('body', markOwnProfile, { attributes: true, childList: false, subtree: false });
});
