// Lista de jogos alugados (carregada do localStorage)
let rentedGames = JSON.parse(localStorage.getItem("rentedGames")) || [];

function alterarStatus(id) {
    let gameClicado = document.getElementById(`game-${id}`);
    let imagem = gameClicado.querySelector('.dashboard__item__img');
    let botao = gameClicado.querySelector('.dashboard__item__button');
    let titulo = gameClicado.querySelector(".dashboard__item__name").textContent; // <- corrigido!

    if (imagem.classList.contains('dashboard__item__img--rented')) {
        // Se já estava alugado → devolver
        imagem.classList.remove('dashboard__item__img--rented');
        botao.classList.remove('dashboard__item__button--return');
        botao.textContent = 'Alugar';

        // Remove da lista de alugados
        rentedGames = rentedGames.filter(g => g !== titulo);

    } else {
        // Se ainda não estava alugado → alugar
        imagem.classList.add('dashboard__item__img--rented');
        botao.classList.add('dashboard__item__button--return');
        botao.textContent = 'Devolver';

        // Adiciona na lista de alugados
        if (!rentedGames.includes(titulo)) {
            rentedGames.push(titulo);
        }
    }

    // Salva no localStorage
    localStorage.setItem("rentedGames", JSON.stringify(rentedGames));

    // Atualiza contador
    updateCounter();
}

// Função para atualizar contador na tela
function updateCounter() {
    let total = document.querySelectorAll(".dashboard__items__item").length;
    let rented = rentedGames.length;
    let available = total - rented;

    let counter = document.getElementById("game-counter");
    if (!counter) {
        counter = document.createElement("div");
        counter.id = "game-counter";
        counter.style.marginTop = "20px";
        counter.style.fontWeight = "bold";
        document.querySelector(".dashboard").appendChild(counter);
    }

    counter.textContent = `Disponíveis: ${available} | Alugados: ${rented}`;
}

// Quando a página carregar, aplica o estado salvo
window.onload = function () {
    let games = document.querySelectorAll(".dashboard__items__item");

    games.forEach(game => {
        let titulo = game.querySelector(".dashboard__item__name").textContent;
        let imagem = game.querySelector('.dashboard__item__img');
        let botao = game.querySelector('.dashboard__item__button');

        if (rentedGames.includes(titulo)) {
            imagem.classList.add('dashboard__item__img--rented');
            botao.classList.add('dashboard__item__button--return');
            botao.textContent = 'Devolver';
        }
    });

    updateCounter();
};
