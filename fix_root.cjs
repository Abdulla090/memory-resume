const fs = require("fs");
let content = fs.readFileSync("src/routes/__root.tsx", "utf8");

// add imports
content = content.replace(
  /import \{ Toaster \} from "sonner";/,
  `import { Toaster, toast } from "sonner";
import { Settings, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";`
);

// add component before RootComponent
const apiKeySettingsCode = `
function ApiKeySettings() {
  const [open, setOpen] = useState(false);
  const { apiKey, setApiKey } = useAppStore();
  const [tempKey, setTempKey] = useState(apiKey || "");

  useEffect(() => {
    setTempKey(apiKey || "");
  }, [apiKey, open]);

  const handleSave = () => {
    setApiKey(tempKey);
    setOpen(false);
    if (tempKey) {
      toast.success("API Key saved");
    } else {
      toast.info("API Key cleared");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-white border border-blue-100 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
        title="Set Gemini API Key"
      >
        <Key className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-2xl w-full max-w-sm p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ?
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Gemini API Key</h3>
                <p className="text-xs text-slate-500">Provide your own key for AI</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              To use the Gemini 3.1 Flash Lite model, enter your Google Gemini API key. This key is stored locally in your browser and is never sent to our servers.
            </p>

            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

`;

content = content.replace(/function RootComponent\(\) \{/, apiKeySettingsCode + "function RootComponent() {");

// render ApiKeySettings
content = content.replace(/<Outlet \/>/, "<Outlet />\n      <ApiKeySettings />");

fs.writeFileSync("src/routes/__root.tsx", content);

