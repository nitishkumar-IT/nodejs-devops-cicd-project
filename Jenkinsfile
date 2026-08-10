pipeline {
    agent any

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
                bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t nodejs-devops-cicd-project .'
            }
        }

        stage('Push to Docker Hub') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-token',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
            )
        ]) {

            powershell '''
                Write-Host "Docker username from Jenkins: $env:DOCKER_USERNAME"
                Write-Host "Docker token length: $($env:DOCKER_PASSWORD.Length)"

                if ([string]::IsNullOrEmpty($env:DOCKER_PASSWORD)) {
                    Write-Error "Docker password/token is EMPTY"
                    exit 1
                }

                Write-Host "Attempting Docker Hub login..."

                $env:DOCKER_PASSWORD | & "C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" login -u $env:DOCKER_USERNAME --password-stdin

                if ($LASTEXITCODE -ne 0) {
                    Write-Error "Docker Hub login failed"
                    exit $LASTEXITCODE
                }

                Write-Host "Docker Hub login successful"
            '''

            bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" tag nodejs-devops-cicd-project:latest %DOCKER_USERNAME%/nodejs-devops-cicd-project:latest'

            bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" push %DOCKER_USERNAME%/nodejs-devops-cicd-project:latest'
        }
    }
}

        stage('Deploy with Docker Compose') {
            steps {
                bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" down'

                bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe" up -d'
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