const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');

const s1 = code.indexOf('{selectedArticle ? (');
const s2 = code.indexOf('          ) : (\n            <div className="w-full max-w-6xl mx-auto" id="dashboardState">');

if (s1 !== -1 && s2 !== -1) {
    fs.writeFileSync('editor_block.txt', code.substring(s1, s2));
    console.log("Extracted editor block to editor_block.txt");
} else {
    console.log("Could not find bounds");
}
