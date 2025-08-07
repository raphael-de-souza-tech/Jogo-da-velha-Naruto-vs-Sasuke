const celulas = document.querySelectorAll(".celula");

let vezDoNaruto = true;
let jogoAtivo = true;

celulas.forEach((celula)=>{ // "Para cada quadradinho, quando alguém clicar nele, faz o que tá dentro dessas chaves {}."
    celula.addEventListener("click",() =>{
        if( // É tipo uma verificação:
            // Se o quadrado ainda tá vazio (não tem nem “naruto” nem “sasuke”);
            // E se o jogo ainda não acabou...
            // pode jogar!
            !celula.classList.contains("naruto") &&
            !celula.classList.contains("sasuke") &&
            jogoAtivo
        ) {
            // É uma forma rápida de fazer um “se...senão” (um if).
            // condição ? valorSeVerdadeiro : valorSeFalso
            celula.classList.add(vezDoNaruto ? "naruto" : "sasuke");
            checarVencedor();
            checarEmpate();
            vezDoNaruto = !vezDoNaruto;
            // O ponto de exclamação (!) em programação quer dizer "não" ou "inverter" o valor verdadeiro/falso (booleano).
        }
    });
});

// Combinações
const combinacoesVencedoras =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Função pra checagem
function checarVencedor(){
    combinacoesVencedoras.forEach((combinacao)=>{
        const[a, b, c] = combinacao;
        if( //const [a, b, c] = combinacao;
            //Essa linha pega os três números da combinação e guarda em a, b, c.
            // Por exemplo, se a combinação for [0, 1, 2], então:
            // a = 0 || b = 1 || c = 2;
            celulas[a].classList.contains("naruto")&&
            celulas[b].classList.contains("naruto")&&
            celulas[c].classList.contains("naruto")
            //“Se os 3 quadradinhos dessa combinação tiverem a classe “naruto”... então o Naruto venceu!”
        ) {
            jogoAtivo = false; // o jogo para, ninguém mais pode jogar. 
            setTimeout(()=> alert("Naruto venceu!"), 100);
            // mostra um alerta na tela dizendo "Naruto venceu!" depois de 100 milissegundos (só pra dar tempo de atualizar o quadrado antes de mostrar o alerta).
        }else if(
            celulas[a].classList.contains("sasuke")&&
            celulas[b].classList.contains("sasuke")&&
            celulas[c].classList.contains("sasuke")
        ){
            jogoAtivo = false;
            setTimeout(()=> alert("Sasuke venceu!"), 100);
        }
    });
}
// Função reiniciar o jogo
function reiniciarJogo(){
    celulas.forEach((celula)=>
    {
        celula.classList.remove("naruto", "sasuke");
    });
    vezDoNaruto = true;
    jogoAtivo = true;
}
document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);
// Função checar empate
function checarEmpate(){
    const todasPreenchidas = Array.from(celulas).every(
        (celula)=>
            celula.classList.contains("naruto") || celula.classList.contains("sasuke")
    );
    if( todasPreenchidas && jogoAtivo){
        setTimeout(() =>{
            alert("Empate! Vamos de novo.")
            reiniciarJogo();
        }, 100);
    }
}