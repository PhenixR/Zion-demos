import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    UP, DOWN, LEFT, RIGHT, GRID
} from './options'
import { createImageCache } from './engine/canvas'
import Game from './engine/Game'
import { drawWalls, drawGrid, movePlayer, updateGrid } from './helper'

class CRGame extends Game {
    constructor() {
        super();
        this.canvas = document.querySelector('#copsAndRobbers');
        this.context = this.canvas.getContext('2d');
        this.gameover = false;
        this.gameloop = this.gameloop.bind(this);

        //TODO: Player array initialization
        this.players = []
        this.direction = null;
        this.grid = GRID;
    }

    addKeyboardHandlers() {
        document.addEventListener('keydown', (e) => this.setMovingDirection(e));
    }

    setMovingDirection(e) {
        // Only allow key presses on the player's turn
        if (!this.players[0].isAI) {
            if (e.keyCode === 37) {
                this.direction = LEFT;
            } else if (e.keyCode === 38) {
                this.direction = UP;
            } else if (e.keyCode === 39) {
                this.direction = RIGHT;
            } else if (e.keyCode === 40) {
                this.direction = DOWN;
            }
        }
    }

    update() {
        // Save data about the player whose turn it is
        var currentTurn = this.players[0];
        var oldData = this.players[0].data;
        // If it is an AI player, make a move
        if(currentTurn.isAI){
            if (currentTurn.team === COP){
                currentTurn.data = getCopMove(currentTurn.data);
            } else {
                currentTurn.data = getRobberMove(currentTurn.data);
            }
            //Rotate the player array
            this.players.shift();
            this.players.push(currentTurn);
        // If it is a human player's turn, wait for them to press a key
        } else if (this.direction) {
            currentTurn.data = movePlayer(currentTurn.data, this.direction);
            // Rotate player array and set direction to null
            this.players.shift();
            this.players.push(currentTurn);
            this.direction = null;
        }
        // Update the grid with the latest move
        this.grid = updateGrid(this.grid, currentTurn, oldData);
    }

    // rendering the game
    render() {
        const { width, height } = this.canvas;

        // render walls and background
        drawGrid(this.context, this.grid);
        drawWalls(this.context, width, height);
    }

    initCops() {
        // TODO
    }

    initRobbers() {
        // TODO
    }

    // is there a better way for initializing solid walls?
    initWalls() {
        // TODO
    }

    init() {
        this.addKeyboardHandlers();
        this.timer = setInterval(this.gameloop, 30);
        window.drawGrid = drawGrid.bind(this, this.context, this.grid);
    }

}

export default CRGame;