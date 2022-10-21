const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 1900
const boardHeight = 800
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [890, 10]
let currentPosition = userStart

const ballStart = [910, 50]
let ballCurrentPosition = ballStart


//create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// all my blocks
const blocks = [
    new Block(10, 770), new Block(120, 770), new Block(230, 770), new Block(340, 770), new Block(450, 770), new Block(560, 770), new Block(670, 770), new Block(780, 770),
    new Block(890, 770), new Block(1000, 770), new Block(1110, 770), new Block(1220, 770), new Block(1330, 770), new Block(1440, 770), new Block(1550, 770), new Block(1660, 770),
    new Block(1770, 770),
    new Block(10, 740), new Block(120, 740), new Block(230, 740), new Block(340, 740), new Block(450, 740), new Block(560, 740), new Block(670, 740), new Block(780, 740),
    new Block(890, 740), new Block(1000, 740), new Block(1110, 740), new Block(1220, 740), new Block(1330, 740), new Block(1440, 740), new Block(1550, 740), new Block(1660, 740),
    new Block(1770, 740),
    new Block(10, 710), new Block(120, 710), new Block(230, 710), new Block(340, 710), new Block(450, 710), new Block(560, 710), new Block(670, 710), new Block(780, 710),
    new Block(890, 710), new Block(1000, 710), new Block(1110, 710), new Block(1220, 710), new Block(1330, 710), new Block(1440, 710), new Block(1550, 710), new Block(1660, 710),
    new Block(1770, 710), 
    new Block(10, 680), new Block(120, 680), new Block(230, 680), new Block(340, 680), new Block(450, 680), new Block(560, 680), new Block(670, 680), new Block(780, 680),
    new Block(890, 680), new Block(1000, 680), new Block(1110, 680), new Block(1220, 680), new Block(1330, 680), new Block(1440, 680), new Block(1550, 680), new Block(1660, 680),
    new Block(1770, 680),
    new Block(10, 650), new Block(120, 650), new Block(230, 650), new Block(340, 650), new Block(450, 650), new Block(560, 650), new Block(670, 650), new Block(780, 650),
    new Block(890, 650), new Block(1000, 650), new Block(1110, 650), new Block(1220, 650), new Block(1330, 650), new Block(1440, 650), new Block(1550, 650), new Block(1660, 650),
    new Block(1770, 650),
    new Block(10, 620), new Block(120, 620), new Block(230, 620), new Block(340, 620), new Block(450, 620), new Block(560, 620), new Block(670, 620), new Block(780, 620),
    new Block(890, 620), new Block(1000, 620), new Block(1110, 620), new Block(1220, 620), new Block(1330, 620), new Block(1440, 620), new Block(1550, 620), new Block(1660, 620),
    new Block(1770, 620),
    new Block(10, 590), new Block(120, 590), new Block(230, 590), new Block(340, 590), new Block(450, 590), new Block(560, 590), new Block(670, 590), new Block(780, 590),
    new Block(890, 590), new Block(1000, 590), new Block(1110, 590), new Block(1220, 590), new Block(1330, 590), new Block(1440, 590), new Block(1550, 590), new Block(1660, 590),
    new Block(1770, 590),
]


//draw all my block
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)

    }
}
addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


// move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 15
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 15
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)



// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}


timerId = setInterval(moveBall, 10)

// check for collisions
function checkForCollisions() {
    //chec for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'WINNER WINNER CHICKEN DINNER!! WOOOOO!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }


    // check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

    // check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    // check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "GAME! OVER! HIT THE RESET BUTTON!"
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() { 
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}