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

// Настройки Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();


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
