const {
    token,
    prefix
} = require('./config.json')

const Discord = require('discord.js')
const fs = require('fs')
const db = require('quick.db')
const chalk = require('chalk')

const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot online!')
})

client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!message.content.startsWith(prefix) || message.author.bot) return

    if (db.get(`tag_${message.guild.id}_${commandName}`) !== null) message.channel.send(db.get(`tag_${message.guild.id}_${commandName}`))

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    try {
        command.execute(message, args, client);
        console.log(chalk.greenBright('[COMMAND]'), `${message.author.tag} used the command ` + commandName)
    } catch (error) {
        console.log(error);
        message.reply('there was an error trying to execute that command! ```\n' + error + "\n```");
    }
})

client.login(token)