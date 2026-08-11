const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

const startTime = new Date();

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Node.js DevOps CI/CD</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background:
                radial-gradient(circle at top left, #1e3a8a 0%, transparent 35%),
                radial-gradient(circle at bottom right, #312e81 0%, transparent 35%),
                #080b16;
            color: #ffffff;
            min-height: 100vh;
        }

        .container {
            width: 90%;
            max-width: 1100px;
            margin: auto;
            padding: 40px 0;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 60px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
        }

        .logo span {
            color: #60a5fa;
        }

        .status {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 15px;
            border-radius: 30px;
            background: rgba(34, 197, 94, 0.12);
            border: 1px solid rgba(34, 197, 94, 0.35);
            color: #4ade80;
            font-size: 14px;
        }

        .dot {
            width: 9px;
            height: 9px;
            background: #4ade80;
            border-radius: 50%;
            box-shadow: 0 0 10px #4ade80;
        }

        .hero {
            text-align: center;
            margin-bottom: 50px;
        }

        .badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 30px;
            background: rgba(96, 165, 250, 0.12);
            border: 1px solid rgba(96, 165, 250, 0.3);
            color: #93c5fd;
            font-size: 14px;
            margin-bottom: 25px;
        }

        h1 {
            font-size: clamp(42px, 7vw, 78px);
            line-height: 1.05;
            margin-bottom: 20px;
            background: linear-gradient(
                90deg,
                #ffffff,
                #60a5fa,
                #a78bfa
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .subtitle {
            color: #94a3b8;
            font-size: 18px;
            max-width: 700px;
            margin: auto;
            line-height: 1.7;
        }

        .buttons {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .button {
            text-decoration: none;
            color: white;
            padding: 12px 22px;
            border-radius: 10px;
            background: #2563eb;
            transition: 0.2s;
            font-weight: bold;
        }

        .button:hover {
            transform: translateY(-2px);
            background: #3b82f6;
        }

        .button.secondary {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        .card {
            padding: 25px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 18px;
            backdrop-filter: blur(10px);
        }

        .card-icon {
            font-size: 30px;
            margin-bottom: 15px;
        }

        .card h3 {
            margin-bottom: 8px;
            font-size: 18px;
        }

        .card p {
            color: #94a3b8;
            line-height: 1.5;
            font-size: 14px;
        }

        .pipeline {
            padding: 30px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 18px;
            margin-bottom: 40px;
        }

        .pipeline h2 {
            margin-bottom: 25px;
        }

        .steps {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
        }

        .step {
            text-align: center;
            padding: 15px 8px;
            border-radius: 12px;
            background: rgba(34, 197, 94, 0.08);
            border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .step-number {
            color: #4ade80;
            font-weight: bold;
            margin-bottom: 7px;
        }

        .step-name {
            color: #cbd5e1;
            font-size: 12px;
        }

        .info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
        }

        .info-box {
            padding: 25px;
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(148, 163, 184, 0.15);
        }

        .info-box h3 {
            margin-bottom: 15px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(148,163,184,0.1);
            color: #94a3b8;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .value {
            color: #ffffff;
            font-weight: bold;
        }

        footer {
            text-align: center;
            color: #64748b;
            padding: 30px 0;
            font-size: 14px;
        }

        @media (max-width: 800px) {
            .cards {
                grid-template-columns: 1fr;
            }

            .steps {
                grid-template-columns: repeat(2, 1fr);
            }

            .info {
                grid-template-columns: 1fr;
            }

            .navbar {
                margin-bottom: 40px;
            }
        }
    </style>
</head>

<body>

<div class="container">

    <nav class="navbar">
        <div class="logo">
            <span>◆</span> Node.js DevOps
        </div>

        <div class="status">
            <span class="dot"></span>
            System Online
        </div>
    </nav>

    <section class="hero">

        <div class="badge">
            🚀 CI/CD Pipeline Successfully Deployed
        </div>

        <h1>
            Node.js DevOps<br>
            CI/CD Project
        </h1>

        <p class="subtitle">
            A containerized Node.js application automatically tested,
            built, pushed to Docker Hub and deployed through Jenkins.
        </p>

        <div class="buttons">
            <a class="button" href="/health">
                Health Check
            </a>

            <a class="button secondary" href="/api/status">
                API Status
            </a>
        </div>

    </section>

    <section class="cards">

        <div class="card">
            <div class="card-icon">⚙️</div>
            <h3>Jenkins</h3>
            <p>
                Automated CI/CD pipeline handles testing,
                Docker image creation and deployment.
            </p>
        </div>

        <div class="card">
            <div class="card-icon">🐳</div>
            <h3>Docker</h3>
            <p>
                Application is packaged and executed inside
                a lightweight Node.js Docker container.
            </p>
        </div>

        <div class="card">
            <div class="card-icon">☁️</div>
            <h3>Docker Hub</h3>
            <p>
                Docker images are pushed to a Docker Hub
                repository as part of the pipeline.
            </p>
        </div>

    </section>

    <section class="pipeline">

        <h2>Deployment Pipeline</h2>

        <div class="steps">

            <div class="step">
                <div class="step-number">01</div>
                <div class="step-name">GitHub</div>
            </div>

            <div class="step">
                <div class="step-number">02</div>
                <div class="step-name">Jenkins</div>
            </div>

            <div class="step">
                <div class="step-number">03</div>
                <div class="step-name">Test</div>
            </div>

            <div class="step">
                <div class="step-number">04</div>
                <div class="step-name">Docker Build</div>
            </div>

            <div class="step">
                <div class="step-number">05</div>
                <div class="step-name">Docker Hub</div>
            </div>

            <div class="step">
                <div class="step-number">06</div>
                <div class="step-name">Deploy</div>
            </div>

        </div>

    </section>

    <section class="info">

        <div class="info-box">

            <h3>Application Information</h3>

            <div class="info-row">
                <span>Runtime</span>
                <span class="value">Node.js 22</span>
            </div>

            <div class="info-row">
                <span>Framework</span>
                <span class="value">Express</span>
            </div>

            <div class="info-row">
                <span>Port</span>
                <span class="value">${PORT}</span>
            </div>

            <div class="info-row">
                <span>Environment</span>
                <span class="value">Docker</span>
            </div>

        </div>

        <div class="info-box">

            <h3>Deployment Status</h3>

            <div class="info-row">
                <span>Application</span>
                <span class="value">✓ Running</span>
            </div>

            <div class="info-row">
                <span>Container</span>
                <span class="value">✓ Healthy</span>
            </div>

            <div class="info-row">
                <span>CI/CD</span>
                <span class="value">✓ Automated</span>
            </div>

            <div class="info-row">
                <span>Deployment</span>
                <span class="value">✓ Successful</span>
            </div>

        </div>

    </section>

    <footer>
        Node.js DevOps CI/CD Project • Built with Jenkins + Docker
    </footer>

</div>

</body>
</html>
    `);
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "Node.js DevOps CI/CD",
        version: "2.0.0",
        uptime: process.uptime(),
        startedAt: startTime.toISOString(),
        timestamp: new Date().toISOString()
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        application: "Node.js DevOps CI/CD Project",
        status: "running",
        environment: "Docker",
        nodeVersion: process.version,
        port: PORT,
        uptime: `${Math.floor(process.uptime())} seconds`
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Node.js application running on port ${PORT}`);
});