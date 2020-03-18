const TelegramBot = require("node-telegram-bot-api");
const { getPosts } = require("./index");
require("dotenv").config();
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN_ID;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const chatId = process.env.CHAT_ID;

// converts posts array object to messages
const postToMessageConverter = (subreddit, posts) => {
    let message = `${subreddit}\n-------------------------\n\n`;
    posts.map((post, index) => {
        message += `${index + 1}. ${post.title} ${post.url}\n\n`;
    });
    return message;
};

// Sends the message to the ChatId
const sendPosts = (subreddit, posts) => {
    let post = postToMessageConverter(subreddit, posts);
    bot.sendMessage(chatId, post);
};

module.exports = { sendPosts };
