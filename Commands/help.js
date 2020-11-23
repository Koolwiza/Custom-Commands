const {
    PREFIX
} = require('../config.json');
const Discord = require('discord.js')
const client = require('../index.js')
const {
    prefix
} = require('../config.json')
const {
    Collection
} = require('discord.js')

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    category: 'Utility',
    usage: 'help [command]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const {
            commands
        } = message.client;

        data.push('Here\'s a list of all my commands:');
        data.push(commands.map(command => command.name).join(', '));

        return message.author.send(data, {
                split: true
            })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });

    },
};