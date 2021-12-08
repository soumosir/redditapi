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
    try{
        reddit.search(subreddit, searchLimit, sortBy).then(results => {
        
            const blogs = [];
            results.forEach(post => {
                // Check for image
                let image = post.preview
                ? post.preview.images[0].source.url
                : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
                const output = {
                "author": post.author,
                "ups":post.ups,
                "downs":post.downs,
                "awards":post.total_awards_received,
                "score":post.score,
                "created":post.created,    
                "image" : image,
                "id": post.subreddit_id,
                "post_title": post.title,
                "post_self_text" : post.selftext,
                "post_url":post.url,
                "subreddit": post.subreddit,
                "score ":post.score
                }
                blogs.push(output)
            });
            if(blogs.length == 0){
                res.status(404)
                res.send({msg : `No blogs with subreddit ${subreddit} found`})
            }
            else
                res.send(blogs);
        });
    }
    catch{
        res.status(500);
        res.send('Reddit server error');
    }
    
    
});

Router.get('/api/trendingSubreddits', requireLogin, async (req, res) => {

    try{
        reddit.trendingSubreddit().then(results => {
        
            const subReddits = [];
            results.forEach(post => {
                subReddits.push({"title" : post.url.split("/")[2] })
            });
            if(subReddits.length == 0){
                res.status(404)
                res.send(`No trending subreddits found`)
            }
            else
                res.send(subReddits);
        });
    }
    catch{
        res.status(500);
        res.send('Reddit server error');
    }

});

export default Router;