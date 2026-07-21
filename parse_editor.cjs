const fs = require('fs');
const code = fs.readFileSync('editor_block.txt', 'utf8');

// The Back button starts at the beginning (after the opening div)
let s1 = code.indexOf('{!isEditing && (');
let s2 = code.indexOf('{/* Action Controls Header Bar */}');
let backBtn = code.substring(s1, s2).trim();

// Action Controls
let s3 = code.indexOf('<div className="relative flex w-full">');
let actionControls = code.substring(s2, s3).trim();

// Inputs
let s4 = code.indexOf('{/* --- ARTICLE CORE META INPUTS (MOVED OUT OF RIBBON) --- */}');
let s5 = code.indexOf('{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}');
let inputs = code.substring(s4, s5).trim();

// Canvas
let s6 = code.indexOf('          ) : ('); // The end of the selectedArticle true branch
// Wait, the canvas ends just before the end of the `selectedArticle` branch.
// We need to carefully find the end of the canvas.
// The canvas is wrapped in `<div className="flex justify-center ...">` and then `</div>`
// Let's just find the end of the canvas manually.
let canvasEnd = code.lastIndexOf('</div>', code.lastIndexOf('</div>', s6 - 1) - 1); 
// Actually, it's easier to find the `document-page` element and find its matching closing div.
let documentStart = code.indexOf('<div className="document-page relative p-12');
let canvasSheet = code.substring(s5, s6).trim();

// Since there's some extra closing divs, let's just use substring and clean it up later if needed.

fs.writeFileSync('parts.json', JSON.stringify({
    backBtn, actionControls, inputs, canvasSheet
}, null, 2));
console.log("Parts extracted");
