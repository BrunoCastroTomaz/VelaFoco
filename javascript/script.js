let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let focusButton = document.getElementById('fase-foco-pomodoro');
let breakButton = document.getElementById('fase-descanso-pomodoro');
let progressBar = document.getElementById('progress-fill');

let defaultFocusTime = 25 * 60; // 25 minutos
let defaultBreakTime = 5 * 60; // 5 minutos
let timeLeft = defaultFocusTime;
let timerInterval = null;
let totalTime = defaultFocusTime;


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(0).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    playVideo()
    if (timerInterval) {
        clearInterval(timerInterval);
    }
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
            timeLeft = totalTime; // Reseta para o tempo total
            updateTimerDisplay();
            startButton.textContent = "START";
            startButton.onclick = start;
        }
    }, 1000);
    
    startButton.textContent = "PAUSE";
    startButton.onclick = pauseTimer;
}

function pauseTimer() {
    pauseVideo();
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.textContent = "RESUME";
    startButton.onclick = startTimer;
}

function start() {
    updateTimerDisplay();
    startTimer();
    playVideo();
}

//Atualiza a barra de progresso
function updateProgressBar() {
    let progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = progressPercentage + "%";
}

// Alterar tempo ao clicar nos botões de navegação
focusButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = defaultFocusTime;
    totalTime = defaultFocusTime;
    updateTimerDisplay();
    updateProgressBar();
    startButton.textContent = "START";
    startButton.onclick = start;
});

breakButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = defaultBreakTime;
    totalTime = defaultBreakTime;
    updateTimerDisplay();
    updateProgressBar();
    startButton.textContent = "START";
    startButton.onclick = start;
});

// Inicializa o display
updateTimerDisplay();
startButton.onclick = start;


function playVideo () {
    const video = document.getElementById("timelapse-vela")
    video.playbackRate = 0.0625; // Essa é a velocidade mais baixa possível
    video.play();
}

function pauseVideo () {
    const video = document.getElementById("timelapse-vela")
    video.pause();
}