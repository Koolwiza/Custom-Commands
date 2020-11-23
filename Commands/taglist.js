const Discord = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'taglist',
    description: 'List all available tags',
    usage: 'taglist',
    guildOnly: true,
    async execute(message, args) {
        let data = []

        db.all().filter(x => x.ID.startsWith(`tag_${message.guild.id}`)).forEach(async m => {
            let a = m.ID.split("_")
            data.push(`\`${a[2]}\``)
        })
        message.channel.send({
            embed: {
                title: 'Tags available',
                description: data.join(', ')
            }
        })
    }
}