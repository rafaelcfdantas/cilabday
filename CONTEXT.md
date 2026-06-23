# Cila Birthday Slideshow

Experiência interativa de aniversário em formato de slideshow fullscreen para Cila.

## Language

**Slideshow**:
Sequência de telas fullscreen, uma por vez, com transições entre elas.
_Avoid_: Apresentação, deck, carousel

**Slide**:
Tela individual que ocupa o viewport inteiro dentro do Slideshow.
_Avoid_: Página, seção, step

**Placeholder slide**:
Slide 5 do Slideshow; slide temporário sem conteúdo final, usado para validar navegação forward após o Gallery Slide enquanto próximos capítulos ainda não foram implementados.
_Avoid_: Stub page, mock screen

**Kickoff**:
Tela pré-Prelude que exige um toque da Cila para iniciar a experiência. Mensagem: "I hope you love this surprise. You're so special!" Hint: "Tap to begin". Visual festivo ao redor. O toque marca t=0 e dispara Prelude + Intro soundtrack juntos.
_Avoid_: Splash screen, landing, loading

**Intro**:
Primeiro Slide do Slideshow; tela de boas-vindas que antecede o restante da experiência. Inclui Kickoff, Prelude e conteúdo principal após o Prelude. Hero em inglês com toque sutil de espanhol no subtexto (ex.: "¡Feliz cumpleaños!").
_Avoid_: Home, landing, capa

**Cila**:
Destinatária do site; apelido de Pricila. Nome usado em toda a experiência voltada a ela.
_Avoid_: Pricila (aceitável em contexto interno, não na UI)

**Prelude**:
Sequência temática de abertura de 3,75s, sincronizada com o silêncio inicial do áudio da Intro. Inicia junto com o primeiro play do áudio. Exibe decorações animadas e a frase "Preparando la fiesta…", sem hero. Ao terminar, hero e decorações entram juntos em stagger suave.
_Avoid_: Loading screen, splash, spinner

**CTA**:
Botão de avanço dentro ou entre Slides. **Next** avança para o próximo Slide (Intro e Balloon game slide). **Continue** avança beats dentro do mesmo Slide narrativo (Birth story slide e Gallery Slide). Na Intro: visível desde a MainPhase (~t=3,75s), bloqueado até o fim do primeiro loop do áudio (~t=52s); enquanto bloqueado, exibe countdown contínuo no label (`Next... N`); centralizado no stack de conteúdo (não no rodapé). No Balloon game slide: aparece após todos os balões estourados e 2s de leitura; avança para o Gallery Slide (Slide 4). No Gallery Slide: cada beat tem botões próprios e lock de 2s; botão de avanço final navega para Placeholder (Slide 5).
_Avoid_: Botão, link, call-to-action

**Story beat**:
Unidade narrativa dentro de um Slide de história, revelada sequencialmente. O usuário avança beats clicando "Continue" no CTA interno do Slide. Cada avanço pode exibir novo texto, mídia ou animação.
_Avoid_: Step, página, frame

**Birth story slide**:
Slide 2 do Slideshow; primeiro capítulo narrativo sobre o nascimento da Cila (13/07/1999). Quatro beats interativos avançados pelo CTA interno "Continue" (soft lock 1s). Animate.css na entrada de cada beat; wave CSS suave e contínuo em todos os textos visíveis; polaroid com foto recém-nascida no beat 2; tom visual mais calmo que a Intro. Beat final navega para o Balloon game slide (Slide 3).
_Avoid_: Slide de origem, capítulo 1

**Balloon game slide**:
Slide 3 do Slideshow; minigame interativo de estourar balões para revelar uma mensagem pessoal em inglês. Fases: hint "Pop the balloons!" (fade in/hold/fade out 3s) → camada do jogo (grid 3×3 + parágrafo) com fade in sobreposto ao fade out do hint → interação (cursor alfinete, 9 balões Lottie clicáveis, SFX aleatório de estouro, ordem livre) → 2s para leitura do parágrafo completo → CTA "Next" para o Gallery Slide (Slide 4). Parágrafo renderiza com opacity 1 sob os balões; estourar remove só o balão (célula do grid permanece, sem reordenar os demais). Posições aleatórias por célula sorteadas uma vez quando o slide aparece e fixas durante o jogo. Copy editável em `balloonGameCopy.ts`.
_Avoid_: Mini-game genérico, pop-the-balloon arcade

**Gallery slide**:
Slide 4 do Slideshow; capítulo de galeria com hint configurável (`GALLERY_HINT`) e sete beats sequenciais em polaroid. Um item por vez (`section id` canônico por beat), ângulo por item, lock de ação de 2s por beat, transição fade-out/fade-in entre beats, ações especiais (modal dismissível, modal confirm-only no beat de gym, SFX aleatório no beat girly, botão correndo no beat sleeping). Beat final navega para Placeholder (Slide 5).
_Avoid_: Carrossel, feed, grid de miniaturas

**Intro soundtrack**:
Faixa musical exclusiva da Intro (`feliz_cumpleanos.mp3`), do Prelude até a transição para o Slide 2. Em loop contínuo após o primeiro ciclo completo. Volume máximo tunável via `SOUNDTRACK_VOLUME` em `src/audio/constants.ts`; fade out no CTA anima até `SOUNDTRACK_VOLUME_MIN` (~1s). Slideshow soundtrack só entra quando o Slide 2 estiver ativo.
_Avoid_: Música de fundo, BGM, trilha

**Slideshow soundtrack**:
Faixa musical global (`cila_bday.mp3`) que assume no Slide 2 e persiste nos Slides seguintes. Sem delay interno — início musical imediato. Volume máximo: `SOUNDTRACK_VOLUME` em `src/audio/constants.ts`. Só pode começar a tocar quando o Slide 2 já estiver ativo; nunca durante a Intro ou a transição visual.
_Avoid_: Música de fundo, BGM, trilha

**Audio control**:
Controle mute/unmute fixo no canto superior direito. Visível após o primeiro play de áudio (Kickoff tap) e **persistente em todos os Slides** — renderizado no shell do Slideshow, não dentro de Slides individuais.
_Avoid_: Volume slider, botão de som

**Fiesta**:
Tema visual e atmosférico da experiência: festa de aniversário mexicana tradicional — vibrante, premium, calorosa, sem estética infantil. MainPhase usa decorações Lottie rotativas nas bordas e confete fullscreen em bursts curtos (performance).
_Avoid_: Party, celebration (como termo canônico)
