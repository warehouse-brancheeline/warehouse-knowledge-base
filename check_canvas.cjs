const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts.json', 'utf8'));
console.log("Canvas sheet ends with:");
console.log(parts.canvasSheet.substring(parts.canvasSheet.length - 200));
