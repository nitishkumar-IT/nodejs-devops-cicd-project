# Node.js DevOps Project

A second hands-on DevOps project using Node.js instead of Java/Tomcat.

## Stack

Node.js, Express, npm, Docker, Docker Compose, Jenkins, Git/GitHub.

## Local run

npm install
npm start

Open http://localhost:3000

Health check: http://localhost:3000/health

## Docker

docker build -t node-devops-project .
docker run -d --name node-app -p 3000:3000 node-devops-project

## Compose

docker compose up -d --build
docker compose ps
docker compose down

## Roadmap

1. Node.js application
2. npm and testing
3. Git/GitHub
4. Docker
5. Docker Compose
6. Jenkins CI
7. Jenkins CD
8. Container registry
9. AWS EC2
10. Terraform
11. Kubernetes
12. Prometheus/Grafana
13. Logging/observability
14. Security scanning / DevSecOps
