const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const navStart = code.indexOf('{/* --- Navigation Tabs --- */}');
const layoutStart = code.indexOf('{/* --- Main Structural Workspace Layout --- */}');

let snippet = code.substring(navStart, layoutStart);

code = code.replace(snippet, '{!isEditing && (\n      ' + snippet.trim().replace(/\n/g, '\n      ') + '\n      )}\n\n      ');

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
