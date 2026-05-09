const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/routes/editor.$id.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Replace states
content = content.replace(
  `  const [zoom, setZoom] = useState(0.5);\n  const [isSidebarOpen, setIsSidebarOpen] = useState(true);\n  const [isDesignOpen, setIsDesignOpen] = useState(false);\n  const [mobileDesignOpen, setMobileDesignOpen] = useState(false);\n  const [mobileChatOpen, setMobileChatOpen] = useState(false);\n  const [leftSidebarWidth, setLeftSidebarWidth] = useState(360);\n  const [rightSidebarWidth, setRightSidebarWidth] = useState(360);`,
  `  const [zoom, setZoom] = useState(0.5);\n  const [activeTab, setActiveTab] = useState<"chat" | "design">("chat");\n  const [mobileDesignOpen, setMobileDesignOpen] = useState(false);\n  const [mobileChatOpen, setMobileChatOpen] = useState(false);\n  const [leftSidebarWidth, setLeftSidebarWidth] = useState(340);`
);

// 2. Replace useEffect for media query
content = content.replace(
  `  useEffect(() => {\n    if (window.matchMedia("(max-width: 1023px)").matches) {\n      setIsSidebarOpen(false);\n      setIsDesignOpen(false);\n    }\n  }, []);`,
  `  useEffect(() => {\n    if (window.matchMedia("(max-width: 1023px)").matches) {\n      // Handled by mobile responsive states now\n    }\n  }, []);`
);

// 3. Replace LAYOUT_STORAGE_KEY useEffects
content = content.replace(
  /  useEffect\(\(\) => \{\n    const raw = window\.localStorage\.getItem\(LAYOUT_STORAGE_KEY\);[\s\S]*?  \}, \[isSidebarOpen, isDesignOpen, leftSidebarWidth, rightSidebarWidth\]\);/g,
  `  useEffect(() => {
    const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as {
        activeTab?: "chat" | "design";
        leftSidebarWidth?: number;
      };
      if (saved.activeTab) setActiveTab(saved.activeTab);
      if (typeof saved.leftSidebarWidth === "number")
        setLeftSidebarWidth(Math.max(300, Math.min(460, saved.leftSidebarWidth)));
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LAYOUT_STORAGE_KEY,
      JSON.stringify({ activeTab, leftSidebarWidth })
    );
  }, [activeTab, leftSidebarWidth]);`
);

// 4. Fix handleFixErrors
content = content.replace(
  `  const handleFixErrors = async () => {\n    if (chatLoading) return;\n    setIsSidebarOpen(true);`,
  `  const handleFixErrors = async () => {\n    if (chatLoading) return;\n    setActiveTab("chat");`
);

// 5. Fix handlePreviewSectionClick
content = content.replace(
  `  const handlePreviewSectionClick = (s: SectionId, path?: string) => {\n    setSelectedSection(s);\n    if (path) {\n      setFocusedField(path);\n      if (!soraniMode) {\n        setInlineEdit({ path, value: getValueAtPath(data, path), section: s });\n      }\n      return;\n    }\n    if (!isDesignOpen) setIsDesignOpen(true);\n    setInlineEdit(null);\n  };`,
  `  const handlePreviewSectionClick = (s: SectionId, path?: string) => {\n    setSelectedSection(s);\n    if (path) {\n      setFocusedField(path);\n      if (!soraniMode) {\n        setInlineEdit({ path, value: getValueAtPath(data, path), section: s });\n      }\n      return;\n    }\n    setActiveTab("design");\n    setInlineEdit(null);\n  };`
);

// 6. Replace header and main grid section
// To do this reliably, we'll replace the block from <header> to the start of the <main> grid
const headerRegex = /<header className="sticky top-0 z-50 bg-white\/70 backdrop-blur-xl border-b border-blue-100\/50 hidden md:block">[\s\S]*?<\/header>/;
const newHeader = `<header className="sticky top-0 z-50 bg-white border-b border-slate-200 hidden md:block">
        <div className="px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <img
                src="/logo/MemoryCV Logo Icon Only.png"
                alt="MemoryCV"
                className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                MemoryCV
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCheckATS}
                className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-950 rounded-lg hover:bg-emerald-50 transition-all flex items-center gap-2 bg-emerald-50/50"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "پشکنینی ATS" : "ATS Score"}</span>
              </button>

              <button
                onClick={handleFixErrors}
                disabled={chatLoading}
                className="px-4 py-2 text-sm font-semibold text-amber-700 hover:text-amber-950 rounded-lg hover:bg-amber-50 transition-all flex items-center gap-2 bg-amber-50/50 disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "چاککردنی هەڵەکان" : "Fix Grammar"}</span>
              </button>
              
              <div className="w-px h-6 bg-slate-200 mx-1"></div>

              <button
                onClick={() => setTemplateModalOpen(true)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 border border-slate-200 bg-white"
              >
                <LayoutTemplate className="h-4 w-4" />
                <span className="hidden sm:inline">{isKu ? "نەخشەکان" : "Templates"}</span>
              </button>
              
              <div className="flex items-center">
                 <ExportButtons
                  data={previewData}
                  template={resume.template}
                  name={previewData.name}
                  previewRef={previewRef}
                />
              </div>
            </div>
          </div>
        </div>
      </header>`;
content = content.replace(headerRegex, newHeader);

// 7. Replace the `<section>` layout to `grid-cols-[var(--left-col)_minmax(0,1fr)]`
const sectionLayoutRegex = /<section\s+className="grid gap-4 lg:grid-cols-\[var\(--left-col\)_minmax\(0,1fr\)_var\(--right-col\)\] lg:gap-7 transition-\[grid-template-columns\] duration-300 ease-in-out"\s+style=\{\{[\s\S]*?\} as React\.CSSProperties\}/;
const newSectionLayout = `<section
          className="grid gap-4 lg:grid-cols-[var(--left-col)_minmax(0,1fr)] lg:gap-7 transition-[grid-template-columns] duration-300 ease-in-out h-full"
          style={{
            "--left-col": \`\${leftSidebarWidth}px\`,
            transition: "grid-template-columns 0.3s ease",
          } as React.CSSProperties}`;
content = content.replace(sectionLayoutRegex, newSectionLayout);

// 8. Replace left pane
const oldAsideRegex = /<aside\s+className={`[\s\S]*?<div className="flex h-full flex-col overflow-hidden rounded-\[2rem\] border border-white\/70 bg-white\/92 shadow-\[0_24px_70px_-34px_rgba\(15,23,42,0\.28\)\] ring-1 ring-white\/60 backdrop-blur-2xl">[\s\S]*?{history\.length > 0 && \([\s\S]*?{showHistory && history\.length > 0 && \([\s\S]*?{chatLoading && \([\s\S]*?<div className="flex w-full shrink-0 justify-center border-t border-slate-100 bg-white\/90 px-4 pb-safe-6 pt-4">[\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*<div\s+className="hidden lg:block absolute top-0 right-0 h-full w-1\.5 cursor-col-resize bg-transparent hover:bg-blue-500\/20"\s+onMouseDown=\{[\s\S]*?\}\s*\/>\s*<\/aside>/;

const newAside = `<aside
            className="relative flex flex-col min-w-0 lg:col-start-1 lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)] hidden lg:flex bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Tabs Header */}
            <div className="flex shrink-0 items-center border-b border-slate-100 p-1.5 bg-slate-50/50">
              <button
                onClick={() => setActiveTab("chat")}
                className={\`flex-1 py-2 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 \${
                  activeTab === "chat" ? "bg-white shadow-sm text-slate-900 border border-slate-200/50" : "text-slate-500 hover:text-slate-700"
                }\`}
              >
                <Bot className="w-4 h-4" /> AI Chat
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={\`flex-1 py-2 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 \${
                  activeTab === "design" ? "bg-white shadow-sm text-slate-900 border border-slate-200/50" : "text-slate-500 hover:text-slate-700"
                }\`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Design
              </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {activeTab === "chat" ? (
                <div className="flex h-full flex-col">
                  {history.length > 0 && (
                    <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white/60 px-5 py-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {isKu ? "وەشانە پاشەکەوتکراوەکان" : "History"}
                      </span>
                      <button
                        onClick={() => setShowHistory((v) => !v)}
                        className={\`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors \${
                          showHistory
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "text-slate-500 hover:bg-slate-100"
                        }\`}
                      >
                        <Clock className="w-3 h-3" />
                        {history.length} {isKu ? "وەشان" : \`version\${history.length !== 1 ? "s" : ""}\`}
                      </button>
                    </div>
                  )}
    
                  {showHistory && history.length > 0 && (
                    <div className="max-h-44 shrink-0 space-y-1 overflow-y-auto border-b border-slate-100 bg-slate-50/90 px-4 py-2">
                      {history.map((h) => (
                        <div
                          key={h.id}
                          className="group flex items-center justify-between gap-2 rounded-2xl border border-transparent px-3 py-2.5 shadow-sm transition-colors hover:border-slate-200 hover:bg-white"
                        >
                          <div className="min-w-0">
                            <p className="text-[12px] text-slate-700 truncate font-semibold">
                              {h.label}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              {new Date(h.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRevert(h.id)}
                            className="shrink-0 flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold text-blue-600 opacity-0 transition-opacity hover:bg-blue-50 hover:text-blue-800 group-hover:opacity-100"
                          >
                            <RotateCcw className="w-3 h-3" /> {isKu ? "گێڕانەوە" : "Restore"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
    
                  <div
                    className="flex-1 overflow-y-auto space-y-4 bg-white p-5"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((msg, i) => (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          key={i}
                          className={\`flex gap-3 \${msg.role === "user" ? "justify-end" : "justify-start"}\`}
                        >
                          {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                              <Bot className="w-4 h-4 text-slate-600" />
                            </div>
                          )}
                          <div className="flex flex-col gap-1 max-w-[85%]">
                            <div
                              className={\`text-[14.5px] px-4 py-3 rounded-2xl leading-relaxed \${
                                msg.role === "user"
                                  ? "bg-slate-900 text-white rounded-tr-sm font-medium"
                                  : "bg-slate-50 text-slate-800 border border-slate-100"
                              }\`}
                            >
                              {msg.content}
                            </div>
                            {msg.role === "assistant" && msg.snapshotId && (
                              <button
                                onClick={() => handleRevert(msg.snapshotId!)}
                                className="self-start flex items-center gap-1 text-[10.5px] font-bold text-slate-400 hover:text-blue-600 transition-colors mt-1"
                              >
                                <RotateCcw className="w-3 h-3" />{" "}
                                {isKu ? "گەڕانەوە لەم گۆڕانکارییە" : "Undo this change"}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {chatLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                        </div>
                        <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                              style={{ animationDelay: \`\${i * 0.15}s\` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
    
                  {/* Quick Action Chips above input */}
                  <div className="px-4 pt-2 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-white">
                     <button onClick={() => setChatInput("Make my bullet points stronger.")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[13px] font-medium text-slate-700 transition-colors">Stronger bullets</button>
                     <button onClick={() => setChatInput("Add metrics to my experience.")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[13px] font-medium text-slate-700 transition-colors">Add metrics</button>
                     <button onClick={() => setChatInput("Shorten the summary.")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[13px] font-medium text-slate-700 transition-colors">Shorten</button>
                     <button onClick={() => setChatInput("Tailor for job")} className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[13px] font-medium text-slate-700 transition-colors">Tailor for job</button>
                  </div>

                  <div className="flex w-full shrink-0 justify-center bg-white px-4 pb-4 pt-1">
                    <form
                      onSubmit={handleChatSubmit}
                      className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm transition-all duration-300 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 sm:gap-3"
                    >
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={
                          isKu
                            ? "پوختەی کارەکەم با بەهێزتر بێت..."
                            : "Ask AI to edit anything..."
                        }
                        disabled={chatLoading}
                        rows={1}
                        className="flex-1 bg-transparent pl-3 text-[14px] font-medium text-slate-800 outline-none placeholder:text-slate-400 resize-none max-h-24 scrollbar-hide py-1.5"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleChatSubmit(e);
                          }
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || chatLoading}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition-all hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto bg-white flex flex-col">
                   <div className="p-4 border-b border-slate-100 bg-blue-50/50 shrink-0">
                     <p className="text-[13px] text-blue-700 font-medium flex items-center gap-2">
                       <Sparkles className="w-4 h-4" /> Click any element on the resume to edit it here.
                     </p>
                   </div>
                   <div className="flex-1 overflow-y-auto">
                     <DesignPanel
                      design={design}
                      data={data}
                      onChange={updateDesign}
                      updateData={updateData}
                      onClose={() => setActiveTab("chat")}
                      selected={selectedSection}
                      setSelected={setSelectedSection}
                      focusedField={focusedField}
                    />
                   </div>
                </div>
              )}
            </div>
            
            <div
              className="hidden lg:block absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-slate-200 z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = leftSidebarWidth;
                const onMove = (ev: MouseEvent) => {
                  setLeftSidebarWidth(
                    Math.max(320, Math.min(500, startWidth + (ev.clientX - startX))),
                  );
                };
                const onUp = () => {
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
            />
          </aside>`;

content = content.replace(oldAsideRegex, newAside);

// 9. Remove ExportButtons from Toolbar Area since it's now in the header
content = content.replace(
  /<div className="flex items-center gap-2">\s*<ExportButtons[\s\S]*?\/>\s*<\/div>/,
  ""
);

// 10. Hide Design Panel from the right side.
const rightPaneRegex = /\{\/\* Right pane: Design Panel \*\/\}\s*<AnimatePresence>[\s\S]*?<\/AnimatePresence>/;
content = content.replace(rightPaneRegex, "");

// 11. Remove Style button, "Show chat/Hide chat" from Toolbar area
content = content.replace(
  /<button\s+onClick=\{\(\) => setMobileDesignOpen\(true\)\}[\s\S]*?Design\s*<\/button>/,
  ""
);
content = content.replace(
  /<button\s+onClick=\{\(\) => setIsSidebarOpen\(\(value\) => !value\)\}[\s\S]*?\{isSidebarOpen \? "Hide chat" : "Show chat"\}\s*<\/button>/,
  ""
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Successfully replaced content.");
