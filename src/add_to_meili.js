const MeiliSearch = require('meilisearch')
const { fileList } = require('./file_utils')


function logResult({files, uid}){
  if (files.length === 1) console.log(`One file has been added to the following index in MeiliSearch: ${uid}`);
  else if (files.length === 0) console.log(`No file have been added as no json file was found.`);
  else console.log(`${files.length} files has been added to the following index in MeiliSearch: ${uid}`);
}

async function json2Meili ({
  uid = 'my_index',
  meiliAddress = 'http://localhost:7700',
  jsonPath,
  meiliApiKey,
  meiliPrimaryKey,
  deleteIndex = false
}) {
  try {
    const files = fileList(jsonPath)
    const config = {
      host: meiliAddress,
      apiKey: meiliApiKey
    }
    const client = new MeiliSearch(config)
    const indexOptions = {}
    if (deleteIndex) {
      try {
        await client.getIndex(uid).deleteIndex()
      } catch(_) {}
    }
    if (meiliPrimaryKey) indexOptions.primaryKey = meiliPrimaryKey
    const index = await client.getOrCreateIndex(uid, meiliPrimaryKey)
    const addDocs = files.map(file => index.addDocuments(require(file)))
    const updates = await Promise.all(addDocs)
    logResult({ files, uid })

    return updates
  } catch (e) {
    throw e
  }
}

module.exports = { json2Meili }
