const MeiliSearch = require('meilisearch')
const { requireJson } = require('./file_utils')


async function meiliSettings({settingsPath, meiliAddress, meiliApiKey, uid }) {
  const settings = requireJson(settingsPath)

  const config = {
    host: meiliAddress,
    apiKey: meiliApiKey
  }
  const client = new MeiliSearch(config)
  await client.getIndex(uid).updateSettings(settings);
}
module.exports = {
  meiliSettings
}
