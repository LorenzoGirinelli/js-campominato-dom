document.getElementById('play').addEventListener('click', startGame);

function startGame() {
    const bombsNumber = 16;
    // (1) PRELEVO IL VALORE DELLA DIFFICOLTA'
    let level = document.getElementById('level').value;
    console.log(level);

    // (2) SE IL VALORE E' EASY LA GRIGLIA E' DI 100 CELLE
    let numberOfSquares;
    if (level === 'easy') {
        numberOfSquares = 100;
        // (3) SE IL VALORE E' MEDIUM LA GRIGLIA E' DI 81 CELLE
    } else if (level === 'medium') {
        numberOfSquares = 81;
            // (4) SE IL VALORE E' HARD LA GRIGLIA E' DI 49 CELLE
    } else {
        numberOfSquares = 49;
    }

    // GENERA UN ARRAY DI BOMBE DA 1 A X
    const bombsArray = generateBombs(numberOfSquares, bombsNumber);

    // Calcolare il numero massimi di tentetivi fino alla vincita dell' utente
    const maxAttempts = numberOfSquares - bombsArray.length;
    console.log(maxAttempts);

    // CREARE LA GRIGLIA CON GLI SQUARE
    // Crearmi un array di numeri casuali e non ripetuti da 1 a 100
    let generatedNumbers = generateSquaresNumbers(numberOfSquares);

    // Per ogni numero nell'array, creo una cella e la appendo al grid container
    const mainGrid = document.getElementById('grid');
    mainGrid.innerHTML = '';
    for(let i = 0; i < generatedNumbers.length; i++) {
        const thisNumber = generatedNumbers[i];
        const newGeneratedSquare = generateGridItem(thisNumber, level);

        // Attacco l'evento allo square
        newGeneratedSquare.addEventListener('click', handleSquareClick);
        
        // Aggiungo l'elemento alla griglia
        mainGrid.appendChild(newGeneratedSquare);
    }
}
// -----------
// FUNZIONI LEGATE AL DOM
// -----------
function handleSquareClick() {
    this.classList.add('active');
    const thisSquareNumber = parseInt( this.querySelector('span').textContent );
    this.classList.add('square--blue');
}

// -----------
// FUNCTIONS
// -----------
// GENERA UN ARRAY DI BOMBE DA 1 A X
function generateBombs(maxRangeNumber, NumberoOfBombs) {
    const arrayOfBombs = [];
    while( arrayOfBombs.length < NumberoOfBombs ) {
        const randomNumber = getRndInteger(1, maxRangeNumber);
        if(!arrayOfBombs.includes(randomNumber)) {
            arrayOfBombs.push(randomNumber);
        }
    }
    console.log(arrayOfBombs);
}

let test = generateBombs(100, 16);
// Creare un elemento della griglia
// number -> numero da inserire nello square
// 
// return: Torna l'elemento html creato
function generateGridItem(number, level) {
    const newSquare = document.createElement('div');
    // AGGUINGERE IL LIVELLO ALLA CLASSE SQUARE
    newSquare.classList.add(`square-${level}`);
    newSquare.classList.add('square');
    newSquare.innerHTML = `<span>${number}</span>`; 

    return newSquare;
}

// Genera un array con x numeri unici
// quantityOfNumbers -> quanti numeri deve generare
// 
// return: array di quantityOfNumbers numeri univoci
function generateSquaresNumbers (quantityOfNumbers) {
    const numbersArray = [];
    while(numbersArray.length < quantityOfNumbers) {
        // Un numero random
        const randomNumber = getRndInteger(1, quantityOfNumbers);

        // Se il numero random non è gia presente in numbersArray lo pusho
        if( !numbersArray.includes(randomNumber) ) {
            numbersArray.push(randomNumber);
        }
    }

    return numbersArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}