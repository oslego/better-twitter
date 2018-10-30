let userPrefs = {};

function onPrefChange(e) {
  const id = e.target.name;
  const value = e.target.checked;
  // Consolidate prefs including previous user prefs and the latest pref change.
  const updatedPrefs = { ...DEFAULT_PREFS, ...userPrefs, [id]: { value } };
  // Remove labels from consolidated prefs before persisting to storage.
  // This removes unnecessary weight and allows us to tweak or localize
  // the pref label in future releases without touching the storage.
  userPrefs = Object.entries(updatedPrefs).reduce((acc, [prefKey, prefObj]) => {
    acc[prefKey] = { value: prefObj.value };
    return acc;
  }, {});

  chrome.storage.sync.set({ userPrefs });
}

function onResetClick() {
  chrome.storage.sync.clear();
  userPrefs = { ...DEFAULT_PREFS };
  render(userPrefs);
}

function render(options) {
  const container = document.querySelector("#options");
  const markup = Object.entries(options).map(([id, pref]) => {
    // Use the pref label from defaults instead of the incoming object
    // which may be the simplified prefs object from storage.
    const label = DEFAULT_PREFS[id] && DEFAULT_PREFS[id].label;
    // Skip rendering prefs if we receive ids for prefs which no longer exist.
    // This may happen when restoring outdated prefs from storage.
    if (!label) {
      return '';
    }

    return `
    <li>
      <input type="checkbox" name="${id}" id="${id}" ${!!pref.value && "checked=checked"}/>
      <label for="${id}">${label}</label>
    </li>
    `;
  });
 container.innerHTML = markup.join("\n");
}

// Get any stored user prefs, use them to flip defaults, then render the result.
// Listen to changes and store updated user prefs.
chrome.storage.sync.get(['userPrefs'], function(result) {
  userPrefs = result.userPrefs || {};
  render({ ...DEFAULT_PREFS, ...userPrefs });

  document.querySelector('#reset').addEventListener("click", onResetClick);
  document.addEventListener("change", onPrefChange);
});
