ScamShield 

 Smart Scam Detection & Cyber Awareness Platform

Basic Details

Team Name: Techno

Team Members

Member 1: Ahsana P S - Mar Athanasius College of Engineering

Member 2: Adheena T Saji – Mar Athanasius College of Engineering

Hosted Project Link

https://github.com/ahsana-eng/scamshield3

Project Description

ScamShield is a web-based cybersecurity platform that detects scam SMS messages and suspicious URLs using keyword-based risk analysis. It also provides a threat intelligence dashboard and a cyber awareness page to educate users about common scams and prevention strategies. The system helps users quickly identify potential digital threats and understand online safety practices.
The Problem Statement
With the increasing number of phishing attacks, OTP frauds, and malicious links, many users fall victim to scams due to lack of awareness and instant verification tools. There is a need for a simple and accessible solution that can analyze messages and URLs in real time while also educating users about cyber safety.

The Solution

ScamShield solves this problem by:
Analyzing SMS content using risk-level keyword detection
Checking URLs for phishing indicators (IP-based URLs, suspicious domains, shorteners, HTTP usage)
Storing recent analysis results in a dashboard
Providing a dedicated cyber awareness section

Technical Details
Technologies / Components Used
For Software

Languages used:
HTML
CSS
JavaScript

Frameworks used:
None (Vanilla JavaScript implementation)

Libraries used:
None

Tools used:
VS Code

Web Browser (Chrome)

LocalStorage (for data persistence)

For Hardware

Not applicable (Software-only project)

Features
Feature 1: Scam SMS Detector
Analyzes user-entered messages by scanning for high-risk, medium-risk, and low-risk keywords such as:
High risk: OTP, bank account, share password
Medium risk: verify, urgent, lottery
Low risk: free, winner
Generates:
Scam Probability (0–100%)
Risk Level (Safe, Low, Medium, High)
Triggered Risk Signals

Feature 2: URL Checker
Analyzes URLs based on:
Suspicious top-level domains (.ru, .xyz, .tk)
URL shorteners (bit.ly, tinyurl, etc.)
IP-based URLs
Random numeric patterns
HTTP (not secure) protocol
Generates:
Threat Type
Risk Score
Confidence Level

Feature 3: Threat Intelligence Dashboard
Displays:
Last analyzed message
Last analyzed URL
Risk scores and classifications
Stored results using browser LocalStorage
Includes animation effects for better user experience.

Feature 4: Cyber Awareness Page
Provides educational content including:
Common scam types
How phishing works
Red flag checklist
Online safety tips
Includes fade-in animations and typewriter heading effect.
Implementation
For Software
Installation
No external installation required.

Download project files:

index.html

style.css

scripts.js

Place them in the same folder.

Run

Open index.html in any modern web browser.

No backend or server required.

Project Documentation
Screenshots

<img width="1920" height="1080" alt="Screenshot 2026-02-28 085543" src="https://github.com/user-attachments/assets/1cb87cf1-4d94-4ac8-93b6-04f4c2a63705" />
first feature,sms scam detector. user copies the sms and it analyses and display the scam % and risk value
<img width="1920" height="1080" alt="Screenshot 2026-02-28 085527" src="https://github.com/user-attachments/assets/c76a8c5a-b294-4cb4-b3d0-6f303782bc28" />
second feature url checker
<img width="1920" height="1080" alt="Screenshot 2026-02-28 085511" src="https://github.com/user-attachments/assets/f910bf8f-0db9-459e-aa83-4b3e3f62b9b8" />
dashboard . it shows the last message analysed also last analysed url
<img width="1920" height="1080" alt="Screenshot 2026-02-28 085453" src="https://github.com/user-attachments/assets/af67b06a-156f-46c3-8a85-20e76e542e90" />
cyber security awareness page


Diagrams
System Architecture

Architecture Overview:

User → Browser (Frontend UI) → JavaScript Risk Engine → LocalStorage → Dashboard

User inputs message or URL

JavaScript processes risk logic

Score is calculated using keyword rules

Results stored in LocalStorage

Dashboard retrieves and displays stored data

Application Workflow
User selects a tab (Message / URL / Dashboard / Learn).
User enters text or URL.
JavaScript analyzes content using rule-based detection.
Risk score and classification are generated.
Results are saved to LocalStorage.
Dashboard displays stored analysis.
Learn page educates users about cyber threats.

Unique Highlights

Fully frontend-based (No backend required)

Real-time risk scoring
