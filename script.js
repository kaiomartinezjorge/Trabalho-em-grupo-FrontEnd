// Seleciona todas  as células da página
const cells = document.querySelectorAll(".cell");
//Seleciona o elemento HTML que mostra a mensagem do jogo
const statusText = document.getElementById("status");
//Seleciona o botão de reiniciar o jogo
const restartBtn = document.getElementById("restart");

// Seleção de elementos do Pop-up
const overlay = document.getElementById("overlay");
// Controla a visualização do Pop-up, mudando o "display: none" para "display: flex"

const modalMessage = document.getElementById("modal-message");
// Escreve a mensagem do Pop-up, falando quem ganhou ou se empatou

const modalRestartBtn = document.getElementById("modal-restart");
// Controla o botão "jogar novamente"



// Estado do jogo
//Guarda qual jogador está jogando no momento
let currentPlayer = "X";

// Cria um array que representa o tabuleiro
//Cada posição representa uma casa
// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8
//Se estiver vazio "", significa que ninguém jogou ali ainda.

let board = ["", "", "", "", "", "", "", "", ""];

let gameActive = true; //Diz se o jogo ainda está acontecendo. Se alguém vencer ou empatar o gameActive muda para "false"; assim o jogador não pode mais clicar

// Combinações de vitória
const winConditions = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
]; // Lista todas as formas de ganhar.
// [0,1,2] → linha de cima
// [3,4,5] → linha do meio
// [6,7,8] → linha de baixo

// [0,3,6] → coluna esquerda
// [1,4,7] → coluna meio
// [2,5,8] → coluna direita

// [0,4,8] → diagonal 1
// [2,4,6] → diagonal 2

// Função quando clica em uma célula
function handleClick(e){ // Ela será executada quando o jogo clicar em uma célula, representa o evento de clique.
    const cell = e.target;
    const index = cell.dataset.index;//Descobre qual casa foi clicada.
//Exemplo:
// data-index="0"
// data-index="1" (Isso identifica a posição no tabuleiro)

// Se a célula já estiver ocupada ou o jogo acabou
if(board[index] !== "" || !gameActive){
return;
} // Impede jogadas inválidas, ele verifica se a célula já foi usada, ou, se o jogo JÁ acabou, se qualquer um for verdadeiro return.

// Marca no tabuleiro
board[index] = currentPlayer; //Marca no array do tabuleiro qual jogador jogou

// Guarda qual casa foi preenchida
cell.textContent = currentPlayer;
// Guarda o jogador

// Verifica vitória
if (checkWinner()) {
    return; // Para a execução aqui se o jogo acabou
}

// Troca jogador
currentPlayer = currentPlayer === "X" ? "O" : "X";

statusText.textContent = "Vez do jogador " + currentPlayer;

}

// Verifica vencedor
function checkWinner() {  //Cria uma função chamada checkWinner que serve para verificar se algum jogador venceu ou se deu empate.
    let roundWon = false; // Cria uma variáel chamada roundWon que começa como false. Ela vai idicar se alguém indicou a rodada.
    let winner = "";   // Cria uma variável winner vazia. Ela vai guardar quem venceu (X ou O).

    for (let condition of winConditions) { //Cria um laço de repetição que percorre todas as combinações possíveis de vitória do jogo-da velha. Ex: linha, coluna diagonal.
        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]]; //Aqui o código pega 3 posições do tabuleiro que formam uma possível combinação de vitória. Ex: [0,1,2]
    // Pega a lista de combinações



        if (a === "" || b === "" || c === "") continue;  // Verifica se alguma das posições está vazia. Se estiver, significa que não tem como ter vitória ali ainda, então pula para a próxima combinação
        // Se a combinação está vazia, ele continua

        if (a === b && b === c) { //Verifica se a; b; c;  São iguais, se forem iguais significa que algúem completou alguma linha e venceu
            roundWon = true;  //define que a rodada foi vencida
            winner = a; // Guarda quem ganhou (X ou O)
            break;
        }
        // Se alguma combinação for feita, ele define um vencedor
    }

    if (roundWon) {
        showModal(`O Jogador ${winner} venceu!`);
        statusText.textContent = `Jogador ${winner} venceu!`; //Atualiza o texto na tela, informando os jogadores
        gameActive = false; //Fim de jogo
        return true; 
    }
    // Exibe o Pop-up de vencedor

// Verifica empate
if (!board.includes("")) { //Verifica se não existe nenhuma posição vazia no tabuleiro. Se todas as casas estão preenchidas
    showModal("Deu Velha!");  // Pop-up de empate = Velha.
    statusText.textContent = "Empate!"; // texto do pop-up
    gameActive = false;  //Fim de jogo
    return true;
}
// Exibe o Pop-up de empate

return false; //Se nimguém ganhou, e ainda possuí espaço no tabuleiro, a função retorna false. jogo continua
}

// Função para exibir o Pop-up
function showModal(msg) {
    modalMessage.textContent = msg;
    overlay.classList.add("active");
}

// Reinicia jogo
function restartGame(){ //Cria uma função para reiniciar o jogo

board = ["", "", "", "", "", "", "", "", ""];
// Limpa a "memoria do jogo anterior"
gameActive = true; //Define que o jogo começou
currentPlayer = "X"; 
// O jogo recomeça com o X
statusText.textContent = "Vez do jogador X"; //Mensagem
overlay.classList.remove("active"); // Esconde o pop-up
cells.forEach(cell => { //Percorre todas as células do tabuleiro
    cell.textContent = ""; //Aqui apaga o X, ou o de cada célula
    cell.style.color = "white";
    // Limpa as cédulas e volta a cor normal do jogo
    });
}

// Eventos

cells.forEach(cell => cell.addEventListener("click", handleClick));
// Quando clicamos, o símbolo aparece
restartBtn.addEventListener("click", restartGame);
// Quando clicamos no botão ele recomeça
modalRestartBtn.addEventListener("click", restartGame);
// Controla o botão "jogar novamente" que aparece no Pop-up