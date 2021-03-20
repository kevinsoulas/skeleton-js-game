class Controller {

    constructor() {

        this.down = new Button();
        this.up = new Button();
        this.left = new Button();
        this.right = new Button();

        this.mouse = new Mouse();

    }

    keyDownUp(event) {

        var down = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37: this.left.getInput(down); break; //left
            case 38: this.up.getInput(down); break; //up
            case 39: this.right.getInput(down); break; //right
            case 40: this.down.getInput(down); break; //down

        }

    }

    mouseDownUp(event) {

        var down = (event.type == "mousedown") ? true : false;
        this.mouse.getInput(down);

    }

    mouseMove(event) {

        this.mouse.x = event.pageX;
        this.mouse.y = event.pageY;
        this.mouse.update();

    }

}