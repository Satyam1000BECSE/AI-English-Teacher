import {
  Bot,
  MessageSquareText,
  Captions,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  HelpCircle
} from "lucide-react";

const Display = ({
  aiText,
  caption,
  feedback,
  correction,
  suggested_reply,
  next_question
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 space-y-4 transition-all duration-300 hover:shadow-xl">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
          <Bot className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          AI Teacher
        </h2>
      </div>

      {/* AI SPEECH */}
      {aiText && (
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquareText size={16} className="text-gray-500" />
            <p className="text-sm text-gray-500">AI Says</p>
          </div>
          <p className="text-gray-800 font-medium">{aiText}</p>
        </div>
      )}

      {/* CAPTION */}
      {caption && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 italic border-t pt-2">
          <Captions size={14} />
          <span>"{caption}"</span>
        </div>
      )}

      {/* SUGGESTED REPLY */}
      {suggested_reply && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={16} className="text-blue-600" />
            <p className="text-sm font-semibold text-blue-700">
              Suggested Reply
            </p>
          </div>
          <p className="text-blue-800 text-sm">{suggested_reply}</p>
        </div>
      )}

      {/* NEXT QUESTION */}
      {next_question && (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle size={16} className="text-purple-600" />
            <p className="text-sm font-semibold text-purple-700">
              Next Question
            </p>
          </div>
          <p className="text-purple-800 text-sm">{next_question}</p>
        </div>
      )}

      {/* CORRECTION */}
      {correction && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-yellow-600" />
            <p className="text-sm font-semibold text-yellow-700">
              Correction
            </p>
          </div>
          <p className="text-yellow-800 text-sm">{correction}</p>
        </div>
      )}

      {/* FEEDBACK */}
      {feedback && (
        <div className="bg-green-100 border-l-4 border-green-400 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={16} className="text-green-600" />
            <p className="text-sm font-semibold text-green-700">
              Feedback
            </p>
          </div>
          <p className="text-green-800 text-sm">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Display;

