let path = require('path');
let exec = require('child_process').exec;
const { clearAllIndexes, defaultConfig } = require('./utils')
const MeiliSearch = require('meilisearch')
const client = new MeiliSearch(defaultConfig)
const books = require('./assets/books.json')


test('Test basic usage with only path and api key', async () => {
  let result = await  cli(['-p', './__tests__/assets', '-k', 'masterKey'], '.');
  expect(result.code).toBe(0);
  expect(result.stderr).toBe("");
  await client.getIndex('my_index').waitForPendingUpdate(0)
  const docs = await client.getIndex('my_index').getDocuments()
  expect(docs.length).toBe(books.length)
})

test('Test with custom uid', async () => {
  let result = await  cli(['-p', './__tests__/assets', '-k', 'masterKey', 'u', 'books'], '.');
  expect(result.code).toBe(0);
  expect(result.stderr).toBe("");
  await client.getIndex('books').waitForPendingUpdate(0)
  const docs = await client.getIndex('books').getDocuments()
  expect(docs.length).toBe(books.length)
})

test('Test deleting index before adding', async () => {
  let result = await  cli(['-p', './__tests__/assets', '-k', 'masterKey', 'u', 'books'], '.');
  expect(result.code).toBe(0);
  expect(result.stderr).toBe("");
  await client.getIndex('books').waitForPendingUpdate(0)
  const docs = await client.getIndex('books').getDocuments()
  expect(docs.length).toBe(books.length)
})

test('Test help', async () => {
  let result = await  cli(['-h'], '.');
  expect(result.code).toBe(0);
  expect(result.stderr).toBe("");
})

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(`node ${path.resolve('./src/cli')} ${args.join(' ')}`,
    { cwd },
    (error, stdout, stderr) => { resolve({
    code: error && error.code && stderr !== "" ? error.code : 0,
    error,
    stdout,
    stderr })
  })
})}
