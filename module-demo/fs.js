const process = require('process');
const fs = require('fs');

process.on('exit', (code) => {
  console.log(`exit: About to exit with code: ${code}`);
});

process.on('beforeExit', (code) => {
  console.log(`beforeExit: About to exit with code: ${code}`);
});

process.on('disconnect', (code) => {
  console.log(`disconnect: About to exit with code: ${code}`);
});

process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

var somePromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
});

setTimeout(() => {
  console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');

somePromise.then((res) => {
  return JSON.pasre(res); // Note the typo (`pasre`)
}); // No `.catch()` or `.then()`


