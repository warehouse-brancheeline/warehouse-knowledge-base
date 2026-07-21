const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts.json', 'utf8'));
console.log(parts.inputs.substring(parts.inputs.length - 100));
console.log(parts.inputs.includes("DOCUMENT CANVAS SHEET"));
