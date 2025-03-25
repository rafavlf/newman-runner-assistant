// utils/fileUtils.js

const fs = require('fs');
const path = require('path');

/**
 * Lê os arquivos de um diretório filtrando por extensão.
 * Se o diretório não existir, ele é criado e retorna um array vazio.
 *
 * @param {string} directory - Caminho do diretório.
 * @param {string} extension - Extensão dos arquivos a serem lidos (ex.: '.json').
 * @returns {Array<Object>} Lista de objetos com nome e caminho completo do arquivo.
 */
function getFilesFromDirectory(directory, extension) {
  try {
    if (!fs.existsSync(directory)) {
      console.warn(`Diretório "${directory}" não existe. Criando-o...`);
      fs.mkdirSync(directory, { recursive: true });
      return [];
    }
    return fs.readdirSync(directory)
      .filter(file => file.endsWith(extension))
      .map(file => ({
        name: file,
        path: path.join(directory, file)
      }));
  } catch (error) {
    console.error(`Erro ao ler o diretório ${directory}:`, error);
    return [];
  }
}

module.exports = {
  getFilesFromDirectory
};
