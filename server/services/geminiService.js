import fetch from "node-fetch";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 🔥 YOUR VERIFIED MODELS (priority order)
const MODELS = [
  "gemini-3-flash",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite"
];

const callModel = async (model, prompt) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();

  // console.log(`🔍 Model: ${model}`);
  // console.log(JSON.stringify(data, null, 2));

  if (data.error) throw new Error(`${model} → ${data.error.message}`);

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

export const callGemini = async (prompt) => {
  const MAX_RETRIES = 2;

  // 🔥 Try each model with retries
  for (let model of MODELS) {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await callModel(model, prompt);
      } catch (err) {
        console.log(`⚠️ ${model} retry ${i + 1}:`, err.message);
        await sleep(1000 * (i + 1));
      }
    }

    // console.log(`❌ Skipping model: ${model}`);
  }

  // 🔥 FINAL SAFE RESPONSE (never break frontend)
  return JSON.stringify({
    ai_speech: "Server is busy right now. Please try again.",
    caption: "Server is busy right now. Please try again.",
    suggested_reply: "",
    correction: "",
    feedback: "Try again in a few seconds.",
    next_question: "Can you repeat that?"
  });
};

