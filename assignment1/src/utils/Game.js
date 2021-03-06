class Game {
    
    // Specifies keyboard handlers
    addKeyboardHandlers(){
        throw new Error('Keyboard handlers must be implemented');
    }

    // Sets the update loop
    update(){
        throw new Error('Update must be implemented');
    }

    // Sets the render loop
    render() {
        throw new Error('Render must be implemented');
    }

    // The game loop managed by the engine
    gameloop() {
        this.update();
        this.render();
    }

    // Optional debugging
    debug() {
        console.log('No debugging parameters are currently set.');
    }

    // Initializes base game components
    init() {
        throw new Error('Init must be implemented');
    }
}

export default Game;