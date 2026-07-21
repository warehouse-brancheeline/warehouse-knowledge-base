const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');

const start = code.indexOf('id="editorRibbon"');
const end = code.indexOf('{/* --- ARTICLE CORE META INPUTS');
console.log(code.substring(start, start + 1000));
