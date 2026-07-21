const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const s1 = code.indexOf('{/* Action Controls Header Bar */}');
if (s1 !== -1) {
    const s2 = code.indexOf('              </div>\n              </div>\n\n              <div className="relative flex w-full flex-col">');
    if (s2 !== -1) {
        let blockToReplace = code.substring(s1, s2 + '              </div>'.length);
        
        let newBlock = '{!isEditing && (\n' + blockToReplace + '\n              )}';
        code = code.replace(blockToReplace, newBlock);
        fs.writeFileSync('src/App.tsx', code);
        console.log("Fixed Action Controls Header Bar visibility");
    } else {
        console.log("Could not find s2");
    }
} else {
    console.log("Could not find s1");
}
