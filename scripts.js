document.addEventListener("DOMContentLoaded", function () {

    // ================== Message Analyzer ==================
    const analyzeBtn = document.getElementById("analyzebtn");
    if (analyzeBtn) {
        analyzeBtn.addEventListener("click", function () {
            const msgInput = document.getElementById("msginput").value.toLowerCase();
            let score = 0;
            let detectedWords = [];

            const highRiskWords = ["otp","bank account","share password","account suspended"];
            const mediumRiskWords = ["verify","click here","urgent","claim","lottery"];
            const lowRiskWords = ["free","winner","congratulations"];
            const safeWords = ["official","secured","protected"];

            highRiskWords.forEach(word => {
                const count = (msgInput.match(new RegExp(word, "gi")) || []).length;
                if (count) { score += 30*count; detectedWords.push(word); }
            });
            mediumRiskWords.forEach(word => {
                const count = (msgInput.match(new RegExp(word, "gi")) || []).length;
                if (count) { score += 15*count; detectedWords.push(word); }
            });
            lowRiskWords.forEach(word => {
                const count = (msgInput.match(new RegExp(word, "gi")) || []).length;
                if (count) { score += 5*count; detectedWords.push(word); }
            });
            safeWords.forEach(word => {
                if (msgInput.includes(word)) { score -= 10; detectedWords.push("safe: "+word); }
            });

            score = Math.min(Math.max(score, 0), 100);

            let level = "";
            if (score === 0) level = "Safe";
            else if (score <= 30) level = "Low Risk";
            else if (score <= 60) level = "Medium Risk";
            else level = "High Risk";

            const explanation = detectedWords.length ? "Detected: "+detectedWords.join(", ") : "No suspicious keywords";

            document.getElementById("scoredisplay")?.innerText = score+"%";
            document.getElementById("riskdisplay")?.innerText = level;
            document.getElementById("riskexplain")?.innerText = explanation;
        });
    }

    // ================== URL Checker ==================
    const urlCheckBtn = document.getElementById("urlcheckbtn");
    if (urlCheckBtn) {
        urlCheckBtn.addEventListener("click", function () {
            const url = document.getElementById("urlinput").value.trim().toLowerCase();
            if (!url) {
                alert("Please enter a URL!");
                return;
            }

            let score = 0;
            let threatTypes = [];

            const shorteners = ["bit.ly","tinyurl","goo.gl","t.co","ow.ly"];
            if (shorteners.some(s => url.includes(s))) { score += 25; threatTypes.push("Shortened URL"); }

            const suspiciousTLDs = [".ru",".xyz",".cn",".tk"];
            if (suspiciousTLDs.some(t => url.endsWith(t))) { score += 30; threatTypes.push("Suspicious Domain"); }

            const ipRegex = /^(http[s]?:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
            if (ipRegex.test(url)) { score += 20; threatTypes.push("IP Address URL"); }

            const randomNumRegex = /[a-z]*\d{3,}[a-z]*\./;
            if (randomNumRegex.test(url)) { score += 15; threatTypes.push("Random Numbers in Domain"); }

            if (url.startsWith("http://")) { score += 10; threatTypes.push("Not Secure (HTTP)"); }

            score = Math.min(score, 100);

            let confidence = "";
            if (score < 20) confidence = "Low";
            else if (score < 50) confidence = "Medium";
            else confidence = "High";

            document.getElementById("urlthreattype")?.innerText = threatTypes.length ? threatTypes.join(", ") : "Safe";
            document.getElementById("urlscore")?.innerText = score + "%";
            document.getElementById("urlconfidence")?.innerText = confidence;
        });
    }

});