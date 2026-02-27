document.getElementById("analyzebtn").addEventListener("click", function () {

    let message = document.getElementById("msginput").value;
    message = message.toLowerCase();

    let score = 0;

    // High Risk Keywords (Very dangerous)
    let highRiskWords = [
        "otp",
        "bank account",
        "share password",
        "account suspended"
    ];

    // Medium Risk Keywords
    let mediumRiskWords = [
        "verify",
        "click here",
        "urgent",
        "claim",
        "lottery"
    ];

    // Low Risk Keywords
    let lowRiskWords = [
        "free",
        "winner",
        "congratulations"
    ];

    // Check high risk words
    for (let i = 0; i < highRiskWords.length; i++) {
        if (message.includes(highRiskWords[i])) {
            score += 90;
        }
    }

    // Check medium risk words
    for (let i = 0; i < mediumRiskWords.length; i++) {
        if (message.includes(mediumRiskWords[i])) {
            score += 20;
        }
    }

    // Check low risk words
    for (let i = 0; i < lowRiskWords.length; i++) {
        if (message.includes(lowRiskWords[i])) {
            score += 10;
        }
    }

    // Cap score at 100%
    if (score > 100) {
        score = 100;
    }

    let riskLevel = "";

    if (score === 0) {
        riskLevel = "Safe";
    }
    else if (score <= 30) {
        riskLevel = "Low Risk";
    }
    else if (score <= 60) {
        riskLevel = "Medium Risk";
    }
    else {
        riskLevel = "High Risk";
    }

    document.getElementById("scoredisplay").innerText = score + "%";
    document.getElementById("riskdisplay").innerText = riskLevel;

});
// ================== URL Phishing Detector ==================
const urlCheckBtn = document.getElementById("urlcheckbtn");
if (urlCheckBtn) {
    urlCheckBtn.addEventListener("click", function () {
        const url = document.getElementById("urlinput").value.trim().toLowerCase();
        const result = analyzeURL(url);
        document.getElementById("urlthreattype").innerText = result.type;
        document.getElementById("urlscore").innerText = result.score + "%";
        document.getElementById("urlconfidence").innerText = result.confidence;
    });
}

function analyzeURL(url) {
    if (!url) return { type: "-", score: 0, confidence: "-" };

    let score = 0;
    let threatType = [];
    
    // Check for shortened URLs
    const shorteners = ["bit.ly", "tinyurl", "goo.gl", "t.co", "ow.ly"];
    if (shorteners.some(domain => url.includes(domain))) {
        score += 25;
        threatType.push("Shortened URL");
    }

    // Suspicious domains
    const suspiciousTLDs = [".ru", ".xyz", ".cn", ".tk"];
    if (suspiciousTLDs.some(tld => url.endsWith(tld))) {
        score += 30;
        threatType.push("Suspicious Domain");
    }

    // IP address URL
    const ipRegex = /^(http[s]?:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
    if (ipRegex.test(url)) {
        score += 20;
        threatType.push("IP Address URL");
    }

    // Random numbers in domain (e.g., login123.site.com)
    const randomNumRegex = /[a-z]*\d{3,}[a-z]*\./;
    if (randomNumRegex.test(url)) {
        score += 15;
        threatType.push("Random Numbers in Domain");
    }

    // HTTP instead of HTTPS
    if (url.startsWith("http://")) {
        score += 10;
        threatType.push("Not Secure (HTTP)");
    }

    // Cap score at 100%
    score = Math.min(score, 100);

    // Confidence based on score
    let confidence = "";
    if (score < 20) confidence = "Low";
    else if (score < 50) confidence = "Medium";
    else confidence = "High";

    return {
        type: threatType.length ? threatType.join(", ") : "Safe",
        score,
        confidence
    };
}