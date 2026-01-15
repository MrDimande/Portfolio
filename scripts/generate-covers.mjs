/**
 * Script para gerar imagens de capa das publicações a partir da primeira página dos PDFs
 * 
 * Uso: node scripts/generate-covers.mjs
 * 
 * Requisitos instalados:
 * - pdfjs-dist@^5.4.530
 * - canvas@^3.2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapeamento de PDFs para slugs de publicações
const pdfToSlugMap = {
  'Monografia - DRPPOTBZ - Alberto Dimande - 18032025.pdf': 'monografia-diagnostico-recursos-zimpeto',
  'Planeamento Territorial e Integração da Inteligência Artificial - Alberto Dimande - 2025.pdf': 'planeamento-territorial-inteligencia-artificial',
};

async function generateCoverFromPDF(pdfPath, outputPath, slug) {
  try {
    console.log(`\n📄 Processando: ${path.basename(pdfPath)}`);
    
    // Verificar se o PDF existe
    if (!fs.existsSync(pdfPath)) {
      console.error(`   ❌ PDF não encontrado: ${pdfPath}`);
      return false;
    }

    // Verificar se a imagem já existe
    if (fs.existsSync(outputPath)) {
      console.log(`   ✅ Imagem já existe: ${path.basename(outputPath)}`);
      return true;
    }

    console.log(`   🔄 Extraindo primeira página como imagem...`);

    // Tentar usar pdfjs-dist e canvas
    try {
      // Import dinâmico para ES modules
      const pdfjsModule = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const pdfjs = pdfjsModule.default || pdfjsModule;
      
      // Importar canvas
      const canvasModule = await import('canvas');
      const { createCanvas } = canvasModule;

      // Ler arquivo PDF como buffer
      const data = new Uint8Array(fs.readFileSync(pdfPath));
      
      // Carregar PDF (desabilitar worker em Node.js)
      const loadingTask = pdfjs.getDocument({ 
        data,
        useSystemFonts: true,
        isEvalSupported: false,
        useWorkerFetch: false,
        verbosity: 0,
      });
      const pdf = await loadingTask.promise;
      
      // Obter primeira página
      const page = await pdf.getPage(1);
      
      // Dimensões alvo
      const targetWidth = 1200;
      const targetHeight = 800;
      
      // Obter viewport inicial para calcular proporções
      const initialViewport = page.getViewport({ scale: 1.0 });
      const aspectRatio = initialViewport.width / initialViewport.height;
      
      // Calcular dimensões escaladas para caber em 1200x800 mantendo proporção
      let renderWidth, renderHeight;
      if (aspectRatio > targetWidth / targetHeight) {
        // Mais largo que alto
        renderWidth = targetWidth;
        renderHeight = targetWidth / aspectRatio;
      } else {
        // Mais alto que largo
        renderHeight = targetHeight;
        renderWidth = targetHeight * aspectRatio;
      }
      
      // Criar viewport com escala apropriada para renderização em alta qualidade
      const renderScale = Math.max(renderWidth / initialViewport.width, renderHeight / initialViewport.height) * 2.0;
      const renderViewport = page.getViewport({ scale: renderScale });
      
      // Criar canvas para renderização (dimensões do viewport)
      const renderCanvas = createCanvas(Math.ceil(renderViewport.width), Math.ceil(renderViewport.height));
      const renderContext = renderCanvas.getContext('2d');
      
      // Renderizar página no canvas de renderização
      const renderParams = {
        canvasContext: renderContext,
        viewport: renderViewport,
      };
      
      await page.render(renderParams).promise;
      
      // Criar canvas final com dimensões desejadas (1200x800)
      const canvas = createCanvas(targetWidth, targetHeight);
      const context = canvas.getContext('2d');
      
      // Preencher fundo branco
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, targetWidth, targetHeight);
      
      // Calcular posição para centralizar
      const xOffset = (targetWidth - renderWidth) / 2;
      const yOffset = (targetHeight - renderHeight) / 2;
      
      // Desenhar o canvas renderizado redimensionado no canvas final
      context.drawImage(renderCanvas, xOffset, yOffset, renderWidth, renderHeight);
      
      // Salvar como JPEG com qualidade 85%
      const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
      fs.writeFileSync(outputPath, buffer);
      
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      console.log(`   ✅ Capa gerada com sucesso!`);
      console.log(`      Arquivo: ${path.basename(outputPath)}`);
      console.log(`      Tamanho: ${sizeKB} KB`);
      console.log(`      Dimensões: ${targetWidth}x${targetHeight}px`);
      
      return true;
      
    } catch (error) {
      console.error(`   ⚠️  Erro ao processar com pdfjs-dist: ${error.message}`);
      console.log(`   💡 Solução alternativa:`);
      console.log(`      1. Use ferramenta online: https://www.ilovepdf.com/pdf_to_jpg`);
      console.log(`      2. Exporte apenas a primeira página`);
      console.log(`      3. Redimensione para 1200x800px`);
      console.log(`      4. Salve como: ${path.basename(outputPath)}`);
      console.log(`      5. Coloque em: public/publications/`);
      console.log(`   📖 Detalhes do erro: ${error.stack?.split('\n')[0] || error.message}`);
      return false;
    }
    
  } catch (error) {
    console.error(`   ❌ Erro geral: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🎨 Gerador de Capas de Publicações\n');
  console.log('='.repeat(50));

  const publicDir = path.join(process.cwd(), 'public');
  const publicationsDir = path.join(publicDir, 'publications');
  const pdfDir = publicDir;

  // Criar pasta de publicações se não existir
  if (!fs.existsSync(publicationsDir)) {
    fs.mkdirSync(publicationsDir, { recursive: true });
    console.log('✅ Pasta criada: public/publications/');
  }

  let successCount = 0;
  let totalCount = Object.keys(pdfToSlugMap).length;

  for (const [pdfFile, slug] of Object.entries(pdfToSlugMap)) {
    const pdfPath = path.join(pdfDir, pdfFile);
    const outputPath = path.join(publicationsDir, `${slug}-cover.jpg`);

    const success = await generateCoverFromPDF(pdfPath, outputPath, slug);
    if (success) successCount++;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Resumo:`);
  console.log(`   Total de PDFs: ${totalCount}`);
  console.log(`   Capas geradas: ${successCount}`);
  console.log(`   Falhas: ${totalCount - successCount}`);
  
  if (successCount > 0) {
    console.log(`\n✅ ${successCount} capa(s) gerada(s) com sucesso!`);
    console.log(`   📁 Localização: public/publications/`);
    console.log(`\n💡 Próximo passo:`);
    console.log(`   Atualize lib/data.js para habilitar o campo coverImage:`);
    for (const [pdfFile, slug] of Object.entries(pdfToSlugMap)) {
      const outputPath = path.join(publicationsDir, `${slug}-cover.jpg`);
      if (fs.existsSync(outputPath)) {
        console.log(`   coverImage: '/publications/${slug}-cover.jpg',`);
      }
    }
  }
  
  if (successCount < totalCount) {
    console.log(`\n💡 Para os PDFs que falharam, use ferramentas online:`);
    console.log(`   - https://www.ilovepdf.com/pdf_to_jpg`);
    console.log(`   - https://www.iloveimg.com/resize-image`);
    console.log(`   - https://tinypng.com/ (otimização)`);
  }

  console.log('\n✨ Script concluído!\n');
}

main().catch((error) => {
  console.error('\n❌ Erro fatal:', error);
  console.error(error.stack);
  process.exit(1);
});
