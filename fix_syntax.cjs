const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

let badBlock = `                    </>
                  )}
                </div>
              </div>
              )}
              </div>

              <div className="relative flex w-full flex-col">`;

let goodBlock = `                    </>
                  )}
                </div>
              </div>
              )}

              <div className="relative flex w-full flex-col">`;

code = code.replace(badBlock, goodBlock);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed syntax.");
