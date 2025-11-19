# 🎵 Ambient Sound Setup

## Como Adicionar Seu Arquivo de Áudio

1. **Coloque seu arquivo de áudio** na pasta `public/` com o nome:
   - `ambient-sound.mp3` (recomendado)
   - Ou `ambient-sound.ogg` / `ambient-sound.wav`

2. **O componente AudioPlayer** irá:
   - Tentar carregar o arquivo de áudio primeiro
   - Se o arquivo não existir, usará som sintético gerado automaticamente
   - O som sintético é calmo e futurista (pad synth)

## Recomendações de Áudio

- **Formato**: MP3, OGG ou WAV
- **Duração**: Loop infinito (o componente já configura loop)
- **Estilo**: Calmo, futurista, minimalista
- **Volume**: O componente ajusta automaticamente para 30%

## Exemplos de Sons Ideais

- Synth pads ambientais
- Ruído de cidade futurista
- Atmosfera espacial/cyberpunk
- Som ambiente de laboratório/tecnologia

## Nota

Se você não adicionar um arquivo de áudio, o sistema usará automaticamente um som sintético gerado com Web Audio API, que cria um ambiente calmo e futurista.

