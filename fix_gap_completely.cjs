const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix top-[64px] to top-0
code = code.replace('top-[64px]', 'top-0');

// 2. Hide the whole div for action controls if isEditing
// We currently have:
// <div className={`px-4 ${isEditing ? 'max-w-[1200px] mx-auto w-full' : ''}`}>
// {!isEditing && (
// <>
// {/* Action Controls Header Bar */}

// Let's replace it with:
// {!isEditing && (
//   <div className="px-4">
//     {/* Action Controls Header Bar */}

let actionHeaderStart = code.indexOf('<div className={`px-4 ${isEditing ? \'max-w-[1200px] mx-auto w-full\' : \'\'}`}>');
if (actionHeaderStart !== -1) {
    let oldPrefix = '<div className={`px-4 ${isEditing ? \'max-w-[1200px] mx-auto w-full\' : \'\'}`}>\n                 {!isEditing && (\n<>\n{/* Action Controls Header Bar */}';
    if (code.includes(oldPrefix)) {
        let newPrefix = '{!isEditing && (\n<div className="px-4">\n{/* Action Controls Header Bar */}';
        code = code.replace(oldPrefix, newPrefix);
        
        let oldSuffix = '              </div>\n              </>\n              )}';
        let newSuffix = '              </div>\n              )}';
        code = code.replace(oldSuffix, newSuffix);
    }
}

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed all gaps completely.");
