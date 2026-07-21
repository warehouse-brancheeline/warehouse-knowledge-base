const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// When editing, we might want max-w-full instead of max-w-5xl mx-auto
code = code.replace('<div className="w-full max-w-5xl mx-auto space-y-4">', '<div className={`w-full mx-auto space-y-4 ${isEditing ? "max-w-none px-4" : "max-w-5xl"}`}>');

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
