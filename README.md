# Gamers Hub API

Esse projeto tem como objetivo fornecer as APIs para o funcionamento do aplicativo [Gamers Hub](https://github.com/liverday/gamers-hub-mobile)

## Sumário

- [Decisões de Arquitetura](#decisões-de-arquitetura)
  - [NodeJS](#linguagem)
  - [PostgreSQL](#banco-de-dados)
  - [Docker](#docker)
  - [React Native](#react-native)
- [Rotas da API](#rotas-da-api)
  - [Usuários](#usuários)
    - [Criar usuário](#criar-usuário)
    - [Realizar Login](#realizar-login)
  - [Posts](#posts)
    - [Criar Post](#criar-post)
    - [Listar Posts](#listar-posts)
  - [Arquivos](#arquivos)
    - [Criar Arquivo](#criar-arquivo)
- [Executando o projeto](#executando-o-projeto)
  - [Pré-Requisitos](#pré-requisitos)
  - [Instalando as dependências](#instalando-as-dependencias)
  - [Iniciando o Banco de dados](#iniciando-o-banco-de-dados)
  - [Iniciando a aplicação](#iniciando-a-aplicação)
- [Roadmap](#roadmap)


## Decisões de arquitetura

Nesse tópico descrevemos cada uma das nossas decisões de arquitetura e o porquê de cada uma delas

### NodeJS

Escolhemos NodeJS para trabalhar com a criação desse Backend devido a facilidade no desenvolvimento de todo o time. Com o objetivo de sermos ágeis e didáticos para o crescimento de todo o time, optamos por escolher uma única linguágem para fazer as duas partes do projeto (Javascript).

Com o Node nós tivemos agilidade e escalamos melhor o desenvolvimento dessa API.

### PostgreSQL

Escolhemos PostgreSQL por questão de afinidade e facilidade. Algumas pessoas do projeto já tinham trabalhado com ele e decidimos usá-lo por suas inúmeras funcionalidades nativas em seu código fonte.

### Docker

Docker é uma escolha que podemos considerar universal no desenvolvimento de qualquer coisa. O escolhemos devido sua comunidade extensa e um enorme repositório com imagens que a gente pode usar para gerar ferramentas úteis para o sistema. Assim, como também conseguir ter uma boa estratégia de deploy.

