const infoBoard = document.querySelector('.info')
const canvas = document.querySelector('.canvas')
const width = canvas.width, height = canvas.height
const ctx = canvas.getContext('2d')

// setting up context for canvas
ctx.fillStyle = 'tomato'

class Ball {
    constructor() {
        this.x = width / 2
        this.y = height / 2
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

    changeSize(size) {
        if (size === 13){
            if (this.radius < 20){
                this.radius += 1
            } else {
                this.radius = 10
            }
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


ball = new Ball()

$('body').keydown(key => ball.setSpeedByKeyboard(key.keyCode))
$('body').keydown(key => ball.changeDirection(key.keyCode))
$('body').keydown(key => ball.changeSize(key.keyCode))
$('body').keydown(key => ball.boostSpeed(key.keyCode))

var game = setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    ball.draw()
    ball.move()
    ctx.stroke()
    ctx.strokeRect(0, 0, width, height)
    infoBoard.innerHTML = `Speed: ${ball.dynamicSpeed}, Size: ${ball.radius}, Position: x = ${ball.x}, y = ${ball.y}`
}, 40)





