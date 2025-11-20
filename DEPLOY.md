# 🚀 Deploy PricePro na Vercel

## Passo a Passo

### 1. Criar conta na Vercel
- Acesse [vercel.com](https://vercel.com)
- Faça login com GitHub

### 2. Importar projeto
```bash
# Se ainda não fez, conecte o projeto ao GitHub:
git remote add origin https://github.com/SEU-USUARIO/agencia-markup.git
git push -u origin master
```

### 3. Na Vercel
- Clique em "Import Project"
- Selecione o repositório `agencia-markup`
- Configure as variáveis de ambiente:
  - `NEXT_PUBLIC_GA_ID`: (opcional) Seu ID do Google Analytics (ex: G-XXXXXXXXXX)
  - `GOOGLE_SHEET_WEBHOOK_URL`: (opcional) URL do webhook para salvar leads

### 4. Deploy!
- Clique em "Deploy"
- Em ~2 minutos, seu site estará no ar em: `https://agencia-markup.vercel.app`

### 5. Configurar Domínio Personalizado (Opcional)
- Na Vercel, vá em "Settings" > "Domains"
- Adicione seu domínio (ex: pricepro.com.br)
- Configure os DNS conforme instruções

---

## 📊 Configurar Google Analytics

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie uma propriedade GA4
3. Copie o ID (formato: `G-XXXXXXXXXX`)
4. Cole na variável `NEXT_PUBLIC_GA_ID` na Vercel

---

## 📧 Configurar Google Sheets para Leads (Opcional)

### Opção 1: Google Apps Script (Recomendado)

1. Crie uma planilha no Google Sheets
2. Vá em Extensions > Apps Script
3. Cole este código:

\`\`\`javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.email,
      data.source || 'PricePro'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

4. Clique em "Deploy" > "New Deployment"
5. Escolha "Web App"
6. Em "Who has access", selecione "Anyone"
7. Copie a URL e cole em `GOOGLE_SHEET_WEBHOOK_URL` na Vercel

### Opção 2: Use Google AI Studio (Futuro)
- Podemos criar uma integração inteligente que analise os leads e forneça insights

---

## ✅ Checklist Pós-Deploy

- [ ] Site acessível em produção
- [ ] Google Analytics rastreando visitas
- [ ] Formulário de lead capture funcionando
- [ ] SEO tags aparecendo no compartilhamento
- [ ] Domínio personalizado configurado (opcional)
