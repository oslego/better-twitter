function hideLikedTweets() {
  select
    .all('.tweet-context .Icon--heartBadge')
    .map(el => el.closest('.js-stream-item').remove());
}

/* Hide Twitter bragging: retweets which mention the retweeter */
function hideBragging() {
  let x = select
    .all('.tweet[data-retweeter]')
    .filter(el => el.dataset.retweeter == el.dataset.mentions)
    .map(el => el.remove());
}

function onNewTweets(cb) {
	observeEl('#stream-items-id', cb);
}

function init() {
  onNewTweets(() => {
    hideLikedTweets();
    hideBragging();
  })
}

document.addEventListener('DOMContentLoaded', init);
