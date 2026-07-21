const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');

const editorStart = code.indexOf('<div className="relative flex w-full">');
const inputsStart = code.indexOf('{/* --- ARTICLE CORE META INPUTS (MOVED OUT OF RIBBON) --- */}');

if (editorStart !== -1 && inputsStart !== -1) {
    console.log(code.substring(editorStart, inputsStart));
}
