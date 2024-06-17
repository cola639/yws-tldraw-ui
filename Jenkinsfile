/* groovylint-disable CompileStatic, DuplicateStringLiteral, GStringExpressionWithinString, LineLength */
// Jenkinsfile configuration disabling specific lint rules for cleaner script

// Defines a pipeline block that contains the entire continuous delivery pipeline
pipeline {
    agent any  // Specifies that this pipeline can run on any available agent

    // Defines environment variables that are accessible within the pipeline
    environment {
        NETWORK = 'yws'  // Network name for Docker to enable networking among containers
        IMAGE_NAME = 'yws-ui'  // Name of the Docker image to be built
        WS = "${WORKSPACE}"  // Shortcut for the Jenkins workspace variable
        PROFILE = 'prod'  // Build profile, typically used to differentiate environments
    }

    // Contains all the stages in this pipeline
    stages {
        stage('1.Enviroment') {  // First stage: Environment Setup
            steps {
                sh 'pwd && ls -alh'  // Print the current working directory and list all files in detailed format
                sh 'printenv'  // Print all the environment variables available on the Jenkins agent
                sh 'docker version'  // Check the Docker version to verify Docker is correctly installed
                sh 'git --version'  // Check Git version to verify Git is correctly installed
            }
        }

        stage('2.Compile') {  // Second stage: Compile the application
            agent {
                docker {  // Use a Docker agent with the specified image
                    image 'node:18-alpine'  // Specifies the Docker image to use for this stage
                }
            }
            steps {
                sh 'pwd && ls -alh'  // Print the current directory and list files to debug path issues
                sh 'node -v'  // Display Node.js version to verify the correct node environment
                sh 'cd ${WS} && npm install --registry=https://registry.npmmirror.com --no-fund && npm run build'  // Navigate to workspace, install dependencies, and build the project
            }
        }

        stage('3.Build') {  // Third stage: Build the Docker image
            steps {
                sh 'pwd && ls -alh'  // Print the current directory and list files for debugging
                sh 'docker build -t ${IMAGE_NAME} .'  // Build Docker image using the Dockerfile in the current directory
            }
        }

        stage('4.Deploy') {  // Fourth stage: Deploy the application
            steps {
                sh 'pwd && ls -alh'  // Debugging command to print current directory and list files
                // Cleanup old containers and dangling images to prevent conflicts and save space
                sh 'docker rm -f ${IMAGE_NAME} || true && docker rmi $(docker images -q -f dangling=true) || true'
                sh "docker run -d -p 80:80 --name ${IMAGE_NAME} ${DOCKER_IMAGE}"
            }
        }
    }
}
