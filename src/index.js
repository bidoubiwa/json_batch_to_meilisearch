const { json2Meili } = require('./add_to_meili.js')
const { waitForTasks } = require('./wait_for_tasks.js')
const { meiliSettings } = require('./update_settings.js')

module.exports = {
  json2Meili,
  waitForTasks,
  meiliSettings
}
