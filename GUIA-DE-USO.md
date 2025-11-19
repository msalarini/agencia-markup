# 📖 Guia de Uso - Calculadora de Markup PRO

## Como usar

### 1️⃣ Calcular um pacote

1. **Preencha os campos:**
   - **Nome do Pacote**: Ex: "Cancún 5 dias"
   - **Custo do Pacote**: Valor que você paga (hotel, voo, etc.)
   - **Taxas/Impostos**: Custos adicionais
   - **Markup Desejado**: Percentual de lucro que quer ter
   - **Comissão do Vendedor** (opcional): Se o vendedor recebe comissão

2. **Veja os resultados instantaneamente:**
   - Preço sugerido de venda
   - Lucro total
   - Comissão do vendedor (se informada)
   - Lucro líquido (após comissão)
   - Margem percentual
   - Projeção de lucro mensal

### 2️⃣ Salvar um pacote

1. Preencha todos os campos
2. Clique em **"💾 Salvar Pacote"**
3. O pacote fica salvo no seu navegador (não perde quando fechar)

### 3️⃣ Ver pacotes salvos

1. Clique no botão **"📦 Meus Pacotes (X)"** no topo
2. Veja todos os seus pacotes com preço e lucro
3. Você pode:
   - **Editar**: Carrega o pacote para fazer alterações
   - **🔄 Duplicar**: Cria uma cópia para testar variações
   - **🗑️ Deletar**: Remove o pacote

### 4️⃣ Duplicar para testar variações

**Cenário:** Você quer ver quanto lucraria com markup diferente

1. Salve o pacote original (ex: "Cancún - Markup 25%")
2. Clique em "🔄" (duplicar)
3. Mude o markup para 30% e o nome para "Cancún - Markup 30%"
4. Salve novamente
5. Agora você tem 2 versões para comparar!

### 5️⃣ Calcular comissão de vendedor

**Cenário:** Seu vendedor ganha 10% sobre o preço de venda

1. Preencha custo, taxas e markup normalmente
2. No campo "Comissão do Vendedor", coloque **10**
3. Veja:
   - Lucro Total (antes da comissão)
   - Comissão do vendedor em R$
   - Lucro Líquido (o que sobra pra você)

## 💡 Dicas de uso

### Para donos de agência:
- Salve diferentes versões do mesmo pacote com markups variados
- Use o feedback de negócio para projetar faturamento mensal
- Configure comissões para calcular lucro líquido real

### Para vendedores:
- Salve pacotes que você monta frequentemente
- Duplique e ajuste preços rapidamente durante atendimento
- Mostre ao cliente o preço final com confiança

### Para gestão de equipe:
- Padronize markups salvando pacotes-modelo
- Ensine a equipe a calcular comissões corretamente
- Use a projeção mensal para bater metas

## ❓ Perguntas Frequentes

**Os pacotes ficam salvos para sempre?**  
Sim, enquanto você não limpar os dados do navegador ou deletar manualmente.

**Posso acessar de outro computador?**  
Não na versão atual. Os dados ficam apenas no navegador que você está usando.
_Isso virá na versão PRO Nível 2 com sistema de login._

**Tem limite de pacotes salvos?**  
Não! Salve quantos quiser.

**Como alterar o número do WhatsApp do CTA?**  
Edite o arquivo `app/page.tsx` na linha 441 e troque pelo seu número.

**Posso usar sem internet?**  
Depois da primeira vez, sim! O Next.js cacheia a aplicação.

## 🐛 Encontrou um bug?

Mande no WhatsApp ou abra uma issue no GitHub!

## 🚀 Quer recursos adicionais?

Entre em contato para solicitar:
- Exportação em PDF
- Multi-moeda
- Sistema de login
- Relatórios avançados
