const fs = require('fs');
const code = fs.readFileSync('editor_block.txt', 'utf8');
let s6 = code.indexOf('          ) : (');
console.log(s6);
