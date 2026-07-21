const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Wrap the ribbon and document in a flex container
let startIdx = code.indexOf(`{/* --- EDITOR RIBBON TOOLBAR (Microsoft Word Style) --- */}`);
let endIdx = code.indexOf(`{/* --- DOCUMENT CANVAS SHEET (Word/Google Docs style) --- */}`);

let section = code.substring(startIdx, endIdx);

// Modify section to make it vertical
// Replace horizontal layout classes
section = section.replace(/flex flex-row items-stretch gap-2.5 overflow-x-auto h-\[80px\]/g, 'flex flex-col gap-3 overflow-y-auto max-h-[60vh] custom-scrollbar pr-1');
// Change border-r to border-b in image groups
section = section.replace(/border-r border-slate-200 min-w-max h-full/g, 'border-b border-slate-200 pb-3 min-w-full h-auto');
// Change h-7 to h-auto flex-wrap
section = section.replace(/<div className="flex items-center gap-1.5 h-7">/g, '<div className="flex flex-wrap items-center gap-1.5 h-auto">');
section = section.replace(/text-center mt-0.5/g, 'text-left mt-2');
// Change Text formatting flex-wrap to flex-col
section = section.replace(/<div className="flex flex-wrap items-center gap-1">/g, '<div className="flex flex-col gap-2">');

// Wrap it in the layout container
let replacement = `
              <div className="flex flex-col xl:flex-row gap-6 items-start relative w-full">
                
                {/* --- EDITOR RIBBON TOOLBAR (Microsoft Word Style) --- */}
                <div className="w-full xl:w-[260px] shrink-0 print:hidden sticky top-6 z-30 flex flex-col gap-3">
                  ` + section.replace(/<div className="formatting-ribbon p-2.5 space-y-2 print:hidden" id="editorRibbon">/, '<div className="formatting-ribbon p-3 space-y-3 flex flex-col" id="editorRibbon">') + `
                </div>
                
                <div className="flex-1 min-w-0 space-y-4 w-full">
`;

code = code.substring(0, startIdx) + replacement + code.substring(endIdx);

// We need to close the div we opened!
// Find the end of DOCUMENT CANVAS SHEET
let canvasEndIdx = code.indexOf(`</div>`, code.indexOf(`className="document-page relative p-12 custom-scrollbar transition-transform duration-200"`));
// The document-page is a div. We need to find its matching closing tag.
// Actually, it's easier to just do it via a simple script.
