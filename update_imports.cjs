const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
const match = code.match(importRegex);
if (match) {
    let imports = match[1];
    const newIcons = [
        'ClipboardPaste', 'Scissors', 'Superscript', 'Subscript', 'Baseline', 
        'Indent', 'Outdent', 'Eraser', 'Shapes', 'Smile', 'QrCode', 'Minus',
        'Type', 'PenTool', 'Stamp', 'Square', 'Layout', 'Moon', 'ZoomIn', 
        'Maximize', 'Ruler', 'Grid', 'Maximize2', 'List as ListIcon', 'Copy as CopyIcon', 
        'Printer', 'Crop', 'RotateCw', 'Box', 'Droplet', 'Circle', 'ArrowUp', 
        'ArrowDown', 'MousePointer2'
    ];
    
    newIcons.forEach(icon => {
        if (!imports.includes(icon)) {
            imports += `, ${icon}`;
        }
    });
    
    code = code.replace(importRegex, `import { ${imports} } from 'lucide-react';`);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Imports updated!");
}
