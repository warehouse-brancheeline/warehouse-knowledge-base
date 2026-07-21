const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');

const s1 = code.indexOf('{/* Action Controls Header Bar */}');
const s2 = code.indexOf('{/* --- EDITOR RIBBON TOOLBAR (LEFT SIDEBAR) --- */}');
const s3 = code.indexOf('{/* --- ARTICLE CORE META INPUTS (MOVED OUT OF RIBBON) --- */}');
const s4 = code.indexOf('{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}');

console.log("Action Controls:", s1);
console.log("Ribbon Sidebar:", s2);
console.log("Inputs:", s3);
console.log("Canvas:", s4);

