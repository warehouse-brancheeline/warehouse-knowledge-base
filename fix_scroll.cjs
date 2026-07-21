const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change root container from min-h-screen to h-screen overflow-hidden
code = code.replace(
  '<div className="min-h-screen flex flex-col bg-slate-50 text-slate-800" id="mainContainer">',
  '<div className="h-screen flex flex-col bg-slate-50 text-slate-800 overflow-hidden" id="mainContainer">'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed root scrolling");
