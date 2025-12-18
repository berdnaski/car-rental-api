# API de Locação de Carros

Uma API RESTful para gerenciar carros, motoristas e registros de utilização de carros. Construída com Node.js, Express, TypeScript e Prisma.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando a Aplicação](#executando-a-aplicação)
- [Documentação da API](#documentação-da-api)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)

## ✨ Funcionalidades

- **Gerenciamento de Carros**: Criar, ler, atualizar, deletar e listar carros
- **Gerenciamento de Motoristas**: Criar, ler, atualizar, deletar e listar motoristas
- **Rastreamento de Uso de Carros**: Rastrear uso de carros por motoristas com datas de início/fim
- **Paginação**: Todos os endpoints de listagem suportam paginação
- **Filtros**: Filtrar carros, motoristas e utilizações por diversos critérios
- **Regras de Negócio**: 
  - Prevenir placas duplicadas
  - Prevenir conflitos de uso de carro (um carro por motorista por vez)
  - Prevenir conflitos de motorista (um carro por motorista por vez)
- **Documentação da API**: Documentação interativa Swagger/OpenAPI

## 🛠 Stack Tecnológica

- **Runtime**: Node.js
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **Testes**: Vitest
- **Documentação**: Swagger/OpenAPI

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (v18 ou superior)
- npm ou yarn
- PostgreSQL (v12 ou superior)
- Docker e Docker Compose (opcional, para banco de dados)

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositório>
   cd car-rental-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e configure:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/car_rental_db"
   PORT=3000
   ```

## ⚙️ Configuração

### Configuração do Banco de Dados

#### Opção 1: Usando Docker (Recomendado)

1. **Inicie o PostgreSQL com Docker Compose**
   ```bash
   npm run docker:up
   ```

2. **Execute as migrações do banco de dados**
   ```bash
   npm run prisma:migrate
   ```

3. **Gere o Prisma Client**
   ```bash
   npm run prisma:generate
   ```

4. **Popule o banco de dados (opcional)**
   ```bash
   npm run prisma:seed
   ```

#### Opção 2: Usando PostgreSQL Local

1. **Crie um banco de dados**
   ```sql
   CREATE DATABASE car_rental_db;
   ```

2. **Atualize o `.env` com sua string de conexão do banco de dados**

3. **Execute as migrações**
   ```bash
   npm run prisma:migrate
   ```

4. **Gere o Prisma Client**
   ```bash
   npm run prisma:generate
   ```

## 🏃 Executando a Aplicação

### Modo de Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000` (ou a porta especificada no `.env`).

### Modo de Produção

1. **Compile o projeto**
   ```bash
   npm run build
   ```

2. **Inicie o servidor**
   ```bash
   npm start
   ```

## 📚 Documentação da API

Quando o servidor estiver rodando, acesse a documentação interativa da API em:

```
http://localhost:3000/docs
```

O Swagger UI fornece:
- Documentação completa dos endpoints da API
- Esquemas de requisição/resposta
- Funcionalidade de teste
- Exemplos de requisições e respostas

## 🧪 Testes

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Gerar Cobertura de Testes

```bash
npm run test:coverage
```

### Estrutura dos Testes

Os testes estão organizados em diretórios `__tests__` ao lado do código que testam:

```
src/
├── application/
│   ├── cars/
│   │   └── usecases/
│   │       └── __tests__/
│   │           ├── create-car.usecase.test.ts
│   │           └── get-car-by-id.usecase.test.ts
│   └── drivers/
│       └── usecases/
│           └── __tests__/
│               └── create-driver.usecase.test.ts
└── shared/
    └── utils/
        └── __tests__/
            └── error-handler.test.ts
```

## 📁 Estrutura do Projeto

```
src/
├── application/          # Camada de aplicação (casos de uso, DTOs)
│   ├── cars/
│   │   └── usecases/
│   ├── drivers/
│   │   └── usecases/
│   ├── carsUsage/
│   │   └── usecases/
│   └── dtos/            # Objetos de Transferência de Dados
├── domain/              # Camada de domínio (entidades, interfaces de repositórios)
│   ├── entities/
│   └── repositories/
├── infra/               # Camada de infraestrutura
│   ├── database/        # Implementações do banco de dados
│   │   └── repositories/
│   └── http/            # Camada HTTP
│       ├── controllers/
│       ├── routes/
│       └── swagger/     # Documentação da API
└── shared/              # Utilitários compartilhados
    ├── errors/
    ├── filters/
    ├── types/
    └── utils/
```

## 🔌 Endpoints da API

### Carros

- `GET /cars` - Listar carros (com paginação e filtros)
- `POST /cars` - Criar um novo carro
- `GET /cars/:id` - Obter carro por ID
- `PUT /cars/:id` - Atualizar carro
- `DELETE /cars/:id` - Deletar carro

### Motoristas

- `GET /drivers` - Listar motoristas (com paginação e filtros)
- `POST /drivers` - Criar um novo motorista
- `GET /drivers/:id` - Obter motorista por ID
- `PUT /drivers/:id` - Atualizar motorista
- `DELETE /drivers/:id` - Deletar motorista

### Utilizações de Carros

- `GET /car-usages` - Listar utilizações de carros (com paginação e filtros)
- `POST /car-usages` - Criar uma nova utilização de carro
- `POST /car-usages/:id/finalize` - Finalizar uma utilização de carro

## 📝 Exemplos de Requisições

### Criar um Carro

```bash
curl -X POST http://localhost:3000/cars \
  -H "Content-Type: application/json" \
  -d '{
    "licensePlate": "ABC1234",
    "color": "Prata",
    "brand": "Toyota"
  }'
```

### Listar Carros com Paginação

```bash
curl "http://localhost:3000/cars?page=1&limit=10&brand=Toyota"
```

### Criar um Motorista

```bash
curl -X POST http://localhost:3000/drivers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva"
  }'
```

### Criar uma Utilização de Carro

```bash
curl -X POST http://localhost:3000/car-usages \
  -H "Content-Type: application/json" \
  -d '{
    "carId": "uuid-do-carro",
    "driverId": "uuid-do-motorista",
    "startDate": "2025-01-15T10:00:00Z",
    "reason": "Visita a cliente"
  }'
```

### Finalizar uma Utilização de Carro

```bash
curl -X POST http://localhost:3000/car-usages/uuid-utilizacao/finalize \
  -H "Content-Type: application/json" \
  -d '{
    "endDate": "2025-01-15T18:00:00Z"
  }'
```

## 🎯 Formato de Resposta

### Resposta de Sucesso

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Resposta de Erro

```json
{
  "message": "Mensagem de erro"
}
```

### Resposta de Erro de Validação

```json
{
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "licensePlate": ["licensePlate é obrigatório"]
    }
  }
}
```

## 🔒 Regras de Negócio

1. **Unicidade de Placa**: Cada carro deve ter uma placa única
2. **Uso de Carro**: Um carro só pode ser usado por um motorista por vez
3. **Uso de Motorista**: Um motorista só pode usar um carro por vez
4. **Finalização de Uso**: Um uso deve ser finalizado antes de criar um novo

## 🛠 Scripts Disponíveis

- `npm run dev` - Iniciar servidor de desenvolvimento com hot reload
- `npm run build` - Compilar o projeto para produção
- `npm start` - Iniciar servidor de produção
- `npm test` - Executar testes
- `npm run test:watch` - Executar testes em modo watch
- `npm run test:coverage` - Gerar relatório de cobertura de testes
- `npm run prisma:generate` - Gerar Prisma Client
- `npm run prisma:migrate` - Executar migrações do banco de dados
- `npm run prisma:studio` - Abrir Prisma Studio (interface gráfica do banco)
- `npm run prisma:push` - Enviar alterações do schema para o banco
- `npm run prisma:seed` - Popular o banco de dados
- `npm run docker:up` - Iniciar containers Docker
- `npm run docker:down` - Parar containers Docker
- `npm run docker:logs` - Ver logs do Docker

## 📄 Licença

ISC

## 👤 Autor

API de Locação de Carros - Teste Técnico

---

Para mais informações, visite a documentação da API em `/docs` quando o servidor estiver rodando.
