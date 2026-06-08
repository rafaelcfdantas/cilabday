## Context

Greenfield: o repositório possui assets (`assets/audios/`, `assets/animations/`) e glossário de domínio (`CONTEXT.md`), mas ainda não há aplicação. Esta change bootstrapa o projeto e entrega a Intro como primeiro Slide de um Slideshow extensível.

**Constraints:**
- Política de autoplay dos browsers exige gesto do usuário antes de áudio — Kickoff resolve isso
- Timeline de áudio com delays internos fixos no MP3 — UI deve sincronizar com **t=0** (timestamp do toque), não com eventos `timeupdate` imprecisos para fases visuais
- Experiência 100% client-side, sem backend
- Responsividade obrigatória em todos breakpoints

## Goals / Non-Goals

**Goals:**
- Arquitetura modular que permita registrar novos Slides sem refatorar o shell
- Intro completa (Kickoff → Prelude → conteúdo → CTA gate → transição) com sincronização visual/áudio
- Handoff de áudio correto: fade Intro soundtrack → Slide 2 ativo → Slideshow soundtrack imediato
- Audio control mute/unmute persistente e global
- Tema Fiesta premium, responsivo, com decorações Lottie curadas

**Non-Goals:**
- Slides narrativos além do Placeholder
- Backend, routing multi-página, autenticação
- Volume slider, playlists, ou lógica de áudio além das duas faixas definidas
- Otimização avançada de bundle (code-splitting por Slide fica como melhoria futura)

## Decisions

### 1. Stack e bootstrap

**Decisão:** Vite + React 18 + TypeScript, Tailwind CSS v4 (ou v3 conforme scaffold), Framer Motion, `@lottiefiles/dotlottie-react`.

**Alternativas consideradas:**
- *Next.js* — rejeitado; SPA estática é suficiente, deploy simples
- *CSS Modules* — rejeitado; Tailwind acelera iteração visual e responsividade
- *Lottie-web direto* — rejeitado; dotlottie-react simplifica `.lottie` e React integration

**Setup:** `npm create vite@latest` com template `react-ts`. Assets servidos via import estático ou pasta `public/` espelhando `assets/` na raiz (symlink ou copy no build — preferir imports de `/assets/...` configurando alias `@assets` no Vite).

### 2. Estrutura de diretórios

```
src/
├── main.tsx
├── App.tsx
├── slideshow/
│   ├── SlideshowShell.tsx       # viewport fullscreen, AnimatePresence
│   ├── SlideshowProvider.tsx    # índice ativo, navegação, transição
│   ├── slideRegistry.ts         # lista ordenada de Slides
│   └── types.ts                 # SlideComponent, SlideDefinition
├── slides/
│   ├── intro/
│   │   ├── IntroSlide.tsx       # orquestra fases
│   │   ├── KickoffPhase.tsx
│   │   ├── PreludePhase.tsx
│   │   ├── MainPhase.tsx
│   │   ├── IntroCta.tsx
│   │   └── useIntroTimeline.ts  # máquina de estados temporal
│   └── placeholder/
│       └── PlaceholderSlide.tsx
├── audio/
│   ├── AudioProvider.tsx        # refs HTMLAudioElement, mute, fade
│   ├── useAudio.ts
│   └── constants.ts             # paths, timings
├── theme/
│   ├── fiestaTokens.ts          # cores, fontes, sombras
│   ├── LottieDecoration.tsx     # wrapper + RotatingDecorations
│   ├── FullscreenConfetti.tsx   # bursts one-shot
│   ├── AnimatedFiestaBackground.tsx
│   └── lottieConfig.ts          # sets por fase
└── components/
    ├── AudioControl.tsx         # mute/unmute fixo top-right
    └── BouncingText.tsx         # hero animado
```

**Rationale:** Separação clara entre shell (navegação), slides (conteúdo), áudio (cross-cutting) e tema (visual). Novos Slides = nova pasta em `slides/` + entrada no registry.

### 3. Modelo de Slide extensível

**Decisão:** Registry declarativo de `SlideDefinition`:

```ts
type SlideDefinition = {
  id: string;
  component: React.ComponentType<SlideProps>;
};
```

`SlideshowProvider` expõe `currentIndex`, `goToNext()`, `isTransitioning`. Cada Slide recebe `isActive` e callbacks opcionais (`onCtaClick` na Intro dispara `goToNext()`).

**Alternativas:**
- *React Router por rota* — rejeitado; transições fullscreen são intra-app, não URLs
- *Array inline no App* — rejeitado; não escala para N slides futuros

### 4. Transições entre Slides

**Decisão:** Framer Motion `AnimatePresence` com `mode="wait"`. Transição Intro → Placeholder: fade + leve slide vertical (~600–800ms).

**Rationale:** `mode="wait"` garante que Slide 2 só monta após Intro desmontar visualmente — crítico para timing do Slideshow soundtrack (só quando Slide 2 **ativo**).

Hook de ciclo de vida: `onExitComplete` / `onAnimationComplete` do Slide 2 dispara `playSlideshowSoundtrack()`.

### 5. Intro — máquina de fases temporal

**Decisão:** `useIntroTimeline` driven por `performance.now()` relativo a `t0` (set no Kickoff tap).

| Fase | Trigger | Duração / condição |
|---|---|---|
| `kickoff` | inicial | até tap anywhere |
| `prelude` | t=0 | 3750ms fixos |
| `main` | t≥3750ms | até fim da transição |
| `cta-locked` | t≥50000ms | até t≥52000ms |
| `cta-ready` | t≥52000ms | até clique CTA |

**Alternativas:**
- *Derivar fases de `audio.currentTime`* — rejeitado como fonte primária; delays internos do MP3 tornam `currentTime` confiável para loop boundary, mas fases visuais precisam de timers absolutos desde t=0
- *setTimeout encadeados* — aceito com cleanup no unmount; preferir um `requestAnimationFrame` ou intervalo único que computa fase atual a partir de `elapsed = now - t0`

CTA locked/ready também pode cross-check `audio.ended` ou `currentTime >= 52` no primeiro loop, mas **UI gates usam t=0** como canônico (conforme proposal).

### 6. Sistema de áudio

**Decisão:** Dois `HTMLAudioElement` persistentes no `AudioProvider` (refs, não remontados entre Slides).

| Elemento | Arquivo | Lifecycle |
|---|---|---|
| `introAudioRef` | `feliz_cumpleanos.mp3` | `play()` em t=0; `loop=true` após primeiro ciclo; fade volume 1s no CTA click |
| `slideshowAudioRef` | `cila_bday.mp3` | `play()` somente callback `onSlide2Active`; `loop=true`; persiste |

**Fade out:** animar `volume` de 1→0 em ~1000ms via `requestAnimationFrame` ou Framer Motion `animate()`; `pause()` ao fim.

**Mute/unmute:** flag global `isMuted`; aplica `muted` property em ambos elementos; ao unmute, retoma faixa **ativa** (Intro na Intro, Slideshow a partir Slide 2).

**Autoplay:** Kickoff tap chama `introAudioRef.play()` — gesto do usuário satisfaz política do browser.

**Alternativas:**
- *Howler.js* — rejeitado; overhead desnecessário para duas faixas
- *Web Audio API gain node* — viable para fade mais suave; HTMLAudio volume é suficiente para MVP

### 7. Handoff Intro → Slide 2 (sequência)

```
CTA click
  → introAudio.fadeOut(1000ms)     // paralelo
  → slideshow.goToNext()           // inicia transição visual
  → [AnimatePresence exit Intro]
  → [AnimatePresence enter Placeholder]
  → onSlide2Active()
  → slideshowAudio.play() from 0   // imediato, sem delay
```

Garantia: `slideshowAudio.play()` **nunca** é chamado enquanto `currentIndex === 0` ou `isTransitioning === true` sem confirmação de enter complete.

### 8. Tema Fiesta e tokens Tailwind

**Decisão:** Estender `tailwind.config` com paleta Fiesta:

| Token | Uso | Referência |
|---|---|---|
| `fiesta-coral` | acentos quentes, CTA ativo | #E84855 |
| `fiesta-gold` | highlights, glow | #F4A127 |
| `fiesta-teal` | contraste, profundidade | #1B998B |
| `fiesta-magenta` | decorações | #C5299D |
| `fiesta-cream` | fundo/texto claro | #FFF8F0 |
| `fiesta-indigo` | fundo escuro premium | #2D1B4E |

Tipografia: display serif festiva para hero (ex.: *Playfair Display* ou *Lora*) + sans legível para corpo (*DM Sans* ou *Nunito*). Carregar via Google Fonts.

Background: gradiente radial escuro com partículas sutis (CSS) — elegante, não infantil.

### 9. Curadoria de assets Lottie e confete

**Decisão:** Wrapper `LottieDecoration` + `RotatingDecorations` para sets periféricos. Confete fullscreen separado em `FullscreenConfetti`.

| Fase | Comportamento | Assets |
|---|---|---|
| Kickoff | estáticos nas bordas | `flags_garland`, balões |
| Prelude | stagger central/periférico | `mexico_flag`, `confetti_blower`, garland |
| Main | **2 Lotties por set**, rotação ~7s, posições periféricas | balloons, gifts, musician, cups, cake, etc. |
| Main confete | **3 bursts one-shot**, intervalo uniforme, quiet 5s antes do CTA | `01/02/03_confetti.lottie` |

**Confete — performance (decisão pós-implementação):**
- **Não** usar loop contínuo fullscreen (30–40% GPU em hardware dedicado)
- 3 bursts com `loop=false`; componente **desmonta** entre bursts
- Tamanho ~70% viewport (`CONFETTI_SIZE = 0.7`)
- Constantes em `audio/constants.ts`: `CONFETTI_BURST_COUNT`, `CONFETTI_BURST_DURATION_MS`, `CONFETTI_QUIET_BEFORE_CTA_MS`

Posicionamento periférico: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `mid-left`, `mid-right` — **nunca `center`** na MainPhase (hero ocupa o centro).

### 10. Componentes de UI chave

**Kickoff:** overlay fullscreen clicável; mensagem + hint com fade pulse no "Tap to begin".

**Prelude:** sem hero; texto central animado (Framer Motion fade-up); decorações entram stagger.

**Main:** hero com `BouncingText` (letras saltitantes + ciclo de cores); subtextos animados; `AnimatedFiestaBackground` + `FloatingParticles` (10 partículas CSS); confete em bursts; `RotatingDecorations`.

**CTA:** integrado ao stack central (abaixo dos textos), não fixo no rodapé.
- Visível desde MainPhase (~t=3,75s), bloqueado até t=52s
- Label bloqueada: `Start the Fiesta... N` (N = segundos até unlock, countdown contínuo)
- t≥50s (`cta-locked`): opacidade reforçada (~75%)
- t≥52s (`cta-ready`): `Start the Fiesta`, cor viva, glow, hover, micro-bounce

**AudioControl:** ícone speaker fixo `top-4 right-4` (safe-area aware); visível após Kickoff; z-index acima de decorações.

**Placeholder Slide 2:** texto mínimo "Slide 2 — coming soon" ou similar neutro; valida navegação e áudio apenas.

### 11. Responsividade

**Decisão:** Mobile-first; breakpoints Tailwind `sm`, `md`, `lg`.

- Tipografia hero: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Padding horizontal: `px-4 sm:px-8`
- CTA: full-width com max-width em mobile (`w-full max-w-xs sm:max-w-sm`), centralizado no stack de conteúdo
- Lottie: máx. 2 instâncias visíveis por set na MainPhase; laterais podem esconder em `<sm`
- Touch targets ≥ 44px (Kickoff, CTA, AudioControl)
- `min-h-dvh` + `overflow-hidden` no shell para evitar scroll indesejado

Testar: 320px, 375px, 768px, 1024px, 1440px.

### 12. Estado global vs local

**Decisão:**
- **Global (Context):** slideshow navigation, audio, mute
- **Local (Intro):** fase timeline, t0, CTA clicked flag

Evita re-renders desnecessários no shell quando Intro anima decorações.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Drift entre timers UI e áudio real | t=0 como fonte de verdade visual; opcional sync no boundary t=52s via `timeupdate` |
| Autoplay bloqueado mesmo após tap | Kickoff tap deve chamar `play()` no mesmo event handler síncrono do gesto |
| Performance com Lotties fullscreen | Confete em 3 bursts one-shot; desmontar entre bursts; ~70% viewport; sem loop |
| Performance com muitos Lotties periféricos | RotatingDecorations: 2 por set; intervalo ~7s; hideOnMobile em laterais |
| Fade volume HTMLAudio pode clicar | Steps suficientes no rAF (~60 frames/s) |
| Layout quebra em telas muito pequenas | Testar 320px; reduzir decorações; truncar nunca — reflow tipográfico |
| Loop boundary impreciso (~52s) | Constantes centralizadas em `audio/constants.ts`; fácil ajuste fino pós-teste com arquivo real |

## Migration Plan

1. Scaffold Vite + deps
2. Configurar Tailwind + alias assets
3. Implementar AudioProvider + SlideshowShell
4. Implementar Intro fases + Placeholder
5. Integrar handoff e testar timeline com áudio real
6. Build estático (`npm run build`) → deploy em hosting estático (Netlify, Vercel, GitHub Pages)

**Rollback:** N/A — greenfield. Tags git por milestone se necessário.

## Open Questions

- **Fonts finais:** Playfair + DM Sans são placeholder — usuário pode ajustar na implementação
- **Seleção exata de Lotties:** curadoria em `lottieConfig.ts`; refinamento visual pelo usuário se necessário
- **CONFETTI_SIZE / burst timing:** ajustáveis em `constants.ts` e `FullscreenConfetti.tsx`
- **Placeholder copy:** texto exato do Slide 2 pode ser minimalista ("…") — definir na implementação
