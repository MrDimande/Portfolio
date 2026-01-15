/**
 * API Route para gerar imagem de capa a partir da primeira página de um PDF
 * 
 * Esta rota requer pdfjs-dist e canvas no servidor.
 * Como alternativa, recomenda-se usar ferramentas online ou manuais.
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { pdfPath, slug } = await request.json();

    if (!pdfPath || !slug) {
      return NextResponse.json(
        { error: 'Parâmetros pdfPath e slug são obrigatórios' },
        { status: 400 }
      );
    }

    const fullPdfPath = path.join(process.cwd(), 'public', pdfPath.replace(/^\//, ''));
    const outputDir = path.join(process.cwd(), 'public', 'publications');
    const outputPath = path.join(outputDir, `${slug}-cover.jpg`);

    // Verificar se o PDF existe
    if (!fs.existsSync(fullPdfPath)) {
      return NextResponse.json(
        { error: `PDF não encontrado: ${pdfPath}` },
        { status: 404 }
      );
    }

    // Criar pasta de publicações se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Por enquanto, retornamos instruções
    // Para implementação completa, seria necessário pdfjs-dist e canvas no servidor
    return NextResponse.json({
      message: 'Para gerar a capa automaticamente, use ferramentas online ou scripts locais',
      instructions: {
        pdfPath: fullPdfPath,
        outputPath: outputPath,
        slug: slug,
        steps: [
          '1. Abra o PDF no navegador ou ferramenta de edição',
          '2. Exporte a primeira página como JPG',
          '3. Redimensione para 1200x800px',
          '4. Salve como {slug}-cover.jpg',
          '5. Coloque em /public/publications/',
        ],
        tools: [
          'https://www.ilovepdf.com/pdf_to_jpg',
          'Adobe Acrobat: File > Export To > Image > JPEG',
          'Chrome: Abrir PDF > Print > Save as PDF > Primeira página',
        ],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao processar: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Parâmetro slug é obrigatório' },
      { status: 400 }
    );
  }

  // Verificar se a imagem já existe
  const outputPath = path.join(process.cwd(), 'public', 'publications', `${slug}-cover.jpg`);

  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    return NextResponse.json({
      exists: true,
      path: `/publications/${slug}-cover.jpg`,
      size: stats.size,
      created: stats.birthtime,
    });
  }

  return NextResponse.json({
    exists: false,
    message: `Imagem não encontrada para slug: ${slug}`,
    expectedPath: `/publications/${slug}-cover.jpg`,
  });
}
