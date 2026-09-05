const Discord = require('discord.js')

module.exports = async (client) => {

  client.user.setActivity({ name: 'Custom Status', type: Discord.ActivityType.Custom, state: client.status })

  client.logger(`Logged in as ${client.user.tag}`)
}