require('dotenv/config');
const { Client } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMembers'],
});

client.on('ready', () => {
    console.log('I am alive and ready to go!');
});

const IGNORE_PREFIX = '!';
const CHANNELS = ['1213007652146389043'];

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(IGNORE_PREFIX) || !message.content.trim()) return;

    const permissions = message.channel.permissionsFor(client.user);
    if (!permissions.has('SEND_MESSAGES')) {
        console.log(`The bot does not have the 'SEND_MESSAGES' permission in the channel: ${message.channel.id}`);
    }
    if (!permissions.has('READ_MESSAGE_HISTORY')) {
        console.log(`The bot does not have the 'READ_MESSAGE_HISTORY' permission in the channel: ${message.channel.id}`);
    }

    if (!CHANNELS.includes(message.channelId.toString()) && !message.mentions.users.has(client.user.id)) return;

    
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a friendly chatbot.',
            },
            {
                role: 'user',
                content: message.content,
            },
        ],
    }).catch((error) => console.error('OpenAI Error:\n', error));
    console.log('Before sending message');
    message.reply(response.choices[0].message.content);
    console.log('After sending message');

});

client.login(process.env.TOKEN);
