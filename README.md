# 🐾 Almas de Gato

Projeto Interdisciplinar desenvolvido pelos alunos de Análise e Desenvolvimento de Sistemas (ADS) do UNIBRA – Centro Universitário Brasileiro, em parceria com a ONG **Almas de Gato**, dedicada ao resgate, cuidado e encaminhamento de animais para adoção responsável.

## 📌 Sobre o projeto

A ONG Almas de Gato divulga seu trabalho principalmente pelo Instagram, o que limita o alcance e dificulta que novas pessoas conheçam o projeto. Este sistema web tem como objetivo centralizar as informações da ONG em um único ambiente digital — apresentando os animais disponíveis para adoção, facilitando o contato com adotantes e divulgando formas de contribuição.

## 🎯 Objetivos

- Apresentar os animais disponíveis para adoção de forma clara e acessível
- Reunir informações institucionais da ONG em um único lugar
- Facilitar o contato entre interessados e a ONG
- Possibilitar uma análise prévia dos adotantes antes da adoção

## 🛠️ Tecnologias utilizadas

**Front-end**
- HTML5
- CSS3
- JavaScript

**Back-end**
- Node.js
- Express
- MySQL (via XAMPP em ambiente de desenvolvimento)

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [XAMPP](https://www.apachefriends.org/) instalado (para o MySQL)
- Banco MySQL disponível

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/danielandrade-png/Projeto-Almas-de-Gato.git

# Acesse a pasta do projeto
cd Projeto-Almas-de-Gato

# Instale as dependências
npm install
```

Copie `.env.example` para `.env` na raiz do projeto e ajuste as variáveis para o seu ambiente:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=almas_de_gato
DB_PORT=3306
DB_CONNECTION_LIMIT=10
```

Inicie o MySQL pelo XAMPP Control Panel e crie o banco `almas_de_gato` (via phpMyAdmin). Em seguida, importe [db/schema.sql](./db/schema.sql) para criar as tabelas e inserir os pilares institucionais iniciais.

Por fim, rode o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### API

Todas as respostas são JSON. Listagens e operações de criação retornam os dados em `data`; erros retornam `{ "error": "..." }`.

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/health` | Verifica se a API está ativa |
| GET | `/api/cats?status=disponivel` | Lista gatos; filtro opcional: `disponivel`, `em_tratamento` ou `adotado` |
| GET | `/api/cats/:id` | Busca um gato pelo ID |
| POST | `/api/cats` | Cadastra um gato (`name` obrigatório; `age`, `gender`, `description`, `image_url` e `status` opcionais) |
| GET | `/api/projects` | Lista os pilares institucionais |
| POST | `/api/donations` | Registra doação (`donor_name`, `email` e `type` obrigatórios; `phone` e `description` opcionais). `type`: `financeira`, `racao` (ou `ração`) ou `lar_temporario` (ou `lar temporário`). Doação financeira também exige `amount` positivo |
| POST | `/api/contact` | Registra mensagem (`name`, `email` e `message` obrigatórios; `subject` opcional) |

Exemplo de cadastro de doação de ração:

```json
{
  "donor_name": "Maria",
  "email": "maria@example.com",
  "type": "racao",
  "description": "Doação de um saco de ração"
}
```

## 📁 Estrutura de pastas

```
├── db/schema.sql
├── src/
│   ├── config/database.js
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── server.js
└── .env
```

## 👥 Equipe

| Nome | Função |
|---|---|
| Ailson Rodrigues Vieira Junior | Responsável pela apresentação visual |
| Anderson Felipe T. da Hora | Analista de documentação |
| Carllos Eduardo Virgínio Vieira | Desenvolvedor front-end |
| Daniel Andrade da Silva Filho | Desenvolvedor back-end |
| Gabriel Cavalcanti Garrido | Gerente do projeto / Desenvolvedor front-end |
| Hitallo Guilherme Farias de Melo | Desenvolvedor front-end |
| Karolayne Isabel Silva | Responsável pelos materiais de apoio |
| Matheus Henrique Nobrega Correia | Responsável pela apresentação oral |
| Ramon Lorenzo P. de S. Pimentel | Analista de documentação |
| Thayguara Batista da Silva | Responsável técnico / Desenvolvedor back-end |

**Orientador(a):** Ismael Rodrigues

## 🏫 Instituição

UNIBRA – Centro Universitário Brasileiro
Análise e Desenvolvimento de Sistemas — 2026.2
