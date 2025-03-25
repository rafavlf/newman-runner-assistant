// newman-runner.js

// Importa as bibliotecas necessárias e os módulos customizados
const inquirer = require('inquirer');
const { getFilesFromDirectory } = require('./utils/fileUtils');
const { executeNewmanCommand } = require('./services/newmanService');

// Define os diretórios para as coleções e os ambientes do Postman
const COLLECTIONS_DIR = './collections';
const ENVIRONMENTS_DIR = './environments';

/**
 * Função principal que interage com o usuário, constrói e executa o comando Newman.
 */
async function runInteractiveNewman() {
  try {
    // Recupera as coleções disponíveis
    const collections = getFilesFromDirectory(COLLECTIONS_DIR, '.json');
    if (collections.length === 0) {
      console.log(`Nenhuma collection encontrada em "${COLLECTIONS_DIR}". Adicione arquivos .json de collection.`);
      return;
    }

    // Recupera os ambientes disponíveis (opcional)
    const environments = getFilesFromDirectory(ENVIRONMENTS_DIR, '.json');

    // Solicita ao usuário a seleção da collection
    const { collection } = await inquirer.prompt([
      {
        type: 'list',
        name: 'collection',
        message: 'Selecione a collection que deseja executar:',
        choices: collections.map(c => c.name)
      }
    ]);

    // Pergunta se deseja utilizar um arquivo de environment
    const { useEnvironment } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useEnvironment',
        message: 'Deseja usar um arquivo de environment?',
        default: environments.length > 0
      }
    ]);

    let selectedEnvironment = null;
    if (useEnvironment && environments.length > 0) {
      const { environment } = await inquirer.prompt([
        {
          type: 'list',
          name: 'environment',
          message: 'Selecione o environment:',
          choices: environments.map(e => e.name)
        }
      ]);
      selectedEnvironment = environments.find(e => e.name === environment);
    } else if (useEnvironment && environments.length === 0) {
      console.log(`Nenhum arquivo de environment encontrado em "${ENVIRONMENTS_DIR}". Continuando sem environment.`);
    }

    // Pergunta sobre a geração de relatório HTML
    const { generateReport } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'generateReport',
        message: 'Deseja gerar um relatório HTML?',
        default: true
      }
    ]);

    let reportTitle = 'Relatório de Testes';
    if (generateReport) {
      const { title } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Digite o título do relatório:',
          default: 'Newman Test Report'
        }
      ]);
      reportTitle = title;
    }

    // Constrói o comando do Newman baseado nas escolhas do usuário
    const selectedCollection = collections.find(c => c.name === collection);
    let command = `newman run "${selectedCollection.path}"`;
    if (selectedEnvironment) {
      command += ` --environment "${selectedEnvironment.path}"`;
    }
    if (generateReport) {
      command += ` -r htmlextra --reporter-htmlextra-title "${reportTitle}"`;
    }

    // Executa o comando utilizando o serviço Newman
    executeNewmanCommand(command);

  } catch (error) {
    console.error('Erro durante a execução:', error);
  }
}

// Inicia o processo interativo
runInteractiveNewman();
