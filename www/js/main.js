/*
Game config
*/
const FPS = 60;
const ASSETS = {};

/*
Game objects
*/
var assetsManager = new AssetsManager(loaded);
var controller = new Controller();
var engine = new Engine(1000 / FPS, render, update);
var game = new Game();

/*
Once assets loaded
*/
function loaded() {

    if (assetsManager.allAssetsLoaded()) {

        console.log("loaded");

        //window listeners
        window.addEventListener("focus", play);
        window.addEventListener("blur", pause);
        window.addEventListener("keydown", keyDownUp);
        window.addEventListener("keyup", keyDownUp);

        window.addEventListener("mousedown", mouseDownUp);
        window.addEventListener("mouseup", mouseDownUp);
        window.addEventListener("mousemove", mouseMove);

        game.init();
        engine.start();

    }

}

/*
Inputs
*/
function keyDownUp(event) { controller.keyDownUp(event); }
function mouseDownUp(event) { controller.mouseDownUp(event); }
function mouseMove(event) { controller.mouseMove(event); }

/*
Engine
*/
function play() { engine.start(); }
function pause() { engine.stop(); }

/*
Render
*/
function render() {

    game.render();

}

/*
Update
*/
function update() {

    if (!engine.frozen()) {
        game.update();
    } else {
        engine.unfreeze();
    }

}