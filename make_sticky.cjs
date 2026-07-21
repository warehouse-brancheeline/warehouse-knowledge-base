const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. main
code = code.replace(
  '<main className={`flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f4f7f9] ${isEditing ? \'p-0\' : \'p-6 md:p-8\'}`}>',
  '<main className={`flex-1 flex flex-col min-w-0 bg-[#f4f7f9] ${isEditing ? \'p-0 overflow-hidden\' : \'p-6 md:p-8 overflow-y-auto\'}`}>'
);

// 2. wrapper div
code = code.replace(
  '<div className={`w-full mx-auto ${isEditing ? "max-w-none" : "max-w-5xl space-y-4"}`}>',
  '<div className={`w-full mx-auto ${isEditing ? "max-w-none h-full flex flex-col overflow-hidden" : "max-w-5xl space-y-4"}`}>'
);

// 3. relative flex
code = code.replace(
  '<div className="relative flex w-full flex-col">',
  '<div className={`relative flex w-full flex-col ${isEditing ? \'flex-1 overflow-hidden\' : \'\'}`}>'
);

// 4. ribbon
code = code.replace(
  '<div className="w-full bg-[#f3f4f6] print:hidden sticky top-0 z-40 shadow-md border-b border-slate-300" id="editorRibbon">',
  '<div className="w-full bg-[#f3f4f6] print:hidden z-40 shadow-md border-b border-slate-300 shrink-0" id="editorRibbon">'
);

// 5. editor area
code = code.replace(
  '<div className="flex-1 min-w-0 flex flex-col items-center w-full bg-[#f4f7f9] p-4 sm:p-8 space-y-6">',
  '<div className={`flex-1 min-w-0 flex flex-col items-center w-full bg-[#f4f7f9] ${isEditing ? \'p-4 sm:p-8 overflow-y-auto\' : \'p-4 sm:p-8 space-y-6\'}`}>'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Made ribbon fixed and editor scrollable.");
