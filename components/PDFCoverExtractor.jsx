'use client';

/**
 * Componente utilitário para extrair a primeira página de um PDF como imagem de capa
 * 
 * Este componente pode ser usado em uma página de admin ou ferramenta de geração de capas
 * Requer pdfjs-dist instalado: npm install pdfjs-dist
 */

import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PDFCoverExtractor() {
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
      // Sugerir slug baseado no nome do arquivo
      const suggestedSlug = file.name
        .toLowerCase()
        .replace(/\.pdf$/i, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(suggestedSlug || '');
    } else {
      setError('Por favor, selecione um arquivo PDF válido');
    }
  };

  const generateCover = async () => {
    if (!pdfFile || !slug) {
      setError('Por favor, selecione um PDF e defina o slug');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Carregar pdfjs-dist dinamicamente
      const pdfjsLib = await import('pdfjs-dist');
      
      // Configurar worker (necessário para pdfjs)
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      }

      // Ler arquivo como array buffer
      const arrayBuffer = await pdfFile.arrayBuffer();
      
      // Carregar PDF
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Obter primeira página
      const page = await pdf.getPage(1);
      
      // Calcular escala para 1200x800px
      const viewport = page.getViewport({ scale: 2.0 });
      
      // Criar canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 1200;
      canvas.height = 800;
      
      // Renderizar página no canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      
      await page.render(renderContext).promise;
      
      // Converter canvas para blob
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setCoverImage(imageUrl);
          setLoading(false);
        }
      }, 'image/jpeg', 0.85);
      
    } catch (err) {
      console.error('Erro ao gerar capa:', err);
      setError(`Erro ao processar PDF: ${err.message}. Use ferramentas online ou instale pdfjs-dist: npm install pdfjs-dist`);
      setLoading(false);
    }
  };

  const downloadCover = () => {
    if (!coverImage || !slug) return;
    
    const link = document.createElement('a');
    link.href = coverImage;
    link.download = `${slug}-cover.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-strong rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-neon-cyan" />
        Gerador de Capas de PDF
      </h2>

      <div className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Selecione o PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neon-cyan/20 file:text-neon-cyan hover:file:bg-neon-cyan/30 cursor-pointer"
          />
        </div>

        {/* Slug Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Slug (nome do arquivo)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="monografia-diagnostico-recursos-zimpeto"
            className="w-full px-4 py-2 rounded-lg glass border border-white/10 bg-transparent text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            O arquivo será salvo como: <code className="text-neon-cyan">{slug || 'slug'}-cover.jpg</code>
          </p>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={generateCover}
          disabled={!pdfFile || !slug || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 rounded-lg glass border border-neon-cyan text-neon-cyan font-medium hover:glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gerando capa...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Gerar Capa
            </>
          )}
        </motion.button>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Preview */}
        {coverImage && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-white/10">
              <img
                src={coverImage}
                alt={`Capa de ${slug}`}
                className="w-full h-auto"
              />
            </div>
            
            <motion.button
              onClick={downloadCover}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-lg glass border border-neon-magenta text-neon-magenta font-medium hover:glow-magenta transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Baixar Imagem
            </motion.button>

            <div className="p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-sm text-gray-300">
              <p className="mb-2"><strong>Próximos passos:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-400">
                <li>Salve a imagem baixada com o nome: <code className="text-neon-cyan">{slug}-cover.jpg</code></li>
                <li>Coloque o arquivo em: <code className="text-neon-cyan">/public/publications/</code></li>
                <li>Atualize <code className="text-neon-cyan">lib/data.js</code> com: <code className="text-neon-cyan">coverImage: '/publications/{slug}-cover.jpg'</code></li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Method */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-gray-400 mb-2">
          <strong>Alternativa:</strong> Use ferramentas online se o método acima não funcionar:
        </p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• <a href="https://www.ilovepdf.com/pdf_to_jpg" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">ilovepdf.com/pdf_to_jpg</a> - Converter PDF para JPG</li>
          <li>• <a href="https://www.iloveimg.com/resize-image" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">iloveimg.com/resize-image</a> - Redimensionar imagem</li>
        </ul>
      </div>
    </div>
  );
}
