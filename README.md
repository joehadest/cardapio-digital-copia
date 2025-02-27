# Cardápio Digital

Sistema de cardápio digital com autenticação de usuários e integração com MongoDB.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Bcrypt
- dotenv

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone [url-do-repositório]
cd cardapio-digital
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_url_do_mongodb
PORT=3000
```

4. Inicie o servidor
```bash
npm start
```

## Funcionalidades

- Registro de usuários
- Login com autenticação
- Armazenamento seguro de senhas com bcrypt
- Integração com MongoDB
- API RESTful

## Endpoints

### POST /register
Registra um novo usuário
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST /login
Autentica um usuário
```json
{
  "email": "string",
  "password": "string"
}
```

## Estrutura do Projeto

```
cardapio-digital/
  ├── models/
  │   └── User.js
  ├── server.js
  ├── .env
  ├── package.json
  └── README.md
```

## Considerações de Segurança

- Senhas são hasheadas antes do armazenamento
- Configuração CORS para controle de acesso
- Validação de dados nas requisições

## Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature
3. Faça o Commit das suas alterações
4. Faça o Push da Branch
5. Abra um Pull Request
