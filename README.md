# <p align="center">Projeto Store Manager</p>

<div align="center">
  
<a href="https://codecov.io/gh/mairess/project-store-manager" > 
 <img src="https://codecov.io/gh/mairess/project-store-manager/graph/badge.svg?token=0E5II8VC4C"/> 
 </a>

</div>

## Contexto

Este projeto consiste em uma `API completamente RESTful` para gerenciamento de vendas, utilizando `Node`, `Express`, `Javascript,` e `MySQL`, seguindo a arquitetura em camadas `MSC`. Nessa aplicação é possível fazer um `CRUD`, criar, visualizar, deletar e atualizar produtos e vendas. Além disso, ela possui uma boa cobertura de teste utilizando `mocha`, `chai` e `sinon` e a documentação é feita com o `swagger`

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.
>
> ⚠️ É preciso criar um arquivo `.env` na raiz do projeto, siga o exemplo do arquivo [`env.example`](./env.example).
>

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-store-manager.git
```

2. Instale as dependências:

```BASH
npm install
```

3. Inicie o banco de dados:

```BASH
docker compose up -d db
```

4. Inicie o server:

```BASH
env $(cat .env) npm run dev:local
```

5. O servidor estará disponível na porta `3001`

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-store-manager.git
```

2. Suba os containers:

```BASH
docker compose up -d
```

3. O servidor estará disponível na porta `3001`

</details>


<details>

<summary><strong>Rode os testes</strong></summary><br>

Rode os testes com:

```SHELL
npm run test:mocha
```

Rode a cobertura:

```SHELL
npm run test:coverage
```

Rode a cobertura de mutação:

```SHELL
npm run test:coverage
```

</details>

## Documentação da API

A documentação desta api está disponível em `/api-docs`

## Tecnologias utilizadas

- Javascript
- Node
- Express
- MySQL
- Joi
- Docker
- swagger-ui
- Mocha
- Chai
- Sinon
