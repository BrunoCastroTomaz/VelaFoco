BRUNO CASTRO TOMAZ (10389988)
GUSTAVO SAAD MALUHY ANDRADE (10332747)
LUIZ GABRIEL PROFIRIO MENDES (10382703)
RAFAELA PERROTI ZYNGIER (10395424)

O código em javascript é essencial no funcionamento do pomodoro. Após adicionar a estrutura da página em HTML e os estilos em CSS, é essencial o javascript para poder adicionar a funcionalidade do site.

O usuário pode iniciar, pausar, retomar ou trocar entre os modos de foco e descanso. Há ainda uma barra de progresso que mostra quanto tempo já passou.

A funcionalidade principal consiste em:

- Iniciar, Pausar, Retomar o timer
- Alternar entre modos de descanso e foco
- Feedback visual de tempo e progresso

---
## Elementos HTML Usados

```js
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let focusButton = document.getElementById('fase-foco-pomodoro');
let breakButton = document.getElementById('fase-descanso-pomodoro');
let progressBar = document.getElementById('progress-fill');
```

Estes elementos são obtidos do HTML via `getElementById` e serão usados para mostrar o tempo, iniciar o timer, mudar de fase e atualizar a barra de progresso.

---

## Variáveis de Tempo

```js
let defaultFocusTime = 25 * 60; // 25 minutos em segundos
let defaultBreakTime = 5 * 60; // 5 minutos em segundos
let timeLeft = defaultFocusTime;
let timerInterval = null;
let totalTime = defaultFocusTime;
```

- `defaultFocusTime` e `defaultBreakTime` definem os tempos padrão.
- `timeLeft` é o tempo que ainda resta.
- `totalTime` é usado para calcular a porcentagem da barra de progresso.
- `timerInterval` guarda o `setInterval` ativo.

---

## Função `formatTime(seconds)`

```js
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(0).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
```

Essa função formata o tempo em `HH:MM:SS`, transforma o tempo em segundos em minutos. As horas são sempre 0.

**Exemplo:**

```js
formatTime(90); //equivale a "00:01:30"
```

---

## Função `updateTimerDisplay()`

```js
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}
```

Atualiza o conteúdo de `timerDisplay` com o tempo restante formatado.

---

## Função `startTimer()`

```js
function startTimer() {
    // Limpa qualquer intervalo anterior
    if (timerInterval) clearInterval(timerInterval);

    let startTime = Date.now();
    let endTime = startTime + timeLeft * 1000;

    timerInterval = setInterval(() => {
        let now = Date.now();
        timeLeft = Math.max(0, Math.round((endTime - now) / 1000));

        updateTimerDisplay();
        updateProgressBar();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert("Tempo concluído!");
            timeLeft = totalTime; // reseta
            updateTimerDisplay();
            startButton.textContent = "START";
            startButton.onclick = start;
        }
    }, 1000);

    startButton.textContent = "PAUSE";
    startButton.onclick = pauseTimer;
}
```

Essa função:

1. Calcula o tempo final (`endTime`)
2. Atualiza `timeLeft` a cada segundo
3. Ao chegar em 0:
    - Para o timer
    - Mostra um alerta
    - Reseta o botão


---

## Função `pauseTimer()`

```js
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.textContent = "RESUME";
    startButton.onclick = startTimer;
}
```

- Interrompe o temporizador atual.
- Muda o botão para “RESUME”, indicando no HTML que o temporizador foi pausado.

---

## Função `start()`

```js
function start() {
    updateTimerDisplay();
    startTimer();
}
```

Serve como função de inicialização padrão ao clicar no botão START. Atualiza a tela e chama `startTimer`.

---

## Função `updateProgressBar()`

```js
function updateProgressBar() {
    let progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = progressPercentage + "%";
}
```

Calcula a porcentagem completada e altera o `style.width` da barra de progresso.

**Exemplo:** Se já se passaram 15 dos 25 minutos:

```js
((1500 - 600) / 1500) * 100 = 60%
```

---

## Trocar entre Foco e Descanso

### Botão de Foco:

```js
focusButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = defaultFocusTime;
    totalTime = defaultFocusTime;
    updateTimerDisplay();
    updateProgressBar();
    startButton.textContent = "START";
    startButton.onclick = start;
});
```

### Botão de Descanso:

```js
breakButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = defaultBreakTime;
    totalTime = defaultBreakTime;
    updateTimerDisplay();
    updateProgressBar();
    startButton.textContent = "START";
    startButton.onclick = start;
});
```

Esses botões reiniciam o temporizador, mudando o tempo de foco ou descanso, limpando o intervalo ativo e atualizando o display.

---

## Inicialização

```js
updateTimerDisplay();
startButton.onclick = start;
```

Ao carregar a página:

- O display mostra `25:00`
- O botão está pronto para chamar a função "start()" para iniciar o temporizador