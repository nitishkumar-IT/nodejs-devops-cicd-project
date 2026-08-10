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
                    string(
                        credentialsId: 'dockerhub-token',
                        variable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    powershell '''
                        $env:DOCKER_PASSWORD | & "C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" login -u nitishkumar102001 --password-stdin
                    '''

                    bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" tag nodejs-devops-cicd-project:latest nitishkumar102001/nodejs-devops-cicd-project:latest'

                    bat '"C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" push nitishkumar102001/nodejs-devops-cicd-project:latest'
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