// Pegar elementos da página
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const milesimos = document.getElementById('milesimos');

const botaoIniciar = document.getElementById('botaoiniciar');
const botaoPausar = document.getElementById('botaopausar');
const botaoContinuar = document.getElementById('botaocontinuar');
const botaoResetar = document.getElementById('botaoresetar');

// variáveis para guardar o tempo
let inicio = null; // quando o cronômetro começou
let tempoDecorrido = 0; // em milissegundos
let intervalo = null; // id do setInterval
let pausado = false;

// função que atualiza os números na tela
function atualizarTela(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const msresto = ms % 1000;

    minutos.textContent = String(m).padStart(2, '0');
    segundos.textContent = String(s).padStart(2, '0');
    milesimos.textContent = String(msresto).padStart(3, '0');
}

// função chamada a cada "tic" do cronômetro
function tic() {
    const agora = Date.now();
    tempoDecorrido = agora - inicio;
    atualizarTela(tempoDecorrido);
}

function iniciar() {
    if (intervalo) return; // já está rodando
    inicio = Date.now() - tempoDecorrido; // se for continuar
    intervalo = setInterval(tic, 10);
    pausado = false;
}

function pausar() {
    if (!intervalo) return; // nada para pausar
    clearInterval(intervalo);
    intervalo = null;
    pausado = true;
}

function continuar() {
    if (!pausado) return; // só se estiver parado
    inicio = Date.now() - tempoDecorrido;
    intervalo = setInterval(tic, 10);
    pausado = false;
}

function resetar() {
    clearInterval(intervalo);
    intervalo = null;
    tempoDecorrido = 0;
    pausado = false;
    atualizarTela(0);
}

// ligar os botões
botaoIniciar.addEventListener('click', iniciar);
botaoPausar.addEventListener('click', pausar);
botaoContinuar.addEventListener('click', continuar);
botaoResetar.addEventListener('click', resetar);
