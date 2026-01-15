# 📸 Guia para Extrair Capas dos PDFs

Como gerar as imagens de capa a partir dos PDFs das publicações.

## 🎯 PDFs Disponíveis

1. **Monografia - DRPPOTBZ - Alberto Dimande - 18032025.pdf**
   - Slug: `monografia-diagnostico-recursos-zimpeto`
   - Arquivo de saída: `monografia-diagnostico-recursos-zimpeto-cover.jpg`

2. **Planeamento Territorial e Integração da Inteligência Artificial - Alberto Dimande - 2025.pdf**
   - Slug: `planeamento-territorial-inteligencia-artificial`
   - Arquivo de saída: `planeamento-territorial-inteligencia-artificial-cover.jpg`

## 🛠️ Método 1: Ferramenta Online (Mais Fácil)

### Passo 1: Converter PDF para JPG
1. Acesse: https://www.ilovepdf.com/pdf_to_jpg
2. Faça upload do PDF
3. Configure:
   - **Páginas:** Apenas a primeira página
   - **Qualidade:** Alta (80-90%)
4. Clique em "Converter para JPG"
5. Baixe a imagem gerada

### Passo 2: Redimensionar a Imagem
1. Acesse: https://www.iloveimg.com/resize-image
2. Faça upload da imagem baixada
3. Configure:
   - **Dimensões:** 1200 x 800 pixels (ou manter proporção 3:2)
   - **Qualidade:** 85%
4. Baixe a imagem redimensionada

### Passo 3: Otimizar (Opcional)
1. Acesse: https://tinypng.com/
2. Faça upload da imagem
3. Baixe a versão otimizada

### Passo 4: Renomear e Colocar na Pasta
1. Renomeie o arquivo para: `{slug}-cover.jpg`
   - Exemplo: `monografia-diagnostico-recursos-zimpeto-cover.jpg`
2. Coloque o arquivo em: `/public/publications/`

---

## 🛠️ Método 2: Adobe Acrobat (PC/Mac)

1. Abra o PDF no Adobe Acrobat Reader
2. Vá em **File > Export To > Image > JPEG**
3. Configure:
   - **Quality:** 85%
   - **Resolution:** 300 DPI (ou maior)
4. Escolha apenas a primeira página
5. Exporte a imagem
6. Redimensione para 1200x800px usando um editor de imagens
7. Salve como `{slug}-cover.jpg` em `/public/publications/`

---

## 🛠️ Método 3: Chrome Browser (Mais Rápido)

1. Abra o PDF no Chrome
   - Arraste o PDF para o navegador ou use Ctrl+O
2. Pressione **Ctrl+P** (Print)
3. Em "Destination", escolha **"Save as PDF"**
4. Em "Pages", selecione apenas a **primeira página**
5. Clique em "Save"
6. Agora você tem um PDF de 1 página
7. Use o Método 1 acima para converter esse PDF em JPG

---

## 🛠️ Método 4: Script Automático (Avançado)

Para usar um script automático, você precisa instalar dependências:

```bash
npm install pdfjs-dist canvas --save-dev
```

Depois execute:
```bash
node scripts/generate-covers.js
```

**Nota:** Este método requer configuração adicional e pode ter problemas de compatibilidade. Recomendamos os métodos 1-3 acima.

---

## 📋 Checklist Final

- [ ] Imagem extraída da primeira página do PDF
- [ ] Dimensões: 1200x800px (ratio 3:2)
- [ ] Formato: JPG
- [ ] Qualidade: 80-85%
- [ ] Tamanho do arquivo: < 500KB
- [ ] Nome correto: `{slug}-cover.jpg`
- [ ] Localização: `/public/publications/`
- [ ] Teste visual no site

---

## ✅ Verificação

Após adicionar as imagens, verifique:

1. O campo `coverImage` em `lib/data.js` está correto:
   ```javascript
   coverImage: '/publications/monografia-diagnostico-recursos-zimpeto-cover.jpg'
   ```

2. A imagem está na pasta correta:
   ```
   /public/publications/monografia-diagnostico-recursos-zimpeto-cover.jpg
   ```

3. A imagem carrega no site:
   - Visite a homepage
   - Verifique a seção de publicações
   - A imagem deve aparecer no card da publicação

---

## 🎨 Dicas de Design

- **Foco:** Certifique-se que a primeira página tem elementos visuais interessantes
- **Cores:** Imagens com bom contraste funcionam melhor
- **Texto:** Evite texto muito pequeno na imagem de capa
- **Composição:** A imagem deve ser legível mesmo em tamanhos pequenos (thumbnail)

---

**Criado em:** $(Get-Date -Format "dd/MM/yyyy")
