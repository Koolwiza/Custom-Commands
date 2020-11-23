const Discord = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'addtag',
    description: 'Add a tag',
    usage: 'tag <command> <reply>',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return

        let command = args[0]
        let reply = args.slice(1).join(" ")
        if (!command) return message.channel.send({
            embed: {
                title: 'Error',
                description: 'Missing Command Name',
                fields: [{
                    name: 'Usage:',
                    value: '`addtag <command> <reply`'
                }]
            }
        })

        if (!reply) return message.channel.send({
            embed: {
                title: 'Error',
                description: 'Missing Command Reply',
                fields: [{
                    name: 'Usage:',
                    value: '`addtag <command> <reply`'
                }]
            }
        })

        if(db.get(`tag_${message.guild.id}_${command}`) !== null) return message.channel.send({
            embed: {
                title: 'Error',
                description: 'This tag already exists',
            }
        })

        db.set(`tag_${message.guild.id}_${command}`, reply)
        await message.channel.send({
            embed: {
                title: 'Success!',
                color: 'GREEN',
                description: `I have added the tag \`${command}\` with a reply of \`${reply}\``
            }
        })
    }
}