require('dotenv/config');
const { OpenAI } = require('openai');
const { SlashCommandBuilder } = require('discord.js');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askpepper')
        .setDescription('Pepper responds to your message'),
    async execute(interaction) {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a friendly chatbot.',
                },
                {
                    role: 'user',
                    content: await interaction.reply(interaction.content),
                },
            ],
        }).catch((error) => console.error('OpenAI Error:\n', error));
        await interaction.reply(response.choices[0].interaction.content);

    },
};