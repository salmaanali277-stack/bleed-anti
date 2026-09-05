const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Discord = require('discord.js')

module.exports = class Client extends Discord.Client {

  constructor () {
    super ({
      intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildModeration, Discord.GatewayIntentBits.GuildWebhooks],
      partials: [Discord.Partials.Message, Discord.Partials.GuildMember, Discord.Partials.Channel],
      allowedMentions: { parse: [ 'everyone', 'users', 'roles' ] },
    })

    this.client = this

    if (!Array.prototype.paginate) {

      Object.defineProperty(Array.prototype, 'paginate', {
        value: function (n) {
          return Array.from(Array(Math.ceil(this.length / n)), (_, i) => this.slice(i * n, i * n + n))
        }
      })
    }

    this.token = process.env.DISCORD_TOKEN || ''
    this.mongourl = process.env.MONGO_URL || ''

    this.name = 'bleed'
    this.website = 'bleed.bot'
    this.status = '🔗 bleed.bot'

    this.support_server = 'discord.gg/bleed'
    this.developer = 'put_your_name_my_guy'

    this.help = require('./structures/embeds/help')
    this.embed = require('./structures/embeds/response')
    this.antinuke = require('./structures/embeds/antinuke')
    this.pagination = require('./structures/client/pagination')

    this.commands = new Discord.Collection()
    this.aliases = new Discord.Collection()

    this.banthreshold = new Map()
    this.kickthreshold = new Map()
    this.roledeletethreshold = new Map()
    this.emojideletethreshold = new Map()
    this.channelthreshold = new Map()
    this.webhookcreatethreshold = new Map()

    this.colors = {
      maincolor: '#95a5a6',
      approve: '#a3eb7b',
      deny: '#fe6464',
      warn: '#efa23a',
      neutral: '#6495ed',
    }

    this.emotes = {
      approve: '',
      deny: '',
      warn: '',
      neutral: '🔎',
      previous: '',
      next: '',
      skip: '',
      cancel: ''
    }
  }

  async logger (text) {

    console.log(text)
  }

  async database () {

    if (!this.mongourl) {

      this.logger('Missing MONGO_URL - set it in your .env file before starting the bot')
      process.exit(1)
    }

    mongoose.set('strictQuery', false)

    try {

      await mongoose.connect(this.mongourl)

      this.logger('Connected to database')

    } catch (error) {

      this.logger(`Could not connect to the database: ${error.message}`)
      process.exit(1)
    }
  }

  async connect (token) {

    if (!token) {

      this.logger('Missing DISCORD_TOKEN - set it in your .env file before starting the bot')
      process.exit(1)
    }

    this.loadevents(), this.loadcommands()

    try {

      await super.login(token)

    } catch (error) {

      this.logger(`Could not log in to Discord: ${error.message}`)
      process.exit(1)
    }

    setInterval(() => {

      if (!this.isReady()) return

      this.user.setActivity({
        name: 'Custom Status',
        type: Discord.ActivityType.Custom,
        state: this.status
      })
    }, 600000)
  }

  loadevents () {

    const eventsdirectory = path.join(__dirname, 'events')

    fs.readdirSync(eventsdirectory).forEach((directory) => {

      const files = fs.readdirSync(path.join(eventsdirectory, directory)).filter((file) => file.endsWith('.js'))

      for (const file of files.values()) {
                
        const eventbuilder = require(path.join(eventsdirectory, directory, file))

        const name = file.split('.')[0]
        this.on(name, eventbuilder.bind(null, this))
      }
    })
  }

  loadcommands () {

    const commandsdirectory = path.join(__dirname, 'commands')

    fs.readdirSync(commandsdirectory).forEach((directory) => {

      const commands = fs.readdirSync(path.join(commandsdirectory, directory)).filter(file => file.endsWith('.js'))
  
      for (let file of commands) {

        let pull = require(path.join(commandsdirectory, directory, file))

        if (pull.name) {

          this.commands.set(pull.name, pull)

        } else {
          
          continue
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.aliases.set(alias, pull.name))
      }
    })
  }

  async banuser (guild, executor, logchannel, reason, logreason) {

    await guild.members.ban(executor, { reason: `antinuke: ${reason}` }).then(() => {

      var antilogchannel = guild.channels.cache.get(logchannel)
      if (!antilogchannel) return

      return new guild.client.antinuke(
        antilogchannel,
        guild.client, 
        {
          description: `${logreason}`
        }
      )

    }).catch(() => { })
  }

  async kickuser (guild, executor, logchannel, reason, logreason) {

    await guild.members.kick(executor, `antinuke: ${reason}`).then(() => {

      var antilogchannel = guild.channels.cache.get(logchannel)
      if (!antilogchannel) return

      return new guild.client.antinuke(
        antilogchannel,
        guild.client, 
        {
          description: `${logreason}`
        }
      )

    }).catch(() => { })
  }

  async stripuser (guild, nuker, permission1, permission2, logchannel, reason, logreason) {

    if (!nuker) return

    nuker.roles.cache.forEach(async r => {
  
      if (nuker.user.bot && r.managed) {

        if (r.permissions.has(permission1)) {

          r.edit({ permissions: r.permissions.remove(permission1), reason: `antinuke: ${reason}` }).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }

        if (r.permissions.has(permission2)) {

          r.edit({ permissions: r.permissions.remove(permission2), reason: `antinuke: ${reason}` }).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }

      } else {

        const rolepermissions = [permission1, permission2]

        if (r.permissions.has(rolepermissions)) {

          nuker.roles.remove(r, `antinuke: ${reason}`).then(() => {

            var antilogchannel = guild.channels.cache.get(logchannel)
            if (!antilogchannel) return

            return new guild.client.antinuke(
              antilogchannel,
              guild.client, 
              {
                description: `${logreason}`
              }
            )

          }).catch(() => { })      
        }
      }
    })
  }

  async victimuser (victim, permission1, reason, permission2) {

    if (!victim) return

    victim.roles.cache.forEach(async r => {

      const rolepermissions = [permission1, permission2]

      if (r.permissions.has(rolepermissions)) {

        victim.roles.remove(r, `antinuke: ${reason}`).catch(() => { })
      }
    })
  }

  async victimuser2 (victim, member, permission1, reason) {

    if (!victim || !member) return

    victim.roles.cache.forEach(async r => {
  
      if (!victim.permissions.has(permission1)) {

        const roles = member.roles.cache.find(r => r.permissions.has(permission1))

        if (!roles) return

        victim.roles.add(roles, `antinuke: ${reason}`).catch(() => { })
      }
    })
  }
}