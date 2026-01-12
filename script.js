// ==========================
// SPOTIFY CLONE MAIN SCRIPT
// ==========================

// --------------------------
// GLOBAL STATE
// --------------------------
let isPlaying = false;
let currentTime = 0;
let duration = 213; // 3:33 seconds (demo)
let volume = 70;

// --------------------------
// SELECTORS
// --------------------------
const playBtn = document.querySelector(
  '.player-control-icon:nth-child(3)'
);
const progressBar = document.querySelector('.progress-bar');
const currTime = document.querySelector('.curr-time');
const totTime = document.querySelector('.tot-time');
const volumeSlider = document.querySelector('.voluee');
const cards = document.querySelectorAll('.card');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.writer-name');
const albumImage = document.querySelector('.suto img');

// --------------------------
// UTILITIES
// --------------------------
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${min}:${sec}`;
}

// --------------------------
// INIT
// --------------------------
totTime.innerText = formatTime(duration);
currTime.innerText = '0:00';
progressBar.value = 0;
volumeSlider.value = volume;

// --------------------------
// PLAY / PAUSE
// --------------------------
playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;

  playBtn.style.opacity = isPlaying ? '1' : '0.7';

  if (isPlaying) {
    playBtn.src = './assets/player_icon3.png';
    startProgress();
  } else {
    stopProgress();
  }
});

// --------------------------
// PROGRESS HANDLING
// --------------------------
let progressInterval;

function startProgress() {
  progressInterval = setInterval(() => {
    if (currentTime < duration) {
      currentTime++;
      progressBar.value = (currentTime / duration) * 100;
      currTime.innerText = formatTime(currentTime);
    } else {
      stopProgress();
      isPlaying = false;
    }
  }, 1000);
}

function stopProgress() {
  clearInterval(progressInterval);
}

// --------------------------
// SEEK BAR
// --------------------------
progressBar.addEventListener('input', (e) => {
  currentTime = (e.target.value / 100) * duration;
  currTime.innerText = formatTime(currentTime);
});

// --------------------------
// VOLUME CONTROL
// --------------------------
volumeSlider.addEventListener('input', (e) => {
  volume = e.target.value;
});

// --------------------------
// CARD CLICK → CHANGE SONG
// --------------------------
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.card-title')?.innerText;
    const artist = card.querySelector('.card-info')?.innerText;
    const img = card.querySelector('.card-img')?.src;

    if (!title || !artist || !img) return;

    songName.innerText = title;
    artistName.innerText = artist;
    albumImage.src = img;

    resetPlayer();
    playBtn.click();
  });
});

// --------------------------
// RESET PLAYER
// --------------------------
function resetPlayer() {
  stopProgress();
  currentTime = 0;
  progressBar.value = 0;
  currTime.innerText = '0:00';
  isPlaying = false;
}

// --------------------------
// ACTIVE CARD EFFECT
// --------------------------
cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.backgroundColor = '#2a2a2a';
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundColor = '#232323';
  });
});

// --------------------------
// MOBILE SAFETY
// --------------------------
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    document.querySelector('.controls').style.display = 'none';
  } else {
    document.querySelector('.controls').style.display = 'flex';
  }
});
