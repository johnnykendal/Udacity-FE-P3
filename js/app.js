// Course block dimensions 
var BLOCK_WIDTH = 101;
var BLOCK_HEIGHT = 101;

// Create enemies our player must avoid and with a random start position
var Enemy = function() {
    this.xEnemySpectrum = [-200, 700];
    this.yEnemyPositions = [60, 140, 220];
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

//Reset enemy's position and speed
Enemy.prototype.reset = function() {
    
	var initialStart = this.xEnemySpectrum[0];

    this.x = initialStart;
    this.y = this.yEnemyPositions[getRandomIndex(this.yEnemyPositions)]
    this.speed = this.getRandomSpeed();
};

// Create a random number within an arrays length to then be implented into functions
function getRandomIndex(array){
    return Math.floor(Math.random() * array.length);
}

// Create a random speed for the enemy
Enemy.prototype.getRandomSpeed = function() {
this.speedRange = [150, 250, 350, 450, 500];
return this.speedRange[getRandomIndex(this.speedRange)];
};

// Update enemy's position
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
	//Reset enemies once they go off the screen
	if (this.x > this.xEnemySpectrum[1]) {
		this.reset();
}
};

// Render enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the Player varible
var Player = function(){
    this.width = 80;
	this.height = 80;
	this.xPlayerSpectrum = [-5, 405];
	this.yPlayerSpectrum = [-50, 405];
	this.sprite = 'images/char-boy.png';
    this.reset();
};

// Update player position
Player.prototype.update = function() {
    this.checkCollisions();
};

// Detects collision between enemies and player
Player.prototype.checkCollisions = function() {
    // Reset Player once they reach the water
	if (this.y === -20) {
        this.reset();
	// Run if Player is 
    } else if (this.y >= 50 && this.y <= 250) {
        var targetZone = this.width / 2;
		var playerPosition = this;
        //check if the bug has hit the player
        allEnemies.forEach(function(enemy) {
            // is the bug on the same row as the player?
            if (enemy.y === playerPosition.y) {
                // has the enemy touched the player
                if (enemy.x >= playerPosition.x - targetZone && enemy.x <= playerPosition.x + targetZone) {
                    playerPosition.reset();
                }
            }
        });
    }
};


// Reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Render Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// HandleInput for player movement controls
Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.x -= (this.x - BLOCK_WIDTH < this.xPlayerSpectrum[0]) ? 0 : 101;
    } else if (direction === 'right') {
        this.x += (this.x + BLOCK_WIDTH > this.xPlayerSpectrum[1]) ? 0 : 101;
    } else if (direction === 'up') {
        this.y -= (this.y - BLOCK_HEIGHT < this.yPlayerSpectrum[0]) ? 0 : 80;
    } else if (direction === 'down') {
        this.y += (this.y + BLOCK_HEIGHT > this.yPlayerSpectrum[1]) ? 0 : 80;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create three enemies 
var chevy = new Enemy();
var dodge = new Enemy();
var ford = new Enemy();
var allEnemies = [chevy, dodge, ford];

// Create new Player
var player = new Player();