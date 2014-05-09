(function(root) {
    var Game = root.Game = (root.Game || {});

    var View = Game.View = function ($el) {
        this.$el = $el;
        this.board = new Game.Board();
    }

    View.prototype.start = function () {
        $(window).on('keydown', this.handleKeyEvent.bind(this));
        this.board.addApple();

        var int = setInterval(function () {
            this.board.snake.move();
            this.board.snake.isCollided(int);
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

        this.board.snake.turn(keyMap[event.keyCode]);
    }

    View.prototype.render = function (event) {
        this.$el.html(this.board.render());
    }

}(this));