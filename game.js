document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze');
    const startButton = document.getElementById('start-btn');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const mazeSize = 10;
    let playerPosition = { x: 0, y: 0 };
    let score = 0;
    let timer = 0;
    let interval;

    const generateMaze = () => {
        mazeContainer.innerHTML = '';
        for (let i = 0; i < mazeSize * mazeSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            mazeContainer.appendChild(cell);
        }

        placePlayer();
        placeTreasures(3);
        placeObstacles(5);
    };

    const placePlayer = () => {
        const playerCell = mazeContainer.children[playerPosition.y * mazeSize + playerPosition.x];
        playerCell.classList.add('player');
    };

    const placeTreasures = (count) => {
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * mazeSize);
                y = Math.floor(Math.random() * mazeSize);
            } while (mazeContainer.children[y * mazeSize + x].classList.contains('player') ||
                     mazeContainer.children[y * mazeSize + x].classList.contains('treasure') ||
                     mazeContainer.children[y * mazeSize + x].classList.contains('obstacle'));
            
            mazeContainer.children[y * mazeSize + x].classList.add('treasure');
        }
    };

    const placeObstacles = (count) => {
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * mazeSize);
                y = Math.floor(Math.random() * mazeSize);
            } while (mazeContainer.children[y * mazeSize + x].classList.contains('player') ||
                     mazeContainer.children[y * mazeSize + x].classList.contains('treasure') ||
                     mazeContainer.children[y * mazeSize + x].classList.contains('obstacle'));
            
            mazeContainer.children[y * mazeSize + x].classList.add('obstacle');
        }
    };

    const countRemainingTreasures = () => {
        return document.querySelectorAll('.treasure').length;
    };

    const movePlayer = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (newX < 0 || newX >= mazeSize || newY < 0 || newY >= mazeSize) return;

        const newCell = mazeContainer.children[newY * mazeSize + newX];
        if (newCell.classList.contains('obstacle')) return;

        const currentCell = mazeContainer.children[playerPosition.y * mazeSize + playerPosition.x];
        currentCell.classList.remove('player');
        
        playerPosition = { x: newX, y: newY };
        if (newCell.classList.contains('treasure')) {
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            newCell.classList.remove('treasure');

            if (countRemainingTreasures() === 0) {
                clearInterval(interval);
                alert('Congratulations! You collected all the treasures.');
                return;
            }
        }

        newCell.classList.add('player');
    };

    const startGame = () => {
        playerPosition = { x: 0, y: 0 };
        score = 0;
        timer = 0;
        scoreDisplay.textContent = 'Score: 0';
        timerDisplay.textContent = 'Time: 0s';
        clearInterval(interval);
        interval = setInterval(() => {
            timer += 1;
            timerDisplay.textContent = `Time: ${timer}s`;
        }, 1000);
        generateMaze();
    };

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': movePlayer(0, -1); break;
            case 'ArrowDown': movePlayer(0, 1); break;
            case 'ArrowLeft': movePlayer(-1, 0); break;
            case 'ArrowRight': movePlayer(1, 0); break;
        }
    });

    startButton.addEventListener('click', startGame);
});
