
function analyzeMessage() {


    let message = document.getElementById("msginput").value;

    message = message.toLowerCase();


    let scamKeywords = [
        "urgent",
        "bank",
        "otp",
        "password",
        "verify",
        "click here",
        "limited time",
        "lottery",
        "winner",
        "congratulations",
        "free",
        "claim now",
        "account suspended"
    ];

    let score = 0;

    // Check how many scam keywords appear
    for (let i = 0; i < scamKeywords.length; i++) {
        if (message.includes(scamKeywords[i])) {
            score += 10;
        }
    }

    // Cap score at 100%
    if (score > 100) {
        score = 100;
    }

    // Determine risk level
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

    // Display results on the page
    document.getElementById("scoredisplay").innerText = score + "%";
    document.getElementById("riskdisplay").innerText = riskLevel;
}