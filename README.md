# pass.in

O pass.in é uma aplicação de gestão de participantes em eventos presenciais.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [  ]  O organizador deve poder cadastrar um novo evento;

- [  ]  O organizador deve poder visualizar dados de um evento;

- [  ]  O organizador deve poder visualizar a lista de participantes;

- [  ]  O participante deve poder se inscrever em um evento;

- [  ]  O participante deve poder visualizar seu crachá de inscrição;

- [  ]  O participante deve poder realizar check-in no evento;

### Regras de negócio

- [  ]  O participante só pode se inscrever em um evento uma única vez;

- [  ]  O participante só pode se inscrever em eventos com vagas disponíveis;

- [  ]  O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [  ]  O check-in no evento será realizado através de um QRCode;


## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src="erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```



## Anotações

### API REST 
- Métodos HTTP: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`...

- `GET` - Retornar dados
- `POST` - Criando rota para criar algo, como um registro, um novo produto, uma constants, etc.
- `PUT` - Atualização de recursos, como nome, avatar, senha, etc.
- `DELETE` - Quando for deletar uma informacao na API
- `PATCH` - Fazer uma alteração única em um registo, exemplo um usuário vai aceitar ou nao receber uma notificação, porque ele está alterando um informacao única diferente do post onde ele alterar um registro por completo
- `HEAD` e `OPTIONS` - É mais voltado para a parte de CORS e Segurança

- Corpo da requisição (`Request Body`) geralmente é utilizado em requisições do tipo `POST` ou `PUT`, que sao basicamente as informações do formulário, normalmente usados para a criação ou edição de um registro.

- Parâmetros de busca (`Search Params` / `Query Params`) são parâmetros enviados na URL geralmente usados para fazer filtragem ou busca de dados

    Ex.:  `http://localhost:3333/users?name=Fabricio`

### Parâmetros de rota (`Route Params`) - Identificação de recursos;

Geralmente utilizados nos métodos `GET`, `PUT`, `DELETE` ou `PATCH`

Ex.: Para deletar o usuário com ID `5`, então usando a rota `DELETE` 

`DELETE http://localhost:3333/users/5`


Cabeçalhos (`Headers`) - Contexto da requisição

- Por exemplo o backend precisa responder uma mensagem de erro pro usuário caso o email já exista, então essa mgs de erro pode vir em português pro usuário caso ele esteja no Brasil, mas ele pode responder essa mgs em outro idioma caso o usuário esteja em outro país. Então essa informação do idioma do usuário pode ser transacionada pelo `Header`. Geralmente são informações que não vão mudar, que servem para contextualizar o backend para que o backend saiba mais informações sobre quem está fazendo aquela requisição.

- Informações normalmente enviadas são:

    - Autenticação, localização, idioma, time zone, etc, informações que ajudam o usuário a dar um retorno mais apropriado para o usuário


## Banco de dados
Normalmente sao 3 formas de conectar uma API a um banco de dados, Driver nativo, Query Builders e ORMs.

- `Driver Nativo` são as formas conexões de mais baixo nível onde você cria a conexão e você tem que escrever todas as Querys na mão, como o SELEC, SEACH, DELETE, tudo na mão; É uma ótima opcao para quem está buscando uma otimização a nível profundo, porque você pode ter controle de tudo, mas precisa de um grande conhecimento em SQL

- `Query Builder` - Geralmente você usa a linguagem/sintaxe para escrever as Query SQL por exemplo o KNEX.js

- `ORM` (`Object Relational Mapping`), como o Hibernate, Doctrine, ActiveRecord, etc
    - E uma ferramenta que automatiza vários processos do banco de dados ao mesmo tempo, nao so a escrita de Querys, mas o versionamento do banco de dados.

    - Exemplo de ORM no Node.js é o `Sequelize`, mas não será usado nesse projeto porque a API dele ficou um pouco para trás em comparação com outros, que tem uma experiencia melhor de desenvolvimento, como o Prisma e o Drizzle (mas o projeto está muito embrionário)

- JSON - JavaScript Object Notation

### Códigos HTTP - Status Code
- 20x - Todo Status code que começa com `200` significa sucesso;

    - `200` Sucesso (de forma genérica, podendo ser mais específico com as variações);

    - `201` - Registo criado com sucesso;

- 30x - Todo Status code que começa com `300` é um redirecionamento;

- 40x - Todo Status code que começa com `400` é um `Client Error` significa um erro do cliente (Erro em alguma informação enviada por QUEM está fazendo a chamada p/ API);

- 50x - Todo código com `500` significa um erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado p/ o servidor);


### OBS.

Caso o TypeScript não reconheça as novas tabelas do banco pode forçar ele reiniciar:

Na aba do arquivo TS pressionar o atalho "Ctrl + Shift + P" e digitar 

> TypeScript: Restart TS Server
