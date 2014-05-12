(function(root) {
    var Game = root.Game = (root.Game || {});

    Game.SIZE = 12;

    var Snake = Game.Snake = function () {
        this.dir = "N";
        this.segments = [new Coord(parseInt(Game.SIZE / 2), parseInt(Game.SIZE / 2))];
    };

    Snake.prototype.move = function () {
        var temp;

        for (var i = this.segments.length - 1; i > 0; i--) {
            temp = [this.segments[i-1].x, this.segments[i-1].y];
            this.segments[i].plus(temp);
        }
        var moveDirx = 0;
        var moveDiry = 0;
        switch (this.dir) {
        case 'N':
            moveDirx = -1;
            break;
        case 'E':
            moveDiry = 1;
            break;
        case 'S':
            moveDirx = 1;
            break;
        case 'W':
            moveDiry = -1;
            break;
        }

        temp = [this.segments[0].x + moveDirx, this.segments[0].y + moveDiry];

        this.segments[0].plus(temp);
    };

    Snake.prototype.turn = function (direction) {
        var illegalMoveMap = {
            "W": "E",
            "N": "S",
            "S": "N",
            "E": "W"
        };

        if (illegalMoveMap[this.dir] !== direction) {
            this.dir = direction;
        }
    };

    var Coord = Game.Coord = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Snake.prototype.grow = function () {
        var lastSeg = this.segments[this.segments.length - 1];
        this.segments[this.segments.length] = new Coord(lastSeg.x, lastSeg.y);
    };

    Snake.prototype.isCollided = function (int) {
        for (var i = 1; i < this.segments.length; i++) {
           if (this.segments[i].x === this.segments[0].x &&
                this.segments[i].y === this.segments[0].y) {
                    clearInterval(int);
                    return true;
            }
        }
        return false;
    };

    Coord.prototype.plus = function (coord) {

        this.x = coord[0];
        this.y = coord[1];
        if (this.x < 0) {
            this.x = Game.SIZE - 1 ;
        } else if (this.x >= Game.SIZE) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.y = Game.SIZE - 1;
        } else if (this.y >= Game.SIZE) {
            this.y = 0;
        }
    };

    var Board = Game.Board = function () {
        this.highScore = 0;
        this.setupBoard();
    };
    
    Board.prototype.setupBoard = function () {
        this.snake = new Snake();
        this.apple = null;
        this.score = 0;
    };

    Board.prototype.render = function () {
        var grid = [];
        for (var i = 0; i < Game.SIZE; i++) {
            grid.push([]);
            for (var j = 0; j < Game.SIZE; j++) {
                    grid[i].push("<div class='square empty'></div>");
            }
            // grid[i].push("<br>");
        }


        grid[this.apple[0]][this.apple[1]] = "<div class='square apple'></div>";

        for (i = 0; i < this.snake.segments.length; i++) {
            grid[this.snake.segments[i].x][this.snake.segments[i].y] = "<div class='square snake'></div>";
        }

        for (i = 0;i < grid.length; i++){
            grid[i] = grid[i].join("");
        }
        return grid.join('');
    };

    Board.prototype.addApple = function () {
        var randX = Math.floor(Math.random() * Game.SIZE);
        var randY = Math.floor(Math.random() * Game.SIZE);
        this.apple = [randX, randY];
    };


    Board.prototype.eatApple = function () {
        if (this.snake.segments[0].x === this.apple[0] &&
            this.snake.segments[0].y === this.apple[1]) {
            this.snake.grow();
            this.score += Math.floor(Math.random() * 10 + 90);
            this.highScore = Math.max(this.score, this.highScore);
            this.addApple();
        }
    };


}(this));