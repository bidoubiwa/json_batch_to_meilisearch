#!/usr/bin/env node
const { Command } = require('commander')
const { json2Meili, waitForTasks, meiliSettings } = require('./index.js')
const { meilisearchClient } = require('./client.js')

const program = new Command()
program
  .requiredOption('-p, --path <path>', 'Path to directory or to json file')
  .option('-u, --meili-index <uid>', 'Name of the index in which the json will be added', 'my_index')
  .option('-m, --meili-address <address>', 'MeiliSearch address to server', 'http://localhost:7700')
  .option('-k, --meili-api-key <key>', 'MeiliSearch address to server', "masterkey")
  .option('-K, --meili-primary-key <key>', 'The name of the unique field in each document')
  .option('-d, --delete-index', 'Delete index before adding the new files', false)
  .option('-t, --track-tasks', 'Track meilisearch tasks', true)
  .option('-s, --settings-path <path>', 'Path to json file containing settings')
  .version('0.1.0')
  .description('Indexes json files into meilisearch')

program.parse(process.argv)
;(async () => {
  const {
    meiliIndex, path, meiliAddress, meiliApiKey, deleteIndex, trackTasks, meiliPrimaryKey, settingsPath
  } = program
  const client = meilisearchClient({ host: meiliAddress, apiKey: meiliApiKey })
  const index = client.index(meiliIndex)
  const tasks = await json2Meili({
    index,
    jsonPath: path,
    primaryKey: meiliPrimaryKey,
    deleteIndex,
  })
  if (settingsPath){
    const task = await meiliSettings({ index, settingsPath })
    tasks.push(task)
  }
  if (trackTasks) {
    await waitForTasks({ client, tasks })
    console.log('done');
  }

})()
