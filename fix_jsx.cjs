const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace('{!isEditing && (\n{/* Action Controls Header Bar */}', '{!isEditing && (\n<>\n{/* Action Controls Header Bar */}');
code = code.replace('                    </>\n                  )}\n                </div>\n              </div>\n              )}', '                    </>\n                  )}\n                </div>\n              </div>\n              </>\n              )}');
fs.writeFileSync('src/App.tsx', code);
