# MyTapp - Test André Luiz Alexandrini
## Banco de dados
Para o projeto, conforme descrito no teste, utilizei o PostgreSQL. O banco está na pasta de Banco de Dados dentro do repositório git.
Caso não queira utilizar o banco de dados que está no repositório, basta seguir até a sessão de Migrations
## BackEnd
### Introdução
Utilizei o AdonisJS como FrameWork para criar a aplicação. É uma framework bastante completa, e muito semelhante ao Laravel do PHP.

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
Somente caso não tenha restaurado a base de dados que está no repositório.
Primeiramente, deve-se criar um banco de dados novo com o nome mytapp, conforme está descrito na sessão **Configuração de ambiente** em **DB_DATABASE=mytapp**. Logo após, execute o comando abaixo. Irá criar toda a estrutura de tabelas do sistema(a estrutura fica no repositório da aplicação `database\migrations`). Executar essa ação na raíz do projeto.
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
#### Informação rápidao do usuário
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
#### Inserção de usuário com usuário atenticado
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
#### Alteração de usuário com usuário atenticado
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
#### Exclusão de usuário com usuário atenticado
```sh
DELETE http://server:port/v1/users/{id}

Result HTTP 204
Result HTTP 401
{}
Result HTTP 404
```

### Endpoints(Beers)
#### All Beers(25 per page)
É possível passar os parâmetros conforme está no manual https://punkapi.com/documentation/v2 em parâmetros. As parâmetros são passados como query também nesse sistema da mesma forma.
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

Para executar em ambiente de testes, basta executar o comando
```sh
$ npm start
```

Para gerar um build em produção do frontend, basta executar o comando abaixo que ficará disponível na pasta **dist** os arquivos compilados.
```sh
$ npm build
```
O login e senha para acesso serão os definidos no backend.