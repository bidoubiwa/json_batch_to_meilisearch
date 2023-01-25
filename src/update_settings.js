const MeiliSearch = require('meilisearch')
const { requireJson } = require('./file_utils')


async function meiliSettings({ settingsPath, index }) {
  const settings = requireJson(settingsPath)


  return index.updateSettings(settings);
}
module.exports = {
  meiliSettings
}
