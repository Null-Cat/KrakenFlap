var config = {
    banner: {
        hidePhaser: true
    },
    type: Phaser.AUTO,
    width: 600,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        parent: 'krakenflap',
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);

const assets = {
    tentacle: {
        top: 'tentacleTop',
        bottom: 'tentacleBottom'
    }
}

let player;
let score;
let coffee;
let jumpFrames;

let tentaclesGroup;
let gapsGroup;
let currentTentacles;

let gameStarted;

let background;

let cursors;
let upButton;

function preload() {
    this.load.spritesheet('player', 'js/assets/player.png', { frameWidth: 80, frameHeight: 24 });
    this.load.image(assets.tentacle.top, 'js/assets/tentacle.png');
    this.load.image(assets.tentacle.bottom, 'js/assets/tentacleinverse.png');
    this.load.image('coffee', 'js/assets/coffee.png');
    this.load.image('underwaterBg', 'js/assets/underwaterbg.png');
}

function create() {
    this.anims.create({
        key: 'swim',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    gapsGroup = this.physics.add.group()
    tentaclesGroup = this.physics.add.group()

    background = this.add.tileSprite(800, 300, 1600, 600, 'underwaterBg');

    prepareGame(this)

    upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.input.on('pointerdown', movePlayer);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameOver || !gameStarted) return;

    background.tilePositionX += 0.5;

    if (jumpFrames > 0) {
        jumpFrames--
    }
    else if (Phaser.Input.Keyboard.JustDown(upButton)) {
        movePlayer()
    }
    else {
        player.setVelocityY(120);

        if (player.angle < 90) {
            player.angle += 1
        }
    }

    tentaclesGroup.children.iterate(function (child) {
        if (child == undefined) return

        if (child.x < -50) {
            child.destroy()
        }
        else {
            child.setVelocityX(-100)
        }
    });

    gapsGroup.children.iterate(function (child) {
        child.body.setVelocityX(-100);
    });

    framesTillSpawnTentacle++;
    if (framesTillSpawnTentacle === 300) {
        createTentacles(game.scene.scenes[0]);
        framesTillSpawnTentacle = 0;
    }
}

function createTentacles(scene) {
    const tentacleTopY = Phaser.Math.Between(-10, 150);
    const tentacleXSpawn = 600;

    console.log(tentacleTopY);
    const gap = scene.add.line(tentacleXSpawn, tentacleTopY + 210, 0, 0, 0, 98);
    gapsGroup.add(gap);
    gap.body.allowGravity = false;
    gap.visible = false;

    const tentacleTop = tentaclesGroup.create(tentacleXSpawn, tentacleTopY, assets.tentacle.top);
    tentacleTop.body.allowGravity = false;

    const tentacleBottom = tentaclesGroup.create(tentacleXSpawn, tentacleTopY + 420, assets.tentacle.bottom);
    tentacleBottom.body.allowGravity = false;
}

function movePlayer() {
    // if (gameOver)
    //     return

    if (!gameStarted) startGame(game.scene.scenes[0]);

    player.setVelocityY(-400);
    player.angle = -15;
    jumpFrames = 8;
}

function prepareGame(scene) {
    jumpFrames = 0;
    framesTillSpawnTentacle = 0;
    //currentPipe = assets.tentacle
    score = 0;
    gameOver = false;
    //messageInitial.visible = true

    player = scene.physics.add.sprite(60, 265, 'player');
    player.setSize(55, 24, true);
    player.setCollideWorldBounds(true);
    player.anims.play('swim', true);
    player.body.allowGravity = false;

    //scene.physics.add.collider(player, ground, hitBird, null, scene)
    //scene.physics.add.collider(player, pipesGroup, hitBird, null, scene)

    //scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene)

    //ground.anims.play(assets.animation.ground.moving, true)
}

function startGame(scene) {
    gameStarted = true;
    //messageInitial.visible = false

    //const score0 = scoreboardGroup.create(assets.scene.width, 30, assets.scoreboard.number0)
    //score0.setDepth(20)

    createTentacles(scene);
}
