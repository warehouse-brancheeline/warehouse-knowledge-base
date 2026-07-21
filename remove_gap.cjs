const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix main padding
code = code.replace(
  '<main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f4f7f9] p-6 md:p-8">',
  '<main className={`flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f4f7f9] ${isEditing ? \'p-0\' : \'p-6 md:p-8\'}`}>'
);

// 2. Fix space-y-4 on wrapper
code = code.replace(
  '<div className={`w-full mx-auto space-y-4 ${isEditing ? "max-w-none" : "max-w-5xl"}`}>',
  '<div className={`w-full mx-auto ${isEditing ? "max-w-none" : "max-w-5xl space-y-4"}`}>'
);

// 3. For good measure, we might want to make sure the dashboard state doesn't look weird if it relies on main padding, 
// but wait, isEditing is false on the dashboard state, so it will still have p-6 md:p-8. That is correct.

// 4. One more thing, if we remove padding from main when isEditing, the canvas and inputs will lack padding!
// Let's check where the canvas and inputs are.
// <div className="flex-1 min-w-0 flex flex-col items-center w-full bg-[#f4f7f9] p-4 sm:p-8 space-y-6">
// Yes, they already have their own padding! `p-4 sm:p-8`. So it's fine.

fs.writeFileSync('src/App.tsx', code);
console.log("Removed gap successfully.");
