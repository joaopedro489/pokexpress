# Pokexpress
## Projeto básico para desenvolvimento na framework Express
### Feito por: João Pedro Cavalcante e Filipe Castelo Branco
Projeto realizado em typescript e utilizando o ORM typeorm.

## Como instalar o projeto?
Utilizando a ferramenta git será possível baixar o projeto utilizando o seguinte comando:
* ` git clone https://github.com/joaopedro489/pokexpress `

## Como executar o projeto?
Utilizando o node será possível instalar as dependências do projeto utilizando o comando pelo terminal (dentro da pasta do projeto):
* `npm install`
Logo após o término das instalações das dependências será necessário montar o bando de dados. Para isso primeiro será necessário 
executar as migrations e depois, se preferir, povoar o bando de dados, para isso pode-se utilizar os dois comandos seguinte:
* `npm run typeorm migration:run`
* `npm run seed:run`
Para finalizar, para servir o projeto basta utilizar o seguinte comando:
* `npm run dev`

## Como testar o projeto?
Para testar o projeto basta utilizar o aplicativo Postman ou Insomnia para testar a api e suas rotas.
