const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Ask Pepper')
        .setDescription('Pepper responds to your message'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};