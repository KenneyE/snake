(function(root) {
    var Game = root.Game = (root.Game || {});

    var View = Game.View = function ($el) {
        this.$el = $el;
                
        this.board = new Game.Board();
        this.setupGame();
    };

    View.prototype.setupGame = function () {
        this.keyQueue = [];
        this.board.setupBoard();
        this.int = undefined;
        this.start();
    };
    
    View.prototype.start = function () {
        $(window).on('keydown', this.handleKeyEvent.bind(this));
        this.board.addApple();
        
        this.int = setInterval(function () {
            if (this.keyQueue.length > 0 ) this.turn();
            this.board.snake.move();
            
            if ( this.board.snake.isCollided(this.int) ) {this.setupGame();}
           
            this.board.eatApple();
            this.render();
        }.bind(this), 100);
    };

    View.prototype.handleKeyEvent = function (event) {

        var validMove = this.keyQueue.length < 3;
        validMove = validMove && [38, 39, 40, 37].indexOf(event.keyCode) != -1;
        validMove = validMove && event.keyCode != this.keyQueue.slice(-1);
        
        if ( validMove ) {
            this.keyQueue.push(event.keyCode);
        }
    };
    
    View.prototype.turn = function () {
        var keyMap = {
            "38": "N",
            "39": "E",
            "40": "S",
            "37": "W"
        };
            
        this.board.snake.turn(keyMap[this.keyQueue.shift()]);
    };

    View.prototype.render = function (event) {
        this.$el.html(this.board.render());
        $("#high-score").html("Your Best: " + this.board.highScore);
        $("#score").html("Score: " + this.board.score);
    };

}(this));