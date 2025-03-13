const cards = [
    { id: 1, image: 'imagens/imagem1.png' },
    { id: 2, image: 'imagens/imagem1.png' },
    { id: 3, image: 'imagens/imagem2.png' },
    { id: 4, image: 'imagens/imagem2.png' },
    { id: 5, image: 'imagens/imagem3.png' },
    { id: 6, image: 'imagens/imagem3.png' },
    { id: 7, image: 'imagens/imagem4.png' },
    { id: 8, image: 'imagens/imagem4.png' },
    { id: 9, image: 'imagens/imagem5.png' },
    { id: 10, image: 'imagens/imagem5.png' },
    { id: 11, image: 'imagens/imagem6.png' },
    { id: 12, image: 'imagens/imagem6.png' }
];

let flippedCards = [];
let matchedCards = 0;

const board = document.querySelector('.board');

// Embaralhar as cartas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Gerar as cartas no HTML
function createBoard() {
    shuffleArray(cards);
    board.innerHTML = '';  // Limpar o tabuleiro
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.image = card.image;

        // Adicionar a imagem, mas ela estará oculta inicialmente
        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = 'Carta virada';
        imgElement.style.display = 'none'; // Imagem oculta inicialmente

        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

// Virar a carta
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    const imgElement = this.querySelector('img');
    imgElement.style.display = 'block';  // Mostrar a imagem
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Verificar se as cartas viradas são um par
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        // Se todos os pares forem encontrados
        if (matchedCards === cards.length / 2) {
            setTimeout(() => {
                alert('Você ganhou!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            const firstImg = firstCard.querySelector('img');
            const secondImg = secondCard.querySelector('img');
            firstImg.style.display = 'none';  // Esconder as imagens
            secondImg.style.display = 'none';
        }, 1000);
    }

    flippedCards = [];
}

// Inicializar o jogo
createBoard();
