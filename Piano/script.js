const contextoAudio = new (window.AudioContext || window.webkitAudioContext)(); // cria o contexto de áudio (é como "ligar" a mesa de som onde todos os instrumentos serão conectados)

const frequenciasNotas = { // frequencia das notas do piano em hz
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

const mapaTeclado = { // possibilita tocar o som pelo teclado, além do mouse
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

function tocarNota(frequencia) { //função principal
  if (!frequencia) return;
  if (contextoAudio.state === "suspended") contextoAudio.resume();

  const oscilador = contextoAudio.createOscillator(); // cria uma fonte de som
  const controleVolume = contextoAudio.createGain(); // cria o controle do volume

  oscilador.type = "triangle"; // formato da onda sonora (tem sine, square, triangle e sawtooth)
  oscilador.frequency.setValueAtTime(frequencia, contextoAudio.currentTime);

  controleVolume.gain.setValueAtTime(0.3, contextoAudio.currentTime); // volume do som
  controleVolume.gain.exponentialRampToValueAtTime( // faz o som sumir gradualmente em 1,2s
    0.0001,
    contextoAudio.currentTime + 1.2,
  );

  oscilador.connect(controleVolume);
  controleVolume.connect(contextoAudio.destination);

  oscilador.start();
  oscilador.stop(contextoAudio.currentTime + 1.2);
}

// clique com o mouse
document.querySelectorAll(".key").forEach((tecla) => {
  tecla.addEventListener("mousedown", () => {
    const nota = tecla.dataset.note;
    tocarNota(frequenciasNotas[nota]);
  });
});

// teclado físico
window.addEventListener("keydown", (e) => {
  const tecla = e.key.toLowerCase();
  const nota = mapaTeclado[tecla];

  if (nota && !e.repeat) {
    // !e.repeat evita que o som trave se segurar a tecla
    tocarNota(frequenciasNotas[nota]);

    // adiciona efeito visual
    const elementoTecla = document.querySelector(`[data-note="${nota}"]`);
    if (elementoTecla) {
      elementoTecla.classList.add("active");
      setTimeout(() => elementoTecla.classList.remove("active"), 150);
    }
  }
});
