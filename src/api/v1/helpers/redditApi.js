// module.exports = {
//     search: function(searchTerm, searchLimit, sortBy) {
//       return fetch(
//         `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
//       )
//         .then(res => res.json())
//         .then(data => {
//           return data.data.children.map(data => data.data);
//         })
//         .catch(err => console.log(err));
//     }
// };

import fetch from 'node-fetch';
// const url = "http://www.reddit.com/r/volvo/top.json"
// https://www.reddit.com/r/basketball/.json?limit=20
const app = {
  search: function(subreddit, searchLimit, sortBy) {
    return fetch(
      // `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
      `http://www.reddit.com/r/${subreddit}/.json?limit=${searchLimit}`
    )
      .then(res => res.json())
      .then(data => {
        
        if(data.data)
          return data.data.children.map(data => data.data);
        return [{status: 404,err:true,msg:`No subreddit ${subreddit} found`}] 
      })
      .catch(err => {
        console.log(err);
        //log the error
        return [{status: 502,err:true,msg:'Reddit server-side error'}];
      })
  },

  trendingSubreddit : function(){
    
    return fetch(
      `https://www.reddit.com/subreddits/popular.json`
      )
      .then(res => res.json())
      .then(data => {
        if(data.data)
          return data.data.children.map(data => data.data);
        return [{status: 404,err:true,msg:'No popular subreddit list found'}];  
      })
      .catch(err => {
        console.log(err);
        //log the error
        return [{status: 502,err:true,msg:'Reddit server-side error'}];
      })
  }
};

export default app;