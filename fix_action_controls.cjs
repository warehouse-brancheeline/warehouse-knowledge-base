const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const s1 = code.indexOf('{!isEditing ? (');
const s2 = code.indexOf('                  ) : (\n                    <div className="flex items-center space-x-3 w-full justify-between sm:justify-end">');
if (s1 !== -1 && s2 !== -1) {
    const s3 = code.indexOf('                    </div>\n                  )}', s2);
    if (s3 !== -1) {
        let blockToReplace = code.substring(s1, s3 + '                    </div>\n                  )}'.length);
        
        let newBlock = blockToReplace.replace('{!isEditing ? (', '{!isEditing && (');
        // Now strip everything from `) : (` to the end.
        let newEnd = newBlock.indexOf('                  ) : (');
        newBlock = newBlock.substring(0, newEnd) + '                  )}';
        
        code = code.replace(blockToReplace, newBlock);
        fs.writeFileSync('src/App.tsx', code);
        console.log("Fixed Action Controls block");
    } else {
        console.log("Could not find s3");
    }
} else {
    console.log("Could not find s1 or s2");
}
