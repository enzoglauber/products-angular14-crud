# products-angular14-crud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Instalado as dependências
Execute o comando `npm i` para instalar as dependências da aplicação.

## Rodando a aplicação

Execute o comando `npm run start:all` para rodar o mock e iniciar a aplicação.

OU

Execute o comando `npm run start` para iniciar a aplicação e `npm run mock` para iniciar o mock separadamente.

## Mock

O mock foi criado com base no [mockoon](https://mockoon.com/). Não sera necessário instalar sua IDE, pois na dependência do projeto tem sua CLI referenciada, mas caso necessite o arquivo mock.json no *root* da aplicação provera essas definições.

## Rodando os testes unitários

Execute o comando `npm t` para executar os testes via [Jest](https://jestjs.io/).

## Solução proposta

> Adotei as seguintes abortagens a soluções para o desafio:
> - Mobile first
> - Aplicação responsiva
> - Tema com as cores do Itaú para o Angular Material
> - Serviço de produtos
> - Serviço de categorias
> - Pipe de categoria na lista de produtos
> - Resolver para o edição do produto
> - Progress loader com observable no carregamento do produto para edição
> - Lista de Produtos com pipe async e timing cache
> - Mock feito com moockon
> - Usei a estratégia de pré-carregamento [Quicklink]( https://web.dev/i18n/pt/route-preloading-in-angular/), que pré-carrega apenas as rotas associadas aos links na página atual.
