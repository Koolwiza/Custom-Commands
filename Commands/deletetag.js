const Discord = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'deletetag',
    description: 'List all available tags',
    usage: 'taglist',
    guildOnly: true,
    async execute(message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return
        let tag = args[0]
        if(!tag) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Please provide a tag for me to delete!')
        )
        if(db.get(`tag_${message.guild.id}_${tag}`) === null) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('No such tag exists!')
        )
        db.delete(`tag_${message.guild.id}_${tag}`)
        await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Success!')
                .setColor("GREEN")
                .setDescription('I have deleted the tag ' + tag)
        )
    }
}