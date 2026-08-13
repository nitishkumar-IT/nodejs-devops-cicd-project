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

        stage('Build and Push Multi-Platform Docker Image') {
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
                        echo Logging in to Docker Hub...
                        echo ========================================

                        powershell -NoProfile -Command "[System.IO.File]::WriteAllText('%WORKSPACE%\\docker_pass.txt', $env:DOCKER_PASSWORD)"

                        type "%WORKSPACE%\\docker_pass.txt" | "%DOCKER_PATH%" login --username %DOCKER_USERNAME% --password-stdin

                        if errorlevel 1 (
                            del "%WORKSPACE%\\docker_pass.txt"
                            echo Docker Hub login failed.
                            exit /b 1
                        )

                        del "%WORKSPACE%\\docker_pass.txt"

                        echo Docker Hub login successful.


                        echo ========================================
                        echo Checking Docker Buildx...
                        echo ========================================

                        "%DOCKER_PATH%" buildx version

                        if errorlevel 1 (
                            echo Docker Buildx is not available.
                            exit /b 1
                        )


                        echo ========================================
                        echo Setting up Multi-Platform Builder...
                        echo ========================================

                        "%DOCKER_PATH%" buildx inspect multiarch-builder >nul 2>&1

                        if errorlevel 1 (
                            echo Creating multiarch-builder...

                            "%DOCKER_PATH%" buildx create ^
                                --name multiarch-builder ^
                                --driver docker-container ^
                                --use
                        ) else (
                            echo multiarch-builder already exists.

                            "%DOCKER_PATH%" buildx use multiarch-builder
                        )


                        echo ========================================
                        echo Bootstrapping Buildx...
                        echo ========================================

                        "%DOCKER_PATH%" buildx inspect --bootstrap

                        if errorlevel 1 (
                            echo Buildx bootstrap failed.
                            exit /b 1
                        )


                        echo ========================================
                        echo Building AMD64 + ARM64 Image...
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
                        echo Multi-platform Docker image pushed successfully.
                        echo ========================================
                    '''
                }
            }
        }

        stage('Verify Docker Image Platforms') {
            steps {

                bat '''
                    echo ========================================
                    echo Verifying Docker Hub Image...
                    echo ========================================

                    "%DOCKER_PATH%" buildx imagetools inspect %DOCKER_IMAGE%:latest

                    if errorlevel 1 (
                        echo Docker image verification failed.
                        exit /b 1
                    )

                    echo ========================================
                    echo Docker image verification successful.
                    echo ========================================
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {

            bat '''
            echo ========================================
            echo Pulling Latest Docker Image...
            echo ========================================

            "%DOCKER_PATH%" pull %DOCKER_IMAGE%:latest

            if errorlevel 1 (
                echo Docker image pull failed.
                exit /b 1
            )


            echo ========================================
            echo Stopping Docker Compose...
            echo ========================================

            "%COMPOSE_PATH%" down


            echo ========================================
            echo Removing Existing Container...
            echo ========================================

            "%DOCKER_PATH%" rm -f nodejs-devops-container 2>nul


            echo ========================================
            echo Starting Docker Compose...
            echo ========================================

            "%COMPOSE_PATH%" up -d

            if errorlevel 1 (
                echo Docker Compose deployment failed.
                exit /b 1
            )

            echo ========================================
            echo Docker Compose deployment successful.
            echo ========================================
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
        END EC2 DEPLOYMENT
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