// const mongoose = require('mongoose');
import requireLogin  from '../middlewares/requireLogin.js';
import reddit  from '../helpers/redditApi.js';
// const Blog = mongoose.model('Blog');
import express from 'express'; 
const Router = express.Router();

Router.get('/api/blogs/:id', requireLogin, async (req, res) => {
    // const blog = await Blog.findOne({
    //   _user: req.user.id,
    //   _id: req.params.id
    // });
    const subreddit = req.params.id;
    const searchLimit = "20";
    const sortBy = "relevance";
    
    reddit.search(subreddit, searchLimit, sortBy).then(results => {
    
        const blogs = [];
        if(results.length==1 && results[0].err){
            res.status(results[0].status)
            res.send({msg : results[0].msg})
            return
        }
        results.forEach(post => {
            // Check for image
            let image = post.preview
            ? post.preview.images[0].source.url
            : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            const output = {
            "author": post.author,
            "author_url": "https://www.reddit.com/user/"+ post.author,
            "ups":post.ups,
            "downs":post.downs,
            "awards":post.total_awards_received,
            "score":post.score,
            "created":post.created,    
            "image" : image,
            "id": post.subreddit_id,
            "title": post.title,
            "post_self_text" : post.selftext,
            "url":post.url,
            "subreddit": post.subreddit,
            "score ":post.score
            }
            blogs.push(output)
        });
        if(blogs.length==0){
            res.status(404)
            res.send({msg : `There are 0 post associated to subreddit ${subreddit}`})
            return
        }

        res.send(blogs);
    });
    
    
    
});

Router.get('/api/trendingSubreddits', requireLogin, async (req, res) => {

   
    reddit.trendingSubreddit().then(results => {
    
        const subReddits = [];
        results.forEach(post => {
            subReddits.push({"title" : post.url.split("/")[2] })
        });
        if(results.length==1 && results[0].err){
            res.status(result[0].status)
            res.send({msg : results[0].msg})
        }
        else if(subReddits.length == 0){
            res.status(404)
            res.send(`No trending subreddits found`)
        }
        else
            res.send(subReddits);
    });

 

});

export default Router;