const express = require('express')
const consola = require('consola')
const Discord = require('discord.js')
const client = new Discord.Client()
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3001
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  bot_secret_token = "NTc0MTI5NTA2NzE4MzE4NjEy.XM1DqA.Xg4tBx5Eja6S4Ha2PZ_974QLDU0"

  client.login(bot_secret_token)

  client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })

        var generalChannel = client.channels.get("355310684105342977") // Replace with known channel ID
        generalChannel.send("restarted")  
    })
  })

  client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("mc-")) {
        processCommand(receivedMessage)
    }

    function processCommand(receivedMessage) {
      let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
      let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
      let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
      let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
  
      console.log("Command received: " + primaryCommand)
      console.log("Arguments: " + arguments) // There may not be any arguments
  
      if (primaryCommand == "help") {
          helpCommand(arguments, receivedMessage)
      } else if (primaryCommand == "multiply") {
          multiplyCommand(arguments, receivedMessage)
      } else {
          receivedMessage.channel.send("I don't fucking understand that. Try `mc-help`")
      }

      function helpCommand(arguments, receivedMessage) {
        receivedMessage.channel.send('Bahala na si batman')
        // if (arguments.length > 0) {
        //     receivedMessage.channel.send("It looks like you might need help with " + arguments)
        // } else {
        //     receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
        // }
    }
  }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  client.on('ready', () => {
      console.log("Connected as " + client.user.tag)
  })

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
