// Переменные для хранения состояния игры
let playerName = '';
let roomId = '';
let cards = [];
let rooms = [];

// Элементы DOM
const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoomBtn');
const roomIdInput = document.getElementById('roomIdInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const roomsList = document.getElementById('roomsList');

// Функция для генерации случайного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация уникального ID для комнаты
function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
}

// Функция для создания комнаты
createRoomBtn.addEventListener('click', () => {
    playerName = playerNameInput.value;
    if (!playerName) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }
    roomId = generateRoomId();
    rooms.push(roomId); // Добавление комнаты в список
    displayRooms();
    alert(`Комната создана! ID: ${roomId}`);
});

// Функция для подключения к комнате
joinRoomBtn.addEventListener('click', () => {
    playerName = playerNameInput.value;
    roomId = roomIdInput.value;
    if (!playerName || !roomId) {
        alert('Пожалуйста, введите ваше имя и ID комнаты');
        return;
    }
    
    // Перенаправление на страницу комнаты
    window.location.href = `room.html?roomId=${roomId}&playerName=${encodeURIComponent(playerName)}`;
});

// Инициализация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAXrw5CFG8__XFaan7alayoPhn5-j-N7Cw",
    authDomain: "bunker-513cb.firebaseapp.com",
    databaseURL: "https://bunker-513cb-default-rtdb.firebaseio.com",
    projectId: "bunker-513cb",
    storageBucket: "bunker-513cb.appspot.com",
    messagingSenderId: "322012142747",
    appId: "1:322012142747:web:994e48a49c191ff3133a3e"
};
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Переменные для хранения состояния игры
let playerName = '';
let roomId = '';

// Элементы DOM
const playerNameInput = document.getElementById('playerName');
const roomIdInput = document.getElementById('roomIdInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');

// Обработчик события для кнопки подключения к комнате
joinRoomBtn.addEventListener('click', () => {
    playerName = playerNameInput.value;
    roomId = roomIdInput.value;
    if (!playerName || !roomId) {
        alert('Пожалуйста, введите ваше имя и ID комнаты');
        return;
    }
    alert(`Вы подключились к комнате: ${roomId}`);

    // Отправка данных о игроке в Firebase
    database.ref(`rooms/${roomId}/players`).push({ name: playerName });

    // Слушать изменения в комнате
    listenForPlayers(roomId);
});

// Функция для получения данных о других игроках
function listenForPlayers(roomId) {
    database.ref(`rooms/${roomId}/players`).on('value', (snapshot) => {
        const players = snapshot.val();
        updatePlayersList(players);
    });
}

// Функция для обновления списка игроков
function updatePlayersList(players) {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = ''; // Очистить предыдущий список

    if (players) {
        Object.values(players).forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.textContent = player.name; // Отобразить имя игрока
            playersList.appendChild(playerElement);
        });
    }
}

// Отображение списка комнат
function displayRooms() {
    roomsList.innerHTML = ''; // Очистить предыдущий список
    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.textContent = `Комната ID: ${room}`;
        roomElement.style.cursor = 'pointer';
        roomElement.addEventListener('click', () => {
            window.location.href = `room.html?roomId=${room}&playerName=${encodeURIComponent(playerName)}`;
        });
        roomsList.appendChild(roomElement);
    });
}
