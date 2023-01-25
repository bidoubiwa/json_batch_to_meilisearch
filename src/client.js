const { MeiliSearch } = require('meilisearch')

function meilisearchClient({ host='http://localhost:7700', apiKey='masterKey' }) {
  const config = {
    host,
    apiKey
  }
  const client = new MeiliSearch(config)

  return client
}

module.exports = { meilisearchClient }
