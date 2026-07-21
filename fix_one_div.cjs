const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The extra div is right before the `) : (`
code = code.replace(/              <\/div>\n            <\/div>\n\n          \) : \(/, '            </div>\n\n          ) : (');
fs.writeFileSync('src/App.tsx', code);
console.log("Fixed extra div");
