# App

Instagram style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível criar um post;
- [x] Deve ser possível listar os posts de um usuário;
- [x] Deve ser possível comentar em um post;
- [x] Deve ser possível dar like em um post;
- [x] Deve ser possível obter as interações de um post;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário deve poder ver os comentários, os likes e a contagem de likes ao obter as interações.

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] As imagens precisam ser salvas em um bucket do AWS S3
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
