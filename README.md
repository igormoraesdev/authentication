# Authentication Project

Um projeto Next.js completo de autenticação com JWT tokens, implementando NextAuth.js e seguindo os melhores padrões de desenvolvimento TypeScript.

## 🚀 Setup Rápido

### Pré-requisitos

- **Node.js**: ≥18.0.0
- **Yarn**: ≥1.22.0

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd authentication

# Instale as dependências
yarn install

# Configure as variáveis de ambiente (veja seção abaixo)
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
yarn dev
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=
NEXTAUTH_URL=
AUTH_SECRET=
AUTH_URL=

```

## 🔐 Autenticação

### Credenciais de Teste

Para fins de desenvolvimento, use as seguintes credenciais:

```
Email: teste@email.com
Senha: 123456
```

### Fluxo de Autenticação

1. **Login**: `/auth/signin`
   - Validação de credenciais via API
   - Geração de JWT token
   - Criação de sessão NextAuth

2. **Proteção de Rotas**:
   - Middleware verifica autenticação
   - Redirecionamento automático para login se não autenticado

3. **Dashboard**: `/dashboard`
   - Área protegida com informações do usuário
   - Atividades recentes
   - Botão de logout

### API Endpoints

- `POST /api/auth/signin` - Autenticação de usuário
- `GET /api/user-profile` - Dados do perfil (protegida)
- `GET /api/recent-activities` - Atividades recentes (protegida)

## 🛠 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev                 # Inicia servidor de desenvolvimento

# Build e Produção
yarn build              # Build para produção
yarn start              # Inicia servidor de produção

# Qualidade de Código
yarn lint               # Executa ESLint
yarn lint:fix           # Corrige problemas do ESLint automaticamente
yarn format             # Formata código com Prettier
yarn format:check       # Verifica formatação
yarn check              # Lint + verificação de formatação
yarn fix                # Lint fix + formatação
```

### Padrões de Código

Este projeto segue rigorosos padrões de qualidade:

- **TypeScript**: Tipagem estrita, sem `any`
- **ESLint**: Configuração Next.js + Prettier
- **Prettier**: Formatação consistente
- **Nomenclatura**:
  - PascalCase para classes e componentes
  - camelCase para variáveis e funções
  - kebab-case para arquivos e diretórios

### Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (main)/            # Layout group para páginas principais
│   │   └── dashboard/     # Dashboard protegido
│   ├── api/               # API Routes
│   │   ├── auth/          # Endpoints de autenticação
│   │   ├── user-profile/  # API do perfil do usuário
│   │   └── recent-activities/ # API de atividades
│   └── auth/              # Páginas de autenticação
│       └── signin/        # Página de login
├── components/            # Componentes React
│   ├── features/          # Componentes específicos por feature
│   │   ├── auth/          # Componentes de autenticação
│   │   └── dashboard/     # Componentes do dashboard
│   └── ui/                # Componentes de UI reutilizáveis
├── lib/                   # Utilitários e configurações
│   ├── api/               # Cliente HTTP e factory
│   ├── auth/              # Configuração NextAuth e HOCs
│   ├── jwt/               # Serviços JWT
│   ├── logger/            # Sistema de logging
│   └── service/           # Serviços de negócio
├── types/                 # Definições de tipos TypeScript
└── middleware.ts          # Middleware de proteção de rotas
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de JWT**: Verifique se `JWT_SECRET` está definido
2. **Erro de NextAuth**: Confirme `NEXTAUTH_SECRET` e `NEXTAUTH_URL`
3. **Erro de build**: Execute `yarn lint:fix` antes do build

### Logs

O projeto inclui sistema de logging estruturado:

- Frontend: Logs são enviados para Sentry
- Backend: Logs no console e Sentry

## 📄 Licença

Este projeto é privado e confidencial.
