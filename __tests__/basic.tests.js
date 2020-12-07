const { json2Meili, meiliUpdates } = require('../src/index.js')
const { clearAllIndexes, defaultConfig } = require('./utils')
const MeiliSearch = require('meilisearch')
const client = new MeiliSearch(defaultConfig)


const books = require('./assets/books.json')

beforeAll(async () => {
 await clearAllIndexes()
});

test('Basic default usage', async () => {
  const updates = await json2Meili({
    jsonPath: './__tests__/assets',
    meiliApiKey: 'masterKey'
  })
  await client.getIndex('my_index').waitForPendingUpdate(0)
  const docs = await client.getIndex('my_index').getDocuments()
  expect(docs.length).toBe(books.length)
})

test('test custom address', async () => {
  try {
    const updates = await json2Meili({
      jsonPath: './__tests__/assets',
      meiliAddress: 'http://localhost:7701',
      meiliApiKey: 'masterKey'
    })
  } catch(e) {
    expect(e.type).toBe('MeiliSearchApiError');
  }
})

test('test custom address', async () => {
  try {
    const updates = await json2Meili({
      jsonPath: './__tests__/assets',
      meiliAddress: 'http://localhost:7701',
      meiliApiKey: 'masterKey'
    })
  } catch(e) {
    expect(e.type).toBe('MeiliSearchApiError');
  }
})

test('Test delete option', async () => {
  const updates = await json2Meili({
    jsonPath: './__tests__/assets',
    meiliApiKey: 'masterKey',
    deleteIndex: true
  })
  expect(updates.length).toBe(1)
  await client.getIndex('my_index').waitForPendingUpdate(0)
  const docs = await client.getIndex('my_index').getDocuments()
  expect(docs.length).toBe(books.length)
})

test('Test custom uid', async () => {
  const updates = await json2Meili({
    uid: 'books',
    jsonPath: './__tests__/assets',
    meiliApiKey: 'masterKey',
    deleteIndex: true
  })
  expect(updates.length).toBe(1)
  await client.getIndex('books').waitForPendingUpdate(0)
  const docs = await client.getIndex('books').getDocuments()
  expect(docs.length).toBe(books.length)
})
