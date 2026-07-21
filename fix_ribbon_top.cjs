const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'top-[113px] h-[calc(100vh-113px)]',
  'top-[64px] h-[calc(100vh-64px)]'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Success");
