import fetch from 'node-fetch';

const app = {
  // eslint-disable-next-line no-unused-vars
  search(subreddit, searchLimit, _sortBy) {
    return fetch(
      // `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
      `http://www.reddit.com/r/${subreddit}/.json?limit=${searchLimit}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) return data.data.children.map((data_) => data_.data);
        return [
          { status: 404, err: true, msg: `No subreddit ${subreddit} found` },
        ];
      })
      .catch((err) => {
        console.log(err);
        // log the error
        return [{ status: 502, err: true, msg: 'Reddit server-side error' }];
      });
  },

  trendingSubreddit() {
    return fetch('https://www.reddit.com/subreddits/popular.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) return data.data.children.map((data_) => data_.data);
        return [
          { status: 404, err: true, msg: 'No popular subreddit list found' },
        ];
      })
      .catch((err) => {
        console.log(err);
        // log the error
        return [{ status: 502, err: true, msg: 'Reddit server-side error' }];
      });
  },
};

export default app;
