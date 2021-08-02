$('document').ready(() => {

    const infoBoard = document.querySelector('.info')
    const canvas = document.querySelector('.canvas')
    const width = canvas.width, height = canvas.height
    const ctx = canvas.getContext('2d')

    // setting up context for game
    ctx.fillStyle = 'tomato'
    var blockSize = 20
    var widthInBlocks = width / blockSize
    var heightInBlocks = height / blockSize
    var counter = 0

    // class for updating table`s parts
    class Block {
        constructor(row, col) {
            this.row = row
            this.col = col
        }

        drawBlock(color) {
            var x = this.col * blockSize
            var y = this.row * blockSize
            ctx.fillStyle = color
            ctx.fillRect(x, y, blockSize - 1, blockSize - 1)
        }

        moveApple() {
            this.row = Math.floor(Math.random() * height) % blockSize + 1
            this.col = Math.floor(Math.random() * width) % blockSize + 1
        }

        equal(other) {
            return this.col === other.col && this.row === other.row
        }
    }


    class Snake {
        constructor() {
            this.segments = [new Block(1, 2), new Block(1, 3), new Block(1, 4)]
            this.direction = 'down'
            this.nextDirection = 'down'
        }

        drawSnake() {
            for (var seg of this.segments){
                seg.drawBlock('blue')
            }
            this.segments[0].drawBlock('red')
        }

        moveSnake() {
            var head = this.segments[0]
            var newHead
            this.direction = this.nextDirection
            
            if (this.direction === 'right') {
                newHead = new Block(head.row, head.col + 1)
            } else if (this.direction === 'left') {
                newHead = new Block(head.row, head.col - 1)
            } else if (this.direction === 'up') {
                newHead = new Block(head.row - 1, head.col)
            } else if (this.direction === 'down') {
                newHead = new Block(head.row + 1, head.col)
            }

            this.segments.unshift(newHead)
            newHead.drawBlock('red')

            if (this.checkCollisions(newHead)) {
                gameOver()
                return
            }

            if (newHead.equal(apple)) {
                console.log(apple)
                apple.moveApple()
                console.log(apple)
                apple.drawBlock('green')
                counter++
            } else this.segments.pop()
        }

        changeDirection (key) {
            const keys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'}
            var newDirection = keys[key]

            if (this.direction === "up" && newDirection === "down") {
                return;
            } else if (this.direction === "right" && newDirection === "left") {
                return;
            } else if (this.direction === "down" && newDirection === "up") {
                return;
            } else if (this.direction === "left" && newDirection === "right") {
                return;
            }
        
            this.nextDirection = keys[key]
        }

        checkCollisions(other) {
            if (this.segments.some((element, index) => element.row === other.row 
                                    && element.col === other.col && index) 
                                    || other.col > width / blockSize - 1 
                                    || other.row > height / blockSize - 1 
                                    || other.col < 1 
                                    || other.row < 1)
                return true
        }
    }

    function gameTable() {
        infoBoard.innerHTML = `Counter: ${counter}`
        ctx.fillStyle = "Gray"
        ctx.fillRect(0, 0, width, blockSize - 1)
        ctx.fillRect(0, height - blockSize, width, blockSize)
        ctx.fillRect(0, 0, blockSize - 1, height)
        ctx.fillRect(width - blockSize, 0, blockSize, height)
    }

    function winGame() {
        clearInterval(gameProcess)
        ctx.clearRect(0, 0, width, height)
        ctx.font = "20px Courier"
        ctx.textAlign = 'center'
        ctx.fillText(`You are a winner! Score: ${counter}`, width / 2, height / 2)
        gameTable()
    }

    function gameOver() {
        clearInterval(gameProcess)
        ctx.clearRect(0, 0, width, height)
        ctx.font = "20px Courier"
        ctx.textAlign = 'center'
        ctx.fillText(`Game over! Score: ${counter}`, width / 2, height / 2)
        gameTable()
    }

    const snake = new Snake()
    const apple = new Block(7, 2)
    
    $('body').keydown(key => snake.changeDirection(key.keyCode))
    
    // creating table
    boxex = []
    for (var i = 0; i < width / blockSize; i++) boxex.push([])
    for (var i = 0; i < width / blockSize; i++) {
        for (var j = 0; j < height / blockSize; j++) {
            boxex[i].push(new Block(i, j))
        }
    }
    
    var gameProcess = setInterval(() => {
        ctx.clearRect(0, 0, width, height)
        for (var i = 0; i < width / blockSize; i++) {
            for (var j = 0; j < height / blockSize; j++) {
                boxex[i][j].drawBlock('grey')
            }
        }
        apple.drawBlock('green')
        snake.moveSnake()
        snake.drawSnake()
        gameTable()
        if (counter > 150) winGame()
    
    }, 150)
})

