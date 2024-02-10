// Задаем элементы для вывода информации на экран
const orderNumberField = document.querySelector('#orderNumberField'),
	  answerField = document.querySelector('#answerField')

	  // Задаем элементы управления игрой - кнопки
	  retry = document.querySelector("#btnRetry"),
	  less = document.querySelector("#btnLess"),
	  over = document.querySelector("#btnOver"),
	  equal = document.querySelector("#btnEqual")

let gameRun = false,
	orderNumber = 0,
	answerNumber,
	minValue,
	maxValue

// Служебная переменная для проверки, что кнопки инициализированы
let eventHandlersInitialized = false

// Создаем обработчики кнопок
function prepareEventHandlers() {
	over.addEventListener('click', moreOver)
	less.addEventListener('click', lessLess)
	equal.addEventListener('click', result)
	retry.addEventListener('click', resetGame)

	eventHandlersInitialized = true //Служебная переменная для проверки, что кнопки инициализированы
}

// Функция обработки неправильного ответа (больше)
function moreOver() {
	if (!gameRun) {
		return
	}
	
	if (minValue == maxValue) {
		return lose()
	}

	minValue = answerNumber + 1
	
	resolveAnswerNumber()

	ask()
}

//Функция обработки неправильного ответа (меньше)
function lessLess() {
	if (!gameRun) {
		return
	}

	if (minValue == maxValue) {
		return lose()
	}

	maxValue = answerNumber - 1
	
	resolveAnswerNumber()

	ask()
}

//Функция обработки правильного ответа
function result() {
	if (!gameRun) {
		return
	}

    gameRun = false

	const phrase = winPhrasesRandom()
	console.log(`winPhrasesRandom: ${phrase}`)
	setAnswerField(phrase)
}

function lose() {
	gameRun = false

	answerField.innerText = Math.round(Math.random()) === 1
		? 'Вы загадали неправильное число!\n\u{1F914}'
		: 'Я сдаюсь..\n\u{1F92F}'
}

// Функция перезапуска игры
function resetGame() {
	if (gameRun) {
		return
	}

	orderNumber = 0

	startGame()
}

// Счетчик попыток
function updateOrderNumberField() {
	orderNumberField.innerText = ++orderNumber
}

// Функция, которая задает игроку вопрос
function ask() {
	updateOrderNumberField()

	const phrase = askPhrasesRandom()
	console.log(`askPhrasesRandom: ${phrase}`)

	setAnswerField(phrase)
}

//Функция для установки значения в AnswerField
function setAnswerField(value){
	answerField.innerText = value;
}

//Функция для запроса минимального и максимального числа
function answerNumberInterval() {
	minValue = parseInt(prompt('Минимальное знание числа для игры', '0'))
    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100'))

    // Интервал должен быть из разных целых чисел
    // Выводим предупреждение и повторно запрашиваем
    if (minValue == maxValue) {
    	alert('Вы загадали неправильно число')
    	answerNumberInterval()
	}
}

// Задаем первое предположение
function resolveAnswerNumber() {
	answerNumber = Math.floor((minValue + maxValue) / 2)
}

// Генерируем фразы winPhrases
function winPhrasesRandom(){
	let phrase = ''
	const randomNum = Math.floor(Math.random() * 3) + 1
	if(randomNum === 1){
		phrase = 'Я всегда угадываю\n\u{1F60E}';
	}else if(randomNum === 2){
		phrase = 'Это проще простого!\n\u{1F60E}';
	}else if(randomNum === 3){
		phrase = 'Easy peasy lemon squeezy!\n\u{1F60E}';
	}else{
		phrase = 'Easy peasy lemon squeezy!\n\u{1F60E}';
	}

	return phrase
}

// Генерируем фразы askPhrases
function askPhrasesRandom(){
	let phrase = ''
	const randomNum = Math.floor(Math.random() * 3) + 1
	if(randomNum === 1){
		phrase = `Вы загадали число ${answerNumber}?`;
	}else if(randomNum === 2){
		phrase = `Наверное, это число ${answerNumber}`;
	}else if(randomNum === 3){
		phrase = `Должно быть, это число ${answerNumber}`;
	}

	return phrase;
}

// Функция запуска игры
function startGame() {

	// Инициализируем обработчики кнопок, если они еще не инициализированы
	if (!eventHandlersInitialized) {
		prepareEventHandlers()
	}

	// Спрашиваем у игрока минимальное и максимальное число
	answerNumberInterval()

	gameRun = true

	resolveAnswerNumber()

	//Спрашиваем у игрока число
	ask()
}

//Запускаем игру
startGame()
