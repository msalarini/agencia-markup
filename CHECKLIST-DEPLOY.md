# ✅ Checklist de Deploy - Calculadora de Markup PRO

## Antes de Publicar

### 1. Personalização
- [ ] Trocar número do WhatsApp em `app/page.tsx` (linha 441)
- [ ] Trocar domínio (se tiver um próprio)
- [ ] Adicionar favicon personalizado
- [ ] Revisar textos e copy

### 2. SEO e Metadados
- [ ] Atualizar title e description em `app/layout.tsx`
- [ ] Adicionar Open Graph tags para WhatsApp/redes sociais
- [ ] Criar arquivo `robots.txt`
- [ ] Criar `sitemap.xml` (se quiser aparecer no Google)

### 3. Analytics e Tracking
- [ ] Adicionar Google Analytics ou Plausible
- [ ] Configurar eventos importantes:
  - Cálculo realizado
  - Pacote salvo
  - Click no CTA WhatsApp
  - Pacote duplicado

### 4. Testes Finais
- [ ] Testar em mobile (Chrome DevTools)
- [ ] Testar salvar/carregar pacotes
- [ ] Testar duplicar pacotes
- [ ] Testar deletar pacotes
- [ ] Verificar cálculos de comissão
- [ ] Testar link do WhatsApp
- [ ] Verificar se funciona offline (PWA)

### 5. Build de Produção
```bash
# Testar build localmente
cmd /c "yarn build"

# Rodar versão de produção
cmd /c "yarn start"

# Acessar http://localhost:3000 e testar tudo
```

## Deploy na Vercel (Recomendado)

### Opção 1: Via GitHub (Automático)

1. **Criar repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - PRO Nível 1"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/agencia-markup.git
   git push -u origin main
   ```

2. **Conectar na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Login com GitHub
   - "Import Project" → Selecione o repositório
   - Deploy automático! 🚀

3. **A cada push:**
   - Vercel faz deploy automático
   - Preview em URL temporária
   - Aprovação → vai pra produção

### Opção 2: Via CLI (Manual)

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Fazer deploy:**
   ```bash
   vercel
   ```
   
3. **Seguir instruções:**
   - Login
   - Confirmar configurações
   - Deploy!

4. **Para atualizar:**
   ```bash
   vercel --prod
   ```

## Configurar Domínio Próprio

### Na Vercel:
1. Projeto → Settings → Domains
2. Adicionar domínio (ex: `calculadorademarkup.com.br`)
3. Configurar DNS:
   - Tipo A → `76.76.21.21`
   - CNAME www → `cname.vercel-dns.com`

### Registro.br (para .com.br):
1. Acessar painel
2. DNS → Adicionar registros acima
3. Aguardar propagação (até 48h, geralmente 1-2h)

## Pós-Deploy

### 1. Testar em Produção
- [ ] Abrir URL de produção
- [ ] Testar todas as funcionalidades
- [ ] Verificar no mobile real (não só DevTools)
- [ ] Mandar pra alguém testar

### 2. Monitorar
- [ ] Verificar analytics após 24h
- [ ] Ver se tem erros no console (Vercel → Logs)
- [ ] Conferir velocidade (PageSpeed Insights)

### 3. Divulgar
- [ ] Mandar pra clientes beta testarem
- [ ] Post no LinkedIn/Instagram
- [ ] Grupos de donos de agência
- [ ] Pedir feedback

## Melhorias Pós-Lançamento

### Rápidas (1-2h cada):
- [ ] Favicon personalizado
- [ ] Adicionar Google Analytics
- [ ] Melhorar meta tags para SEO
- [ ] Adicionar botão "Compartilhar" (Web Share API)

### Médias (3-5h cada):
- [ ] Exportar pacote em texto para WhatsApp
- [ ] Dark mode
- [ ] Tutorial interativo na primeira vez
- [ ] Gráfico de comparação entre pacotes

### Grandes (1-2 dias cada):
- [ ] Exportar em PDF (biblioteca jsPDF)
- [ ] Sistema de login básico
- [ ] Backend para salvar na nuvem

## Precificação Sugerida

### Modelo Freemium:
- **Grátis**: Calculadora básica (sem salvar)
- **PRO Nível 1 (R$ 19-29/mês)**: Salvar pacotes + comissão
- **PRO Nível 2 (R$ 49-79/mês)**: + Login + PDF + Multi-moeda
- **Enterprise (R$ 199+/mês)**: + White-label + Suporte prioritário

### Modelo Lifetime (Early Adopter):
- **Oferta lançamento**: R$ 197 pagamento único
- **Acesso vitalício** ao PRO Nível 1
- **Desconto** de 50% no upgrade pra Nível 2

## 📊 Métricas para Acompanhar

### Semana 1:
- Quantos visitantes?
- Quantos calcularam algo?
- Quantos salvaram pacote?
- Quantos clicaram no WhatsApp?

### Mês 1:
- Taxa de retorno (quantos voltam?)
- Qual funcionalidade mais usada?
- Feedback dos usuários
- Primeiras conversões (se cobrar)

## 🎯 Meta Realista

- **Semana 1**: 10-20 usuários testando
- **Mês 1**: 50-100 usuários ativos
- **Mês 3**: 200-500 usuários + primeiras vendas
- **Mês 6**: Produto validado, ROI positivo

---

**Boa sorte! 🚀**

Se precisar de ajuda em qualquer etapa, é só chamar!
