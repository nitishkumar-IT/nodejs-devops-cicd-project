const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

const portfolio = {
    name: "Nitishkumar Dharmendran",
    role: "AWS Cloud & DevOps Engineer",
    location: "Mumbai, Maharashtra, India",

    introduction:
        "I build, containerize, test and deploy applications using AWS, Docker, Jenkins and modern CI/CD practices.",

    skills: {
        cloud: [
            "AWS",
            "EC2",
            "S3",
            "IAM",
            "VPC",
            "EBS",
            "RDS",
            "Lambda",
            "CloudWatch",
            "CloudFront",
            "Route 53",
            "Auto Scaling",
            "Elastic Load Balancing"
        ],

        devops: [
            "Jenkins",
            "Docker",
            "Docker Compose",
            "Git",
            "GitHub",
            "CI/CD",
            "Terraform",
            "CloudFormation"
        ],

        development: [
            "Node.js",
            "Express.js",
            "JavaScript",
            "Java",
            "Python",
            "SQL",
            "Maven"
        ],

        systems: [
            "Linux",
            "Ubuntu",
            "Windows",
            "SSH",
            "Networking"
        ]
    },

    projects: [
        {
            title: "Node.js CI/CD Pipeline",
            description:
                "Built a complete CI/CD pipeline using GitHub, Jenkins, Docker and Docker Compose. GitHub pushes automatically trigger Jenkins through a webhook.",
            technologies:
                "Node.js • Express • GitHub • Jenkins • Docker • Docker Compose"
        },

        {
            title: "Dockerized Portfolio",
            description:
                "Containerized a Node.js portfolio application and deployed it using Docker with port mapping and container management.",
            technologies:
                "Node.js • Docker • Dockerfile • Docker Compose"
        },

        {
            title: "AWS Cloud Deployment",
            description:
                "Worked with AWS cloud infrastructure concepts including EC2, IAM, VPC, S3, security groups and cloud deployment practices.",
            technologies:
                "AWS • EC2 • IAM • VPC • S3 • CloudWatch"
        },

        {
            title: "Infrastructure Automation",
            description:
                "Explored Infrastructure as Code and automated cloud infrastructure provisioning using Terraform and AWS CloudFormation.",
            technologies:
                "Terraform • CloudFormation • AWS"
        }
    ],

    certification: "AWS Certified Cloud Practitioner",

    pipeline: [
        "Developer",
        "Git",
        "GitHub",
        "Webhook",
        "Jenkins",
        "npm Test",
        "Docker Build",
        "Docker Compose",
        "Deployment"
    ]
};


/* ==========================================
   HEALTH CHECK
========================================== */

app.get("/health", (req, res) => {

    res.status(200).json({
        status: "UP",
        application: "Nitishkumar DevOps Portfolio",
        version: "2.0.0",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });

});


/* ==========================================
   PORTFOLIO API
========================================== */

app.get("/api/portfolio", (req, res) => {

    res.json(portfolio);

});


/* ==========================================
   SKILLS API
========================================== */

app.get("/api/skills", (req, res) => {

    res.json(portfolio.skills);

});


/* ==========================================
   PROJECTS API
========================================== */

app.get("/api/projects", (req, res) => {

    res.json(portfolio.projects);

});


/* ==========================================
   MAIN PORTFOLIO WEBSITE
========================================== */

app.get("/", (req, res) => {

    const projectCards = portfolio.projects
        .map(
            (project, index) => `
                <div class="project-card">

                    <div class="project-number">
                        0${index + 1}
                    </div>

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                    <div class="technology">
                        ${project.technologies}
                    </div>

                </div>
            `
        )
        .join("");


    const skillSections = Object.entries(portfolio.skills)
        .map(
            ([category, skills]) => `
                <div class="skill-group">

                    <h3>
                        ${category.toUpperCase()}
                    </h3>

                    <div class="skill-list">

                        ${skills
                            .map(
                                skill =>
                                    `<span>${skill}</span>`
                            )
                            .join("")}

                    </div>

                </div>
            `
        )
        .join("");


    const pipelineSteps = portfolio.pipeline
        .map(
            (step, index) => `
                <div class="pipeline-step">

                    <div class="pipeline-number">
                        ${index + 1}
                    </div>

                    <div>
                        ${step}
                    </div>

                </div>
            `
        )
        .join("");


    res.send(`

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    ${portfolio.name} | DevOps Portfolio
</title>


<style>

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


html {
    scroll-behavior: smooth;
}


body {

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background: #07111f;

    color: #e5e7eb;

    line-height: 1.6;

}


/* ==============================
   NAVIGATION
============================== */

nav {

    position: sticky;

    top: 0;

    z-index: 1000;

    background: #07111f;

    border-bottom:
        1px solid #1e293b;

}


.nav-container {

    max-width: 1150px;

    width: 90%;

    margin: auto;

    min-height: 70px;

    display: flex;

    align-items: center;

    justify-content: space-between;

}


.logo {

    font-size: 25px;

    font-weight: bold;

    color: #38bdf8;

}


.nav-links {

    list-style: none;

    display: flex;

    gap: 25px;

}


.nav-links a {

    color: #cbd5e1;

    text-decoration: none;

    font-size: 14px;

}


.nav-links a:hover {

    color: #38bdf8;

}


/* ==============================
   COMMON
============================== */

.container {

    width: 90%;

    max-width: 1150px;

    margin: auto;

}


section {

    padding: 90px 0;

}


.section-title {

    font-size: 40px;

    margin-bottom: 10px;

}


.section-description {

    color: #94a3b8;

    margin-bottom: 40px;

}


/* ==============================
   HERO
============================== */

.hero {

    min-height: 90vh;

    display: flex;

    align-items: center;

}


.hero-content {

    max-width: 850px;

}


.version {

    display: inline-block;

    padding: 7px 14px;

    border: 1px solid #334155;

    border-radius: 20px;

    color: #38bdf8;

    margin-bottom: 20px;

    font-size: 13px;

}


.hero h1 {

    font-size:
        clamp(45px, 8vw, 80px);

    line-height: 1.05;

    margin-bottom: 20px;

}


.hero h1 span {

    color: #38bdf8;

}


.hero h2 {

    font-size: 25px;

    color: #94a3b8;

    margin-bottom: 20px;

}


.hero p {

    font-size: 18px;

    color: #cbd5e1;

    max-width: 750px;

    margin-bottom: 30px;

}


.buttons {

    display: flex;

    gap: 15px;

    flex-wrap: wrap;

}


.button {

    display: inline-block;

    padding: 12px 22px;

    border-radius: 8px;

    text-decoration: none;

    font-weight: bold;

}


.primary {

    background: #38bdf8;

    color: #07111f;

}


.secondary {

    border: 1px solid #475569;

    color: #e2e8f0;

}


/* ==============================
   ABOUT
============================== */

.about-grid {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(280px, 1fr)
        );

    gap: 25px;

}


.about-card {

    background: #0f172a;

    border: 1px solid #1e293b;

    padding: 30px;

    border-radius: 14px;

}


.about-card h3 {

    color: #38bdf8;

    margin-bottom: 12px;

}


.about-card p {

    color: #cbd5e1;

}


/* ==============================
   SKILLS
============================== */

.skills-grid {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(280px, 1fr)
        );

    gap: 20px;

}


.skill-group {

    background: #0f172a;

    border: 1px solid #1e293b;

    border-radius: 12px;

    padding: 25px;

}


.skill-group h3 {

    color: #38bdf8;

    margin-bottom: 15px;

}


.skill-list {

    display: flex;

    flex-wrap: wrap;

    gap: 8px;

}


.skill-list span {

    background: #1e293b;

    padding: 6px 10px;

    border-radius: 6px;

    color: #cbd5e1;

    font-size: 13px;

}


/* ==============================
   PROJECTS
============================== */

.project-grid {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(280px, 1fr)
        );

    gap: 25px;

}


.project-card {

    background: #0f172a;

    border: 1px solid #1e293b;

    border-radius: 14px;

    padding: 30px;

}


.project-number {

    color: #38bdf8;

    font-size: 14px;

    margin-bottom: 10px;

}


.project-card h3 {

    font-size: 22px;

    margin-bottom: 12px;

}


.project-card p {

    color: #94a3b8;

    margin-bottom: 20px;

}


.technology {

    color: #7dd3fc;

    font-size: 13px;

}


/* ==============================
   CERTIFICATION
============================== */

.certification {

    background: #0f172a;

}


.certification-card {

    max-width: 700px;

    background: #111827;

    border: 1px solid #334155;

    padding: 35px;

    border-radius: 15px;

}


.certification-card h3 {

    color: #38bdf8;

    font-size: 25px;

    margin-bottom: 10px;

}


.certification-card p {

    color: #cbd5e1;

}


/* ==============================
   PIPELINE
============================== */

.pipeline {

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(140px, 1fr)
        );

    gap: 15px;

}


.pipeline-step {

    background: #0f172a;

    border: 1px solid #1e293b;

    border-radius: 10px;

    padding: 20px;

    text-align: center;

    color: #cbd5e1;

}


.pipeline-number {

    width: 35px;

    height: 35px;

    margin:
        0 auto 10px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    background: #38bdf8;

    color: #07111f;

    font-weight: bold;

}


/* ==============================
   CONTACT
============================== */

.contact {

    text-align: center;

}


.contact-box {

    max-width: 700px;

    margin: auto;

    background: #0f172a;

    border: 1px solid #1e293b;

    border-radius: 15px;

    padding: 40px;

}


.contact-box p {

    color: #94a3b8;

    margin-bottom: 25px;

}


/* ==============================
   FOOTER
============================== */

footer {

    text-align: center;

    padding: 30px;

    border-top:
        1px solid #1e293b;

    color: #64748b;

    font-size: 13px;

}


/* ==============================
   MOBILE
============================== */

@media (max-width: 700px) {

    .nav-links {

        display: none;

    }

    section {

        padding: 65px 0;

    }

}

</style>

</head>


<body>


<nav>

<div class="nav-container">

<div class="logo">
ND.
</div>

<ul class="nav-links">

<li>
<a href="#about">About</a>
</li>

<li>
<a href="#skills">Skills</a>
</li>

<li>
<a href="#projects">Projects</a>
</li>

<li>
<a href="#pipeline">CI/CD</a>
</li>

<li>
<a href="#contact">Contact</a>
</li>

</ul>

</div>

</nav>


<section class="hero">

<div class="container hero-content">

<div class="version">
PORTFOLIO VERSION 2.0
</div>

<h1>
Nitishkumar
<span>Dharmendran</span>
</h1>

<h2>
${portfolio.role}
</h2>

<p>
${portfolio.introduction}
</p>

<div class="buttons">

<a
    class="button primary"
    href="#projects"
>
View Projects
</a>

<a
    class="button secondary"
    href="#contact"
>
Contact Me
</a>

</div>

</div>

</section>


<section id="about">

<div class="container">

<h2 class="section-title">
About Me
</h2>

<p class="section-description">
Cloud and DevOps focused engineer
</p>


<div class="about-grid">

<div class="about-card">

<h3>
AWS Cloud
</h3>

<p>
Working with AWS services and cloud infrastructure,
including compute, storage, networking, identity,
monitoring and deployment services.
</p>

</div>


<div class="about-card">

<h3>
DevOps & CI/CD
</h3>

<p>
Building automated workflows using GitHub, Jenkins,
Docker and Docker Compose to test, build and deploy
applications automatically.
</p>

</div>


<div class="about-card">

<h3>
Continuous Learning
</h3>

<p>
Continuously developing skills in cloud engineering,
containerization, automation, Infrastructure as Code
and production deployment practices.
</p>

</div>

</div>

</div>

</section>


<section id="skills">

<div class="container">

<h2 class="section-title">
Technical Skills
</h2>

<p class="section-description">
Tools and technologies
</p>


<div class="skills-grid">

${skillSections}

</div>

</div>

</section>


<section id="projects">

<div class="container">

<h2 class="section-title">
Projects
</h2>

<p class="section-description">
Hands-on cloud and DevOps projects
</p>


<div class="project-grid">

${projectCards}

</div>

</div>

</section>


<section id="pipeline">

<div class="container">

<h2 class="section-title">
CI/CD Pipeline
</h2>

<p class="section-description">
This portfolio is deployed through an automated
GitHub → Jenkins → Docker workflow.
</p>


<div class="pipeline">

${pipelineSteps}

</div>

</div>

</section>


<section>

<div class="container">

<h2 class="section-title">
Certification
</h2>

<p class="section-description">
Professional certification
</p>


<div class="certification-card">

<h3>
${portfolio.certification}
</h3>

<p>
Cloud fundamentals, AWS services,
security, architecture, pricing and
cloud technology concepts.
</p>

</div>

</div>

</section>


<section id="contact" class="contact">

<div class="container">

<h2 class="section-title">
Let's Connect
</h2>

<p class="section-description">
Open to opportunities in Cloud and DevOps.
</p>


<div class="contact-box">

<p>
${portfolio.location}
</p>

<div class="buttons">

<a
    class="button primary"
    href="https://github.com/nitishkumar-IT"
    target="_blank"
>
GitHub
</a>

<a
    class="button secondary"
    href="https://www.linkedin.com"
    target="_blank"
>
LinkedIn
</a>

</div>

</div>

</div>

</section>


<footer>

© ${new Date().getFullYear()}
${portfolio.name}

<br>

Node.js • Express • Docker • Jenkins • AWS • CI/CD

</footer>


</body>

</html>

    `);

});


/* ==========================================
   404
========================================== */

app.use((req, res) => {

    res.status(404).json({
        error: "Route not found",
        path: req.path
    });

});


/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});


module.exports = app;