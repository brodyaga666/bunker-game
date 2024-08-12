// Переменные для хранения состояния игры
let playerName = '';
let roomId = '';
let cards = [];

// Элементы DOM
const playerNameDisplay = document.getElementById('playerNameDisplay');
const roomIdDisplay = document.getElementById('roomId');
const dealCardsBtn = document.getElementById('dealCardsBtn');

// Получение параметров из URL
const urlParams = new URLSearchParams(window.location.search);
roomId = urlParams.get('roomId');
playerName = urlParams.get('playerName');

// Отображение ID комнаты и имени игрока
roomIdDisplay.textContent = `ID комнаты: ${roomId}`;
playerNameDisplay.textContent = playerName;

// Функция для генерации случайного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для раздачи карточек
dealCardsBtn.addEventListener('click', dealCards);

function dealCards() {
    const cardHobby = `cards/hobbi/${getRandomInt(1, 30)}.jpg`;
    const cardProfession = `cards/proff/${getRandomInt(1, 50)}.jpg`;
    const cardHealth = `cards/zdorovie/${getRandomInt(1, 30)}.jpg`;
    const cardFact = `cards/fact/${getRandomInt(1, 50)}.jpg`;
    const cardAge = `cards/biologia/${getRandomInt(1, 30)}.jpg`;
    const cardLuggage = `cards/bagaj/${getRandomInt(1, 30)}.jpg`;

    cards = [cardHobby, cardProfession, cardHealth, cardFact, cardAge, cardLuggage];
    displayCards();
}

// Отображение карточек
function displayCards() {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Очистить предыдущие карточки
    cards.forEach(card => {
        const cardElement = document.createElement('img');
        cardElement.src = card;
        cardElement.classList.add('card'); // Добавление класса для стилизации

        // Обработчик для показа карты
        cardElement.addEventListener('click', () => {
            if (confirm('Вы хотите показать карту всем игрокам?')) {
                showCardOnTable(card);
            }
        });

        cardsContainer.appendChild(cardElement);
    });
}

// Показать карту на игровом столе
function showCardOnTable(card) {
    const gameTable = document.getElementById('gameTable');
    const cardElement = document.createElement('img');
    cardElement.src = card;
    cardElement.classList.add('card');

    const playerNameLabel = document.createElement('div');
    playerNameLabel.textContent = playerName;

    const cardWrapper = document.createElement('div');
    cardWrapper.appendChild(cardElement);
    cardWrapper.appendChild(playerNameLabel);
    gameTable.appendChild(cardWrapper);
}
