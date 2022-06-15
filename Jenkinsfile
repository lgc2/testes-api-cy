pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/lgc2/testes-api-cy.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Instalar start-server-and-test') {
            steps {
                bat 'npm install --save-dev start-server-and-test'
            }
        }
        stage('Executar Testes') {
            steps {
                bat 'npm run ci'
            }
        }
    }
}