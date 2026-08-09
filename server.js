const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jaigurudev AI Learning API is Live 🚀"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Jaigurudev AI Learning"
  });
});

// AI CHAT
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OPENAI_API_KEY is not configured"
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions:
          "आप Jaigurudev AI Learning के शैक्षणिक AI शिक्षक हैं। विद्यार्थियों को सरल, स्पष्ट और उपयोगी हिंदी में उत्तर दें। जरूरत होने पर उदाहरण दें।",
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({
        success: false,
        error: data.error?.message || "OpenAI API error"
      });
    }

    res.json({
      success: true,
      reply: data.output_text || "मुझे अभी उत्तर नहीं मिल पाया।"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Jaigurudev AI Learning AI Chat is ready 🤖");
});
