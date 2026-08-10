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

        stage('Docker Credential Test') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-pat-test',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {
            powershell '''
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($env:DOCKER_PASSWORD)
                $sha = [System.Security.Cryptography.SHA256]::Create()
                $hash = $sha.ComputeHash($bytes)
                $result = [BitConverter]::ToString($hash).Replace("-", "").ToLower()

                Write-Host "Username: $env:DOCKER_USERNAME"
                Write-Host "Token length: $($env:DOCKER_PASSWORD.Length)"
                Write-Host "Token SHA256: $result"
            '''
        }
    }
}

        stage('Deploy with Docker Compose') {
            steps {
                bat '"%COMPOSE_PATH%" down'

                bat '"%COMPOSE_PATH%" up -d'
            }
        }
    }

    post {
        success {
            echo 'Node.js CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}