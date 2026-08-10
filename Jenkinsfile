pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
        COMPOSE_PATH = 'C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe'
        DOCKER_IMAGE = 'nitishkumar102001/nodejs-devops-cicd-project'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"%DOCKER_PATH%" build -t nodejs-devops-cicd-project:latest .'
            }
        }

        stage('Docker Hub Login Diagnostic') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-pat-test',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {
            powershell '''
                Write-Host "Docker executable:"
                & "$env:DOCKER_PATH" --version

                Write-Host ""
                Write-Host "Docker config environment:"
                Write-Host "DOCKER_CONFIG = $env:DOCKER_CONFIG"

                Write-Host ""
                Write-Host "Attempting login..."

                $env:DOCKER_CONFIG = "$env:WORKSPACE\\.docker-config"
                New-Item -ItemType Directory -Force -Path $env:DOCKER_CONFIG | Out-Null

                $DOCKER_PASSWORD | & "$env:DOCKER_PATH" login --username "$DOCKER_USERNAME" --password-stdin

                if ($LASTEXITCODE -ne 0) {
                    Write-Error "Docker Hub login failed with exit code $LASTEXITCODE"
                    exit 1
                }

                Write-Host ""
                Write-Host "Docker Hub login succeeded!"
            '''
        }
    }
}