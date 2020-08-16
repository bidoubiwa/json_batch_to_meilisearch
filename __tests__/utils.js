const MeiliSearch = require('meilisearch')

const defaultConfig = {
  host: 'http://localhost:7700',
  apiKey: 'masterKey'
}

const clearAllIndexes = async (config =  defaultConfig)  => {
  const client = new MeiliSearch(config)
  const indexes = await client
    .listIndexes()
    .then((response) => {
      return response.map(elem => elem.uid)
    })

  for (const indexUid of indexes) {
    await client
      .getIndex(indexUid)
      .deleteIndex()
      .catch((err) => {
        expect(err).toBe(null)
      })
  }

  await expect(client.listIndexes()).resolves.toHaveLength(0)
}

module.exports = {
  defaultConfig,
  clearAllIndexes
}
