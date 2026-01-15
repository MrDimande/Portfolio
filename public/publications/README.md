# 📸 Guia de Imagens de Capa para Publicações

Esta pasta deve conter as imagens de capa (`cover images`) das publicações.

## 📋 Estrutura de Arquivos

As imagens devem seguir o padrão de nomenclatura baseado no `slug` de cada publicação:

```
/public/publications/{slug}-cover.jpg
```

### Exemplos:

- `monografia-diagnostico-recursos-zimpeto-cover.jpg`
- `planeamento-territorial-inteligencia-artificial-cover.jpg`
- `planeamento-territorial-sustentavel-maputo-cover.jpg`

## 🎨 Especificações Recomendadas

### Dimensões e Formato:
- **Formato:** JPG ou WebP (recomendado)
- **Dimensões recomendadas:** 1200x800px (ratio 3:2) ou 1200x630px (ratio 1.91:1 para Open Graph)
- **Tamanho máximo:** 500KB por imagem
- **Qualidade:** 80-85% para JPG

### Conteúdo da Imagem:
- Capa do PDF/artigo (primeira página como preview)
- Ou imagem representativa relacionada ao tema
- Deve ser visualmente atraente e relevante ao conteúdo
- Manter consistência visual com o tema do portfolio

## 📝 Como Adicionar Imagens

### Opção 1: Extrair primeira página do PDF
1. Abra o PDF da publicação
2. Exporte a primeira página como imagem (JPG/PNG)
3. Converta para WebP se possível (melhor performance)
4. Redimensione para 1200x800px mantendo proporção
5. Salve com o nome: `{slug}-cover.jpg`

### Opção 2: Criar imagem representativa
1. Crie uma imagem representativa relacionada ao tema
2. Use cores que combinem com o tema da publicação
3. Pode incluir elementos gráficos, mapas, ou ícones
4. Mantenha o estilo futurista/cyberpunk do portfolio

### Opção 3: Usar ferramentas online
- **PDF to Image:** https://www.ilovepdf.com/pdf_to_jpg
- **Resize Image:** https://www.iloveimg.com/resize-image
- **Compress Image:** https://tinypng.com/

## ✅ Publicações que já têm coverImage configurado:

1. ✅ `monografia-diagnostico-recursos-zimpeto`
   - Arquivo esperado: `monografia-diagnostico-recursos-zimpeto-cover.jpg`

2. ✅ `planeamento-territorial-inteligencia-artificial`
   - Arquivo esperado: `planeamento-territorial-inteligencia-artificial-cover.jpg`

## ⚠️ Nota Importante

- Se uma publicação não tiver `coverImage` ou o arquivo não existir, o componente `PublicationCard` exibirá automaticamente um **fallback visual** com gradiente e ícone
- O campo `coverImage` no arquivo `lib/data.js` é **opcional** - pode ser `null` ou omitido
- O componente trata automaticamente erros de carregamento de imagem

## 🔧 Atualização dos Dados

Quando adicionar uma nova imagem:

1. Adicione a imagem na pasta `/public/publications/`
2. Atualize o campo `coverImage` no arquivo `lib/data.js`:
   ```javascript
   {
     slug: 'nome-do-slug',
     // ... outros campos
     coverImage: '/publications/nome-do-slug-cover.jpg',
   }
   ```

## 📊 Optimização Automática

O Next.js Image Optimization API irá automaticamente:
- Converter para WebP/AVIF quando suportado pelo browser
- Redimensionar conforme o dispositivo (responsive)
- Lazy loading para melhor performance
- Cache otimizado (TTL: 60 segundos)

## 🎯 Próximos Passos

1. ✅ Campo `coverImage` adicionado aos dados
2. ✅ Componente `PublicationCard` atualizado para exibir imagens
3. ⏳ Adicionar imagens de capa para publicações destacadas (`featured: true`)
4. ⏳ Opcional: Adicionar imagens para outras publicações

---

**Criado em:** $(Get-Date -Format "dd/MM/yyyy")  
**Última atualização:** $(Get-Date -Format "dd/MM/yyyy")
