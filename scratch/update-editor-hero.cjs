const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/routes/editor.$id.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Import HeroUI components
const importRegex = /import \{[\s\S]*?\} from "lucide-react";/;
const heroUiImport = `import { Tabs as HeroTabs, Tab as HeroTab, Card as HeroCard, CardBody, Button as HeroButton, ScrollShadow, Divider as HeroDivider } from "@heroui/react";`;
content = content.replace(importRegex, match => `${match}\n${heroUiImport}`);

// 2. Replace the old side panel header + tabs implementation with HeroUI Tabs
const oldAsideRegex = /<aside\s+className="relative flex flex-col min-w-0 lg:col-start-1 lg:sticky lg:top-20 lg:h-\[calc\(100dvh-6rem\)\] hidden lg:flex bg-white rounded-\[1\.5rem\] border border-slate-200 shadow-sm overflow-hidden"[\s\S]*?<\/aside>/;

// The new Aside will use HeroCard to give it a professional floating look with smooth Tabs
const newAside = `<aside className="relative flex flex-col min-w-0 lg:col-start-1 lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)] hidden lg:flex z-10">
            <HeroCard className="w-full h-full border border-slate-200/60 shadow-lg bg-white/70 backdrop-blur-3xl overflow-hidden rounded-[1.5rem]" shadow="sm">
              <div className="flex flex-col h-full">
                <div className="px-4 pt-4 pb-2 border-b border-slate-100/80 bg-white/50 backdrop-blur-xl shrink-0">
                  <HeroTabs 
                    aria-label="Editor Options" 
                    selectedKey={activeTab} 
                    onSelectionChange={(k) => setActiveTab(k as "chat" | "design")}
                    color="primary" 
                    variant="solid" 
                    fullWidth
                    classNames={{
                      tabList: "bg-slate-100/80 p-1 rounded-xl shadow-inner",
                      cursor: "w-full bg-white shadow-sm rounded-[10px]",
                      tab: "h-10",
                      tabContent: "font-semibold text-[13px]"
                    }}
                  >
                    <HeroTab 
                      key="chat" 
                      title={
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" /> AI Chat
                        </div>
                      }
                    />
                    <HeroTab 
                      key="design" 
                      title={
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4" /> Design
                        </div>
                      }
                    />
                  </HeroTabs>
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
        
                      <ScrollShadow
                        className="flex-1 space-y-4 bg-transparent p-5"
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
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200 shadow-sm">
                                  <Bot className="w-4 h-4 text-slate-600" />
                                </div>
                              )}
                              <div className="flex flex-col gap-1 max-w-[85%]">
                                <div
                                  className={\`text-[14.5px] px-4 py-3 rounded-2xl leading-relaxed shadow-sm \${
                                    msg.role === "user"
                                      ? "bg-slate-900 text-white rounded-tr-sm font-medium"
                                      : "bg-white text-slate-800 border border-slate-100"
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
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                            </div>
                            <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                              {[0, 1, 2].map((i) => (
                                <span
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce"
                                  style={{ animationDelay: \`\${i * 0.15}s\` }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </ScrollShadow>
        
                      {/* Quick Action Chips above input */}
                      <div className="px-4 pt-2 pb-2 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-transparent">
                         <HeroButton size="sm" variant="flat" onPress={() => setChatInput("Make my bullet points stronger.")} className="font-medium text-slate-600 bg-slate-100 hover:bg-slate-200">Stronger bullets</HeroButton>
                         <HeroButton size="sm" variant="flat" onPress={() => setChatInput("Add metrics to my experience.")} className="font-medium text-slate-600 bg-slate-100 hover:bg-slate-200">Add metrics</HeroButton>
                         <HeroButton size="sm" variant="flat" onPress={() => setChatInput("Shorten the summary.")} className="font-medium text-slate-600 bg-slate-100 hover:bg-slate-200">Shorten</HeroButton>
                         <HeroButton size="sm" variant="flat" onPress={() => setChatInput("Tailor for job")} className="font-medium text-slate-600 bg-slate-100 hover:bg-slate-200">Tailor for job</HeroButton>
                      </div>

                      <div className="flex w-full shrink-0 justify-center bg-transparent px-4 pb-4 pt-1">
                        <form
                          onSubmit={handleChatSubmit}
                          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm transition-all duration-300 focus-within:border-primary-400 focus-within:ring-4 focus-within:ring-primary-100 sm:gap-3"
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
                          <HeroButton
                            type="submit"
                            isIconOnly
                            isDisabled={!chatInput.trim() || chatLoading}
                            color="primary"
                            className="rounded-xl shadow-md"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </HeroButton>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto bg-transparent flex flex-col">
                       <div className="p-4 border-b border-blue-100/50 bg-blue-50/50 shrink-0">
                         <p className="text-[13px] text-blue-700 font-medium flex items-center gap-2">
                           <Sparkles className="w-4 h-4" /> Click any element on the resume to edit it here.
                         </p>
                       </div>
                       <ScrollShadow className="flex-1 p-2">
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
                       </ScrollShadow>
                    </div>
                  )}
                </div>
              </div>
            </HeroCard>
            
            <div
              className="hidden lg:block absolute top-0 right-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-primary-200 z-20"
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

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Updated editor layout with HeroUI");
