const fs = require('fs');
const logFile = './message.log';

console.log(`Watching for file changes on ${logFile}`);

fs.watch(logFile, (curr, prev) => {
  console.log(`${logFile} file Changed`);
});

/*
fs.watchFile(logFile, { interval: 1000 }, (curr, prev) => {
  console.log(`${logFile} file Changed`);
});
*/