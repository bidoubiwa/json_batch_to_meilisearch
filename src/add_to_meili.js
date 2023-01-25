const { fileList } = require('./file_utils')
const { logResult } = require('./logs')

async function json2Meili ({
  index,
  jsonPath,
  primaryKey,
  deleteIndex = false
}) {
  try {
    const files = fileList(jsonPath)
    const options = {}

    if (deleteIndex) {
      await index.delete()
    }

    if (primaryKey) {
      options.primaryKey = primaryKey
    }

    const addDocuments = files.map(async file => index.addDocuments(require(file), options))
    const tasks = await Promise.all(addDocuments)

    logResult({ files, uid: index.uid })

    return tasks
  } catch (e) {
    throw e
  }
}

module.exports = { json2Meili }
