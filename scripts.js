// Wrap everything in DOMContentLoaded to ensure elements exist
document.addEventListener("DOMContentLoaded", function () {

    // ------------------ Message Analyzer ------------------
    const analyzeBtn = document.getElementById("analyzebtn");
    if (analyzeBtn) {
        analyzeBtn.addEventListener("click", function () {
            const msgInputEl = document.getElementById("msginput");
            if (!msgInputEl) return;

            const msgInput = msgInputEl.value.toLowerCase();
            let score = 0;
            let detectedWords = [];

            const highRiskWords = ["otp","bank account","share password","account suspended"];
            const mediumRiskWords = ["verify","click here","urgent","claim","lottery"];
            const lowRiskWords = ["free","winner","congratulations"];
            const safeWords = ["official","secured","protected"];

            // Count keywords
            highRiskWords.forEach(word => {
                if (msgInput.includes(word)) { score += 30; detectedWords.push(word); }
            });
            mediumRiskWords.forEach(word => {
                if (msgInput.includes(word)) { score += 15; detectedWords.push(word); }
            });
            lowRiskWords.forEach(word => {
                if (msgInput.includes(word)) { score += 5; detectedWords.push(word); }
            });
            safeWords.forEach(word => {
                if (msgInput.includes(word)) { score -= 10; detectedWords.push("safe:"+word); }
            });

            score = Math.min(Math.max(score,0),100);

            let riskLevel = "";
            if (score === 0) riskLevel = "Safe";
            else if (score <= 30) riskLevel = "Low Risk";
            else if (score <= 60) riskLevel = "Medium Risk";
            else riskLevel = "High Risk";

            const explanation = detectedWords.length ? "Detected: "+detectedWords.join(", ") : "No suspicious keywords";

            // Update DOM safely
            const scoreDisplay = document.getElementById("scoredisplay");
            const riskDisplay = document.getElementById("riskdisplay");
            const riskExplain = document.getElementById("riskexplain");

            if (scoreDisplay) scoreDisplay.innerText = score + "%";
            if (riskDisplay) riskDisplay.innerText = riskLevel;
            if (riskExplain) riskExplain.innerText = explanation;
        });
    }

    // ------------------ URL Checker ------------------
    const urlCheckBtn = document.getElementById("urlcheckbtn");
    if (urlCheckBtn) {
        urlCheckBtn.addEventListener("click", function () {
            const urlInputEl = document.getElementById("urlinput");
            if (!urlInputEl) return;

            const url = urlInputEl.value.trim().toLowerCase();
            if (!url) {
                alert("Please enter a URL!");
                return;
            }

            let score = 0;
            let threatTypes = [];

            // Shortened URLs
            const shorteners = ["bit.ly","tinyurl","goo.gl","t.co","ow.ly"];
            if (shorteners.some(s => url.includes(s))) { score += 25; threatTypes.push("Shortened URL"); }

            // Suspicious TLDs
            const suspiciousTLDs = [".ru",".xyz",".cn",".tk"];
            if (suspiciousTLDs.some(t => url.endsWith(t))) { score += 30; threatTypes.push("Suspicious Domain"); }

            // IP Address
            const ipRegex = /^(http[s]?:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
            if (ipRegex.test(url)) { score += 20; threatTypes.push("IP Address URL"); }

            // Random numbers in domain
            const randomNumRegex = /[a-z]*\d{3,}[a-z]*\./;
            if (randomNumRegex.test(url)) { score += 15; threatTypes.push("Random Numbers in Domain"); }

            // HTTP instead of HTTPS
            if (url.startsWith("http://")) { score += 10; threatTypes.push("Not Secure (HTTP)"); }

            // Cap score at 100
            score = Math.min(score, 100);

            // Confidence
            let confidence = "";
            if (score < 20) confidence = "Low";
            else if (score < 50) confidence = "Medium";
            else confidence = "High";

            // Update DOM
            const threatDisplay = document.getElementById("urlthreattype");
            const scoreDisplay = document.getElementById("urlscore");
            const confidenceDisplay = document.getElementById("urlconfidence");

            if (threatDisplay) threatDisplay.innerText = threatTypes.length ? threatTypes.join(", ") : "Safe";
            if (scoreDisplay) scoreDisplay.innerText = score + "%";
            if (confidenceDisplay) confidenceDisplay.innerText = confidence;
        });
    }

});