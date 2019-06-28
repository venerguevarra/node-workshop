const fs = require('fs');

let buff = fs.readFileSync('node.png');
let base64data = buff.toString('base64');

console.log('Image converted to base 64 is:\n\n' + base64data);