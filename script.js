//Player factory
const player = (name, symbol='X') => {
    return {name, symbol};
}

//DOM interaction module
const DOM = ((doc) => {
    const gameboard_container = doc.querySelector('.gameboard');
    const option_select = doc.querySelector('.option-select');
    const pvp_btn = doc.querySelector('#pvp');
    const name_select = doc.querySelector('.name');
    const inputs = doc.querySelector('#input-field');
    const start_btn = doc.querySelector('#start-btn');
    start_btn.addEventListener('click', () => {
        const p1 = doc.querySelector('#p1');
        const p2 = doc.querySelector('#p2');
        gameBoard.setNames(p1.value, p2.value);
        option_select.remove();
        start_btn.remove();
        gameboard_container.style.visibility = 'visible';
        gameboard_container.style.opacity = 1;
    });

    const popup = (container) => {
        //TODO: CLEAN THIS UP
        let height = '4.5';
        let vis = 'visible';
        let op = '1';
        let tran = '.8s ease';
        if (container.style.visibility === 'visible') {
            tran = '.15s';
            height = '0';
            vis = 'hidden';
            op = '0';
        }
        inputs.style.transition = tran;
        start_btn.style.visibility = vis;
        start_btn.style.opacity = op;    
        inputs.style.opacity = op;
        container.style.opacity = op;
        container.style.visibility = vis;
        container.style.maxHeight = height + 'rem';
    }

    pvp_btn.addEventListener('click', () => popup(name_select));

    //Win/draw message
    const message = (name) => {
        const text = doc.createElement('h2');
        text.classList.add('win-message');
        text.textContent = (name === 'draw') ? 'Draw!' : name + ' won!';
        doc.body.appendChild(text);
        setTimeout(() => {
            doc.body.removeChild(text);
            gameBoard.reset();
        }, 1500);
    }

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
    return {make, clear, message};
})(document);

//Gameboard module
const gameBoard = (() => {
    //Initializes board
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

    const setNames = (pone, ptwo) => {
        if (pone) player_one.name = pone;
        if (ptwo) player_two.name = ptwo;
    }
    
    const handleMove = (cell) => {
        board[cell.id] = toPlay.symbol;
        cell.textContent = toPlay.symbol;
        let result = checkResult();
        if (result) {
            (result === 'draw') ? DOM.message('draw') : DOM.message(toPlay.name);
        }
        (toPlay === player_one) ? toPlay = player_two : toPlay = player_one;
    }

    //Checks for tie/win
    const checkResult = () => {
        const winspots = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6],
        ];
        for (i = 0; i < 8; i++) {
            if (board[winspots[i][0]] === toPlay.symbol &&
                board[winspots[i][1]] === toPlay.symbol &&
                board[winspots[i][2]] === toPlay.symbol) {
                    return 'win';
                } 
        }
        //check tie
        if (board.indexOf('') === -1) {
            return 'draw';
        }

        return false;   
    }

    return {handleMove, reset, setNames};
})();


