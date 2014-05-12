(function(root) {
    var Game = root.Game = (root.Game || {});

    var View = Game.View = function ($el) {
        this.$el = $el;
        this.board = new Game.Board();
        this.setupGame();
    };

    View.prototype.setupGame = function () {
        this.board.setupBoard();
        this.int = undefined;
        this.start();
    };
    
    View.prototype.start = function () {
        $(window).on('keydown', this.handleKeyEvent.bind(this));
        this.board.addApple();
        var gameOver = false; 
        
        this.int = setInterval(function () {
            this.board.snake.move();
            if ( this.board.snake.isCollided(this.int) ) {this.setupGame();}
           
            this.board.eatApple();
            this.render();
        }.bind(this), 100);
    };

    View.prototype.handleKeyEvent = function (event) {
        var keyMap = {
            "38": "N",
            "39": "E",
            "40": "S",
            "37": "W"
        };

        if ([38, 39, 40, 37].indexOf(event.keyCode) != -1) {
            this.board.snake.turn(keyMap[event.keyCode]);
        }
    };

    View.prototype.render = function (event) {
        this.$el.html(this.board.render());
        $("#high-score").html("Your Best: " + this.board.highScore);
        $("#score").html("Score: " + this.board.score);
    };

}(this));