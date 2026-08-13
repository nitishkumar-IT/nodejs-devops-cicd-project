pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
        COMPOSE_PATH = 'C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker-compose.exe'
        DOCKER_IMAGE = 'nitishkumar102001/nodejs-devops-cicd-project'
        BUILDER_NAME = 'multiarch-builder'
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

        stage('Docker Hub Login') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-pat-test',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat '''
                        echo ========================================
                        echo Docker Hub Login
                        echo ========================================

                        echo %DOCKER_PASSWORD% | "%DOCKER_PATH%" login --username %DOCKER_USERNAME% --password-stdin

                        if errorlevel 1 (
                            echo Docker Hub login failed.
                            exit /b 1
                        )

                        echo Docker Hub login successful.
                    '''
                }
            }
        }

        stage('Setup Docker Buildx') {
            steps {

                bat '''
                    echo ========================================
                    echo Checking Docker Buildx
                    echo ========================================

                    "%DOCKER_PATH%" buildx version

                    if errorlevel 1 (
                        echo Docker Buildx is not available.
                        exit /b 1
                    )


                    echo ========================================
                    echo Creating Buildx Builder
                    echo ========================================

                    "%DOCKER_PATH%" buildx inspect %BUILDER_NAME% >nul 2>&1

                    if errorlevel 1 (
                        echo Creating new builder...
                        "%DOCKER_PATH%" buildx create --name %BUILDER_NAME% --driver docker-container --use
                    ) else (
                        echo Builder already exists.
                        "%DOCKER_PATH%" buildx use %BUILDER_NAME%
                    )


                    echo ========================================
                    echo Bootstrapping Builder
                    echo ========================================

                    "%DOCKER_PATH%" buildx inspect --bootstrap

                    if errorlevel 1 (
                        echo Buildx bootstrap failed.
                        exit /b 1
                    )
                '''
            }
        }

        stage('Build Multi-Platform Image') {
            steps {

                bat '''
                    echo ========================================
                    echo Building AMD64 + ARM64 Image
                    echo ========================================

                    "%DOCKER_PATH%" buildx build ^
                        --platform linux/amd64,linux/arm64 ^
                        -t %DOCKER_IMAGE%:latest ^
                        --push .

                    if errorlevel 1 (
                        echo Multi-platform Docker build failed.
                        exit /b 1
                    )

                    echo ========================================
                    echo Multi-platform Image Successfully Pushed
                    echo ========================================
                '''
            }
        }

        stage('Verify Image Platforms') {
            steps {

                bat '''
                    echo ========================================
                    echo Checking Docker Hub Image Platforms
                    echo ========================================

                    "%DOCKER_PATH%" buildx imagetools inspect %DOCKER_IMAGE%:latest

                    if errorlevel 1 (
                        echo Image inspection failed.
                        exit /b 1
                    )
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {

                bat '''
                    echo ========================================
                    echo Pulling Latest Image
                    echo ========================================

                    "%DOCKER_PATH%" pull %DOCKER_IMAGE%:latest

                    if errorlevel 1 (
                        echo Docker image pull failed.
                        exit /b 1
                    )


                    echo ========================================
                    echo Stopping Existing Containers
                    echo ========================================

                    "%COMPOSE_PATH%" down


                    echo ========================================
                    echo Starting Docker Compose
                    echo ========================================

                    "%COMPOSE_PATH%" up -d

                    if errorlevel 1 (
                        echo Docker Compose deployment failed.
                        exit /b 1
                    )

                    echo Docker Compose deployment successful.
                '''
            }
        }

        /*
        ============================================================
        EC2 DEPLOYMENT DISABLED
        ============================================================

        stage('Deploy to EC2') {
            steps {

                withCredentials([
                    file(
                        credentialsId: 'ec2-key-file',
                        variable: 'EC2_KEY'
                    )
                ]) {

                    bat '''
                        echo Connecting to EC2...

                        ssh -i "%EC2_KEY%" ^
                            -o StrictHostKeyChecking=no ^
                            ubuntu@15.206.84.205 ^
                            "docker pull nitishkumar102001/nodejs-devops-cicd-project:latest && docker stop nodejs-devops-container || true && docker rm nodejs-devops-container || true && docker run -d --name nodejs-devops-container -p 3001:3001 nitishkumar102001/nodejs-devops-cicd-project:latest"

                        if errorlevel 1 (
                            echo EC2 deployment failed.
                            exit /b 1
                        )

                        echo EC2 deployment successful.
                    '''
                }
            }
        }

        ============================================================
        END EC2
        ============================================================
        */

    }

    post {

        success {
            echo 'Node.js multi-platform CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {

            bat '''
                if exist "%WORKSPACE%\\docker_pass.txt" (
                    del "%WORKSPACE%\\docker_pass.txt"
                )
            '''
        }
    }
}