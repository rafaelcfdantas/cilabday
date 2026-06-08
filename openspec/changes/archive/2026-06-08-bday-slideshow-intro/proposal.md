## Why

Cila merece uma surpresa de aniversário pessoal e memorável — uma experiência interativa que se sinta mágica desde o primeiro toque. Esta change estabelece a fundação do Slideshow fullscreen e entrega a Intro completa como capa de abertura, validando arquitetura, áudio e navegação antes de Slides narrativos futuros.

## What Changes

- Bootstrap do projeto com **Vite + React + TypeScript**, **Tailwind CSS**, **Framer Motion** e **@lottiefiles/dotlottie-react**
- Arquitetura modular de Slideshow fullscreen — um Slide por vez, transições suaves, extensível para Slides futuros
- **Intro (Slide 1)** completa: Kickoff → Prelude → MainPhase festiva → CTA com countdown → transição
- MainPhase com animações expressivas (hero saltitante, confete em bursts, decorações rotativas nas bordas)
- **CTA** visível desde a MainPhase, bloqueado com countdown até t=52s, centralizado no conteúdo
- **Placeholder slide (Slide 2)** mínimo para validar navegação e handoff de áudio
- Sistema de áudio dual-track com controle mute/unmute persistente
- Tema visual **Fiesta** — festa mexicana tradicional, vibrante, premium e calorosa (não infantil)
- Decorações animadas curadas a partir de `assets/animations/`
- Layout totalmente responsivo (mobile → desktop) em todas as fases e transições

## Non-goals

- Slides narrativos adicionais além do Placeholder (conteúdo real virá em changes futuras)
- Backend, autenticação ou persistência de estado no servidor
- Controles de volume além de mute/unmute
- Localização completa — UI principalmente em inglês, com toques sutis de espanhol

## Capabilities

### New Capabilities

- `slideshow-shell`: Shell fullscreen modular, registro de Slides, transições entre Slides e Placeholder slide mínimo (Slide 2)
- `intro-slide`: Experiência completa da Intro — Kickoff, Prelude, hero, decorações, CTA gate e trigger de transição
- `audio-system`: Intro soundtrack e Slideshow soundtrack, timeline sincronizada, fade/handoff e Audio control mute/unmute
- `fiesta-theme`: Sistema visual Fiesta — paleta, tipografia, decorações Lottie, animações contínuas e responsividade

### Modified Capabilities

_(Nenhuma — `openspec/specs/` ainda não possui specs existentes.)_

## Audio Timeline

Referência canônica para specs e design. Tempos medidos desde **t=0** (primeiro toque da Cila no Kickoff).

| Faixa | Arquivo | Comportamento |
|---|---|---|
| Intro soundtrack | `assets/audios/feliz_cumpleanos.mp3` | Delay interno inicial ~3,75s; delay interno final ~3s; 1º loop completo ≈ 52s |
| Slideshow soundtrack | `assets/audios/cila_bday.mp3` | Sem delay interno; início musical imediato |

### Intro soundtrack (`feliz_cumpleanos.mp3`)

- **Kickoff (pré-t=0):** silêncio total; aguarda toque da Cila
- **t=0:** primeiro play + início do Prelude (3,75s, sincronizado com delay interno do áudio)
- **t=3,75s:** fim do Prelude → MainPhase (hero, decorações, CTA fantasma, countdown)
- **t=3,75s → t=52s:** CTA visível e bloqueado; label `Start the Fiesta... N` (N = segundos até unlock)
- **t=50s:** fase `cta-locked` — opacidade reforçada, ainda bloqueado
- **t=52s:** CTA **liberado** — label `Start the Fiesta`, cor viva, glow, micro-bounce, hover ativo
- **t=52s até clique no CTA:** Intro soundtrack continua em loop contínuo

### Slideshow soundtrack (`cila_bday.mp3`)

- **Nunca** toca durante Intro ou transição visual
- **Só inicia** quando Slide 2 já estiver ativo — play imediato, do zero
- Persiste nos Slides futuros

### Handoff (clique no CTA)

1. Intro soundtrack faz **fade out ~1s** durante transição visual Intro → Slide 2
2. Transição visual suave (fade/slide) para Placeholder slide
3. Slide 2 ativo → Slideshow soundtrack inicia imediatamente
4. Audio control e arquitetura global persistem

### Audio control

- Fixo no canto superior direito
- Visível desde t=0 (após Kickoff tap), persistente em todos os Slides
- Controla a faixa **ativa no momento** (Intro soundtrack na Intro; Slideshow soundtrack a partir do Slide 2)

### MainPhase — confete e performance

- **Confete fullscreen:** 3 bursts one-shot (sem loop), alternando `01/02/03_confetti.lottie`
- Janela: da MainPhase até 5s antes do CTA unlock; intervalo uniforme entre bursts
- Tamanho: ~70% da viewport, centralizado; componente **desmonta** entre bursts (GPU idle)
- **Decorações Lottie:** sets rotativos nas bordas (top/mid/bottom corners), nunca sobrepondo o centro
- Partículas CSS leves + fundo animado; Lotties periféricos limitados a 2 por set

## Impact

- **Código novo:** scaffold Vite/React/TS, componentes de Slideshow, Intro, áudio e tema Fiesta
- **Dependências novas:** `react`, `framer-motion`, `@lottiefiles/dotlottie-react`, `tailwindcss` e toolchain associada
- **Assets consumidos:** `assets/audios/feliz_cumpleanos.mp3`, `assets/audios/cila_bday.mp3`, seleção de `.lottie` em `assets/animations/`
- **Documentação:** `CONTEXT.md` como glossário de domínio canônico; README pode ser atualizado na implementação
- **Sistemas externos:** nenhum — experiência 100% client-side, estática
