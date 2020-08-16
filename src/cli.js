#!/usr/bin/env node
const { Command } = require('commander')
const { json2Meili, meiliUpdates } = require('./index.js')
const program = new Command()
program
  .requiredOption('-p, --path <path>', 'Path to directory or to json file')
  .option('-u, --meili-index <uid>', 'Name of the index in which the json will be added', 'my_index')
  .option('-m, --meili-address <address>', 'MeiliSearch address to server', 'http://localhost:7700')
  .option('-k, --meili-api-key <key>', 'MeiliSearch address to server')
  .option('-K, --meili-primary-key <key>', 'The name of the unique field in each document')
  .option('-d, --delete-index', 'Delete index before adding the new files', false)
  .option('-t, --track-updates', 'Track meilisearch updates', true)
  .version('0.1.0')
  .description('Indexes json files into meilisearch')

program.parse(process.argv)
;(async () => {
  const {
    meiliIndex, path, meiliAddress, meiliApiKey, deleteIndex, trackUpdates, meiliPrimaryKey
  } = program
  await json2Meili({
    uid: meiliIndex,
    jsonPath: path,
    meiliAddress,
    meiliApiKey,
    deleteIndex,
    meiliPrimaryKey
  })
  if (trackUpdates) {
    meiliUpdates({ uid: meiliIndex, meiliAddress, meiliApiKey })
  }
})()