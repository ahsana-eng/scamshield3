document.addEventListener("DOMContentLoaded", function () {

    // -------------------- Utilities --------------------

    // Animate numeric score
    function animateScore(element, finalScore) {
        if(!element) return;
        let current = 0;
        const increment = finalScore > 50 ? 2 : 1;
        const interval = setInterval(() => {
            if(current >= finalScore){
                clearInterval(interval);
                element.innerText = finalScore + "%";
            } else {
                current += increment;
                element.innerText = current + "%";
            }
        }, 15);
    }

    // Flash highlight effect
    function flashElement(el){
        if(!el) return;
        el.classList.add("highlight");
        setTimeout(()=> el.classList.remove("highlight"),500);
    }

    // Pulse dashboard boxes
    function pulseDashboard(){
        document.querySelectorAll(".dashboard-box").forEach(box=>{
            box.classList.add("updated");
            setTimeout(()=>box.classList.remove("updated"),500);
        });
    }

    // -------------------- Tabs --------------------
    const tabButtons = document.querySelectorAll("#tabs button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const tabId = btn.getAttribute("data-tab");
            tabContents.forEach(tc=>tc.classList.remove("active"));
            const activeTab = document.getElementById(tabId);
            if(activeTab) activeTab.classList.add("active");

            if(tabId==="dashboard") updateDashboard();
        });
    });

    if(tabContents.length>0) tabContents[0].classList.add("active");

    // -------------------- Message Analyzer --------------------
    const analyzeBtn = document.getElementById("analyzebtn");
    if(analyzeBtn){
        analyzeBtn.addEventListener("click",()=>{
            const msgEl = document.getElementById("msginput");
            if(!msgEl) return;
            const msg = msgEl.value.toLowerCase();
            let score=0;
            let signals=[];

            const high=["otp","bank account","share password","account suspended"];
            const medium=["verify","click here","urgent","claim","lottery"];
            const low=["free","winner","congratulations"];
            const safe=["official","secured","protected"];

            high.forEach(w=>{ if(msg.includes(w)){score+=30; signals.push(w);} });
            medium.forEach(w=>{ if(msg.includes(w)){score+=15; signals.push(w);} });
            low.forEach(w=>{ if(msg.includes(w)){score+=5; signals.push(w);} });
            safe.forEach(w=>{ if(msg.includes(w)){score-=10; signals.push("safe:"+w);} });

            score=Math.min(Math.max(score,0),100);

            let risk="";
            if(score===0) risk="Safe";
            else if(score<=30) risk="Low Risk";
            else if(score<=60) risk="Medium Risk";
            else risk="High Risk";

            const scoreEl=document.getElementById("scoredisplay");
            const riskEl=document.getElementById("riskdisplay");
            const explainEl=document.getElementById("riskexplain");

            if(scoreEl) animateScore(scoreEl,score);
            if(riskEl) riskEl.innerText = risk;
            if(explainEl){
                explainEl.innerText = signals.join(", ") || "-";
                flashElement(explainEl);
            }

            localStorage.setItem("lastMessage",JSON.stringify({
                text: msgEl.value,
                score: score+"%",
                risk: risk,
                signals: signals.join(", ")
            }));
        });
    }

    // -------------------- URL Checker --------------------
    const urlBtn = document.getElementById("urlcheckbtn");
    if(urlBtn){
        urlBtn.addEventListener("click",()=>{
            const urlEl = document.getElementById("urlinput");
            if(!urlEl) return;
            const url = urlEl.value.trim().toLowerCase();
            if(!url){ alert("Enter URL!"); return; }

            let score=0;
            let threats=[];

            const shorteners=["bit.ly","tinyurl","goo.gl","t.co","ow.ly"];
            const tlds=[".ru",".xyz",".cn",".tk"];
            const ipRegex=/^(http[s]?:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
            const randNum=/[a-z]*\d{3,}[a-z]*\./;

            if(shorteners.some(s=>url.includes(s))){score+=25; threats.push("Shortened URL");}
            if(tlds.some(t=>url.endsWith(t))){score+=30; threats.push("Suspicious Domain");}
            if(ipRegex.test(url)){score+=20; threats.push("IP Address URL");}
            if(randNum.test(url)){score+=15; threats.push("Random Numbers in Domain");}
            if(url.startsWith("http://")){score+=10; threats.push("Not Secure (HTTP)");}

            score=Math.min(score,100);

            let confidence="";
            if(score<20) confidence="Low";
            else if(score<50) confidence="Medium";
            else confidence="High";

            const threatEl=document.getElementById("urlthreattype");
            const scoreEl=document.getElementById("urlscore");
            const confEl=document.getElementById("urlconfidence");

            if(threatEl) threatEl.innerText=threats.join(",")||"Safe";
            if(scoreEl) animateScore(scoreEl,score);
            if(confEl) confEl.innerText = confidence;

            localStorage.setItem("lastURL",JSON.stringify({
                url: urlEl.value,
                score: score+"%",
                threatType: threats.join(",")||"Safe",
                confidence: confidence
            }));
        });
    }

    // -------------------- Dashboard --------------------
    function updateDashboard(){
        const lastMessage = JSON.parse(localStorage.getItem("lastMessage")) || {};
        const lastURL = JSON.parse(localStorage.getItem("lastURL")) || {};

        document.getElementById("dash-message").innerText = lastMessage.text || "-";
        document.getElementById("dash-message-score").innerText = lastMessage.score || "-";
        document.getElementById("dash-message-risk").innerText = lastMessage.risk || "-";
        document.getElementById("dash-message-signals").innerText = lastMessage.signals || "-";

        document.getElementById("dash-url").innerText = lastURL.url || "-";
        document.getElementById("dash-url-score").innerText = lastURL.score || "-";
        document.getElementById("dash-url-type").innerText = lastURL.threatType || "-";
        document.getElementById("dash-url-confidence").innerText = lastURL.confidence || "-";

        pulseDashboard();
    }

    // -------------------- Learn Page Animations --------------------
    const learnHeading = document.getElementById("heading");
    const learnContent = document.getElementById("learn-content");

    if(learnHeading && learnContent){
        learnHeading.addEventListener("animationend", () => {
            learnContent.classList.add("visible");
            const fadeElements = document.querySelectorAll("#learn-content > .fade-in");
            fadeElements.forEach((el,i)=>{
                setTimeout(()=> el.classList.add("visible"), 200*i);
            });
        });
    }

});