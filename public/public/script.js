const API_URL =
  "https://jaigurudev-ai-learning.onrender.com/api/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const send = document.getElementById("send");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("सोच रहा हूँ... 🤔", "bot");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    chat.lastElementChild.remove();

    if (data.success) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("माफ़ कीजिए, अभी उत्तर नहीं मिल पाया।", "bot");
    }

  } catch (error) {
    chat.lastElementChild.remove();
    addMessage("Server से connection नहीं हो पाया।", "bot");
    console.error(error);
  }
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
