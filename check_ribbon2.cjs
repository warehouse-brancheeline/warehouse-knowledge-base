const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');
const start = code.indexOf('id="editorRibbon"');
const end = code.indexOf('{/* --- ARTICLE CORE META INPUTS');
const snippet = code.substring(start, end);
const lines = snippet.split('\n').filter(l => l.includes('className="flex'));
console.log(lines.join('\n'));
