#  Mini-Projeto Fullstack - Parte I  

### 🔵  Versão Atual
**v1.0.0** - Deploy completo no Vercel + MongoDB Atlas + Testes Insomnia  

🔗 [Ver Release no GitHub](https://github.com/Nathalia1234/mini-projeto-fullstack/releases/tag/v1.0.0)


---

### 🔵 Autenticação de Usuários com Node.js, Express, MongoDB e JWT  

Este projeto faz parte da disciplina de **Desenvolvimento Fullstack**, e tem como objetivo desenvolver uma aplicação backend com autenticação de usuários utilizando **Node.js**, **Express**, **MongoDB (Atlas)** e **JWT (JSON Web Token)**.  

A proposta é construir uma API segura, organizada em camadas:
- Controllers, 
- Routes, 
- Models, 
- Middlewares
- Services  e 
- Database, 

Capaz de realizar **cadastro, login e controle de acesso protegido por token**.

---

## 🔵 Objetivo do Projeto  

O objetivo principal é implementar a autenticação de usuários por token JWT, garantindo que apenas pessoas autenticadas possam acessar determinadas rotas.  

De forma resumida, a aplicação:  
- Cadastra novos usuários no banco MongoDB.  
- Realiza login validando credenciais e gerando um token JWT.  
- Protege rotas que exigem autenticação, permitindo acesso apenas com token válido.  
- Retorna mensagens adequadas em cada cenário de erro (e-mail inválido, senha incorreta, token ausente, etc.).  

---

## 🔵 Funcionalidades Implementadas  

### 🔓 Rotas públicas  
- **POST /register**:  Cria um novo usuário no sistema (salvando no MongoDB).  
- **POST /login**: Autentica um usuário existente e retorna um token JWT.  

### 🔒 Rota protegida  (acesso somente com token válido)
- **GET /protected**:  Disponível apenas para usuários autenticados.  
  - Requer envio do token no cabeçalho:  

![alt text](./backend/src/img/image-6.png)

---

## 🔵 Regras de Negócio  

- O e-mail deve ser  do tipo **string**, **único e válido**.  
- A senha deve possuir **no mínimo 6 caracteres**, ser do tipo **string**, **obrigatória** e **não selecionável**.
- O campo `name` é obrigatório. e do tipo **string**.
- Todas as senhas são armazenadas com **hash** utilizando a biblioteca `bcrypt`.  
- O token JWT é gerado a partir de um segredo definido no arquivo `.env`.  

---

## 🔵 Banco de Dados  

O banco de dados foi hospedado no **MongoDB Atlas**, permitindo fácil integração e conexão remota.  

A conexão foi configurada no arquivo `src/database/db.js` utilizando `mongoose.connect()` com a URI armazenada na variável de ambiente:

```
MONGO_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/?retryWrites=true&w=majority
```

---

## 🔵 Middleware de Autenticação  

O middleware `auth.js` é responsável por validar o token JWT e permitir o acesso às rotas protegidas.  

Caso o token seja inválido, expirado ou ausente, a API retorna mensagens como:  
- `"Token inválido. Acesso negado."`  
- `"Acesso negado. Token ausente."` 

---

## 🔵 Testes de Requisição (Insomnia)  

As requisições foram testadas utilizando o **Insomnia**, conforme exigido na atividade.  

![alt text](./backend/src/img/image.png)

Todas as rotas foram executadas com sucesso e exportadas em um único arquivo `requests.yaml` dentro da pasta `/requests`.

![alt text](./backend/src/img/image-1.png)

### 🔵 Requisições incluídas:

#### Cadastro
- ✅ `cadastro_sucesso`  
- ✅ `cadastro_erro_email_repetido`  
- ✅ `cadastro_erro_email_invalido`  
- ✅ `cadastro_erro_senha_invalida`  
- ✅ `cadastro_requisicao_mal_formatada`  

#### Login
- ✅ `login_sucesso`  
- ✅ `login_erro_email_invalido`  
- ✅ `login_erro_senha_invalida`  
- ✅ `login_requisicao_mal_formatada`  

#### Rotas protegidas
- ✅ `protected_valido`  
- ✅ `protected_sem_token`  
- ✅ `protected_token_invalido`  

---

## 🔵 Exemplos de Retorno

### 🔸 Registro com sucesso

![alt text](./backend/src/img/image-2.png)

### 🔸 Login com sucesso

![alt text](./backend/src/img/image-3.png)

### 🔸 Acesso protegido com token inválido

Obs.: Para ser inválido, ao final do token original coloquei (222)

![alt text](./backend/src/img/image-4.png)

--- 

### 🔵 Como Executar Localmente

🔹 Pré-requisitos:

- Node.js instalado

- Conta gratuita no MongoDB Atlas

- Insomnia para testar as rotas

🔹 Passos:

1. Clone o repositório: 

` git clone https://github.com/nathaliaohana/mini-projeto-fullstack.git
`  

2. Acesse a pasta:
` cd backend` 

3. Instale as dependências:
`npm install ` 

4. Configure o arquivo  `.env`:

    - PORT=3000
    - MONGO_URI=sua_uri_do_mongo_aqui
    - JWT_SECRET=sua_chave_secreta_aqui

5. Execute o servidor:
`npm run dev`

O servidor estará disponível em:  `http://localhost:3000`

--- 

### 🔵 Vídeo de Demonstração

Um vídeo de até 2 minutos foi gravado demonstrando:

- Execução e exibição das requisições no **Insomnia**  
- Demonstração com **endpoints locais** (via terminal/VS Code) e em **ambiente produtivo** (Vercel)  
- Exibição dos dados cadastrados no **MongoDB Atlas**

🔗 [Clique aqui para assistir ao vídeo de demonstração]( https://drive.google.com/file/d/1J7YiUEnStLZk3P4-xd3_UlcYxADzE7ih/view?usp=sharing)


--- 

### 🔵 Tecnologias Utilizadas

| Tecnologia             | Descrição                                     |
| ---------------------- | --------------------------------------------- |
| **Node.js**            | Ambiente de execução JavaScript no servidor   |
| **Express.js**         | Framework para criação de rotas e middlewares |
| **MongoDB Atlas**      | Banco de dados NoSQL em nuvem                 |
| **Mongoose**           | ODM para modelar e manipular os dados         |
| **bcrypt**             | Criptografia de senha                         |
| **jsonwebtoken (JWT)** | Autenticação segura via token                 |
| **dotenv**             | Gerenciamento de variáveis de ambiente        |
| **Insomnia**           | Testes e validação de requisições HTTP        |

--- 

### 🔵 Deploy 

🔸 API Online:  https://api.nathaliaohana.dev/ 

Ao acessar o link principal, a API retorna a mensagem:

![alt text](./backend/src/img/image7.png)

Endpoints principais:

🔸 POST /api/register → Cadastro de usuário

🔸 POST /api/login → Login e geração de token JWT

🔸 GET /api/protected → Rota protegida com verificação de token

---

