const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

/* =========================
   PORTFOLIO DATA
========================= */

const portfolio = {
  name: "Nitishkumar Dharmendran",
  title: "AWS Cloud & DevOps Engineer | CI/CD Enthusiast",
  location: "Mumbai, Maharashtra, India",

  summary:
    "AWS Certified Cloud Practitioner with hands-on experience in AWS, Docker, Jenkins, CI/CD, Linux, Git, and cloud deployment. Passionate about building reliable, automated and scalable cloud solutions.",

  skills: {
    cloud: [
      "AWS",
      "EC2",
      "S3",
      "EBS",
      "VPC",
      "IAM",
      "CloudFormation",
      "CloudWatch",
      "Lambda",
      "RDS",
      "DynamoDB",
      "Route 53",
      "CloudFront",
      "Auto Scaling",
      "Elastic Load Balancing"
    ],

    devops: [
      "Jenkins",
      "Docker",
      "Docker Compose",
      "CI/CD",
      "Git",
      "GitHub",
      "Infrastructure as Code",
      "CloudFormation",
      "Terraform"
    ],

    programming: [
      "Node.js",
      "Java",
      "Python",
      "JavaScript",
      "SQL",
      "Maven"
    ],

    systems: [
      "Linux",
      "Ubuntu",
      "SSH",
      "VMware",
      "Networking"
    ]
  },

  projects: [
    {
      name: "Node.js DevOps CI/CD Project",
      description:
        "Containerized a Node.js web application and created an automated CI/CD pipeline using GitHub, Jenkins, Docker and Docker Compose.",
      technologies: [
        "Node.js",
        "Express",
        "Docker",
        "Docker Compose",
        "Jenkins",
        "GitHub",
        "CI/CD"
      ]
    },

    {
      name: "AWS Web Application Deployment",
      description:
        "Deployed a Java web application on AWS EC2 using Maven and VS Code Remote-SSH with secure SSH-based access.",
      technologies: [
        "AWS EC2",
        "Java",
        "Maven",
        "Linux",
        "SSH"
      ]
    },

    {
      name: "AWS CodeDeploy CI/CD",
      description:
        "Implemented automated application deployment to AWS EC2 using AWS CodeDeploy, CodeBuild and CloudFormation.",
      technologies: [
        "AWS EC2",
        "CodeDeploy",
        "CodeBuild",
        "CloudFormation",
        "VPC"
      ]
    },

    {
      name: "AWS CodePipeline",
      description:
        "Built an end-to-end CI/CD workflow integrating GitHub, CodeBuild, CodeDeploy and AWS CodeArtifact.",
      technologies: [
        "CodePipeline",
        "GitHub",
        "CodeBuild",
        "CodeDeploy",
        "CodeArtifact"
      ]
    }
  ],

  certification: {
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    validity: "July 2026 - July 2029"
  },

  education: [
    {
      degree: "Master of Science in Information Technology",
      college: "KES Shroff College, Mumbai",
      period: "2024 - 2026"
    },
    {
      degree: "Bachelor of Science in Information Technology",
      college: "Nagindas Khandwala College, Mumbai",
      period: "2021 - 2024"
    }
  ]
};


/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    application: "Node.js DevOps Portfolio",
    timestamp: new Date().toISOString()
  });
});


/* =========================
   API ENDPOINT
========================= */

app.get("/api/portfolio", (req, res) => {
  res.json(portfolio);
});


/* =========================
   PORTFOLIO WEBSITE
========================= */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>${portfolio.name} | AWS Cloud & DevOps</title>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

    background: #0b1120;
    color: #e5e7eb;
    line-height: 1.6;
}

a {
    color: inherit;
    text-decoration: none;
}

.container {
    width: 90%;
    max-width: 1150px;
    margin: auto;
}


/* =========================
   NAVBAR
========================= */

nav {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: rgba(11, 17, 32, 0.95);
    border-bottom: 1px solid #1e293b;

    backdrop-filter: blur(10px);
}

.nav-container {
    min-height: 70px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 22px;
    font-weight: 800;
    color: #38bdf8;
}

.nav-links {
    display: flex;
    gap: 25px;
    list-style: none;
}

.nav-links a {
    color: #cbd5e1;
    font-size: 14px;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #38bdf8;
}


/* =========================
   HERO
========================= */

.hero {
    min-height: 90vh;

    display: flex;
    align-items: center;

    background:
        radial-gradient(
            circle at top right,
            #12325a,
            transparent 40%
        );
}

.hero-content {
    max-width: 850px;
}

.badge {
    display: inline-block;

    padding: 7px 14px;

    border: 1px solid #334155;
    border-radius: 30px;

    color: #38bdf8;
    background: #111827;

    font-size: 13px;

    margin-bottom: 20px;
}

.hero h1 {
    font-size: clamp(45px, 8vw, 80px);
    line-height: 1.05;

    margin-bottom: 15px;
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
    max-width: 750px;

    color: #cbd5e1;
    font-size: 18px;

    margin-bottom: 30px;
}

.buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 22px;

    border-radius: 8px;

    font-weight: 700;

    transition: 0.3s;
}

.btn-primary {
    background: #38bdf8;
    color: #07111f;
}

.btn-primary:hover {
    transform: translateY(-3px);
}

.btn-secondary {
    border: 1px solid #475569;
    color: #e2e8f0;
}

.btn-secondary:hover {
    border-color: #38bdf8;
    color: #38bdf8;
}


/* =========================
   SECTIONS
========================= */

section {
    padding: 90px 0;
}

.section-title {
    font-size: 38px;
    margin-bottom: 10px;
}

.section-subtitle {
    color: #94a3b8;
    margin-bottom: 40px;
}


/* =========================
   ABOUT
========================= */

.about-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(280px, 1fr));

    gap: 30px;
}

.card {
    background: #111827;

    border: 1px solid #1e293b;

    border-radius: 14px;

    padding: 30px;

    transition: 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    border-color: #38bdf8;
}

.card h3 {
    color: #38bdf8;
    margin-bottom: 12px;
}

.card p {
    color: #cbd5e1;
}


/* =========================
   SKILLS
========================= */

.skill-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(250px, 1fr));

    gap: 20px;
}

.skill-box {
    background: #111827;

    border: 1px solid #1e293b;

    border-radius: 12px;

    padding: 25px;
}

.skill-box h3 {
    margin-bottom: 18px;
    color: #38bdf8;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill {
    padding: 6px 10px;

    border-radius: 6px;

    background: #1e293b;

    color: #cbd5e1;

    font-size: 13px;
}


/* =========================
   PROJECTS
========================= */

.project-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(280px, 1fr));

    gap: 25px;
}

.project {
    background: #111827;

    border: 1px solid #1e293b;

    border-radius: 14px;

    padding: 28px;

    transition: 0.3s;
}

.project:hover {
    transform: translateY(-6px);
    border-color: #38bdf8;
}

.project-number {
    color: #38bdf8;

    font-size: 14px;

    margin-bottom: 10px;
}

.project h3 {
    font-size: 22px;
    margin-bottom: 12px;
}

.project p {
    color: #94a3b8;
    margin-bottom: 20px;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}

.tech {
    background: #1e293b;

    color: #7dd3fc;

    padding: 5px 9px;

    border-radius: 5px;

    font-size: 12px;
}


/* =========================
   CERTIFICATION
========================= */

.certification {
    background: #0f172a;
}

.cert-card {
    border: 1px solid #334155;

    background: #111827;

    border-radius: 15px;

    padding: 35px;

    max-width: 750px;
}

.cert-card h3 {
    color: #38bdf8;
    font-size: 25px;
}

.cert-card p {
    color: #94a3b8;
    margin-top: 5px;
}


/* =========================
   EDUCATION
========================= */

.education-grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(280px, 1fr));

    gap: 20px;
}

.education-card {
    background: #111827;

    border: 1px solid #1e293b;

    padding: 25px;

    border-radius: 12px;
}

.education-card h3 {
    color: #38bdf8;
    margin-bottom: 8px;
}

.education-card p {
    color: #cbd5e1;
}


/* =========================
   DEVOPS PIPELINE
========================= */

.pipeline {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(150px, 1fr));

    gap: 15px;

    margin-top: 40px;
}

.pipeline-step {
    text-align: center;

    padding: 25px 10px;

    background: #111827;

    border: 1px solid #1e293b;

    border-radius: 10px;
}

.pipeline-step strong {
    display: block;

    color: #38bdf8;

    margin-bottom: 5px;
}

.pipeline-step span {
    color: #94a3b8;

    font-size: 13px;
}


/* =========================
   CONTACT
========================= */

.contact {
    text-align: center;
}

.contact-box {
    max-width: 700px;

    margin: auto;

    background: #111827;

    border: 1px solid #1e293b;

    border-radius: 15px;

    padding: 40px;
}

.contact-box p {
    color: #94a3b8;

    margin-bottom: 25px;
}

.contact-links {
    display: flex;

    justify-content: center;

    gap: 15px;

    flex-wrap: wrap;
}


/* =========================
   FOOTER
========================= */

footer {
    padding: 30px;

    text-align: center;

    border-top: 1px solid #1e293b;

    color: #64748b;

    font-size: 13px;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 700px) {

    .nav-links {
        display: none;
    }

    .hero {
        min-height: 80vh;
    }

    section {
        padding: 65px 0;
    }

}

</style>

</head>


<body>


<!-- =========================
     NAVIGATION
========================= -->

<nav>

<div class="container nav-container">

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
<a href="#certification">Certification</a>
</li>

<li>
<a href="#education">Education</a>
</li>

<li>
<a href="#contact">Contact</a>
</li>

</ul>

</div>

</nav>


<!-- =========================
     HERO
========================= -->

<section class="hero">

<div class="container hero-content">

<div class="badge">
AWS Certified Cloud Practitioner
</div>

<h1>
${portfolio.name.split(" ")[0]}
<span>Dharmendran</span>
</h1>

<h2>
${portfolio.title}
</h2>

<p>
${portfolio.summary}
</p>

<div class="buttons">

<a
    class="btn btn-primary"
    href="#projects">
    View Projects
</a>

<a
    class="btn btn-secondary"
    href="#contact">
    Contact Me
</a>

</div>

</div>

</section>


<!-- =========================
     ABOUT
========================= -->

<section id="about">

<div class="container">

<h2 class="section-title">
About Me
</h2>

<p class="section-subtitle">
Cloud, DevOps and automation
</p>


<div class="about-grid">

<div class="card">

<h3>
Cloud Engineering
</h3>

<p>
Building and deploying applications using AWS services
including EC2, S3, IAM, VPC, CloudFormation,
CloudWatch and other cloud technologies.
</p>

</div>


<div class="card">

<h3>
DevOps
</h3>

<p>
Working with Git, GitHub, Jenkins, Docker and Docker
Compose to automate application testing, containerization
and deployment.
</p>

</div>


<div class="card">

<h3>
Automation
</h3>

<p>
Interested in Infrastructure as Code, CI/CD automation,
cloud deployment and improving the reliability and
repeatability of application delivery.
</p>

</div>

</div>

</div>

</section>


<!-- =========================
     SKILLS
========================= -->

<section id="skills">

<div class="container">

<h2 class="section-title">
Technical Skills
</h2>

<p class="section-subtitle">
Technologies and tools I work with
</p>


<div class="skill-grid">


<div class="skill-box">

<h3>
AWS Cloud
</h3>

<div class="skills">

${portfolio.skills.cloud
  .map(skill => `<span class="skill">${skill}</span>`)
  .join("")}

</div>

</div>


<div class="skill-box">

<h3>
DevOps
</h3>

<div class="skills">

${portfolio.skills.devops
  .map(skill => `<span class="skill">${skill}</span>`)
  .join("")}

</div>

</div>


<div class="skill-box">

<h3>
Programming
</h3>

<div class="skills">

${portfolio.skills.programming
  .map(skill => `<span class="skill">${skill}</span>`)
  .join("")}

</div>

</div>


<div class="skill-box">

<h3>
Systems
</h3>

<div class="skills">

${portfolio.skills.systems
  .map(skill => `<span class="skill">${skill}</span>`)
  .join("")}

</div>

</div>


</div>

</div>

</section>


<!-- =========================
     PROJECTS
========================= -->

<section id="projects">

<div class="container">

<h2 class="section-title">
Projects
</h2>

<p class="section-subtitle">
Cloud and DevOps hands-on projects
</p>


<div class="project-grid">

${portfolio.projects
  .map(
    (project, index) => `

<div class="project">

<div class="project-number">
PROJECT ${String(index + 1).padStart(2, "0")}
</div>

<h3>
${project.name}
</h3>

<p>
${project.description}
</p>

<div class="project-tech">

${project.technologies
  .map(tech => `<span class="tech">${tech}</span>`)
  .join("")}

</div>

</div>

`
  )
  .join("")}

</div>

</div>

</section>


<!-- =========================
     DEVOPS PIPELINE
========================= -->

<section>

<div class="container">

<h2 class="section-title">
My CI/CD Workflow
</h2>

<p class="section-subtitle">
This portfolio itself is deployed using a containerized DevOps workflow.
</p>


<div class="pipeline">

<div class="pipeline-step">

<strong>01</strong>

<span>
Code
</span>

</div>


<div class="pipeline-step">

<strong>02</strong>

<span>
GitHub
</span>

</div>


<div class="pipeline-step">

<strong>03</strong>

<span>
Jenkins
</span>

</div>


<div class="pipeline-step">

<strong>04</strong>

<span>
npm Test
</span>

</div>


<div class="pipeline-step">

<strong>05</strong>

<span>
Docker Build
</span>

</div>


<div class="pipeline-step">

<strong>06</strong>

<span>
Docker Compose
</span>

</div>


<div class="pipeline-step">

<strong>07</strong>

<span>
Deployment
</span>

</div>

</div>

</div>

</section>


<!-- =========================
     CERTIFICATION
========================= -->

<section id="certification" class="certification">

<div class="container">

<h2 class="section-title">
Certification
</h2>

<p class="section-subtitle">
Professional certification
</p>


<div class="cert-card">

<h3>
${portfolio.certification.name}
</h3>

<p>
${portfolio.certification.code}
</p>

<p>
Valid: ${portfolio.certification.validity}
</p>

</div>

</div>

</section>


<!-- =========================
     EDUCATION
========================= -->

<section id="education">

<div class="container">

<h2 class="section-title">
Education
</h2>

<p class="section-subtitle">
Academic background
</p>


<div class="education-grid">

${portfolio.education
  .map(
    education => `

<div class="education-card">

<h3>
${education.degree}
</h3>

<p>
${education.college}
</p>

<p>
${education.period}
</p>

</div>

`
  )
  .join("")}

</div>

</div>

</section>


<!-- =========================
     CONTACT
========================= -->

<section id="contact" class="contact">

<div class="container">

<h2 class="section-title">
Let's Connect
</h2>

<p class="section-subtitle">
Interested in cloud, DevOps and automation opportunities.
</p>


<div class="contact-box">

<p>
${portfolio.location}
</p>


<div class="contact-links">

<a
    class="btn btn-primary"
    href="mailto:nitishkumar102001@outlook.com">
    Email Me
</a>


<a
    class="btn btn-secondary"
    href="https://www.linkedin.com/in/nitishkumar-dharmendran"
    target="_blank">
    LinkedIn
</a>


<a
    class="btn btn-secondary"
    href="https://github.com/nitishkumar-IT"
    target="_blank">
    GitHub
</a>

</div>

</div>

</div>

</section>


<!-- =========================
     FOOTER
========================= -->

<footer>

© ${new Date().getFullYear()}
${portfolio.name}

<br>

Node.js • Docker • Jenkins • AWS • DevOps

</footer>


</body>

</html>
  `);
});


/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;