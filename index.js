const snoowrap = require("snoowrap");
const { sendPosts } = require("./telegram");
require("dotenv").config();
// API set-up, replace with your credentials
const r = new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD
});
// enter your favourite subreddits here
let subreddits = ["cscareerquestions", "learnprogramming"];
let newPosts = [];

// maps over each subreedits
// and fetches top 20 new posts
subreddits.map(subreddit => {
    r.getSubreddit(subreddit)
        .getNew({ limit: 20 })
        .map(post => {
            newPosts.push({ title: post.title, url: post.url });
        })
        .then(() => {
            console.log(subreddit);
            console.log(newPosts);
            sendPosts(subreddit, newPosts);
            newPosts = [];
        });
});
