// llm_spam.js
// LLM-based spam alert detection for ScamShield
// Requires OpenAI API key (for demo only, don't expose in production)

async function analyzeWithLLM(message) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a spam detection assistant. Analyze the message and return JSON with risk_score (0-100), risk_level (Safe/Low/Medium/High), and explanation."
                    },
                    { role: "user", content: message }
                ],
                temperature: 0
            })
        });

        const data = await response.json();

        // Ensure the LLM returns strict JSON
        // Example: {"risk_score":90,"risk_level":"High Risk","explanation":"Contains OTP and urgent keywords"}
        let resultText = data.choices[0].message.content;

        // Remove any extra text before parsing
        const jsonStart = resultText.indexOf("{");
        const jsonEnd = resultText.lastIndexOf("}");
        const jsonString = resultText.substring(jsonStart, jsonEnd + 1);

        const result = JSON.parse(jsonString);
        return result;

    } catch (err) {
        console.error("LLM API error:", err);
        return { risk_score: 0, risk_level: "Safe", explanation: "Error calling LLM" };
    }
}

// Connect the textarea button to LLM
function connectLLMTextarea(textareaId, buttonId, scoreId, riskId, explanationId) {
    const textarea = document.getElementById(textareaId);
    const button = document.getElementById(buttonId);
    const scoreDisplay = document.getElementById(scoreId);
    const riskDisplay = document.getElementById(riskId);
    const explanationDisplay = document.getElementById(explanationId);

    button.addEventListener("click", async () => {
        const message = textarea.value;
        scoreDisplay.innerText = "Analyzing...";
        riskDisplay.innerText = "...";
        explanationDisplay.innerText = "...";

        const result = await analyzeWithLLM(message);

        scoreDisplay.innerText = result.risk_score + "%";
        riskDisplay.innerText = result.risk_level;
        explanationDisplay.innerText = result.explanation;

        // Optional: store last analyzed message in localStorage for dashboard
        localStorage.setItem("lastLLMCheck", JSON.stringify({
            message: message,
            score: result.risk_score,
            risk: result.risk_level,
            explanation: result.explanation
        }));
    });
}