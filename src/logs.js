
function logResult({files, uid}){
  if (files.length === 1) console.log(`One file has been added to the following index in MeiliSearch: ${uid}`);
  else if (files.length === 0) console.log(`No file have been added as no json file was found.`);
  else console.log(`${files.length} files has been added to the following index in MeiliSearch: ${uid}`);
}

module.exports = { logResult }
