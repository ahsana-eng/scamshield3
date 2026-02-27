// This runs after the page loads
document.getElementById("analyzebtn").addEventListener("click", function () {

    // Get message from textarea
    let message = document.getElementById("msginput").value;

    // Convert to lowercase for easier checking
    message = message.toLowerCase();

    // List of scam-related keywords
    let scamKeywords = [
        "urgent",
        "bank",
        "otp",
        "password",
        "verify",
        "click here",
        "lottery",
        "winner",
        "congratulations",
        "free",
        "claim",
        "account suspended"
    ];

    let score = 0;

    // Check how many keywords appear
    for (let i = 0; i < scamKeywords.length; i++) {
        if (message.includes(scamKeywords[i])) {
            score += 10;
        }
    }

    // Limit score to 100%
    if (score > 100) {
        score = 100;
    }

    // Decide risk level
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

    // Display results
    document.getElementById("scoredisplay").innerText = score + "%";
    document.getElementById("riskdisplay").innerText = riskLevel;

});