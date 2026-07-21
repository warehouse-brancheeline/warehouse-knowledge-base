const fs = require('fs');
const parts = JSON.parse(fs.readFileSync('parts_fixed.json', 'utf8'));

const ribbonUI = `
                {/* --- HORIZONTAL RIBBON TOOLBAR --- */}
                {isEditing && (
                  <div className="w-full bg-[#f3f4f6] print:hidden sticky top-[64px] z-40 shadow-md border-b border-slate-300" id="editorRibbon">
                    {/* Ribbon Tabs */}
                    <div className="flex px-2 pt-2 gap-0.5 bg-[#f3f4f6] border-b border-slate-300 text-[13px]">
                      {['Home', 'Insert', 'Design', 'View', 'Format'].map(tab => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveRibbonTab(tab)}
                          className={\`px-4 py-1.5 rounded-t-md transition-all z-10 \${
                            activeRibbonTab === tab 
                              ? 'bg-white text-blue-600 border-x border-t border-slate-300 mb-[-1px] font-bold' 
                              : 'text-slate-600 hover:bg-slate-200'
                          }\`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Ribbon Content */}
                    <div className="p-2 bg-white flex items-center gap-3 overflow-x-auto min-h-[90px] custom-scrollbar text-slate-700 text-xs">
                      
                      {activeRibbonTab === 'Home' && (
                        <>
                          {/* Clipboard Group */}
                          <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3 shrink-0">
                             <div className="flex flex-col gap-1">
                               <button className="flex flex-col items-center justify-center p-1 hover:bg-slate-100 rounded" title="Paste (Ctrl+V)"><ClipboardPaste className="h-6 w-6 text-slate-500 mb-1"/><span className="text-[10px]">Paste</span></button>
                             </div>
                             <div className="flex flex-col gap-1 justify-center">
                               <button className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Cut (Ctrl+X)"><Scissors className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Cut</span></button>
                               <button className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded" title="Copy (Ctrl+C)"><CopyIcon className="h-4 w-4 text-slate-500"/><span className="text-[10px]">Copy</span></button>
                             </div>
                          </div>

                          {/* Font Group */}
                          <div className="flex flex-col gap-1 border-r border-slate-200 pr-3 shrink-0">
                            <div className="flex items-center gap-1">
                               <select 
                                 onChange={(e) => executeCommand('fontName', e.target.value)}
                                 className="border border-slate-200 rounded p-1 h-7 text-xs bg-slate-50 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
                               >
                                 <option value="Inter, sans-serif">Inter (Sans)</option>
                                 <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                                 <option value="'Playfair Display', serif">Playfair (Serif)</option>
                                 <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                               </select>
                               <select 
                                 onChange={(e) => executeCommand('fontSize', e.target.value)}
                                 className="border border-slate-200 rounded p-1 h-7 text-xs bg-slate-50 w-16 focus:outline-none focus:ring-1 focus:ring-blue-500"
                               >
                                 <option value="1">10px</option>
                                 <option value="2">13px</option>
                                 <option value="3">16px</option>
                                 <option value="4">18px</option>
                                 <option value="5">24px</option>
                                 <option value="6">32px</option>
                                 <option value="7">48px</option>
                               </select>
                               <button onClick={() => executeCommand('removeFormat')} className="p-1 hover:bg-slate-100 rounded" title="Clear Formatting"><Eraser className="h-4 w-4 text-slate-500" /></button>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                               <button onClick={() => executeCommand('bold')} className="p-1.5 hover:bg-slate-100 rounded" title="Bold (Ctrl+B)"><Bold className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('italic')} className="p-1.5 hover:bg-slate-100 rounded" title="Italic (Ctrl+I)"><Italic className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('underline')} className="p-1.5 hover:bg-slate-100 rounded" title="Underline (Ctrl+U)"><Underline className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('strikeThrough')} className="p-1.5 hover:bg-slate-100 rounded" title="Strikethrough"><Strikethrough className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('subscript')} className="p-1.5 hover:bg-slate-100 rounded" title="Subscript"><Subscript className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('superscript')} className="p-1.5 hover:bg-slate-100 rounded" title="Superscript"><Superscript className="h-3.5 w-3.5" /></button>
                               
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               
                               {/* Colors */}
                               <div className="relative flex items-center gap-0.5">
                                 <button onClick={() => { setShowTextColorPicker(!showTextColorPicker); setShowHighlightColorPicker(false); }} className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Text Color"><Palette className="h-3.5 w-3.5 mr-0.5 text-blue-600" /><ChevronDown className="h-3 w-3" /></button>
                                 {showTextColorPicker && (
                                   <div className="absolute top-8 left-0 bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50">
                                     {['#000000', '#334155', '#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb', '#7c3aed', '#db2777', '#4b5563'].map((color) => (
                                       <button key={color} onClick={() => { executeCommand('foreColor', color); setShowTextColorPicker(false); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} />
                                     ))}
                                   </div>
                                 )}
                                 <button onClick={() => { setShowHighlightColorPicker(!showHighlightColorPicker); setShowTextColorPicker(false); }} className="p-1.5 hover:bg-slate-100 rounded flex items-center" title="Highlight Color"><Highlighter className="h-3.5 w-3.5 mr-0.5 text-yellow-500" /><ChevronDown className="h-3 w-3" /></button>
                                 {showHighlightColorPicker && (
                                   <div className="absolute top-8 left-0 bg-white border border-slate-200 rounded p-2 shadow-xl grid grid-cols-5 gap-1 z-50">
                                     {['transparent', '#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#fef3c7', '#c7d2fe', '#fed7aa', '#e9d5ff', '#ddd6fe'].map((color) => (
                                       <button key={color} onClick={() => { executeCommand('hiliteColor', color); setShowHighlightColorPicker(false); }} className="h-4 w-4 rounded border border-slate-200" style={{ backgroundColor: color }} title={color === 'transparent' ? 'No Highlight' : color} />
                                     ))}
                                   </div>
                                 )}
                               </div>
                            </div>
                          </div>

                          {/* Paragraph Group */}
                          <div className="flex flex-col gap-1 border-r border-slate-200 pr-3 shrink-0">
                            <div className="flex items-center gap-0.5">
                               <button onClick={() => executeCommand('insertUnorderedList')} className="p-1.5 hover:bg-slate-100 rounded"><List className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('insertOrderedList')} className="p-1.5 hover:bg-slate-100 rounded"><ListOrdered className="h-3.5 w-3.5" /></button>
                               <button onClick={insertChecklist} className="p-1.5 hover:bg-slate-100 rounded" title="Checklist"><CheckSquare className="h-3.5 w-3.5" /></button>
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               <button onClick={() => executeCommand('outdent')} className="p-1.5 hover:bg-slate-100 rounded" title="Decrease Indent"><Outdent className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('indent')} className="p-1.5 hover:bg-slate-100 rounded" title="Increase Indent"><Indent className="h-3.5 w-3.5" /></button>
                            </div>
                            <div className="flex items-center gap-0.5 mt-1">
                               <button onClick={() => executeCommand('justifyLeft')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignLeft className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyCenter')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignCenter className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyRight')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignRight className="h-3.5 w-3.5" /></button>
                               <button onClick={() => executeCommand('justifyFull')} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"><AlignJustify className="h-3.5 w-3.5" /></button>
                               <div className="w-px h-4 bg-slate-200 mx-1"></div>
                               <button className="p-1.5 hover:bg-slate-100 rounded" title="Line Spacing"><Baseline className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                          
                          {/* Editing Group */}
                          <div className="flex items-center gap-1 shrink-0 px-2">
                               <button onClick={() => executeCommand('undo')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-500"><Undo className="h-5 w-5 mb-1"/><span className="text-[9px]">Undo</span></button>
                               <button onClick={() => executeCommand('redo')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-500"><Redo className="h-5 w-5 mb-1"/><span className="text-[9px]">Redo</span></button>
                          </div>
                        </>
                      )}

                      {activeRibbonTab === 'Insert' && (
                        <>
                          <div className="flex items-center gap-2 border-r border-slate-200 pr-4 shrink-0">
                             <button onClick={triggerImageUpload} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><ImageIcon className="h-5 w-5 mb-1 text-blue-500"/><span className="text-[10px]">Pictures</span></button>
                             <button onClick={insertTableHTML} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><TableIcon className="h-5 w-5 mb-1 text-indigo-500"/><span className="text-[10px]">Table</span></button>
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Shapes className="h-5 w-5 mb-1 text-emerald-500"/><span className="text-[10px]">Shapes</span></button>
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Smile className="h-5 w-5 mb-1 text-yellow-500"/><span className="text-[10px]">Icons</span></button>
                          </div>
                          <div className="flex items-center gap-2 border-r border-slate-200 pr-4 shrink-0">
                             <button onClick={insertLink} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><LinkIcon className="h-5 w-5 mb-1 text-blue-500"/><span className="text-[10px]">Link</span></button>
                             <button onClick={() => executeCommand('insertHorizontalRule')} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Minus className="h-5 w-5 mb-1 text-slate-500"/><span className="text-[10px]">Divider</span></button>
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><QrCode className="h-5 w-5 mb-1 text-slate-600"/><span className="text-[10px]">QR Code</span></button>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Type className="h-5 w-5 mb-1 text-slate-500"/><span className="text-[10px]">Text Box</span></button>
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><PenTool className="h-5 w-5 mb-1 text-slate-500"/><span className="text-[10px]">Signature</span></button>
                             <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><FileText className="h-5 w-5 mb-1 text-slate-500"/><span className="text-[10px]">Page Break</span></button>
                          </div>
                        </>
                      )}

                      {activeRibbonTab === 'Design' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Palette className="h-6 w-6 mb-1 text-purple-500"/><span className="text-[10px]">Themes</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><PaintBucket className="h-6 w-6 mb-1 text-pink-500"/><span className="text-[10px]">Colors</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Type className="h-6 w-6 mb-1 text-slate-700"/><span className="text-[10px]">Fonts</span></button>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Stamp className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Watermark</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Square className="h-6 w-6 mb-1 text-slate-400"/><span className="text-[10px]">Page Borders</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Moon className="h-6 w-6 mb-1 text-slate-600"/><span className="text-[10px]">Dark Mode</span></button>
                        </div>
                      )}

                      {activeRibbonTab === 'View' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><ZoomIn className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Zoom</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><Maximize className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Full Screen</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600"><ListIcon className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Nav Pane</span></button>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <div className="flex flex-col gap-1 text-[10px]">
                            <label className="flex items-center gap-1"><input type="checkbox" className="rounded border-slate-300" defaultChecked/> Ruler</label>
                            <label className="flex items-center gap-1"><input type="checkbox" className="rounded border-slate-300"/> Gridlines</label>
                          </div>
                          <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 ml-4"><Printer className="h-6 w-6 mb-1 text-slate-500"/><span className="text-[10px]">Print Preview</span></button>
                        </div>
                      )}

                      {activeRibbonTab === 'Format' && (
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-xs text-slate-400 italic">Select an object to enable formatting tools</div>
                          <div className="w-px h-10 bg-slate-200 mx-2"></div>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><Crop className="h-6 w-6 mb-1"/><span className="text-[10px]">Crop</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><RotateCw className="h-6 w-6 mb-1"/><span className="text-[10px]">Rotate</span></button>
                          <button className="flex flex-col items-center justify-center p-1.5 hover:bg-slate-100 rounded text-slate-600 opacity-50 cursor-not-allowed"><Box className="h-6 w-6 mb-1"/><span className="text-[10px]">Shadow</span></button>
                        </div>
                      )}

                    </div>
                  </div>
                )}
                
                <div className="flex-1 min-w-0 flex flex-col items-center w-full bg-[#f4f7f9] p-4 sm:p-8 space-y-6">
                  <!--INPUTS-->
                  <!--CANVAS-->
                </div>
              </div>
`;

const newCode = `
            <div className={\`w-full mx-auto space-y-4 \${isEditing ? "max-w-none" : "max-w-5xl"}\`}>
              <!--BACK_BTN-->
              
              <div className={\`px-4 \${isEditing ? 'max-w-[1200px] mx-auto w-full' : ''}\`}>
                 <!--ACTION_CONTROLS-->
              </div>

              <div className="relative flex w-full flex-col">
                <!--RIBBON_UI-->
              </div>
            </div>
`;

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// I need to replace from '{selectedArticle ? (' down to '          ) : (' 
const s1 = appCode.indexOf('{selectedArticle ? (');
const s2 = appCode.indexOf('          ) : (\n            <div className="w-full max-w-6xl mx-auto" id="dashboardState">');

if (s1 !== -1 && s2 !== -1) {
    let injectedCode = newCode
        .replace('<!--BACK_BTN-->', parts.backBtn)
        .replace('<!--ACTION_CONTROLS-->', parts.actionControls)
        .replace('<!--RIBBON_UI-->', ribbonUI)
        .replace('<!--INPUTS-->', parts.inputs)
        .replace('<!--CANVAS-->', parts.canvasSheet);

    appCode = appCode.substring(0, s1 + 20) + '\n' + injectedCode + '\n' + appCode.substring(s2);
    fs.writeFileSync('src/App.tsx', appCode);
    console.log("Success! Cleaned up and injected properly.");
} else {
    console.log("Could not find start or end bounds in App.tsx!");
}

