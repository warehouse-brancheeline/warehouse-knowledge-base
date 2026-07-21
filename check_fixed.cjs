const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts_fixed.json', 'utf8'));

console.log("Canvas starts with:");
console.log(parts.canvasSheet.substring(0, 100));

console.log("\nCanvas ends with:");
console.log(parts.canvasSheet.substring(parts.canvasSheet.length - 200));
