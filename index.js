require('dotenv').config()

console.clear()
const client = new (require('./source/client.js'))()

;(async () => {

  await client.database()
  await client.connect(client.token) // LOG IN TOKEN
})()

process.on('unhandledRejection', (error, promise) => {

  console.log(promise)
  console.log(error?.stack || error)
})

process.on('uncaughtException', (err, origin) => {

  console.log(origin)
  console.log(err?.stack || err)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {

  console.log(origin)
  console.log(err?.stack || err)
})

module.exports = client.client
