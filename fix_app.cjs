const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts.json', 'utf8'));

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace('{parts.inputs}', parts.inputs);
appCode = appCode.replace('{canvasSheet}', parts.canvasSheet);

fs.writeFileSync('src/App.tsx', appCode);
console.log("Fixed parts");
