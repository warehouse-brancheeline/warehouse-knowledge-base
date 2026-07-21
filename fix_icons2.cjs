const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
const match = code.match(importRegex);
if (match) {
    let imports = match[1];
    
    // Just force append them explicitly
    const toAdd = ['Undo', 'Redo', 'Square', 'Maximize', 'PaintBucket'];
    
    let parts = imports.split(',').map(x => x.trim());
    toAdd.forEach(icon => {
        if (!parts.includes(icon)) {
            parts.push(icon);
        }
    });
    
    code = code.replace(importRegex, `import { ${parts.join(', ')} } from 'lucide-react';`);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Imports properly updated!");
}
