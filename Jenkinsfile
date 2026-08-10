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

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-pat-test',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    powershell '''
                        Write-Host "===== Docker Context ====="
                        & "$env:DOCKER_PATH" context show

                        Write-Host ""
                        Write-Host "===== Docker Login ====="

                        $DOCKER_PASSWORD | & "$env:DOCKER_PATH" login `
                            --username "$DOCKER_USERNAME" `
                            --password-stdin

                        if ($LASTEXITCODE -ne 0) {
                            Write-Error "Docker Hub login failed."
                            exit 1
                        }

                        Write-Host "Docker Hub login successful."

                        Write-Host ""
                        Write-Host "===== Tag Image ====="

                        & "$env:DOCKER_PATH" tag `
                            nodejs-devops-cicd-project:latest `
                            "$env:DOCKER_IMAGE`:latest"

                        if ($LASTEXITCODE -ne 0) {
                            Write-Error "Docker tag failed."
                            exit 1
                        }

                        Write-Host "Docker image tagged."

                        Write-Host ""
                        Write-Host "===== Push Image ====="

                        & "$env:DOCKER_PATH" push `
                            "$env:DOCKER_IMAGE`:latest"

                        if ($LASTEXITCODE -ne 0) {
                            Write-Error "Docker push failed."
                            exit 1
                        }

                        Write-Host "Docker image pushed successfully."
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