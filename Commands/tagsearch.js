const Discord = require('discord.js')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'tagsearch',
    description: 'Search for a tag',
    usage: 'tagsearch',
    guildOnly: true,
    async execute(message, args) {
        let query = args[0]
        let data = []

        if (!query) return message.channel.send(
            {
                embed: {
                    title: 'Error',
                    description: 'Missing Query',
                    fields: [
                        {
                            name: 'Usage:',
                            value: '`tagsearch <tag>`'
                        }
                    ]
                }
            }
        )
        if(db.get(`tag_${message.guild.id}_${query}`) === null) return message.channel.send({
            embed: {
                title: 'Error',
                description: 'No tags with the query of ' + query + ' exist! Maybe you misspelt something?'
            }
        })
        let tagsList = db.all().filter(x => x.ID.startsWith(`tag_${message.guild.id}_${query}`)).forEach(async m => {

            let a = m.ID.split("_")
            await data.push(`\`${a[2]}\``)
        })
        message.channel.send({
            embed: {
                title: 'All results of ' + query,
                description: `I found ${db.all().filter(x => x.ID.startsWith(`tag_${message.guild.id}_${query}`)).length} results.`,
                fields: [
                    {
                        name: "Results:",
                        value: data.join(", ")
                    }
                ]
            }
        })
    }
}