const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the editor wrapper
let wrapperStart = code.indexOf('<div className="flex flex-col xl:flex-row gap-6 items-start relative w-full">');
if (wrapperStart !== -1) {
    code = code.replace('<div className="flex flex-col xl:flex-row gap-6 items-start relative w-full">', '<div className="relative flex w-full">');
}

// Find the toolbar
let toolbarRegex = /<div className="formatting-ribbon w-full xl:w-\[260px\] shrink-0 p-4 print:hidden sticky top-6 z-30 flex flex-col gap-3 transition-all" id="editorRibbon">/g;
code = code.replace(toolbarRegex, '<div className="formatting-ribbon fixed left-0 top-[113px] h-[calc(100vh-113px)] w-[280px] bg-white border-r border-slate-200 p-5 print:hidden z-40 overflow-y-auto flex flex-col gap-4 shadow-sm" id="editorRibbon">');

// Find the content div
let contentDivRegex = /<div className="flex-1 min-w-0 space-y-4 w-full">/g;
code = code.replace(contentDivRegex, '<div className={`flex-1 min-w-0 space-y-4 w-full transition-all ${isEditing ? "ml-[280px]" : ""}`}>');

// Remove some rounded corners or adjust borders if needed inside toolbar? We keep it as is.
fs.writeFileSync('src/App.tsx', code);
console.log("Success");
