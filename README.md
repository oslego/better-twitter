# Better Twitter

Web Extension for Chrome, Firefox and Microsoft Edge.

Hide what's not important to you on Twitter.com

Toggle these preferences in the extension options page:

- No fame: Hide number of followers and following count
- No vanity: Hide number of tweet likes, retweets and replies
- Hide promoted tweets
- Hide retweets
- Hide “Trends for you”
- Hide “Who to follow”
- Hide website footer

## Install from store:

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/better-twitter-extension)
- [Google Chrome](https://chrome.google.com/webstore/detail/better-twitter/illmpnnkeobcgnnjghammeohfjpjoljp)

## Install from source:

### Google Chrome
- Clone or download this repository:
  ```
  git@github.com:oslego/better-twitter.git
  ```
- Navigate to `chrome://extensions` in Chrome's URL bar
- Click the _Developer mode_ toggle
- Click _Load unpacked_
- Select the cloned repository folder


## Changelog
Version 2.0.0 (3 August 2020)

With this major version bump, support was removed for hiding things in the old Twitter UI (pre-2019).
If you still need that, please use the [v1.4.4 legacy version](https://github.com/oslego/better-twitter/releases/tag/v1.4.4).

- Removed support for old Twitter UI (pre-2019)
- Added option to hide retweets (⭐️ New feature)
- Fixed hiding "Who to follow" recommendations when thy appear in a user's timeline. ([issue #7](https://github.com/oslego/better-twitter/issues/7))

Version 1.4.4 (3 June 2020)

- Fix a regression introduced in v1.4.3 which caused an endless refresh loop on a user's "Followers" and "Following" timelines when the option to hide "Who to follow" was enabled.

Version 1.4.3 (2 June 2020)

- Hide "Who to follow" recommendations when they appear in the main timeline as well as those that appear in the sidebar.

Version 1.4.2 (4 March 2020)

- Fixed a bug where video playback was broken when the option to hide promoted tweets was set.

Version 1.4.1 (3 March 2020)

- Fixed a bug where promoted tweets were not hidden when the option was set.

Version 1.4 (18 October 2019)

- Removed option to hide user profile card tooltips that show when hovering over user names because it also blocks media previews.

Version 1.3 (3 October 2019)

- Added option to hide user profile card tooltips that show when hovering over user names.

Version 1.2 (10 August 2019)
- Added support for new Twitter UI (circa 2019)
- Removed "No Bragging" feature
- Removed support for obsolete features in new Twitter UI:
  - hide own likes count
  - hide own moments
  - hide tweet stats summary
- Renamed "No popularity" setting to "No vanity"
- Removed ability to differentiate between vanity metrics for own profile vs other profiles. Vanity: all or nothing.
