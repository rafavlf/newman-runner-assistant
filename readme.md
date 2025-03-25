# newman-runner-assistant

## Sobre o Projeto
O **newman-runner-assistant** é uma ferramenta interativa para automação de testes de API utilizando [Newman](https://www.npmjs.com/package/newman) (CLI do Postman). 
Com ela, é possível selecionar coleções e ambientes (collections e environments) para executar testes, gerar relatórios HTML detalhados ou visualizar os resultados diretamente no terminal.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Newman**: Runner de linha de comando para coleções do Postman.
- **Inquirer.js**: Biblioteca para criação de interfaces interativas em linha de comando.
- **newman-reporter-htmlextra**: Gerador de relatórios HTML para resultados dos testes.

## Estrutura do Projeto
A estrutura do projeto está organizada em módulos, permitindo uma fácil manutenção e escalabilidade:

newman-runner-assistant/
- collections/               # Arquivos de coleções do Postman (.json)
- environments/              # Arquivos de ambientes do Postman (.json)
- services/ newmanService.js # Módulo para executar o comando Newman e gerenciar o output
- utils/ fileUtils.js        # Módulo com funções utilitárias para leitura e manipulação arquivos
- newman-runner.js           # Script principal
- package.json               # Configuração e dependencias do projeto



## Módulos do Projeto

### 1. `utils/fileUtils.js`
Contém funções utilitárias para ler diretórios e filtrar arquivos com uma determinada extensão.  
**Função Principal:**  
- `getFilesFromDirectory(directory, extension)`: Retorna uma lista de objetos com o nome e o caminho completo dos arquivos encontrados.

### 2. `services/newmanService.js`
Responsável por construir e executar o comando do Newman, exibindo o output e tratando erros.  
**Função Principal:**  
- `executeNewmanCommand(command)`: Executa o comando passado, mostrando o resultado e informando se houve sucesso ou falha.

### 3. `newman-runner.js`
Script principal que integra os módulos e utiliza o Inquirer.js para:
- Listar coleções e ambientes disponíveis.
- Permitir a escolha interativa do usuário.
- Configurar opções, como a geração de relatórios HTML.
- Construir e executar o comando do Newman utilizando o serviço definido.

## Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)

## Instalação
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rafavlf/newman-runner-assistant.git
   cd newman-runner-assistant

# Uso
Preparação:
Coloque suas coleções do Postman (arquivos .json) na pasta collections/.
(Opcional) Coloque seus ambientes do Postman (arquivos .json) na pasta environments/.
## Execução:
No terminal, na raiz do projeto, execute: npm start

# Siga as instruções interativas para:

1. Selecionar a coleção desejada.
2. Escolher (ou não) utilizar um ambiente.
3. Definir se deseja gerar um relatório HTML e configurar seu título.
4. Resultados:
5. A execução dos testes será exibida no terminal.
6. Se optar por gerar relatório HTML, este será salvo (por padrão, na pasta definida pelo Newman ou conforme a configuração do seu projeto).

# Contribuições
Se você deseja contribuir para o projeto:
1. Faça um fork do repositório.
2. Crie uma branch com uma feature ou correção (feature/nome-da-feature ou bugfix/descreva-o-bug).
3. Faça commits com mensagens claras.
4. Abra um Pull Request para revisão.
