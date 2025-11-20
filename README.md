# Calculadora de Markup PRO

Ferramenta profissional para cálculo de preços de pacotes turísticos com gestão de comissões e armazenamento local.

## Features

- Preço de venda, lucro e margem em tempo real
- Cálculo de comissão de vendedor
- Salvar/editar/duplicar pacotes (localStorage)
- Projeção de lucro mensal
- Interface responsiva
- 🤖 **Sugestões de Markup com IA** (Google Gemini)
- 💬 **Chatbot de Atendimento** inteligente

## Tech Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- localStorage

## Getting Started

### 1. Instalação

```bash
npm install
```

### 2. Configurar API Key (para funcionalidades de IA)

Crie um arquivo `.env.local`:

```bash
GOOGLE_AI_API_KEY=sua_chave_aqui
```

Obtenha sua chave em: https://aistudio.google.com/app/apikey

### 3. Executar

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🤖 Funcionalidades de IA

Veja documentação completa em: [AI_FEATURES.md](./AI_FEATURES.md)

- **Sugestões de Markup**: IA analisa custos e sugere 3 opções de markup
- **Chatbot**: Assistente virtual para dúvidas e suporte

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/agencia-markup)

## License

MIT
