//Player factory
const player = (name, symbol='X') => {
    return {name, symbol};
}


//DOM interaction module
const DOM = ((doc) => {
    const gameboard_container = doc.querySelector('.gameboard');

    //Initializes cells
    const make = () => {
        for (i = 0; i < 9; i++) {
            const cell = doc.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            gameboard_container.appendChild(cell);

            cell.addEventListener('click', () => {
                if (!cell.textContent) {gameBoard.handleMove(cell)};
            });
        }
    }

    //Empties contents of cells
    const clear = () => {
        if (gameboard_container.hasChildNodes) {
            const cells = gameboard_container.childNodes;
            for (let i = 0; i < cells.length; i++) {
                cells[i].textContent = '';
            }
        }
    }

    return {make, clear};
})(document);


//Gameboard module
const gameBoard = (() => {
    let board = [];
    const reset = () => {
        board = [];
        for (let i = 0; i < 9; i++) {
            board.push('');
        }
        DOM.clear();
    }
    DOM.make();
    reset();
    
    player_one = player('player one');
    player_two = player('player two', 'O');
    let toPlay = player_one;
    
    const handleMove = (cell) => {
        board[cell.id] = toPlay.symbol;
        cell.textContent = toPlay.symbol;
        if (checkResult()) {reset()};
        (toPlay === player_one) ? toPlay = player_two : toPlay = player_one;
    }

    const checkResult = () => {
        //Check tie
        if (board.indexOf('') === -1) {
            console.log("TIE!!!!");
            return true;
            //Tie logic
        }

        //Check winning positions
        const winspots = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        for (i = 0; i < 8; i++) {
            if (board[winspots[i][0]] === toPlay.symbol &
                board[winspots[i][1]] === toPlay.symbol &
                board[winspots[i][2]] === toPlay.symbol) {
                    return true;
                } 
        }
        return false;   
    }

    return {handleMove};
})();


