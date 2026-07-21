const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts.json', 'utf8'));
console.log(parts.canvasSheet.includes("DOCUMENT CANVAS SHEET"));
