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