<h1 align="center">FIAP - Hackathon</h1>

<p align="center">
  <a><img src="https://img.shields.io/badge/typescript-v5.1.3-blue?logo=typescript"/></a>
  <a><img src="https://img.shields.io/badge/prettier-v3.0.0-red?logo=prettier"/></a>
  <a><img src="https://img.shields.io/badge/nestjs-v10.0.0-green?logo=nestjs"/></a>
  <a><img src="https://img.shields.io/badge/axios-v1.7.9-blue"/></a>
  <a><img src="https://img.shields.io/badge/typeorm-v0.3.20-red?logo=typeorm"/></a>
  <a><img src="https://img.shields.io/badge/pg-v8.12.0-red?logo=postgresql"/></a>
  <a><img src="https://img.shields.io/badge/tailwindcss-v3.4.1-green?logo=tailwindcss"/></a>
  <a><img src="https://img.shields.io/badge/recharts-v2.15.0-blue?logo=recharts"/></a>
  <a><img src="https://img.shields.io/badge/next-v15.1.4-red?logo=next"/></a>
  <a><img src="https://img.shields.io/badge/radixui-v1.1-green?logo=radixui"/></a>
</p>

## Desafio do Hackathon

O tema do hackathon é “Auxílio aos professores e professoras no ensino público”. O objetivo é desenvolver sistemas, ferramentas ou plataformas tecnológicas que facilitem o trabalho dos professores e professoras da rede pública de ensino, proporcionando mais eficiência, criatividade e interação com seus alunos.

## Solução

A solução proposta consiste em um sistema Web integrado com a gestão escolar, onde os professores podem informatizar as etapas de avaliação de frequência e aprendizado. Em relação à construção dos questionários, o professor insere em um campo texto o conteúdo da aula ministrada. Uma integração com um modelo de inteligência artificial do tipo LLM (Large Language Model) irá transformar o conteúdo em uma série de perguntas cujas respostas sejam Verdadeiro/Falso. Após o professor revisar o conteúdo, ele poderá distribuir o questionário aos alunos para que eles respondam. Os alunos, ao terminarem de responder, poderão verificar sua performance individual em termos de % de acertos. O professor pode acessar um relatório que contém o % médio de acerto de seus alunos.

## Para rodar a solução

A solução é composta por 3 componentes principais. Um frontend, um backend e o ollama, que roda o modelo de LLM Llama3.

### Backend

Para rodar o backend, deve-se clonar o repositório de acordo com o código abaixo:

```sh
git clone https://github.com/ammtsz/fiap-hackathon-backend.git
cd fiap-hackathon-backend
npm install
```

Antes de rodar o container com o docker compose, configure um arquivo .env com as variáveis de ambiente conforme sugerido abaixo:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=hackathon
JWT_SECRET=mysecret
```

Por fim, subir o banco de dados utilizando docker:

```sh
docker compose up db
```

E rodar a aplicação:

```sh
npm start
```

Após esse procedimento, você terá rodando em localhost:
* Instância do PostgreSQL na porta 5432.
* Instância do backend (API) na porta 3001.

### Frontend

Em seguida, para rodar o frontend, faça o clone do repositório e rode a aplicação localmente:

```sh
git clone https://github.com/caueeugenio/fiap-hackaton-frontend.git
cd fiap-hackaton-frontend
npm install
npm run dev
```

Desta forma, a solução pode ser rodada no naveador em `http://localhost:3000`.

### Ollama

Para rodar o modelo de LLM localmente, é necessário baixar a aplicação ollama para o seu sistema operacional no [site oficial](https://ollama.com/download). Com a aplicação funcionando, instalar o modelo LLama3 localmente:

```sh
ollama run llama3
```

# Como utilizar a aplicação e Documentação

Existem dois tipos de usuários: alunos e professores. De acordo com o tipo de usuário, diferentes recursos estarão disponíveis. Utilize as credenciais abaixo para testar a aplicação:

```
aluno
email: ana.costa@example.com
senha: password123

professor:
email: john.doe@example.com
senha: password123
```

Mais detalhes sobre como a aplicação funciona, telas e documentação, confira a [documentação completa](https://midi-sole-bef.notion.site/Hackathon-FIAP-17d5c10a92d5806ba9f1f722f816c1ed).