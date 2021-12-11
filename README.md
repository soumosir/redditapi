# redditapi

the api app demo can be found in :- 
https://subreddit-search-app.herokuapp.com/api/blogs/home
https://subreddit-search-app.herokuapp.com/api/trendingsubreddits

API doccumentation for subreddit search app

GET /api/blogs/subreddit_title

200
    - Get the top 20 subreddit posts searching by name
      expected output structure [{subredditObject1},{subredditObject2},...]

404  
    - on searching for a subreddit that donot exist 
      example : GET /api/blogs/hom
      expected err msg
      msg: `No subreddit ${subreddit} found`

    - on searching for a subreddit that has zero posts in it
      example GET /api/blogs/homedevilhome 
      expected err msg 
      msg: `There are 0 post associated to subreddit ${subreddit}`
502      
    - on reddit server being down
      expected err msg 
      msg: 'Reddit server-side error'


GET /api/blogs/trendingsubreddits

200
    - Get the top 20 trending subreddit titles
      expected output structure [{title:<subreddit1>},{title:<subreddit2>},...]

404  
    - if there are no trending subreddits
      expected err msg
      msg: 'No trending subreddits found'

502      
    - on reddit server being down
      expected err msg 
      msg: 'Reddit server-side error'    

GET *

404
    - on any random route not implemented
     msg: 'Requested URL is not served yet!' });

Local development setup

    git pull <repo>
    # install dependencies
    npm install

    # to run local dev server using nodemon
    npm run server

    # to run local dev server without nodemon
    npm run start

    # to test testcases under /test
    npm run test


    # to run eslint on a directory or file
    npx eslint yourfile.js|directory name

    # to run prettier and align formatting in you file structure or file
    npx prettier --write . 



