const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts.json', 'utf8'));

// The raw pieces from parts.json are untouched.
// backBtn: {!isEditing && ( ... )}
// actionControls: {/* Action ... */} ... </div>
// inputs: {/* ... */} ... </div>
// canvasSheet: {/* ... */} ... (but with some divs maybe trailing). Let's use the untouched parts.json!

// Wait, the canvasSheet in parts.json originally contained the trailing </div>s of the whole wrapper!
let originalCanvasSheet = parts.canvasSheet;
// Let's print the last 200 chars of originalCanvasSheet.
console.log(originalCanvasSheet.substring(originalCanvasSheet.length - 200));

