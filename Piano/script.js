const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // cria o contexto de áudio (é como "ligar" a mesa de som onde todos os instrumentos serão conectados)

const noteFrequencies = { // frequencia das notas do piano em hz
  C4: 261.63,
  Db4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Gb4: 369.99,
  G4: 392.0,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
};

const keyMap = { // possibilita tocar o som pelo teclado, além do mouse
  a: "C4",
  w: "Db4",
  s: "D4",
  e: "Eb4",
  d: "E4",
  f: "F4",
  t: "Gb4",
  g: "G4",
  y: "Ab4",
  h: "A4",
  u: "Bb4",
  j: "B4",
  k: "C5",
};

function playNote(frequency) { //função principal
  if (!frequency) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  const oscillator = audioCtx.createOscillator(); // cria uma fonte de som
  const gainNode = audioCtx.createGain(); // cria o controle do volume

  oscillator.type = "triangle"; // formato da onda sonora (tem sine, square, triangle e sawtooth)
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); // volume do som
  gainNode.gain.exponentialRampToValueAtTime( // faz o som sumir gradualmente em 1,2s
    0.0001,
    audioCtx.currentTime + 1.2,
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1.2);
}

// clique com o mouse
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("mousedown", () => {
    const note = key.dataset.note;
    playNote(noteFrequencies[note]);
  });
});

// teclado físico
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const note = keyMap[key];

  if (note && !e.repeat) {
    // !e.repeat evita que o som trave se segurar a tecla
    playNote(noteFrequencies[note]);

    // adiciona efeito visual
    const keyEl = document.querySelector(`[data-note="${note}"]`);
    if (keyEl) {
      keyEl.classList.add("active");
      setTimeout(() => keyEl.classList.remove("active"), 150);
    }
  }
});
