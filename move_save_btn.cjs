const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// We need to find the `isEditing` block in Action Controls and remove it.
const actionControlsStart = code.indexOf('{!isEditing ? (');
const actionControlsEnd = code.indexOf(')}', code.indexOf('Selesai &amp; Simpan')) + 2;

// The block to replace is:
/*
                  {!isEditing ? (
                    <>
                      ...
                    </>
                  ) : (
                    <div className="flex items-center space-x-3 w-full justify-between sm:justify-end">
                      ...
                      <button
                        onClick={handleSaveAndClose}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold py-2 px-5 rounded-xl flex items-center space-x-1.5 transition-all shadow-md"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Selesai &amp; Simpan</span>
                      </button>
                    </div>
                  )}
*/

let actionControlsBlock = code.substring(actionControlsStart, actionControlsEnd);

// Rewrite actionControlsBlock to just:
//                  {!isEditing && (
//                    <>
//                      ...
//                    </>
//                  )}
let newActionControlsBlock = actionControlsBlock
  .replace('{!isEditing ? (', '{!isEditing && (')
  .replace(/\) : \(\s*<div className="flex items-center space-x-3 w-full justify-between sm:justify-end">[\s\S]*?<\/div>\s*\)$/, ')}');

code = code.replace(actionControlsBlock, newActionControlsBlock);

// Now find the header buttons:
const headerButtonsStart = code.indexOf('<button\n                id="newArticleBtn"');
const headerButtonsEnd = code.indexOf('</button>\n            </>', headerButtonsStart) + 9;

const headerButtonsBlock = code.substring(headerButtonsStart, headerButtonsEnd);

// We want to insert the autosave and save button before Tambah Artikel, or replace Tambah Artikel when isEditing.
// Actually, Tambah Artikel should probably be hidden when isEditing, or maybe kept? 
// User wants it aligned with Logout.
// Let's replace the header buttons with:
/*
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium flex items-center text-slate-400">
                    {autosaveStatus === 'saving' && (
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping mr-1.5"></span>
                        Menyimpan draf...
                      </span>
                    )}
                    {autosaveStatus === 'saved' && (
                      <span className="text-emerald-400 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Tersimpan
                      </span>
                    )}
                    {autosaveStatus === 'idle' && (
                      <span className="flex items-center text-slate-400">
                        <Save className="h-4 w-4 mr-1" />
                        Autosave
                      </span>
                    )}
                  </span>
                  <button
                    onClick={handleSaveAndClose}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                  >
                    <Check className="h-4 w-4" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                </div>
              ) : (
                <button
                  id="newArticleBtn"
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Artikel</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 border border-[#4a658a] hover:bg-[#314a6e] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
*/

const newHeaderButtonsBlock = `
              {isEditing ? (
                <div className="flex items-center gap-3 mr-2">
                  <span className="text-xs font-medium flex items-center text-slate-300">
                    {autosaveStatus === 'saving' && (
                      <span className="flex items-center text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping mr-1.5"></span>
                        Menyimpan draf...
                      </span>
                    )}
                    {autosaveStatus === 'saved' && (
                      <span className="text-emerald-400 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Tersimpan
                      </span>
                    )}
                    {autosaveStatus === 'idle' && (
                      <span className="flex items-center">
                        <Save className="h-4 w-4 mr-1" />
                        Autosave
                      </span>
                    )}
                  </span>
                  <button
                    onClick={handleSaveAndClose}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                  >
                    <Check className="h-4 w-4" />
                    <span>Selesai &amp; Simpan</span>
                  </button>
                </div>
              ) : (
                <button
                  id="newArticleBtn"
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md flex items-center space-x-1.5 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Artikel</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 border border-[#4a658a] hover:bg-[#314a6e] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
`;

code = code.replace(headerButtonsBlock, newHeaderButtonsBlock.trim());

fs.writeFileSync('src/App.tsx', code);
console.log("Moved button successfully.");
