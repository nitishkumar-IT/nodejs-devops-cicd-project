Node.js DevOps CI/CD Project

A complete end-to-end DevOps CI/CD project for a Node.js applicationusing GitHub, Jenkins, Docker, Docker Hub, and AWS EC2.

Project Overview

The project automates the application delivery process from source-codepush to deployment.

Developer
   ↓
GitHub
   ↓
Jenkins
   ↓
Checkout
   ↓
npm install
   ↓
npm test
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Local Docker + AWS EC2

Whenever code is pushed to GitHub, Jenkins runs the pipelineautomatically.

Architecture

                         GitHub
                            |
                         git push
                            ↓
                        Jenkins
                            |
             +--------------+--------------+
             |              |              |
             ↓              ↓              ↓
          Checkout      npm install     npm test
                                           |
                                           ↓
                                     Docker Build
                                           |
                                           ↓
                                      Docker Hub
                                           |
                              +------------+------------+
                              |                         |
                              ↓                         ↓
                       Local Docker                 AWS EC2
                              |                         |
                              ↓                         ↓
                       localhost:3001              Docker :3001

Technologies Used

Technology            Purpose

Node.js               Application runtimenpm                   Dependencies and testingGit                   Version controlGitHub                Source repositoryJenkins               CI/CD automationDocker                ContainerizationDocker Hub            Container registryAWS EC2               Cloud deploymentUbuntu                EC2 operating systemSSH                   Remote deploymentJenkins Credentials   Secret management

Project Structure

nodejs-devops-cicd-project/
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── Jenkinsfile
├── .dockerignore
├── tests/
└── README.md

Application

The application is a Node.js web application running on port 3001.

Local URL:

http://localhost:3001

EC2 URL:

http://<EC2-PUBLIC-IP>:3001

The EC2 IP is intentionally represented as a placeholder because an EC2public IP can change.

Git and GitHub

Git tracks project changes and GitHub stores the source code.

Typical workflow:

git add .
git commit -m "Update application"
git push

Repository:

https://github.com/nitishkumar-IT/nodejs-devops-cicd-project

Jenkins

Jenkins is the CI/CD automation server.

The pipeline is defined in Jenkinsfile.

The pipeline stages are:

Checkout
   ↓
Install Dependencies
   ↓
Test
   ↓
Build Docker Image
   ↓
Push to Docker Hub
   ↓
Deploy to Local Docker
   ↓
Deploy to EC2

Jenkins Stage 1 - Checkout

Jenkins retrieves the latest source code:

stage('Checkout') {
    steps {
        checkout scm
    }
}

This ensures the pipeline uses the latest committed version.

Jenkins Stage 2 - Install Dependencies

Jenkins runs:

npm install

This installs the Node.js dependencies from package.json.

Jenkins Stage 3 - Test

Jenkins runs:

npm test

Testing happens before deployment.

If the test stage fails, the deployment stages do not continue.

Jenkins Stage 4 - Docker Build

Jenkins creates the Docker image:

docker build -t nodejs-devops-cicd-project:latest .

The image contains the Node.js application and its required runtimeenvironment.

Docker

Docker packages the application into a portable container.

The container is started using:

docker run -d   --name nodejs-devops-container   -p 3001:3001   nodejs-devops-cicd-project:latest

The port mapping is:

Host:      3001
Container: 3001

Docker Hub

Docker Hub stores the Docker image created by Jenkins.

Repository:

https://hub.docker.com/r/nitishkumar102001/nodejs-devops-cicd-project

Image:

nitishkumar102001/nodejs-devops-cicd-project:latest

The process is:

Docker Build
    ↓
Docker Tag
    ↓
Docker Login
    ↓
Docker Push

Docker Hub Credentials

Docker Hub authentication is handled through Jenkins Credentials.

Credential ID:

dockerhub-pat-test

The credential contains the Docker Hub username and Personal AccessToken.

The actual token is never stored in the Jenkinsfile or GitHubrepository.

The pipeline uses:

docker login --username <username> --password-stdin

Local Docker Deployment

After pushing the image, Jenkins updates the local Docker environment.

The deployment process is:

Pull latest image
      ↓
Stop old container
      ↓
Remove old container
      ↓
Start new container

Container name:

nodejs-devops-container

Local application:

http://localhost:3001

AWS EC2

AWS EC2 is used as the cloud deployment server.

The EC2 instance runs Ubuntu and Docker.

Architecture:

AWS EC2
   ↓
Ubuntu
   ↓
Docker
   ↓
Node.js Container

Docker can be verified with:

docker --version

Docker on EC2

Pull the image:

docker pull nitishkumar102001/nodejs-devops-cicd-project:latest

Check images:

docker images

Run the container:

docker run -d   --name nodejs-devops-container   -p 3001:3001   nitishkumar102001/nodejs-devops-cicd-project:latest

Check running containers:

docker ps

SSH Deployment

Jenkins connects to EC2 using SSH.

Jenkins Windows Machine
          |
          | SSH
          ↓
AWS EC2 Ubuntu
          |
          ↓
Docker
          |
          ↓
Node.js Container

The EC2 private key is stored securely in Jenkins.

EC2 Jenkins Credential

Credential ID:

ec2-key-file

Credential type:

Secret file

The .pem private key is not committed to GitHub.

Jenkins temporarily uses the key for the SSH deployment and removes thetemporary key after deployment.

EC2 Deployment Process

Jenkins connects to EC2 and performs:

SSH
 ↓
docker pull
 ↓
docker stop
 ↓
docker rm
 ↓
docker run

The latest Docker image is pulled from Docker Hub and the old containeris replaced with a new container.

Complete CI/CD Process

Developer changes app.js
          ↓
git add .
          ↓
git commit
          ↓
git push
          ↓
GitHub
          ↓
Jenkins
          ↓
Checkout
          ↓
npm install
          ↓
npm test
          ↓
Docker build
          ↓
Docker Hub push
          ↓
Local Docker deployment
          ↓
SSH to EC2
          ↓
EC2 docker pull
          ↓
Stop old container
          ↓
Remove old container
          ↓
Start new container

What Happens When app.js Changes?

For example, a developer changes the application in app.js.

The developer runs:

git add app.js
git commit -m "Update application"
git push

Jenkins receives the new code and rebuilds the Docker image.

The new image is pushed to Docker Hub.

Jenkins then updates:

Local Docker

AWS EC2

Therefore, the new application version is deployed automatically.

Security

Sensitive information is kept outside the source code.

Never commit:

*.pem
.env
Passwords
Docker Hub PATs
API keys
Private keys

Recommended .gitignore entries:

node_modules/
.env
*.pem
docker_pass.txt
ec2-deploy-key.pem

Jenkins Credentials are used for Docker Hub and EC2 authentication.

Useful Docker Commands

Check version:

docker --version

Check information:

docker info

List images:

docker images

List running containers:

docker ps

List all containers:

docker ps -a

View logs:

docker logs nodejs-devops-container

Stop container:

docker stop nodejs-devops-container

Remove container:

docker rm nodejs-devops-container

Useful EC2 Commands

Check Docker:

docker --version

Check Docker service:

sudo systemctl status docker

Enable Docker:

sudo systemctl enable --now docker

Pull the latest image:

docker pull nitishkumar102001/nodejs-devops-cicd-project:latest

Check containers:

docker ps

Check logs:

docker logs nodejs-devops-container

Troubleshooting

Container stops immediately

Run:

docker ps -a
docker logs nodejs-devops-container

The logs normally show the application startup error.

Container is restarting

Run:

docker ps -a
docker logs nodejs-devops-container

Fix the application error, rebuild the image, push it to Docker Hub, andredeploy.

Image is not available

Run:

docker pull nitishkumar102001/nodejs-devops-cicd-project:latest

Then:

docker images

Port 3001 is already in use

Check:

docker ps

Stop the container using the port and start the required containeragain.

EC2 application is not accessible

Check:

docker ps
docker logs nodejs-devops-container

Also verify that the EC2 security group allows inbound traffic to port3001.

Jenkins cannot connect to EC2

Check:

ec2-key-file Jenkins credential

EC2 public IP

Ubuntu SSH username

EC2 security group

Private key

Windows OpenSSH

The Ubuntu SSH username is:

ubuntu

DevOps Concepts Demonstrated

Source Control

Git and GitHub manage source-code changes.

Continuous Integration

Jenkins automatically checks out and tests the application.

Automated Testing

Tests run before Docker deployment.

Containerization

Docker packages the application into a consistent container.

Container Registry

Docker Hub stores the Docker image.

Continuous Deployment

Jenkins automatically deploys the latest image.

Cloud Deployment

AWS EC2 hosts the Dockerized application.

Linux

Ubuntu is used on the EC2 server.

SSH

SSH provides secure remote deployment from Jenkins to EC2.

Secrets Management

Jenkins Credentials protects the Docker Hub PAT and EC2 private key.

Automation

A GitHub push triggers the complete delivery process.

Kubernetes

Kubernetes is not used in the current project.

The current deployment uses:

Jenkins
   ↓
Docker
   ↓
Docker Hub
   ↓
AWS EC2
   ↓
Docker Container

Kubernetes is a possible future enhancement for container orchestration,scaling, service discovery, and management of multiple containers.

Project Status

Git                       ✅
GitHub                    ✅
Node.js                   ✅
npm                       ✅
Automated Testing         ✅
Jenkins                   ✅
Jenkins Pipeline          ✅
Docker                    ✅
Docker Hub                ✅
Local Docker Deployment   ✅
AWS EC2                   ✅
Ubuntu                    ✅
SSH Deployment            ✅
Jenkins Credentials      ✅
Automatic Deployment      ✅

Future Improvements

Possible future improvements include:

Docker image versioning using Git commit IDs

Application health checks

Deployment rollback

HTTPS

Monitoring and logging

Infrastructure as Code using Terraform

Kubernetes orchestration

These are optional enhancements and are not required for the currentCI/CD implementation.

Final Architecture

                    Developer
                        |
                     git push
                        |
                        ▼
                     GitHub
                        |
                        ▼
                    Jenkins
                        |
          +-------------+-------------+
          |             |             |
          ▼             ▼             ▼
      Checkout     npm install     npm test
                                      |
                                      ▼
                                Docker Build
                                      |
                                      ▼
                                 Docker Hub
                                      |
                       +--------------+--------------+
                       |                             |
                       ▼                             ▼
                Local Docker                    AWS EC2
                       |                             |
                       ▼                             ▼
                localhost:3001              Docker :3001

Final Result

The project provides an automated path from source code to deployment:

GitHub
   ↓
Jenkins
   ↓
Testing
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Local Docker + AWS EC2

A developer can change the application, commit the change, and push itto GitHub. Jenkins automatically handles testing, containerization,image publishing, local deployment, and cloud deployment.

Author

Nitishkumar Dharmendran

GitHub:

https://github.com/nitishkumar-IT

Project Repository:

https://github.com/nitishkumar-IT/nodejs-devops-cicd-project

Docker Hub:

https://hub.docker.com/r/nitishkumar102001/nodejs-devops-cicd-project