const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

let startIdx = code.indexOf(`{/* --- EDITOR RIBBON TOOLBAR (Microsoft Word Style) --- */}`);
let endIdx = code.indexOf(`{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}`);

let section = code.substring(startIdx, endIdx);

// Modify section to make it vertical
section = section.replace(/flex flex-row items-stretch gap-2.5 overflow-x-auto h-\[80px\]/g, 'flex flex-col gap-3 overflow-y-auto max-h-[60vh] custom-scrollbar pr-1');
section = section.replace(/border-r border-slate-200 min-w-max h-full/g, 'border-b border-slate-200 pb-3 min-w-full h-auto');
section = section.replace(/<div className="flex items-center gap-1.5 h-7">/g, '<div className="flex flex-wrap items-center gap-1.5 h-auto">');
section = section.replace(/text-center mt-0.5/g, 'text-left mt-2');
section = section.replace(/<div className="flex flex-wrap items-center gap-1">/g, '<div className="flex flex-col gap-2">');
section = section.replace(/<div className="formatting-ribbon p-2.5 space-y-2 print:hidden" id="editorRibbon">/, '<div className="formatting-ribbon p-3 space-y-3 flex flex-col w-full" id="editorRibbon">');

let replacement = `
              <div className="flex flex-col xl:flex-row gap-6 items-start relative w-full">
                
                {/* --- EDITOR RIBBON TOOLBAR (LEFT SIDEBAR) --- */}
                <div className="w-full xl:w-[260px] shrink-0 print:hidden sticky top-6 z-30 flex flex-col gap-3 transition-all">
                  ` + section.substring(0, section.indexOf(`{/* --- ARTICLE CORE META INPUTS`)).trim() + `
                </div>
                
                <div className="flex-1 min-w-0 space-y-4 w-full">
                  ` + section.substring(section.indexOf(`{/* --- ARTICLE CORE META INPUTS`)).trim() + `
`;

code = code.substring(0, startIdx) + replacement + "\n" + code.substring(endIdx);

// We need to close the div we opened!
// We opened <div className="flex flex-col xl:flex-row gap-6 items-start relative w-full">
// It contains the toolbar div and the flex-1 document div.
// The document div ends after the canvas sheet.
let canvasEndMarker = `</div>
          ) : (
            <div className="w-full max-w-6xl mx-auto" id="dashboardState">`;

let canvasEndIdx = code.indexOf(canvasEndMarker);
if(canvasEndIdx !== -1) {
    code = code.substring(0, canvasEndIdx) + `  </div>\n              </div>\n` + code.substring(canvasEndIdx);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Success");
} else {
    console.log("Could not find end marker");
}
