pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:\\Users\\NITISHKUMAR\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
    }

    stages {

        stage('Docker Diagnostic') {
            steps {
                powershell '''
                    Write-Host "===== USER ====="
                    whoami

                    Write-Host ""
                    Write-Host "===== DOCKER VERSION ====="
                    & "$env:DOCKER_PATH" version

                    Write-Host ""
                    Write-Host "===== DOCKER CONTEXT ====="
                    & "$env:DOCKER_PATH" context show

                    Write-Host ""
                    Write-Host "===== DOCKER SERVER ====="
                    & "$env:DOCKER_PATH" info --format "{{.ServerVersion}}"

                    Write-Host ""
                    Write-Host "===== DOCKER HOST ====="
                    Write-Host "DOCKER_HOST = $env:DOCKER_HOST"
                '''
            }
        }
    }
}