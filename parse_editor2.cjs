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

// find the correct s6
// We want the end of the selectedArticle branch, which is:
//           ) : (
//             <div className="w-full max-w-6xl mx-auto" id="dashboardState">
const s6 = code.indexOf('          ) : (\n            <div className="w-full max-w-6xl mx-auto" id="dashboardState">');
let canvasSheet = code.substring(s5, s6).trim();

// canvasSheet ends with a bunch of </div>s. We need to strip EXACTLY the closing divs of the wrappers.
// wrappers were:
// <div className={`flex-1 min-w-0 space-y-4 w-full transition-all ${isEditing ? "ml-[280px]" : ""}`}>
// <div className="relative flex w-full">
// <div className={`w-full mx-auto space-y-4 ${isEditing ? "max-w-none px-4" : "max-w-5xl"}`}>
// So that's 3 closing divs to strip. Let's find the last 3 closing divs.
let idx = canvasSheet.length;
for (let i = 0; i < 3; i++) {
    idx = canvasSheet.lastIndexOf('</div>', idx - 1);
}
canvasSheet = canvasSheet.substring(0, idx).trim();

fs.writeFileSync('parts_fixed.json', JSON.stringify({
    backBtn, actionControls, inputs, canvasSheet
}, null, 2));
console.log("Fixed parts extracted");
