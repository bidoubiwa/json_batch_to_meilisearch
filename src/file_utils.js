const fs = require('fs')
const path = require('path')

function resolvePath (jsonPath) {
  return path.resolve(process.cwd(), jsonPath)
}

function requireJson(jsonPath) {
  try {
    const realPath = resolvePath(jsonPath);
    const file = require(realPath);
    return file
  } catch(e) {
    throw new Error('Settings file was not found')
  }
}

function fetchFilesName (jsonPath) {
  const stats = fs.lstatSync(jsonPath)
  if (path.extname(jsonPath) === '.json') {
    return [jsonPath]
  } else if (stats.isDirectory()) {
    return fs.readdirSync(jsonPath).filter(file => path.extname(file) === '.json').map(file => path.resolve(jsonPath, file));
  } else {
    throw new Error('No json found at path')
  }
}

function fileList (jsonPath) {
  const realPath = resolvePath(jsonPath)
  const files = fetchFilesName(realPath)
  return files
}

module.exports = {
  resolvePath,
  fetchFilesName,
  fileList,
  requireJson
}
