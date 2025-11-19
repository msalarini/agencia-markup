# Guia de Desenvolvimento

## Gerenciador de Pacotes

⚠️ **IMPORTANTE**: Este projeto usa **Yarn** como gerenciador de pacotes.

**NÃO use npm!**

### Comandos Yarn

```bash
# Instalar dependências
yarn install

# Adicionar uma dependência
yarn add <package>

# Adicionar uma dependência de desenvolvimento
yarn add -D <package>

# Remover uma dependência
yarn remove <package>

# Executar scripts
yarn dev
yarn build
yarn test
yarn test:coverage
```

## Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn build` - Cria build de produção
- `yarn start` - Inicia servidor de produção
- `yarn lint` - Executa linter
- `yarn test` - Executa testes em modo watch
- `yarn test:ui` - Executa testes com UI interativa
- `yarn test:run` - Executa testes uma vez
- `yarn test:coverage` - Executa testes com relatório de cobertura

## Testes

O projeto usa **Vitest** com **Testing Library**.

### Cobertura de Código

O projeto mantém **100% de cobertura** em:
- Statements
- Branches
- Functions
- Lines

### Executar Testes

```bash
# Modo watch (desenvolvimento)
yarn test

# Executar uma vez
yarn test:run

# Com cobertura
yarn test:coverage

# Com UI
yarn test:ui
```

## Estrutura do Projeto

```
agencia-markup/
├── app/              # Páginas Next.js (App Router)
├── components/       # Componentes React
│   └── ui/          # Componentes UI (shadcn/ui)
├── lib/             # Utilitários e helpers
├── public/          # Arquivos estáticos
└── __tests__/       # Arquivos de teste (.test.ts, .test.tsx)
```

## Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React
