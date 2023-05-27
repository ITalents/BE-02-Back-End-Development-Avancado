# MarketPlace API

Bem-vindo(a) ao projeto do MarketPlace, um aplicativo web de comércio eletrônico desenvolvido utilizando as seguintes tecnologias: MongoDB, Express e Typescript, com uma abordagem orientada a objetos (POO). Este arquivo README fornecerá uma visão geral do projeto, incluindo instruções para configuração, instalação e execução.

## Pré-requisitos

Antes de iniciar, verifique se o seguinte software está instalado em seu ambiente de desenvolvimento:

- Node.js (versão 16 ou superior)
- MongoDB (instância local ou acesso a uma instância remota)
- Git (opcional, caso deseje clonar o repositório)

## Instalação

Siga as etapas abaixo para configurar o projeto em seu ambiente:

1. Clone este repositório (ou faça o download do código-fonte):
   ```
   git clone git@github.com:ITalents/BE-02-Back-End-Development-Avancado.git
   ```
2. Acesse o diretório do projeto:
   ```
   cd BE-02-Back-End-Development-Avancado
   ```
3. Instale as dependências do projeto:
   ```
   npm install
   ```

## Configuração

Antes de executar o aplicativo, você precisa configurar as variáveis de ambiente necessárias. Crie dois arquivos de configuração: `.env.development` e `.env.test`, e defina os valores apropriados para as seguintes variáveis em cada um dos arquivos:

- `.env.development`:
  - `DATABASE_URL`: URL de conexão com o banco de dados MongoDB para ambiente de desenvolvimento.
  - `SECRET`: Chave secreta para a aplicação.
  - `REDIRECT_URI`: URL de redirecionamento para autenticação.
  - `CLIENT_ID`: ID do cliente para autenticação.
  - `CLIENT_SECRET`: Chave secreta do cliente para autenticação.
  - `GITHUB_ACCESS_TOKEN_URL`: URL de acesso ao token de autenticação do GitHub.

- `.env.test`:
  - `DATABASE_URL`: URL de conexão com o banco de dados MongoDB para ambiente de testes.
  - `SECRET`: Chave secreta para a aplicação.

Certifique-se de fornecer os valores corretos para cada variável de acordo com o ambiente.

## Execução

Após a conclusão da instalação e configuração, você pode iniciar o servidor de desenvolvimento. Execute o seguinte comando no terminal:

```
npm run dev
```

Este comando irá compilar o código TypeScript e iniciar o servidor Express. Você verá uma mensagem indicando que o servidor está em execução.

Agora você pode acessar o MarketPlace em seu navegador, digitando o seguinte endereço:

```
http://localhost:5000
```

## Estrutura do Projeto

A estrutura do projeto é organizada em pastas para facilitar a manutenção e escalabilidade. Aqui está uma visão geral das principais pastas e arquivos:

- `src`: Contém o código-fonte do aplicativo.
  - `database`: Configuração e inicialização da conexão com o banco de dados MongoDB.
  - `helpers`: Funções auxiliares e utilitárias para o projeto.
  - `middlewares`: Middlewares para tratamento de requisições HTTP.
  - `modules`: Módulos do projeto, como autenticação, produtos, usuários, etc.
  - `routes`: Rotas da API definidas com Express Router.
  - `tmp`: Pasta para armazenamento temporário de imagens.
  - `server.ts`: Arquivo principal que inicia o servidor Express
  - `app.ts`: Arquivo de configuração da aplicação.
- `tests`: Contém os testes automatizados do projeto.
  - `factories`: Fábricas para criação de objetos utilizados nos testes.
  - `integration`: Testes de integração que verificam a interação entre componentes.
  - `unitary`: Testes unitários para verificar o funcionamento isolado de cada componente.
  - `utils`: Utilitários para auxiliar nos testes.

## Documentação
Para ver a documentação da API, acesse a rota `http://localhost:5000/doc` no navegador, após rodar o projeto com `npm run dev`.

## Front-end
Para testar o front-end que simula o OAuth com GitHub, basta entrar na pasta `frontend-oauth-github` no terminal e executar:
```
npm install
```
Após isso, ainda dentro da pasta do front-end no terminal, execute:
```
npm run dev
```
Agora abra no navegador o endereço `http://localhost:1234` e pronto, você está acessando o front-end, agora é só testar.
## Contribuição

Se você deseja contribuir com este projeto, sinta-se à vontade para criar um fork e enviar pull requests com melhorias, correções de bugs ou novos recursos. Ficaremos felizes em receber contribuições da comunidade.
