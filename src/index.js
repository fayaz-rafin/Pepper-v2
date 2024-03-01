require('dotenv/config');
const {Client} = require('discord.js');
const {OpenAI} = require('openai'); 

const client = new Client(
    {
        intents: ['Guilds', 'GuildMessages', 'GuildMembers']
    }
);

client.on('ready', () => {
    console.log('I am ready!');
});

client.login(process.env.TOKEN);
