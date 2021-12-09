# Gamers Hub API

Esse projeto tem como objetivo fornecer as APIs para o funcionamento do aplicativo [Gamers Hub](https://github.com/liverday/gamers-hub-mobile)

## Sumário

- [Decisões de Arquitetura](#decisões-de-arquitetura)
  - [NodeJS](#nodejs)
  - [PostgreSQL](#postgresql)
  - [Docker](#docker)
  - [React Native](#react-native)
- [Rotas da API](#rotas-api)
  - [Usuários](#usuarios)
    - [Criar usuário](#criar-usuario)
    - [Realizar Login](#login)
  - [Posts](#posts)
    - [Criar Post](#criar-post)
    - [Listar Posts](#listar-posts)
  - [Arquivos](#arquivos)
    - [Criar Arquivo](#criar-arquivo)
- [Executando o projeto](#executando-o-projeto)
  - [Pré-Requisitos](#pré-requisitos)
  - [Instalando as dependências](#instalando-as-dependencias)
  - [Iniciando o Banco de dados](#iniciando-o-banco-de-dados)
  - [Iniciando a Aplicação](#iniciando-a-aplicação)
- [Roadmap](#roadmap)


<h1 id="decisoes-dearquitetura">Decisões de Arquitetura</h1>

Nesse tópico descrevemos cada uma das nossas decisões de arquitetura e o porquê de cada uma delas

<h2 id="nodejs">NodeJS</h2>

Escolhemos NodeJS para trabalhar com a criação desse Backend devido a facilidade no desenvolvimento de todo o time. Com o objetivo de sermos ágeis e didáticos para o crescimento de todo o time, optamos por escolher uma única linguágem para fazer as duas partes do projeto (Javascript).

Com o Node nós tivemos agilidade e escalamos melhor o desenvolvimento dessa API.

<h2 id="postgresql">PostgreSQL</h2>

Escolhemos PostgreSQL por questão de afinidade e facilidade. Algumas pessoas do projeto já tinham trabalhado com ele e decidimos usá-lo por suas inúmeras funcionalidades nativas em seu código fonte.

<h2 id="docker">Docker</h2>

Docker é uma escolha que podemos considerar universal no desenvolvimento de qualquer coisa. O escolhemos devido sua comunidade extensa e um enorme repositório com imagens que a gente pode usar para gerar ferramentas úteis para o sistema. Assim, como também conseguir ter uma boa estratégia de deploy.

<h2 id="react-native">React Native</h2>

Partindo da mesma idéia que a escolha do NodeJS, escolhemos React Native por permitir com que possamos criar aplicações mobile utilizando JavaScript. Escolhemos ela à flutter devido a proficiência do time.

<h1 id="rotas-api">Rotas da API</h1>

<h2 id="usuarios">Usuários</h2>

<h3 id="criar-usuario">Criar usuário</h2>

```json
POST /users

{
	"username": "vitor.medeiro",
	"first_name": "Vitor",
	"last_name": "Medeiro",
	"gender": "m",
	"email": "vitor.medeiro10@gmail.com",
	"password": "teste123"
}
```

Resposta em caso de sucesso:

```json
Status 200 OK

{
	"id": "a9881567-a032-47d4-a654-fbe972c60691",
	"username": "vitor.medeiro",
	"email": "vitor.medeiro10@gmail.com",
	"createdAt": "2021-12-09T21:13:53.340Z",
	"updatedAt": "2021-12-09T21:13:53.340Z",
	"profile": {
		"id": "cd10fe4f-4486-4fef-bc1d-f02320205022",
		"firstName": "Vitor",
		"lastName": "Medeiro",
		"gender": "m",
		"bio": null,
		"createdAt": "2021-12-09T21:13:53.340Z",
		"updatedAt": "2021-12-09T21:13:53.340Z"
	}
}
```

<h3 id="login">Realizar Login</h3>

```json
POST /sessions

{
	"userNameOrEmail": "vitor.medeiro",
	"password": "teste123"
}
```

Resposta em caso de sucesso

```json
Status 200 OK

{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzkwODQ4NjQsImV4cCI6MTYzOTE3MTI2NCwic3ViIjoiYTk4ODE1NjctYTAzMi00N2Q0LWE2NTQtZmJlOTcyYzYwNjkxIn0.u7irkZzLusfph4nYOhIUkRrQHzLY9ywQECO1iYNGTP4",
	"user": {
		"id": "a9881567-a032-47d4-a654-fbe972c60691",
		"username": "vitor.medeiro",
		"email": "vitor.medeiro10@gmail.com",
		"isActive": true,
		"createdAt": "2021-12-09T21:13:53.340Z",
		"updatedAt": "2021-12-09T21:13:53.340Z",
		"profile": {
			"id": "cd10fe4f-4486-4fef-bc1d-f02320205022",
			"firstName": "Vitor",
			"lastName": "Medeiro",
			"gender": "m",
			"bio": null,
			"createdAt": "2021-12-09T21:13:53.340Z",
			"updatedAt": "2021-12-09T21:13:53.340Z"
		}
	}
}
```

<h2 id="posts">Posts</h2>

<h3 id="criar-post">Criar Post</h3>

```json
POST /posts

{
	"title": "Teste de publicação",
	"content": "Conteudo",
	"files": ["12f5b617-5ccf-4079-9014-0dd3dcfb146a"]
}
```

Resposta em caso de sucesso:

```json
Status 200 OK

{
	"title": "Teste de publicação",
	"content": "Conteudo",
	"user": {
		"id": "27c68ecc-0827-4ffe-ba4b-eac26f2d8e22",
		"username": "vitor.medeiro",
		"email": "vitor.medeiro10@gmail.com",
		"isActive": true,
		"createdAt": "2021-12-10T00:50:14.939Z",
		"updatedAt": "2021-12-10T00:50:14.939Z",
		"profile": {
			"id": "5623a38b-6d1f-4d77-b994-520bfffa70d7",
			"firstName": "Vitor",
			"lastName": "Medeiro",
			"gender": "m",
			"bio": null,
			"createdAt": "2021-12-10T00:50:14.939Z",
			"updatedAt": "2021-12-10T00:50:14.939Z"
		}
	},
	"files": [
		{
			"id": "12f5b617-5ccf-4079-9014-0dd3dcfb146a",
			"fileName": "27af77cff864d45bd140-69252528_2483921785004206_6217715435912036352_n.jpg",
			"createdAt": "2021-12-10T00:50:26.604Z",
			"updatedAt": "2021-12-10T00:50:26.604Z"
		}
	],
	"id": "673142d2-8edf-4f32-91e3-c8d7806634e8",
	"createdAt": "2021-12-10T00:51:04.304Z",
	"updatedAt": "2021-12-10T00:51:04.304Z"
}
```

<h3 id="listar-posts">Listar Posts</h3>

```json
GET /posts?page=1&pageSize=20
```

Resposta em caso de sucesso:

```json
Status 200 OK

{
	"total": 1,
	"data": [
		{
			"id": "3d096649-563f-4293-8160-cc0713171b26",
			"title": "Teste de publicação",
			"content": "Conteudo",
			"createdAt": "2021-12-09T19:54:57.801Z",
			"updatedAt": "2021-12-09T19:54:57.801Z",
			"user": {
				"id": "da0cb160-580b-4891-97ac-080406cbca2f",
				"username": "vitor.medeiro",
				"email": "vitor.medeiro10@gmail.com",
				"isActive": true,
				"createdAt": "2021-12-09T19:54:09.335Z",
				"updatedAt": "2021-12-09T19:54:09.335Z",
				"profile": {
					"id": "1123bd42-cc87-489b-9531-d522323a1608",
					"firstName": "Vitor",
					"lastName": "Medeiro",
					"gender": "m",
					"bio": null,
					"createdAt": "2021-12-09T19:54:09.335Z",
					"updatedAt": "2021-12-09T19:54:09.335Z"
				}
			},
			"comments": [],
			"files": [
				{
					"id": "56ac905c-18f9-44da-b2f1-2c3bdb209862",
					"fileName": "afcbc06ff96b79182f54-69252528_2483921785004206_6217715435912036352_n.jpg",
					"createdAt": "2021-12-09T19:54:37.372Z",
					"updatedAt": "2021-12-09T19:54:37.372Z"
				}
			]
		}
	]
}
```

<h2 id="arquivos">Arquivos</h2>

<h3 id="criar-arquivo">Criar Arquivo</h3>

```json
POST /files
Content-Type: multipart/form-data

uploads=@path_do_arquivo
```

Resposta em caso de sucesso:

```json
Status 200 OK

[
    {
        "fileName": "27af77cff864d45bd140-69252528_2483921785004206_6217715435912036352_n.jpg",
        "id": "12f5b617-5ccf-4079-9014-0dd3dcfb146a",
        "createdAt": "2021-12-10T00:50:26.604Z",
        "updatedAt": "2021-12-10T00:50:26.604Z"
    }
]
```

<h1 id="executando-o-projeto">Executando o Projeto</h1>

<h2 id="pré-requisitos">Pré Requisitos</h2>

- [Docker](https://docker.com)
- [Docker Compose](https://docs.docker.com/compose/)
- [NodeJS](https://nodejs.org)

<h2 id="instalando-as-dependencias">

Dentro da raiz do projeto, execute o comando `yarn install`

```
yarn install
```

<h2 id="iniciando-o-banco-de-dados">Iniciando o Banco de Dados</h2>

Preparei um `docker-compose` para facilitar a criação do banco de dados, portanto, para executá-lo, cole a seguinte linha de código no terminal:

```bash
docker-compose up -d db
```

Isso criará um container de [PostgreSQL](https://www.postgresql.org/) na porta `5432` (porta padrão do PostgreSQL)

<h2 id="iniciando-a-aplicação">Iniciando a Aplicação</h2>

Para iniciar a aplicação em modo local, é necessário renomear o arquivo `.env.example` na raiz do projeto para `.env`.
Isso configurará as variáveis de ambiente necessárias para executar a aplicação. Depois disso, basta copiar o comando abaixo no terminal:

```bash
yarn dev
```

Se aparecer esse resultado, sua aplicação está funcionando!

```
[INFO] 19:02:17 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.2)
Debugger listening on ws://127.0.0.1:9229/31b41bad-91b8-4fa8-a0d3-7874f4864e8b
For help, see: https://nodejs.org/en/docs/inspector
A api foi iniciada na porta: 3000
```

<h1 id="roadmap">Roadmap</h1>

- Sistema de comentários
- Sistema de amizade
- Stories
- Times
- Chat em tempo real
- Confirmação via e-mail
- Deploy em produção