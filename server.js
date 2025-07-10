import express from "express";
import AfricasTalking from "africastalking";
import { config } from "dotenv";
import OpenAI from "openai";

config();

const app = express();
const messageHistory = [];

// Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Helper function to generate AI response
async function generateAIResponse(query) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable legal assistant. Provide clear, concise legal information while noting that you're not a substitute for professional legal counsel."
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I apologize, but I'm having trouble processing your request. Please try again later.";
  }
}

// Handle voice calls
app.post("/voice", async (req, res) => {
  const { isActive, sessionId, callerNumber } = req.body;
  
  let response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>`;

  if (isActive === "1") {
    response += `
    <Say voice="en-US-Standard-C" playBeep="true">
        Welcome to Lexa's AI Legal Assistant. Please state your legal question after the beep.
    </Say>
    <Record
        finishOnKey="#"
        maxLength="30"
        trimSilence="true"
        playBeep="true"
        callbackUrl="${process.env.BASE_URL}/voice/recording"/>`;
  }

  response += `
</Response>`;

  res.type('text/xml');
  res.send(response);
});

// Handle voice recording callback
app.post("/voice/recording", async (req, res) => {
  const { recordingUrl, callerNumber, durationInSeconds } = req.body;

  try {
    // Here you would:
    // 1. Download the recording
    // 2. Convert speech to text (using a service like Whisper)
    // 3. Generate AI response
    // 4. Convert response to speech
    // For now, we'll use a simple response

    const response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="en-US-Standard-C">
        Thank you for your question. Based on my analysis, I recommend consulting with a qualified legal professional for detailed guidance. Would you like me to connect you with a lawyer now? Press 1 for yes, or 2 to end the call.
    </Say>
    <GetDigits timeout="10" finishOnKey="#" callbackUrl="${process.env.BASE_URL}/voice/choice">
        <Say>Press 1 to speak with a lawyer, or 2 to end the call.</Say>
    </GetDigits>
</Response>`;

    res.type('text/xml');
    res.send(response);
  } catch (error) {
    console.error('Error processing voice recording:', error);
    res.type('text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>I apologize, but I encountered an error processing your request. Please try again later.</Say>
</Response>`);
  }
});

// Handle user choice callback
app.post("/voice/choice", async (req, res) => {
  const { dtmfDigits, callerNumber } = req.body;

  let response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>`;

  if (dtmfDigits === "1") {
    response += `
    <Say>Connecting you to a lawyer now. Please note that standard legal consultation rates may apply.</Say>
    <Dial phoneNumbers="+1234567890" />`; // Replace with actual lawyer's number
  } else {
    response += `
    <Say>Thank you for using Lexa's AI Legal Assistant. Goodbye!</Say>`;
  }

  response += `
</Response>`;

  res.type('text/xml');
  res.send(response);
});

app.get("/", (req, res) => {
  const messagesHtml = messageHistory
    .map(
      (msg) => `
      <div class="message-card">
        <div class="message-header">
          <span class="badge ${msg.type === 'sent' ? 'badge-success' : 'badge-info'}">${msg.type}</span>
          <span class="message-time">${msg.timestamp}</span>
        </div>
        <div class="message-recipient">To: ${msg.recipient}</div>
        <div class="message-content">${msg.message}</div>
      </div>
    `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SMS & Voice Dashboard</title>
        <style>
            :root {
                --primary: #4F46E5;
                --success: #10B981;
                --info: #3B82F6;
                --gray-50: #F9FAFB;
                --gray-100: #F3F4F6;
                --gray-200: #E5E7EB;
                --gray-700: #374151;
                --gray-800: #1F2937;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: system-ui, -apple-system, sans-serif;
                background: var(--gray-100);
                color: var(--gray-800);
                line-height: 1.5;
                padding: 2rem;
            }

            .container {
                max-width: 800px;
                margin: 0 auto;
            }

            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                padding: 1.5rem;
                margin-bottom: 2rem;
            }

            h1 {
                color: var(--gray-800);
                font-size: 1.875rem;
                margin-bottom: 1.5rem;
            }

            .form-group {
                margin-bottom: 1rem;
            }

            label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--gray-700);
                font-weight: 500;
            }

            input, textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--gray-200);
                border-radius: 6px;
                font-size: 1rem;
            }

            button {
                background: var(--primary);
                color: white;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                cursor: pointer;
            }

            .message-card {
                background: white;
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                border: 1px solid var(--gray-200);
            }

            .message-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .badge {
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 500;
            }

            .badge-success {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success);
            }

            .badge-info {
                background: rgba(59, 130, 246, 0.1);
                color: var(--info);
            }

            .message-time {
                font-size: 0.875rem;
                color: var(--gray-700);
            }

            .message-recipient {
                font-size: 0.875rem;
                color: var(--gray-700);
                margin-bottom: 0.5rem;
            }

            .tabs {
                display: flex;
                margin-bottom: 1rem;
            }

            .tab {
                padding: 0.75rem 1.5rem;
                border: none;
                background: none;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                color: var(--gray-700);
            }

            .tab.active {
                border-bottom-color: var(--primary);
                color: var(--primary);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <h1>SMS & Voice Dashboard</h1>
                <div class="tabs">
                    <button class="tab active" data-tab="sms">SMS Messages</button>
                    <button class="tab" data-tab="voice">Voice Calls</button>
                </div>
                
                <div id="sms-tab">
                    <form action="/send-sms" method="POST">
                        <div class="form-group">
                            <label for="recipients">Recipients (comma-separated)</label>
                            <input type="text" id="recipients" name="recipients" required 
                                   placeholder="e.g. +254700000000, +254711111111">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="4" required 
                                     placeholder="Enter your message"></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                
                <div id="voice-tab" style="display: none;">
                    <form action="/initiate-call" method="POST">
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required 
                                   placeholder="e.g. +254700000000">
                        </div>
                        <button type="submit">Initiate Call</button>
                    </form>
                </div>
            </div>

            <div class="card">
                <h2>Message History</h2>
                <div class="messages-list">
                    ${messagesHtml || '<p>No messages yet</p>'}
                </div>
            </div>
        </div>
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const tabs = document.querySelectorAll('.tab');
                
                tabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        // Remove active class from all tabs
                        tabs.forEach(t => t.classList.remove('active'));
                        
                        // Add active class to clicked tab
                        this.classList.add('active');
                        
                        // Hide all tab content
                        document.getElementById('sms-tab').style.display = 'none';
                        document.getElementById('voice-tab').style.display = 'none';
                        
                        // Show selected tab content
                        const tabName = this.getAttribute('data-tab');
                        document.getElementById(tabName + '-tab').style.display = 'block';
                    });
                });
            });
        </script>
    </body>
    </html>
  `);
});

app.post("/send-sms", async (req, res) => {
  const { recipients, message } = req.body;
  
  if (!recipients || !message) {
    res.status(400).send("Recipients and message are required");
    return;
  }

  const phoneNumbers = recipients.split(",").map(num => num.trim());

  try {
    const result = await africastalking.SMS.send({
      to: phoneNumbers,
      message: message,
      from: process.env.SENDER_ID,
    });

    phoneNumbers.forEach(phone => {
      messageHistory.unshift({
        type: "sent",
        recipient: phone,
        message: message,
        timestamp: new Date().toLocaleString()
      });
    });

    res.redirect("/");
  } catch (error) {
    console.error("Failed to send SMS:", error);
    res.status(500).send("Failed to send SMS");
  }
});

// Initiate a voice call
app.post("/initiate-call", async (req, res) => {
  const { phone } = req.body;

  try {
    const result = await africastalking.VOICE.call({
      callFrom: process.env.AT_NUMBER,
      callTo: [phone]
    });

    res.redirect("/");
  } catch (error) {
    console.error("Failed to initiate call:", error);
    res.status(500).send("Failed to initiate call");
  }
});

app.post("/webhook", (req, res) => {
  const { from, text } = req.body;
  
  messageHistory.unshift({
    type: "received",
    recipient: from,
    message: text,
    timestamp: new Date().toLocaleString()
  });

  res.status(200).send("OK");
});

const port = 5000;
app.listen(port, () => {
  console.log(`SMS & Voice Server running on http://localhost:${port}`);
});