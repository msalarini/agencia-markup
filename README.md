# Calculadora de Markup - Agência de Turismo

Uma ferramenta simples e eficaz para agências de turismo calcularem o preço de venda ideal de seus pacotes.

## 🚀 Funcionalidades - PRO Nível 1

### Cálculos Avançados
- ✅ Cálculo de preço de venda baseado em custo + markup
- ✅ Visualização de lucro total e líquido
- ✅ Cálculo de comissão do vendedor
- ✅ Lucro líquido (após comissão)
- ✅ Margem percentual automática
- ✅ Feedback de negócio (projeção de lucro mensal)

### Gestão de Pacotes
- ✅ Salvar pacotes no navegador (localStorage)
- ✅ Lista de pacotes salvos com visão geral
- ✅ Editar pacotes existentes
- ✅ Duplicar pacotes para testar variações
- ✅ Deletar pacotes
- ✅ Botão "Limpar" para começar do zero

### UX/UI
- ✅ Interface responsiva e intuitiva
- ✅ Validações de input (min, step)
- ✅ Placeholders realistas
- ✅ Explicação das fórmulas
- ✅ Destaque visual para features PRO

## 📦 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vercel** - Deploy (recomendado)

## 🛠️ Setup Local

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🌐 Deploy na Vercel

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale o Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Na pasta do projeto, rode:
   ```bash
   vercel
   ```
4. Siga as instruções no terminal
5. Pronto! Seu app estará online

### Deploy via GitHub (recomendado)

1. Suba o código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Conecte seu repositório GitHub
5. A Vercel fará o deploy automaticamente

## 📱 Personalização

### Alterar número do WhatsApp

Edite o arquivo `app/page.tsx` na linha 153:

```tsx
href="https://wa.me/5511999999999?text=..."
```

Troque `5511999999999` pelo seu número com código do país e DDD.

## 📝 Estrutura do Projeto

```
agencia-markup/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página da calculadora
│   └── globals.css     # Estilos globais
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 💡 Próximos Passos (Nível 2 e 3)

### Nível 2 - SaaS com Backend
- [ ] Sistema de login (e-mail/senha ou magic link)
- [ ] Salvar pacotes em banco de dados (Supabase/Firebase)
- [ ] Exportar orçamentos em PDF personalizados
- [ ] Histórico de cotações por cliente
- [ ] Compartilhar pacotes via link

### Nível 3 - Features Premium
- [ ] Cálculos multi-moeda com câmbio automático
- [ ] Simulação de descontos em tempo real
- [ ] Relatórios mensais (lucro, tíquete médio, etc.)
- [ ] Dashboard com gráficos e analytics
- [ ] Integração com APIs de reservas
- [ ] App mobile (PWA)

## 📄 Licença

MIT - Livre para uso pessoal e comercial.
