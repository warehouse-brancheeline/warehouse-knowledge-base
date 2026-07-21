const fs = require('fs');
const code = fs.readFileSync('editor_block.txt', 'utf8');
const s6 = code.indexOf('          ) : (\n            <div className="w-full max-w-6xl mx-auto" id="dashboardState">');
console.log(s6);
