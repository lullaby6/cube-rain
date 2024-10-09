const Cube = {
    color: 'rgba(255, 255, 255, 1)',
    tags: ['cube'],
    border: {
        size: 1,
        color: '#000'
    },
    range: {
        size: 12.5,
        speed: 400
    },
    speed: 0,

    onLoad: current => {
        current.reset(current)
    },

    onUpdate: current => {
        current.y += current.speed

        if (current.y > current.scene.game.height) current.scene.game.resetScene()

        current.drawBorder(current)
    },

    drawBorder: current => {
        current.scene.game.ctx.fillStyle = current.border.color

        current.scene.game.ctx.fillRect(current.x - current.border.size, current.y - current.border.size, current.width + (current.border.size * 2), current.height + (current.border.size * 2))
    },

    reset: current => {
        const size = randomIntFromInterval(current.scene.game.width/(current.range.size/2), current.scene.game.width/current.range.size)

        const speed = randomIntFromInterval(current.scene.game.height/(current.range.speed/2), current.scene.game.height/current.range.speed)

        current.speed = speed

        current.setSize(size, size)

        current.y = -size
        current.x = randomIntFromInterval(0, (current.scene.game.width - size))

        if (current.x + size > current.scene.game.width) current.x = current.scene.game.width - size
    },

    onCurrentClick: ({current}) => {
        current.reset(current)

        current.scene.score += 1

        const maxScore = localStorage.getItem('maxScore') || 0

        if (current.scene.score > maxScore) localStorage.setItem('maxScore', current.scene.score)

        const cubesLength = current.scene.getGameObjectsByTag('cube').length

        const newCubesLength = Math.min(current.scene.maxCubes, parseInt(Math.max(1, current.scene.score / 10)))

        if (newCubesLength > cubesLength) {
            for (let i = 0; i < newCubesLength - cubesLength; i++) {
                current.scene.instantGameObject(Cube)
            }
        }
    }
}

const MainScene = {
    score: 0,
    initialCubes: 3,
    maxCubes: 8,

    onLoad: current => {
        for (let i = 0; i < current.initialCubes; i++) {
            current.instantGameObject(Cube)
        }
    },

    onUpdate: current => {

    },

    onKeydown: ({event, current}) => {

    },
}

let windowHeight = window.innerHeight
let width = (9*windowHeight)/16

const game = new Game({
    backgroundColor: '#FBFAFA',
    fps: 60,
    limitFPS: true,
    // cursor: false,
    title: 'Cube Rain - Pyxes',
    width: width,
    height: windowHeight,

    scenes: {
        main: MainScene
    },

    onLoad: current => {
        window.addEventListener('resize', () => {
            windowHeight = window.innerHeight
            width = parseInt((9*windowHeight)/16)

            current.setSize(width, windowHeight)
        })
    },

    onKeydown: ({event, current}) => {
        if (event.key == 'p') current.togglePause()
        else if (event.key == 'r') current.resetScene()
        else if (event.key == 'f') current.toggleFullscreen()
    },

    onPause: current => {
        // current.setCursorVisibility(true)
    },
    onResume: current => {
        // current.setCursorVisibility(false)
    }
})

game.run()