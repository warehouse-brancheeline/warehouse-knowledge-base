const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The activeRibbonTab === 'text' branch might still have some old classes.
code = code.replace(/className="flex flex-col justify-between px-2.5 border-r border-slate-200 min-w-\[160px\] h-full"/g, 'className="flex flex-col justify-between px-2.5 border-b border-slate-200 pb-3 min-w-full h-auto"');
code = code.replace(/className="flex flex-col justify-between pl-2.5 min-w-max h-full ml-auto"/g, 'className="flex flex-col justify-between pl-2.5 min-w-full h-auto"');
code = code.replace(/<div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">/g, '<div className="flex flex-wrap items-center bg-slate-100 rounded-lg p-0.5 gap-0.5 mb-1">');

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
