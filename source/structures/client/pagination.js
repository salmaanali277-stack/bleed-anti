const Discord = require('discord.js')

const pagination = async (message, embeds, pages, items, footer) => {

  embeds[0].setFooter({ text : `Page 1/${pages} (${items}) ${footer || ''}` })

  // A button must carry a label and/or an emoji, and setEmoji() rejects an empty
  // string - so fall back to a text label when client.emotes.* is not configured.

  const button = (customId, style, emoji) => {

    const built = new Discord.ButtonBuilder({ customId }).setStyle(style)

    return emoji ? built.setEmoji(emoji) : built.setLabel(customId)
  }

  const row = new Discord.ActionRowBuilder().addComponents(
    button('Previous', 'Primary', message.client.emotes.previous),
    button('Next', 'Primary', message.client.emotes.next),
    button('Skip', 'Secondary', message.client.emotes.skip),
    button('Cancel', 'Danger', message.client.emotes.cancel),
  )

  let msg = await message.channel.send({ embeds: [embeds[0]], components: [row] })

  const filter = async (i) => {

    await i.deferUpdate()
    
    if (i.user.id != message.author.id) {
          
      const embed = new Discord.EmbedBuilder()
    
      .setColor(message.client.colors.warn)
      .setDescription(`${message.client.emotes.warn} You're not the **author** of this embed!`)
    
      await i.followUp({ embeds: [embed], ephemeral: true })
    }
    
    return i.user.id == message.author.id
  }

  const collector = msg.createMessageComponentCollector({ filter, time: 60000 })

  let index = 0
  let cancelstatus = false

  collector.on('collect', async (interaction) => {

    if (interaction.user.id != message.author.id) return

    if (interaction.customId == 'Previous') {

      try {

        index = index > 0 ? --index: embeds.length - 1

        embeds[index].setFooter({ text: `Page ${index + 1}/${pages} (${items}) ${footer || ''}` })

        await msg.edit({ embeds: [embeds[index]] })

      } catch (error) {

        console.error(error)
      }

    } else if (interaction.customId == 'Next') {

      try {

        index = index + 1 < embeds.length ? ++index : 0

        embeds[index].setFooter({ text: `Page ${index + 1}/${pages} (${items}) ${footer || ''}` })

        await msg.edit({ embeds: [embeds[index]] })

      } catch (error) {

        console.error(error)
      }
      
    } else if (interaction.customId == 'Skip') {

      row.components.forEach((compo) => {
        compo.setDisabled(true)
      })
    
      await msg.edit({ components: [row] }).catch(() => { })

      const embed = new Discord.EmbedBuilder()

      .setColor(message.client.colors.neutral)
      .setDescription(`🔢 What **page** would you like to skip to?`)

      await interaction.followUp({ embeds: [embed], ephemeral: true })
      
      const filter2 = (m) => {
        return m.author.id == message.author.id
      }

      const collect = msg.channel.createMessageCollector({ filter: filter2, time: 10000, max: 1 })

      collect.on('collect', async (m) => {

        if (isNaN(m.content)) {

          collect.stop()
  
          const embed = new Discord.EmbedBuilder()
  
          .setColor(message.client.colors.warn)
          .setDescription(`${message.client.emotes.warn} You can only pass **numbers**!`)
            
          m.delete()
  
          return await interaction.followUp({ embeds: [embed], ephemeral: true })

        } else if (parseInt(m.content) > embeds.length || parseInt(m.content) < 1) {

          index = 0
          embeds[index].setFooter({ text: `Page ${index + 1}/${pages} (${items}) ${footer || ''}` })

          await m.delete()

          await msg.edit({ embeds: [embeds[index]] })

        } else {

          const number = parseInt(m.content)
          index = number - 1
          embeds[index].setFooter({ text: `Page ${index + 1}/${pages} (${items}) ${footer || ''}` })

          await m.delete()

          await msg.edit({ embeds: [embeds[index]] })
        }
      })

      collect.on('end', async () => {

        row.components.forEach((compo) => {
          compo.setDisabled(false)
        })

        await msg.edit({ components: [row] }).catch(() => { })
      })

    } else if (interaction.customId == 'Cancel') {

      cancelstatus = true
      collector.stop()
      msg.delete()
    }
  })

  collector.on('end', async () => {
    
    if (cancelstatus) {
      return
    } else {
      return await msg.edit({ components: [] }).catch(() => { })
    }
  })
}

module.exports = pagination