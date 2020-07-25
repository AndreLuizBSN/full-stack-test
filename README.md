# MyTapp - Test André Luiz Alexandrini
## Técnologias
NPM versão 6.14.6
Node versão 12.18.3
PostgreSQL 12
Projeto criado em ambiente Windows.

## Banco de dados
Para o projeto, conforme descrito no teste, utilizei o PostgreSQL versão 12(última do para download -> utilizei a versão do Windows Installer baixada do site oficial do PostgreSQL - https://www.postgresql.org/). O banco para ser restaurado está na pasta de **Banco de Dados** dentro do repositório git.
Caso não queira utilizar o banco de dados que está no repositório, basta seguir até a sessão de Migrations.

## BackEnd
### Introdução
Utilizei o AdonisJS como FrameWork para criar a aplicação. É uma framework bastante completa, e muito semelhante ao Laravel do PHP.

### Instalação base para rodar o backend
Inicialmente, execute o comando abaixo para instalar o AdonisJS e poder executar os comandos a partir dele.
```sh
$ npm i -g @adonisjs/cli
```

### Configuração de ambiente
A configuração de IP, Porta, dados do banco estão no arquivo **.env** disponível na raíz do projeto
```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME="MyTapp - Teste"
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=THfKETdu68nFcfYC6rBPUFLpDP4m6C4m
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=@ngrys3rv3r$
DB_DATABASE=mytapp
HASH_DRIVER=bcrypt
```
### Instalação das dependencias
```sh
$ npm i
```
### Migration
Utilizar essa sessão somente no caso de não ter restaurado a base de dados que está no repositório.
O passo a passo é o seguinte:
* Primeiramente, deve-se criar um banco de dados novo com o nome **mytapp** no PostgreSQL, conforme está descrito na sessão **Configuração de ambiente** em **DB_DATABASE=mytapp**.
* Após, execute o comando abaixo. Irá criar toda a estrutura de tabelas do sistema(a estrutura fica no repositório da aplicação `database\migrations`). Executar essa ação na raíz do projeto.
```sh
$ adonis migration:run
```
### Execução
Para executar o projeto usando Adonis, use o comando
```sh
$ adonis serve
```
Para executar o projeto usando Node, use o comando
```sh
$ npm start
ou
$ node serve.js
```
Os logs, quando ocorra algo, ficam na pasta **tmp**.

### Endpoints(Usuário)
#### Registro de usuário
```sh
POST http://server:port/v1/auth/register
body JSON
{
	"name": "Fulano",
	"surname": "Kowalski",
	"email": "fulano@mail.com",
	"password": "1234567",
	"password_confirmation": "1234567"
}
Result HTTP 201
{
  "data": {
    "name": "Fulano",
    "surname": "Kowalski",
    "email": "fulano@mail.com",
    "created_at": "2020-07-20 16:58:49",
    "updated_at": "2020-07-20 16:58:49",
    "id": 1
  }
}
Result HTTP 400
{
  "errors": [
    {
      "message": "Descrição do erro",
      "field": "campo",
      "validation": "tipo de validação"
    }
  ]
}
```
#### Login de usuário
```sh
POST http://server:port/v1/auth/login
body JSON
{
	"email": "fulano@mail.com",
	"password": "1234567"
}
Result HTTP 200
{
  "data": {
    "type": "bearer",
    "token": "Token usado para autenticação de acesso",
    "refreshToken": "Usado internamente para recriar token"
  }
}
Result HTTP 401
{}
```
#### Informação rápida do usuário
```sh
GET http://server:port/v1/me
header
{
	"Authorization": "Bearer Token"
}
Result HTTP 200
{
    "name": "Fulano",
    "surname": "Kowalski",
    "email": "fulano@mail.com",,
    "active": true,
    "created_at": "2020-07-20 16:58:49",
    "updated_at": "2020-07-20 16:58:49",
    "id": 1
}
Result HTTP 401
{}
```

#### Lista de usuários
```sh
GET http://server:port/v1/users
header
{
	"Authorization": "Bearer Token"
}
Result HTTP 200
{
  "pagination": {
    "total": 1,
    "perPage": 10,
    "page": 1,
    "lastPage": 1
  },
  "data": [
    {
        "name": "Fulano",
        "surname": "Kowalski",
        "email": "fulano@mail.com",,
        "active": true,
        "created_at": "2020-07-20 16:58:49",
        "updated_at": "2020-07-20 16:58:49",
        "id": 1
    }
  ]
}
Result HTTP 401
{}
```
#### Informação de um usuário
```sh
GET http://server:port/v1/users/{id}
header
{
	"Authorization": "Bearer Token"
}
Result HTTP 200
{
    "name": "Fulano",
    "surname": "Kowalski",
    "email": "fulano@mail.com",,
    "active": true,
    "created_at": "2020-07-20 16:58:49",
    "updated_at": "2020-07-20 16:58:49",
    "id": 1
}
Result HTTP 401
{}
```
#### Inserção de usuário com usuário autenticado
```sh
POST http://server:port/v1/users
body JSON
{
	"name": "Fulano",
	"surname": "Kowalski",
	"email": "fulano@mail.com",
	"password": "1234567",
	"password_confirmation": "1234567"
}
Result HTTP 201
{
  "data": {
    "name": "Fulano",
    "surname": "Kowalski",
    "email": "fulano@mail.com",
    "created_at": "2020-07-20 16:58:49",
    "updated_at": "2020-07-20 16:58:49",
    "id": 1
  }
}
Result HTTP 401
{}
Result HTTP 400
{
  "errors": [
    {
      "message": "Descrição do erro",
      "field": "campo",
      "validation": "tipo de validação"
    }
  ]
}
```
#### Alteração de usuário com usuário autenticado
```sh
PUT http://server:port/v1/users/{id}
body JSON
{
	"surname": "Kowalski Alves"
}
Result HTTP 200
{
    "name": "Fulano",
    "surname": "Kowalski Alves",
    "email": "fulano@mail.com",
    "created_at": "2020-07-20 16:58:49",
    "updated_at": "2020-07-20 18:58:49",
    "id": 1
}
Result HTTP 401
{}
Result HTTP 400
{
  "errors": [
    {
      "message": "Descrição do erro",
      "field": "campo",
      "validation": "tipo de validação"
    }
  ]
}
```
#### Exclusão de usuário com usuário autenticado
```sh
DELETE http://server:port/v1/users/{id}

Result HTTP 204
Result HTTP 401
{}
Result HTTP 404
```

### Endpoints(Beers)
#### All Beers(25 per page)
É possível passar os parâmetros conforme está no manual **https://punkapi.com/documentation/v2**. As parâmetros são passados como query também nesse sistema da mesma forma.
```sh
GET http://server:port/v1/beers

Result HTTP 200
[
  {
    "id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    [...]
  },
  {...}
]
Result HTTP 401
{}
```
#### Get Beer
```sh
GET http://server:port/v1/beers/{id}

Result HTTP 200
{
    "id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    [...]
}
Result HTTP 401
{}
```

## Frontend

### introdução
Está Configurado nos arquivos **environment.prod.ts** e **environment.ts** dentro do diretório **src\environments** do projeto Frontend o caminho para a API. Caso tenha alterado a porta ou o endereço do servidor, se faz necessário configurar esses 2 arquivos para execução dos comandos descritos na próxima sessão.

### Execução
Para instalar as dependencias do projeto, execute o comando
```sh
$ npm i
```

Para executar em ambiente de testes, basta executar o comando abaixo. Irá executar no endereço **http://localhost:4200**.
```sh
$ npm start
```

Para gerar um build em produção do frontend, basta executar o comando abaixo que ficará disponível na pasta **dist** os arquivos compilados.
```sh
$ ng build
```
Em minha maquina eu executei o build usando um aplicativo chamado **miniweb** que disponibilizei para downloado no endereço **https://drive.google.com/file/d/1RT5CHcN_IZ8KS6ZbPdrPSYPYZPzHLkUX/view?usp=sharing**. Para utilizar o aplicativo que disponibilizei(caso desejar), basta colocar o conteúdo da pasta **dist** gerado pelo build dentro da pasta **htdocs**.

O login e senha para acesso serão os definidos no backend na sessão de registro de usuário(cadastro).

# Considerações finais
Para testar todo as sessões citadas acima, criei uma VM com Windows 10, efetuei a instalação do NPM e Node baixados diretamente do site **https://nodejs.org/pt-br/download/**, efetuei a instalação do PostgreSQL do site Descrito na sessão **Banco de Dados**. Instalei também para testar os Endpoints o **insomnia** no link **https://insomnia.rest/download/core/** (que considero uma excelente ferramenta)