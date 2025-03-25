// services/newmanService.js

const { exec } = require('child_process');

/**
 * Executa o comando Newman e exibe o output em tempo real.
 *
 * @param {string} command - Comando Newman a ser executado.
 */
function executeNewmanCommand(command) {
  console.log(`\nExecutando comando: ${command}\n`);
  const newmanProcess = exec(command);

  newmanProcess.stdout.on('data', data => console.log(data));
  newmanProcess.stderr.on('data', data => console.error(data));

  newmanProcess.on('close', code => {
    if (code === 0) {
      console.log('\n✅ Execução concluída com sucesso!');
    } else {
      console.error(`\n❌ Processo finalizado com código de erro ${code}`);
    }
  });
}

module.exports = {
  executeNewmanCommand
};
