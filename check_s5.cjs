const fs = require('fs');
const code = fs.readFileSync('editor_block.txt', 'utf8');
let s5 = code.indexOf('{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}');
console.log(s5);
