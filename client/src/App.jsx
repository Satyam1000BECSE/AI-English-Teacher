import { useState } from "react";
import VoiceChat from "./components/VoiceChat";
import Controls from "./components/Controls";
import AuthButtons from "./components/AuthButtons";
import { GraduationCap, Settings, MessageSquare } from "lucide-react";

function App() {
  const [settings, setSettings] = useState({
    level: "Beginner",
    accent: "Indian",
    topic: "Travel",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white/80 backdrop-blur-md">
        
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-600" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            AI English Teacher
          </h1>
        </div>

        <div className=" flex text-sm text-gray-600">
          <AuthButtons />
          Level: <span className="font-semibold">{settings.level}</span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

        {/* SETTINGS PANEL */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          
          <div className="flex items-center gap-2 mb-4">
            <Settings className="text-gray-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-700">
              Settings
            </h2>
          </div>

          <Controls setSettings={setSettings} />
        </div>

        {/* CHAT AREA */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between">

          {/* CHAT HEADER */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-600" size={22} />
              <h2 className="text-xl font-semibold text-gray-800">
                Practice Conversation
              </h2>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Speak and improve your English in real-time
            </p>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto">
            <VoiceChat settings={settings} />
          </div>

          {/* FOOTER */}
          <div className="mt-4 text-center text-xs text-gray-400">
            Powered by AI
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

