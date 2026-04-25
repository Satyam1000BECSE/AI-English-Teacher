import { callGemini } from "../services/geminiService.js";

export const nextMessage = async (req, res) => {
  try {
    const { userText, level, accent, topic } = req.body;

    const prompt = `
You are a professional English speaking teacher helping a student practice speaking.

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown
- Start with { and end with }

TEACHING STYLE:
1. Speak naturally like a teacher
2. Keep sentences based on level
3. Always guide the student to SPEAK

IMPORTANT:
- "suggested_reply" MUST always start with "Say: "
- Keep suggested reply simple and speakable
- Encourage speaking practice

FORMAT:
{
  "ai_speech": "",
  "caption": "",
  "suggested_reply": "",
  "correction": "",
  "feedback": "",
  "next_question": ""
}

Context:
Level: ${level}
Accent: ${accent}
Topic: ${topic}

User said: "${userText}"

EXAMPLE:
If AI says: "How are you?"
Then suggested_reply must be:
"Say: I am fine."

Now generate response:
`;

    const aiText = await callGemini(prompt);

    console.log("RAW GEMINI RESPONSE:\n", aiText);

    // ✅ Extract JSON safely
    const extractJSON = (text) => {
      const match = text.match(/\{[\s\S]*\}/);
      return match ? match[0] : null;
    };

    const jsonString = extractJSON(aiText);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);

      // 🔥 Ensure "Say:" format (extra safety)
      if (
        parsed.suggested_reply &&
        !parsed.suggested_reply.toLowerCase().startsWith("say:")
      ) {
        parsed.suggested_reply = "Say: " + parsed.suggested_reply;
      }

    } catch {
      parsed = {
        ai_speech: "Let's continue. Can you try again?",
        caption: "Let's continue. Can you try again?",
        suggested_reply: "Say: I am ready to speak.",
        correction: "",
        feedback: "Try speaking clearly.",
        next_question: "Can you say something about yourself?"
      };
    }

    res.json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// import { callGemini } from "../services/geminiService.js";

// export const nextMessage = async (req, res) => {
//     try {
//         const { userText, level, accent, topic } = req.body;

//         const prompt = `
// You are a professional English speaking teacher.

// IMPORTANT:
// - Return ONLY JSON
// - Do NOT add explanation
// - Do NOT add text before or after JSON
// - Do NOT use markdown
// - Output must start with { and end with }

// Format:
// {
//   "ai_speech": "string",
//   "caption": "string",
//   "suggested_reply": "string",
//   "correction": "string",
//   "feedback": "string",
//   "next_question": "string"
// }

// Context:
// Level: ${level}
// Accent: ${accent}
// Topic: ${topic}

// User said: "${userText}"
// `;

//         const aiText = await callGemini(prompt);

//         console.log("RAW GEMINI RESPONSE:\n", aiText);

//         const extractJSON = (text) => {
//             const match = text.match(/\{[\s\S]*\}/);
//             return match ? match[0] : null;
//         };

//         const jsonString = extractJSON(aiText);

//         let parsed;

//         try {
//             parsed = JSON.parse(jsonString);
//         } catch {
//             parsed = {
//                 ai_speech: "Let's continue. Can you try again?",
//                 caption: "Let's continue. Can you try again?",
//                 suggested_reply: "",
//                 correction: "",
//                 feedback: "Try speaking clearly.",
//                 next_question: "What would you like to say?"
//             };
//         }

//         res.json(parsed);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };