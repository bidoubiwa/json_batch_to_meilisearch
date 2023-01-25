function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForTasks ({ client, tasks }) {

  const SLEEP_DURATION = 1000
  let allDone = false
  const taskUids = tasks.map(task => task.taskUid)
  const taskStatusses = {}
  console.log('Start tasks watch')
  console.log('-------------')
  while (!allDone) {
    try {
      taskStatusses.succeeded = await client.getTasks({ uids: taskUids, statuses: ['succeeded'] })
      taskStatusses.failed = await client.getTasks({ uids: taskUids, statuses: ['failed'] })
      taskStatusses.enqueued = await client.getTasks({ uids: taskUids, statuses: ['enqueued', 'processing'] })

      console.log(`${taskStatusses.enqueued.results.length} / ${tasks.length} tasks are still in progress`)
      console.log(`${taskStatusses.failed.results.length} / ${tasks.length} tasks have failed`)
      console.log(`${taskStatusses.succeeded.results.length} / ${tasks.length} tasks have been succesfully added`)
      console.log('-------------')
      if (taskStatusses.enqueued.results.length === 0) allDone = true
      await sleep(SLEEP_DURATION)
    } catch (e) {
      console.error(e)
    }
  }

  console.log('No tasks left in the queue, final report:')
  console.log(`failed to upload: ${taskStatusses.failed.results.length}`)
  console.log(`succeeded to upload: ${taskStatusses.succeeded.results.length}`)
}

module.exports = {
  waitForTasks
}
