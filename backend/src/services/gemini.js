// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// async function generateContent(prompt) {
//   try {
//     const res = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });
//     return res.response.text();
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     throw err;
//   }
// }

// module.exports = generateContent;

const fetch = require("node-fetch");

async function generateContent(codeSnippet, language) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const prompt = `
  You are an expert code reviewer. Analyze the following code and provide a structured review (with emojis).
  
  Requirements:
  1. Identify syntax errors and logical bugs.
  2. Point out security vulnerabilities.
  3. Suggest performance improvements.
  4. Recommend best practices and clean code improvements.
  5. Provide the review in a clear, structured format (use bullet points).
  6. If the code is empty or trivial, provide only a brief response without deep analysis.(write something which shows you are willing to help someone)
  
  Here is the code to review:
  \`\`\`${language}
  ${codeSnippet}
  \`\`\`
    `;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini"
    );
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw err;
  }
}

module.exports = generateContent;
