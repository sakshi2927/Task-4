import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { name, role, company, skills } = req.body;

  

  const prompt = `
Write a professional cover letter.
Candidate Name: ${name}
Job Role: ${role}
Company: ${company}
Skills: ${skills}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate cover letter";
    res.json({ result: output });
  } catch (error) {
    res.status(500).json({
        message : "Error found.",
        error : error.message,
        success : false
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
