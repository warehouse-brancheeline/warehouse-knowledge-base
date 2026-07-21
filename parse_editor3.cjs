const fs = require('fs');
const code = fs.readFileSync('editor_block.txt', 'utf8');

const s1 = code.indexOf('{!isEditing && (');
const s2 = code.indexOf('{/* Action Controls Header Bar */}');
const backBtn = code.substring(s1, s2).trim();

const s3 = code.indexOf('<div className="relative flex w-full">');
const actionControls = code.substring(s2, s3).trim();

const s4 = code.indexOf('{/* --- ARTICLE CORE META INPUTS (MOVED OUT OF RIBBON) --- */}');
const s5 = code.indexOf('{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}');
const inputs = code.substring(s4, s5).trim();

let canvasSheet = code.substring(s5).trim();

// Strip exactly 3 trailing </div>s
let idx = canvasSheet.length;
for (let i = 0; i < 3; i++) {
    idx = canvasSheet.lastIndexOf('</div>', idx - 1);
}
canvasSheet = canvasSheet.substring(0, idx).trim();

fs.writeFileSync('parts_fixed.json', JSON.stringify({
    backBtn, actionControls, inputs, canvasSheet
}, null, 2));
console.log("Fixed parts extracted");
