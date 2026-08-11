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

                    bat '''
                        echo Logging in to Docker Hub...

                        powershell -NoProfile -Command "[System.IO.File]::WriteAllText('%WORKSPACE%\\docker_pass.txt', $env:DOCKER_PASSWORD)"

                        type "%WORKSPACE%\\docker_pass.txt" | "%DOCKER_PATH%" login --username %DOCKER_USERNAME% --password-stdin

                        if errorlevel 1 (
                            del "%WORKSPACE%\\docker_pass.txt"
                            echo Docker Hub login failed.
                            exit /b 1
                        )

                        del "%WORKSPACE%\\docker_pass.txt"

                        echo Docker Hub login successful.

                        echo Tagging Docker image...

                        "%DOCKER_PATH%" tag nodejs-devops-cicd-project:latest %DOCKER_IMAGE%:latest

                        if errorlevel 1 (
                            echo Docker image tagging failed.
                            exit /b 1
                        )

                        echo Docker image tagged successfully.

                        echo Pushing Docker image to Docker Hub...

                        "%DOCKER_PATH%" push %DOCKER_IMAGE%:latest

                        if errorlevel 1 (
                            echo Docker image push failed.
                            exit /b 1
                        )

                        echo Docker image pushed successfully.
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

        always {
            bat 'if exist "%WORKSPACE%\\docker_pass.txt" del "%WORKSPACE%\\docker_pass.txt"'
        }
    }
}