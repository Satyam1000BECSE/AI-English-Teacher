import { useState } from "react";
import { Settings, BarChart, Globe, MessageCircle, CheckCircle } from "lucide-react";

const Controls = ({ setSettings }) => {
  const [level, setLevel] = useState("Beginner");
  const [accent, setAccent] = useState("Indian");
  const [topic, setTopic] = useState("Travel");

  const applySettings = () => {
    setSettings({ level, accent, topic });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 space-y-5 transition-all duration-300 hover:shadow-xl">

      {/* HEADER */}
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Settings size={20} className="text-gray-600" />
        Settings
      </h3>

      {/* LEVEL */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
          <BarChart size={16} /> Level
        </label>
        <select
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Professional</option>
          <option>Entrepreneur</option>
        </select>
      </div>

      {/* ACCENT */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
          <Globe size={16} /> Accent
        </label>
        <select
          onChange={(e) => setAccent(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Indian</option>
          <option>American</option>
        </select>
      </div>

      {/* TOPIC */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
          <MessageCircle size={16} /> Conversation Type
        </label>
        <select
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Travel</option>
          <option>Business</option>
          <option>Friendly</option>
          <option>Interview</option>
          <option>Family</option>
          <option>Presentation</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={applySettings}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300 shadow-md"
      >
        <CheckCircle size={18} />
        Apply Settings
      </button>

      {/* SUMMARY */}
      <div className="text-xs text-gray-500 border-t pt-3 space-y-1">
        <p className="flex items-center gap-2">
          <MessageCircle size={14} /> {topic}
        </p>
        <p className="flex items-center gap-2">
          <BarChart size={14} /> {level}
        </p>
        <p className="flex items-center gap-2">
          <Globe size={14} /> {accent}
        </p>
      </div>
    </div>
  );
};

export default Controls;


