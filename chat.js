const aiBtn = document.getElementById("ai-btn");
const aiWindow = document.getElementById("ai-chat-window");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Toggle chat window when button clicked
aiBtn.addEventListener("click", () => {
  aiWindow.classList.toggle("hidden");
});

// Send messages
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    addMessage(data.reply, "ai");
  } catch (err) {
    console.error(err);
    addMessage("❌ Error contacting AI.", "ai");
  }
}

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-msg" : "ai-msg");
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
