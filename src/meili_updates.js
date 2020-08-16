const MeiliSearch = require('meilisearch')

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function meiliUpdates ({ uid, meiliAddress, meiliApiKey }) {
  const config = {
    host: meiliAddress,
    apiKey: meiliApiKey
  }
  const client = new MeiliSearch(config)

  const standartSpeed = 1000
  let allProcessed = false
  console.log('Start update watch')
  console.log('-------------')
  while (!allProcessed) {
    try {
      const updates = await client.getIndex(uid).getAllUpdateStatus()
      const processed = updates.filter(update => update.status === 'processed')
      const enqueued = updates.filter(update => update.status === 'enqueued')
      console.log(`${processed.length} / ${updates.length} have been processed`)
      console.log(`${enqueued.length} / ${updates.length} still enqueued`)
      console.log('-------------')
      if (enqueued.length === 0) allProcessed = true
      await sleep(standartSpeed)
    } catch (e) {
      console.error(e)
    }
  }
  const finalUpdateStatus = await client.getIndex(uid).getAllUpdateStatus()
  console.log('No action left in the queue, final report:')
  console.log(`failed to upload: ${finalUpdateStatus.filter(u => u.status === 'failed').length}`)
  console.log(`succeeded to upload: ${finalUpdateStatus.filter(u => u.status === 'processed').length}`)
}

module.exports = {
  meiliUpdates
}
