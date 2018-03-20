function hideLikedTweets() {
  select
    .all('.tweet-context .Icon--heartBadge')
    .map(el => el.closest('.js-stream-item').remove());
}

function hideRetweets() {
  select
    .all('.tweet-context .Icon--retweeted')
    .map(el => el.closest('.js-stream-item').remove());
}


function onNewTweets(cb) {
	observeEl('#stream-items-id', cb);
}

function init() {
  onNewTweets(() => {
    hideLikedTweets();
    hideRetweets();
  })
}

document.addEventListener('DOMContentLoaded', init);
