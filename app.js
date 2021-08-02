const infoBoard = document.querySelector('.info')
const canvas = document.querySelector('.canvas')
const width = canvas.width, height = canvas.height
const ctx = canvas.getContext('2d')

// setting up context for game
ctx.fillStyle = 'tomato'
var blockSize = 10
var widthInBlocks = width / blockSize
var heightInBlocks = height / blockSize
var counter = 0

class Ball {
    constructor(x = width / 2, y = height / 2) {
        this.x = x
        this.y = y
        this.radius = 10
        this.xSpeed = 0
        this.ySpeed = 0
        this.dynamicSpeed = 3
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        ctx.fill()
    }

    move() {
        this.x += this.xSpeed 
        this.y += this.ySpeed 

        if (this.x > width - this.radius) this.x = this.radius
        if (this.x < 0 + this.radius) this.x = width - this.radius
        if (this.y > height - this.radius) this.y = this.radius
        if (this.y < 0 + this.radius) this.y = height - this.radius
    }

    changeDirection(direction) {
        if (direction === 37) {
            this.xSpeed = -this.dynamicSpeed
            this.ySpeed = 0
        } else if (direction === 39) {
            this.xSpeed = this.dynamicSpeed
            this.ySpeed = 0
        }

        if (direction === 38) {
            this.xSpeed = 0
            this.ySpeed = -this.dynamicSpeed
        } else if (direction === 40) {
            this.xSpeed = 0
            this.ySpeed = this.dynamicSpeed
        }

        if (direction === 32)
            this.dynamicSpeed = this.xSpeed = this.ySpeed = 0
    }

    useNewSpeed() {
        if (this.xSpeed > 0) {
            this.xSpeed = this.dynamicSpeed
            this.ySpeed = 0

        } else if (this.xSpeed < 0) {
            this.xSpeed = -this.dynamicSpeed
            this.ySpeed = 0
        }
        
        if (this.ySpeed > 0) {
            this.ySpeed = this.dynamicSpeed
            this.xSpeed = 0

        } else if (this.ySpeed < 0) {
            this.ySpeed = -this.dynamicSpeed
            this.xSpeed = 0
        }
    }
    
    setSpeedByKeyboard(speed) {
        const keys = [49, 50, 51, 52, 53, 54]
        var speedIndex = 0
        if (keys.some(elem => elem === speed)){
            keys.forEach((elem, index) => {
                elem === speed ? speedIndex = index : 0
            })
            this.dynamicSpeed = speedIndex + 1
            this.useNewSpeed()
        }
    }

    changeSize(size = 1) {
        if (size === 13){
            if (this.radius < 20){
                this.radius += 1
            } else {
                this.radius = 10
            }
        }
        if (size === 1){
            this.radius += 2
        }
    }

    boostSpeed(speed) {
        if (speed === 16) {
            if (this.dynamicSpeed === 10)
                this.dynamicSpeed = 3
            else this.dynamicSpeed = 10
            this.useNewSpeed()
        }
    }
}

function borderPlusScore() {
    ctx.strokeRect(0, 0, width, height)
    infoBoard.innerHTML = `Speed: ${ball.dynamicSpeed},
                           Size: ${ball.radius},
                           Counter: ${counter}`
}


const ball = new Ball()
const apple = new Ball()

$('body').keydown(key => ball.setSpeedByKeyboard(key.keyCode))
$('body').keydown(key => ball.changeDirection(key.keyCode))
$('body').keydown(key => ball.changeSize(key.keyCode))
$('body').keydown(key => ball.boostSpeed(key.keyCode))

var game = setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    apple.draw()
    ball.draw()
    ball.move()

    if (ball.x >= apple.x - ball.radius && ball.x <= apple.x + ball.radius
        && ball.y >= apple.y - ball.radius && ball.y <= apple.y + ball.radius){
        apple.x = Math.floor(Math.random() * width)
        apple.y = Math.floor(Math.random() * height)
        ball.changeSize()
        counter++
    }

    if (ball.radius > 150) {
        clearInterval(game)
        ctx.clearRect(0, 0, width, height)
    } 
    
    borderPlusScore()
}, 40)





