import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getNextMessage } from "../services/api";
import {
  Mic,
  MicOff,
  Volume2,
  User,
  Bot,
  AlertTriangle,
  CheckCircle,
  Captions,
  Lightbulb
} from "lucide-react";

const VoiceChat = ({ settings }) => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  // 🔒 PROTECTION (PUT HERE)
  const { loginWithRedirect } = useAuth0();


  const [aiText, setAiText] = useState("");
  const [caption, setCaption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correction, setCorrection] = useState("");
  const [suggestedReply, setSuggestedReply] = useState("");
  const [userText, setUserText] = useState("");
  const [listening, setListening] = useState(false);

  // ⏳ Optional loading state
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4 text-gray-600">
          Please login to use AI Teacher
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    );
  }

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = settings.accent === "American" ? "en-US" : "en-IN";
    speechSynthesis.speak(utter);
  };

  const startListening = () => {
    setListening(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async (e) => {
      const text = e.results[0][0].transcript;
      setUserText(text);

      const token = await getAccessTokenSilently();

      const res = await getNextMessage(
        {
          userText: text,
          ...settings,
        },
        token
      );

      setAiText(res.data.ai_speech);
      setCaption(res.data.caption);
      setFeedback(res.data.feedback);
      setCorrection(res.data.correction);
      setSuggestedReply(res.data.suggested_reply);

      speak(res.data.ai_speech);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  // 🔥 Clean "Say: ..." text for speaking
  const handleSuggestedClick = () => {
    if (!suggestedReply) return;
    const cleanText = suggestedReply.replace(/^say:\s*/i, "");
    speak(cleanText);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* MIC BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={startListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${listening ? "bg-red-500 animate-pulse scale-110" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {listening ? (
            <MicOff className="text-white" size={28} />
          ) : (
            <Mic className="text-white" size={28} />
          )}
        </button>
      </div>

      {/* STATUS */}
      {listening && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          Listening...
        </p>
      )}

      {/* CHAT AREA */}
      <div className="space-y-4">

        {/* USER MESSAGE */}
        {userText && (
          <div className="flex justify-end">
            <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-xs shadow">
              <User size={16} />
              <span>{userText}</span>
            </div>
          </div>
        )}

        {/* AI MESSAGE */}
        {aiText && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow">
              <Bot size={16} className="text-blue-600" />
              <span>{aiText}</span>
              <Volume2
                size={16}
                className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => speak(aiText)}
              />
            </div>
          </div>
        )}

        {/* CAPTION */}
        {caption && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 italic">
            <Captions size={14} />
            <span>"{caption}"</span>
          </div>
        )}

        {/* 🔥 SUGGESTED REPLY */}
        {suggestedReply && (
          <div
            onClick={handleSuggestedClick}
            className="flex items-start gap-2 bg-blue-50 text-blue-800 p-3 rounded-lg text-sm cursor-pointer hover:bg-blue-100 transition"
          >
            <Lightbulb size={18} />
            <div>
              <b>Suggested:</b> {suggestedReply}
              <div className="text-xs text-gray-500 mt-1">
                Tap to hear & practice
              </div>
            </div>
          </div>
        )}

        {/* CORRECTION */}
        {correction && (
          <div className="flex items-start gap-2 bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm">
            <AlertTriangle size={18} />
            <div>
              <b>Correction:</b> {correction}
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {feedback && (
          <div className="flex items-start gap-2 bg-green-100 text-green-800 p-3 rounded-lg text-sm">
            <CheckCircle size={18} />
            <div>
              <b>Feedback:</b> {feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChat;

