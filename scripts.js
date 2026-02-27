document.addEventListener("DOMContentLoaded", function(){

    // ---------- Tabs ----------
    const tabButtons = document.querySelectorAll("#tabs button");
    const tabContents = document.querySelectorAll(".tab-content");
    tabButtons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const tabId = btn.getAttribute("data-tab");
            tabContents.forEach(tc=>tc.classList.remove("active"));
            document.getElementById(tabId).classList.add("active");

            if(tabId==="dashboard") updateDashboard();
            if(tabId==="learn") animateLearn();
        });
    });
    if(tabContents.length>0) tabContents[0].classList.add("active");

    // ---------- Message Analyzer ----------
    const analyzeBtn = document.getElementById("analyzebtn");
    if(analyzeBtn){
        analyzeBtn.addEventListener("click",()=>{
            const msg = document.getElementById("msginput").value.toLowerCase();
            let score=0, signals=[];
            const high=["otp","bank account","share password","account suspended"];
            const medium=["verify","click here","urgent","claim","lottery"];
            const low=["free","winner","congratulations"];

            // High risk words = 90 points
            high.forEach(w=>{ if(msg.includes(w)){score+=90; signals.push(w);} });
            medium.forEach(w=>{ if(msg.includes(w)){score+=50; signals.push(w);} });
            low.forEach(w=>{ if(msg.includes(w)){score+=20; signals.push(w);} });

            score=Math.min(Math.max(score,0),100);

            let risk=score===0?"Safe":score<=30?"Low Risk":score<=60?"Medium Risk":"High Risk";

            document.getElementById("scoredisplay").innerText=score+"%";
            document.getElementById("riskdisplay").innerText=risk;
            document.getElementById("riskexplain").innerText=signals.join(", ") || "-";

            localStorage.setItem("lastMessage", JSON.stringify({
                text: msg,
                score: score+"%",
                risk: risk,
                signals: signals.join(", ")
            }));
        });
    }

    // ---------- URL Checker ----------
    const urlBtn = document.getElementById("urlcheckbtn");
    if(urlBtn){
        urlBtn.addEventListener("click",()=>{
            const url = document.getElementById("urlinput").value.trim().toLowerCase();
            let score=0, threats=[];
            const shorteners=["bit.ly","tinyurl","goo.gl","t.co","ow.ly"];
            const tlds=[".ru",".xyz",".cn",".tk"];
            const ipRegex=/^(http[s]?:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
            const randNum=/[a-z]*\d{3,}[a-z]*\./;

            // URL risk contribution
            if(shorteners.some(s=>url.includes(s))){score+=20; threats.push("Shortened URL");}
            if(tlds.some(t=>url.endsWith(t))){score+=25; threats.push("Suspicious Domain");}
            if(ipRegex.test(url)){score+=15; threats.push("IP Address URL");}
            if(randNum.test(url)){score+=10; threats.push("Random Numbers");}
            if(url.startsWith("http://")){score+=70; threats.push("Not Secure");}

            // Cap max risk at 70%
            score = Math.min(score, 70);

            let confidence=score<20?"Low":score<50?"Medium":"High";

            document.getElementById("urlthreattype").innerText = threats.join(",") || "Safe";
            document.getElementById("urlscore").innerText = score + "%";
            document.getElementById("urlconfidence").innerText = confidence;

            localStorage.setItem("lastURL", JSON.stringify({
                url: url,
                score: score+"%",
                threatType: threats.join(",") || "Safe",
                confidence: confidence
            }));
        });
    }

    // ---------- Dashboard ----------
    function updateDashboard(){
        const lastMessage=JSON.parse(localStorage.getItem("lastMessage"))||{};
        const lastURL=JSON.parse(localStorage.getItem("lastURL"))||{};

        document.getElementById("dash-message").innerText = lastMessage.text || "-";
        document.getElementById("dash-message-score").innerText = lastMessage.score || "-";
        document.getElementById("dash-message-risk").innerText = lastMessage.risk || "-";
        document.getElementById("dash-message-signals").innerText = lastMessage.signals || "-";

        document.getElementById("dash-url").innerText = lastURL.url || "-";
        document.getElementById("dash-url-score").innerText = lastURL.score || "-";
        document.getElementById("dash-url-type").innerText = lastURL.threatType || "-";
        document.getElementById("dash-url-confidence").innerText = lastURL.confidence || "-";

        document.querySelectorAll(".dashboard-box").forEach(box=>{
            box.classList.add("updated");
            setTimeout(()=>box.classList.remove("updated"),500);
        });
    }

    // ---------- Learn Page Animation ----------
    function animateLearn(){
        const fadeElements = document.querySelectorAll("#learn > .dashboard-box");
        fadeElements.forEach((el,i)=> setTimeout(()=>el.classList.add("visible"), 200*i));
    }

    // ---------- Typewriter heading show learn page content ----------
    const heading = document.getElementById("heading");
    heading.addEventListener("animationend", ()=>{
        if(document.querySelector(".tab-content.active.fade-in")) animateLearn();
    });

});