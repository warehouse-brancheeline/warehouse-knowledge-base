const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
const match = code.match(importRegex);
if (match) {
    let imports = match[1];
    const newIcons = ['Undo', 'Redo', 'PaintBucket'];
    
    newIcons.forEach(icon => {
        if (!imports.includes(icon)) {
            imports += `, ${icon}`;
        }
    });
    
    code = code.replace(importRegex, `import { ${imports} } from 'lucide-react';`);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Imports updated!");
}
