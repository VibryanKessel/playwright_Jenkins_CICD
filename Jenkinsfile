pipeline {
    triggers {
        upstream 'build-and-deploy-to-integration'
    }
    agent {
        docker {
            image 'mcp/playwright:latest'
        }
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run TNR') {
            parallel{
                steps {
                    sh 'batchs/run_login.sh'
                }
                }
                    steps {
                        sh 'batchs/menu.sh'
                    }
                }
            }
        stage('Run AddCandidate Tests') {
            steps {
                sh 'batchs/run_add_candidate.sh'
            }
        }
        stage('Run Parcours TNR') {
            steps {
                sh 'batchs/run_tnr.sh'
            }
        }
    }
    post {
        always {
            allure includeProperties:
            false,
            jdk: '',
            results: [[path: 'allure-results']]
            archiveArtifacts artifacts: "playwright-report/**", allowEmptyArchive: true
        }

                }
    }
}
