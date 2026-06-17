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
Slide temporário sem conteúdo final, usado para validar navegação e handoff de áudio entre Slides antes da implementação do conteúdo real.
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
Botão "Next" na Intro. Visível desde a MainPhase (~t=3,75s), bloqueado até o fim do primeiro loop do áudio (~t=52s). Enquanto bloqueado, exibe countdown contínuo no label (`Next... N`). Centralizado no stack de conteúdo (não no rodapé). Ao liberar, label vira "Next" com cor viva, glow e interatividade. O clique inicia a transição para o próximo Slide. Semanticamente distinto do botão "Continue" dos Slides narrativos, que avança beats dentro do mesmo Slide.
_Avoid_: Botão, link, call-to-action

**Story beat**:
Unidade narrativa dentro de um Slide de história, revelada sequencialmente. O usuário avança beats clicando "Continue" no CTA interno do Slide. Cada avanço pode exibir novo texto, mídia ou animação.
_Avoid_: Step, página, frame

**Birth story slide**:
Slide 2 do Slideshow; primeiro capítulo narrativo sobre o nascimento da Cila (13/07/1999). Quatro beats interativos avançados pelo CTA interno "Continue" (soft lock 1s). Animate.css na entrada de cada beat; wave CSS suave e contínuo em todos os textos visíveis; polaroid com foto recém-nascida no beat 2; tom visual mais calmo que a Intro.
_Avoid_: Slide de origem, capítulo 1

**Intro soundtrack**:
Faixa musical exclusiva da Intro (`feliz_cumpleanos.mp3`), do Prelude até a transição para o Slide 2. Em loop contínuo após o primeiro ciclo completo. Faz fade out de ~1s durante a transição visual; o Slideshow soundtrack só entra quando o Slide 2 estiver ativo.
_Avoid_: Música de fundo, BGM, trilha

**Slideshow soundtrack**:
Faixa musical global (`cila_bday.mp3`) que assume no Slide 2 e persiste nos Slides seguintes. Sem delay interno — início musical imediato. Só pode começar a tocar quando o Slide 2 já estiver ativo; nunca durante a Intro ou a transição visual.
_Avoid_: Música de fundo, BGM, trilha

**Audio control**:
Controle mute/unmute fixo no canto superior direito. Visível após o primeiro play de áudio (Kickoff tap) e **persistente em todos os Slides** — renderizado no shell do Slideshow, não dentro de Slides individuais.
_Avoid_: Volume slider, botão de som

**Fiesta**:
Tema visual e atmosférico da experiência: festa de aniversário mexicana tradicional — vibrante, premium, calorosa, sem estética infantil. MainPhase usa decorações Lottie rotativas nas bordas e confete fullscreen em bursts curtos (performance).
_Avoid_: Party, celebration (como termo canônico)
