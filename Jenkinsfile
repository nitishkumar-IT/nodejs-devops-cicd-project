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
                bat 'docker build -t nodejs-devops-cicd-project .'
            }
        }
    }

    post {
        success {
            echo 'Node.js CI pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
