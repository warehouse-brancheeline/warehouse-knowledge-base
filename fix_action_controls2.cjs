const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const s1 = code.indexOf('                  ) : (\n                    <div className="flex items-center space-x-3 w-full justify-between sm:justify-end">');
if (s1 !== -1) {
    const s2 = code.indexOf('                    </div>\n                  )}', s1);
    if (s2 !== -1) {
        let blockToReplace = code.substring(s1, s2 + '                    </div>\n                  )}'.length);
        code = code.replace(blockToReplace, '                  )}');
        fs.writeFileSync('src/App.tsx', code);
        console.log("Fixed Action Controls block");
    } else {
        console.log("Could not find s2");
    }
} else {
    console.log("Could not find s1");
}
