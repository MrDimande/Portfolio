/**
 * Script alternativo simplificado para gerar capas
 * 
 * Este script usa uma abordagem mais simples caso o método principal falhe
 * 
 * Uso: node scripts/generate-covers-alternative.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfToSlugMap = {
  'Planeamento Territorial e Integração da Inteligência Artificial - Alberto Dimande - 2025.pdf': 'planeamento-territorial-inteligencia-artificial',
};

async function generateCoverAlternative(pdfPath, outputPath, slug) {
  console.log(`\n📄 Tentando método alternativo para: ${path.basename(pdfPath)}`);
  console.log(`   ⚠️  O script automático encontrou problemas com este PDF.`);
  console.log(`   💡 Por favor, use uma das opções abaixo:`);
  console.log(`\n   📋 Método Recomendado (Online):`);
  console.log(`      1. Acesse: https://www.ilovepdf.com/pdf_to_jpg`);
  console.log(`      2. Faça upload do PDF: ${path.basename(pdfPath)}`);
  console.log(`      3. Configure: Apenas página 1, Qualidade: 85%`);
  console.log(`      4. Converta e baixe a imagem`);
  console.log(`      5. Redimensione para 1200x800px em: https://www.iloveimg.com/resize-image`);
  console.log(`      6. Salve como: ${path.basename(outputPath)}`);
  console.log(`      7. Coloque em: public/publications/`);
  console.log(`\n   📋 Método Alternativo (Chrome):`);
  console.log(`      1. Abra o PDF no Chrome`);
  console.log(`      2. Pressione Ctrl+P`);
  console.log(`      3. Destination: "Save as PDF"`);
  console.log(`      4. Pages: "1"`);
  console.log(`      5. Salve`);
  console.log(`      6. Use ilovepdf.com/pdf_to_jpg no PDF de 1 página gerado`);
  
  return false;
}

async function main() {
  console.log('🎨 Gerador de Capas - Método Alternativo\n');
  console.log('='.repeat(50));

  const publicDir = path.join(process.cwd(), 'public');
  const publicationsDir = path.join(publicDir, 'publications');

  for (const [pdfFile, slug] of Object.entries(pdfToSlugMap)) {
    const pdfPath = path.join(publicDir, pdfFile);
    const outputPath = path.join(publicationsDir, `${slug}-cover.jpg`);

    if (fs.existsSync(outputPath)) {
      console.log(`\n✅ Imagem já existe: ${path.basename(outputPath)}`);
      continue;
    }

    await generateCoverAlternative(pdfPath, outputPath, slug);
  }

  console.log('\n✨ Instruções exibidas!\n');
}

main().catch(console.error);
