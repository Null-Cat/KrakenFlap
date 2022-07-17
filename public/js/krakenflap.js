var config = {
    banner: {
        hidePhaser: true
    },
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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
    },
    letters: {
        lowercase: {
            a: 'om_large_plain_097_lowercase_a',
            b: 'om_large_plain_098_lowercase_b',
            c: 'om_large_plain_099_lowercase_c',
            d: 'om_large_plain_100_lowercase_d',
            e: 'om_large_plain_101_lowercase_e',
            f: 'om_large_plain_102_lowercase_f',
            g: 'om_large_plain_103_lowercase_g',
            h: 'om_large_plain_104_lowercase_h',
            i: 'om_large_plain_105_lowercase_i',
            j: 'om_large_plain_106_lowercase_j',
            k: 'om_large_plain_107_lowercase_k',
            l: 'om_large_plain_108_lowercase_l',
            m: 'om_large_plain_109_lowercase_m',
            n: 'om_large_plain_110_lowercase_n',
            o: 'om_large_plain_111_lowercase_o',
            p: 'om_large_plain_112_lowercase_p',
            q: 'om_large_plain_113_lowercase_q',
            r: 'om_large_plain_114_lowercase_r',
            s: 'om_large_plain_115_lowercase_s',
            t: 'om_large_plain_116_lowercase_t',
            u: 'om_large_plain_117_lowercase_u',
            v: 'om_large_plain_118_lowercase_v',
            w: 'om_large_plain_119_lowercase_w',
            x: 'om_large_plain_120_lowercase_x',
            y: 'om_large_plain_121_lowercase_y',
            z: 'om_large_plain_122_lowercase_z'
        },
        uppercase: {
            A: 'om_large_plain_097_uppercase_a',
            B: 'om_large_plain_098_uppercase_b',
            C: 'om_large_plain_099_uppercase_c',
            D: 'om_large_plain_100_uppercase_d',
            E: 'om_large_plain_101_uppercase_e',
            F: 'om_large_plain_102_uppercase_f',
            G: 'om_large_plain_103_uppercase_g',
            H: 'om_large_plain_104_uppercase_h',
            I: 'om_large_plain_105_uppercase_i',
            J: 'om_large_plain_106_uppercase_j',
            K: 'om_large_plain_107_uppercase_k',
            L: 'om_large_plain_108_uppercase_l',
            M: 'om_large_plain_109_uppercase_m',
            N: 'om_large_plain_110_uppercase_n',
            O: 'om_large_plain_111_uppercase_o',
            P: 'om_large_plain_112_uppercase_p',
            Q: 'om_large_plain_113_uppercase_q',
            R: 'om_large_plain_114_uppercase_r',
            S: 'om_large_plain_115_uppercase_s',
            T: 'om_large_plain_116_uppercase_t',
            U: 'om_large_plain_117_uppercase_u',
            V: 'om_large_plain_118_uppercase_v',
            W: 'om_large_plain_119_uppercase_w',
            X: 'om_large_plain_120_uppercase_x',
            Y: 'om_large_plain_121_uppercase_y',
            Z: 'om_large_plain_122_uppercase_z'
        },
        numbers: {
            0: 'om_large_plain_048_numbers_0',
            1: 'om_large_plain_049_numbers_1',
            2: 'om_large_plain_050_numbers_2',
            3: 'om_large_plain_051_numbers_3',
            4: 'om_large_plain_052_numbers_4',
            5: 'om_large_plain_053_numbers_5',
            6: 'om_large_plain_054_numbers_6',
            7: 'om_large_plain_055_numbers_7',
            8: 'om_large_plain_056_numbers_8',
            9: 'om_large_plain_057_numbers_9'
        },
        special: {
            'SPACE': 'om_large_plain_032_space',
            'EXCLAMATION': 'om_large_plain_033_exclamation_mark',
        }
    }
}

let player;
let score;
let scoreText;
let coffee;

let jumpFrames;
let tentacleSpawnTimer;

let tentaclesGroup;
let gapsGroup;
let currentTentacles;

let gameStarted;

let title;
let instructions;
let gameOverBanner;
let background;

let cursors;
let upButton;

function preload() {
    this.load.spritesheet('player', 'js/assets/player.png', { frameWidth: 80, frameHeight: 24 });
    this.load.image(assets.tentacle.top, 'js/assets/tentacle.png');
    this.load.image(assets.tentacle.bottom, 'js/assets/tentacleInverse.png');
    this.load.image('coffee', 'js/assets/coffee.png');
    this.load.image('underwaterBg', 'js/assets/underwaterbg.png');
    this.load.image('title', 'js/assets/KrakenFlapWhite.png');
    this.load.image('instructions', 'js/assets/Instructions.png');
    this.load.image('gameOver', 'js/assets/GameOver.png');
    // //#region letters

    // this.load.image(assets.letters.lowercase.a, 'js/assets/om_large_plain/om_large_plain_097_lowercase_a.png');
    // this.load.image(assets.letters.lowercase.b, 'js/assets/om_large_plain/om_large_plain_098_lowercase_b.png');
    // this.load.image(assets.letters.lowercase.c, 'js/assets/om_large_plain/om_large_plain_099_lowercase_c.png');
    // this.load.image(assets.letters.lowercase.d, 'js/assets/om_large_plain/om_large_plain_100_lowercase_d.png');
    // this.load.image(assets.letters.lowercase.e, 'js/assets/om_large_plain/om_large_plain_101_lowercase_e.png');
    // this.load.image(assets.letters.lowercase.f, 'js/assets/om_large_plain/om_large_plain_102_lowercase_f.png');
    // this.load.image(assets.letters.lowercase.g, 'js/assets/om_large_plain/om_large_plain_103_lowercase_g.png');
    // this.load.image(assets.letters.lowercase.h, 'js/assets/om_large_plain/om_large_plain_104_lowercase_h.png');
    // this.load.image(assets.letters.lowercase.i, 'js/assets/om_large_plain/om_large_plain_105_lowercase_i.png');
    // this.load.image(assets.letters.lowercase.j, 'js/assets/om_large_plain/om_large_plain_106_lowercase_j.png');
    // this.load.image(assets.letters.lowercase.k, 'js/assets/om_large_plain/om_large_plain_107_lowercase_k.png');
    // this.load.image(assets.letters.lowercase.l, 'js/assets/om_large_plain/om_large_plain_108_lowercase_l.png');
    // this.load.image(assets.letters.lowercase.m, 'js/assets/om_large_plain/om_large_plain_109_lowercase_m.png');
    // this.load.image(assets.letters.lowercase.n, 'js/assets/om_large_plain/om_large_plain_110_lowercase_n.png');
    // this.load.image(assets.letters.lowercase.o, 'js/assets/om_large_plain/om_large_plain_111_lowercase_o.png');
    // this.load.image(assets.letters.lowercase.p, 'js/assets/om_large_plain/om_large_plain_112_lowercase_p.png');
    // this.load.image(assets.letters.lowercase.q, 'js/assets/om_large_plain/om_large_plain_113_lowercase_q.png');
    // this.load.image(assets.letters.lowercase.r, 'js/assets/om_large_plain/om_large_plain_114_lowercase_r.png');
    // this.load.image(assets.letters.lowercase.s, 'js/assets/om_large_plain/om_large_plain_115_lowercase_s.png');
    // this.load.image(assets.letters.lowercase.t, 'js/assets/om_large_plain/om_large_plain_116_lowercase_t.png');
    // this.load.image(assets.letters.lowercase.u, 'js/assets/om_large_plain/om_large_plain_117_lowercase_u.png');
    // this.load.image(assets.letters.lowercase.v, 'js/assets/om_large_plain/om_large_plain_118_lowercase_v.png');
    // this.load.image(assets.letters.lowercase.w, 'js/assets/om_large_plain/om_large_plain_119_lowercase_w.png');
    // this.load.image(assets.letters.lowercase.x, 'js/assets/om_large_plain/om_large_plain_120_lowercase_x.png');
    // this.load.image(assets.letters.lowercase.y, 'js/assets/om_large_plain/om_large_plain_121_lowercase_y.png');
    // this.load.image(assets.letters.lowercase.z, 'js/assets/om_large_plain/om_large_plain_122_lowercase_z.png');

    // this.load.image(assets.letters.uppercase.A, 'js/assets/om_large_plain/om_large_plain_065_uppercase_a.png');
    // this.load.image(assets.letters.uppercase.B, 'js/assets/om_large_plain/om_large_plain_066_uppercase_b.png');
    // this.load.image(assets.letters.uppercase.C, 'js/assets/om_large_plain/om_large_plain_067_uppercase_c.png');
    // this.load.image(assets.letters.uppercase.D, 'js/assets/om_large_plain/om_large_plain_068_uppercase_d.png');
    // this.load.image(assets.letters.uppercase.E, 'js/assets/om_large_plain/om_large_plain_069_uppercase_e.png');
    // this.load.image(assets.letters.uppercase.F, 'js/assets/om_large_plain/om_large_plain_070_uppercase_f.png');
    // this.load.image(assets.letters.uppercase.G, 'js/assets/om_large_plain/om_large_plain_071_uppercase_g.png');
    // this.load.image(assets.letters.uppercase.H, 'js/assets/om_large_plain/om_large_plain_072_uppercase_h.png');
    // this.load.image(assets.letters.uppercase.I, 'js/assets/om_large_plain/om_large_plain_073_uppercase_i.png');
    // this.load.image(assets.letters.uppercase.J, 'js/assets/om_large_plain/om_large_plain_074_uppercase_j.png');
    // this.load.image(assets.letters.uppercase.K, 'js/assets/om_large_plain/om_large_plain_075_uppercase_k.png');
    // this.load.image(assets.letters.uppercase.L, 'js/assets/om_large_plain/om_large_plain_076_uppercase_l.png');
    // this.load.image(assets.letters.uppercase.M, 'js/assets/om_large_plain/om_large_plain_077_uppercase_m.png');
    // this.load.image(assets.letters.uppercase.N, 'js/assets/om_large_plain/om_large_plain_078_uppercase_n.png');
    // this.load.image(assets.letters.uppercase.O, 'js/assets/om_large_plain/om_large_plain_079_uppercase_o.png');
    // this.load.image(assets.letters.uppercase.P, 'js/assets/om_large_plain/om_large_plain_080_uppercase_p.png');
    // this.load.image(assets.letters.uppercase.Q, 'js/assets/om_large_plain/om_large_plain_081_uppercase_q.png');
    // this.load.image(assets.letters.uppercase.R, 'js/assets/om_large_plain/om_large_plain_082_uppercase_r.png');
    // this.load.image(assets.letters.uppercase.S, 'js/assets/om_large_plain/om_large_plain_083_uppercase_s.png');
    // this.load.image(assets.letters.uppercase.T, 'js/assets/om_large_plain/om_large_plain_084_uppercase_t.png');
    // this.load.image(assets.letters.uppercase.U, 'js/assets/om_large_plain/om_large_plain_085_uppercase_u.png');
    // this.load.image(assets.letters.uppercase.V, 'js/assets/om_large_plain/om_large_plain_086_uppercase_v.png');
    // this.load.image(assets.letters.uppercase.W, 'js/assets/om_large_plain/om_large_plain_087_uppercase_w.png');
    // this.load.image(assets.letters.uppercase.X, 'js/assets/om_large_plain/om_large_plain_088_uppercase_x.png');
    // this.load.image(assets.letters.uppercase.Y, 'js/assets/om_large_plain/om_large_plain_089_uppercase_y.png');
    // this.load.image(assets.letters.uppercase.Z, 'js/assets/om_large_plain/om_large_plain_090_uppercase_z.png');

    // this.load.image(assets.letters.numbers[0], 'js/assets/om_large_plain/om_large_plain_048_digit_0.png');
    // this.load.image(assets.letters.numbers[1], 'js/assets/om_large_plain/om_large_plain_049_digit_1.png');
    // this.load.image(assets.letters.numbers[2], 'js/assets/om_large_plain/om_large_plain_050_digit_2.png');
    // this.load.image(assets.letters.numbers[3], 'js/assets/om_large_plain/om_large_plain_051_digit_3.png');
    // this.load.image(assets.letters.numbers[4], 'js/assets/om_large_plain/om_large_plain_052_digit_4.png');
    // this.load.image(assets.letters.numbers[5], 'js/assets/om_large_plain/om_large_plain_053_digit_5.png');
    // this.load.image(assets.letters.numbers[6], 'js/assets/om_large_plain/om_large_plain_054_digit_6.png');
    // this.load.image(assets.letters.numbers[7], 'js/assets/om_large_plain/om_large_plain_055_digit_7.png');
    // this.load.image(assets.letters.numbers[8], 'js/assets/om_large_plain/om_large_plain_056_digit_8.png');
    // this.load.image(assets.letters.numbers[9], 'js/assets/om_large_plain/om_large_plain_057_digit_9.png');

    // this.load.image(assets.letters.special.SPACE, 'js/assets/om_large_plain/om_large_plain_032_space.png');
    // this.load.image(assets.letters.special.EXCLAMATION, 'js/assets/om_large_plain/om_large_plain_033_exclamation_mark.png');


    // //#endregion
}

function create() {
    this.anims.create({
        key: 'swim',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'swim stop',
        frames: [{ key: 'player', frame: 0 }],
        frameRate: 10
    });

    gapsGroup = this.physics.add.group()
    tentaclesGroup = this.physics.add.group()

    title = this.add.image(256, 156, 'title');
    title.setDepth(30);
    title.visible = true;

    instructions = this.add.image(256, 400, 'instructions');
    instructions.setDepth(30);
    instructions.visible = true;

    gameOverBanner = this.add.image(256, 156, 'gameOver');
    gameOverBanner.setDepth(30);
    gameOverBanner.visible = false;

    background = this.add.tileSprite(800, 300, 1600, 600, 'underwaterBg');

    scoreText = this.add.text(256, 156, "0", {
        font: "32px Verdana",
        fill: "#ffffff",
        align: "center"
    });
    scoreText.setDepth(30);
    scoreText.visible = false;

    tentacleSpawnTimer = this.time.addEvent({ delay: 1500, callback: createTentacles, callbackScope: this, loop: true });
    tentacleSpawnTimer.paused = true;

    prepareGame(this)

    upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.input.on('pointerdown', movePlayer);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameOver || !gameStarted) return;

    background.tilePositionX += 0.3;

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
}

function createTentacles(scene = game.scene.scenes[0]) {
    const tentacleTopY = Phaser.Math.Between(-10, 150);
    const tentacleXSpawn = 600;

    const gap = scene.add.line(tentacleXSpawn, tentacleTopY + 210, 0, 0, 0, 98);
    gapsGroup.add(gap);
    gap.body.allowGravity = false;
    gap.visible = false;

    const tentacleTop = tentaclesGroup.create(tentacleXSpawn, tentacleTopY, assets.tentacle.top);
    tentacleTop.body.allowGravity = false;
    tentacleTop.setSize(tentacleTop.width - 20, tentacleTop.height, true);

    const tentacleBottom = tentaclesGroup.create(tentacleXSpawn, tentacleTopY + 420, assets.tentacle.bottom);
    tentacleBottom.body.allowGravity = false;
    tentacleBottom.setSize(tentacleTop.width - 20, tentacleTop.height, true);
}

function movePlayer() {
    if (gameOver) restartGame();
    if (!gameStarted) startGame(game.scene.scenes[0]);

    if (deviceType == 'mobile' || deviceType == 'tablet') {
        player.setVelocityY(-200);
    }
    else {
        player.setVelocityY(-400);
    }
    player.angle = -15;
    jumpFrames = 8;
}

function prepareGame(scene) {
    jumpFrames = 0;
    framesTillSpawnTentacle = 0;
    score = 0;
    scoreText.setText(score);
    gameOver = false;

    player = scene.physics.add.sprite(60, 265, 'player');
    player.setSize(25, 24, true);
    player.setCollideWorldBounds(true);
    player.anims.play('swim', true);
    player.body.allowGravity = false;
    player.body.onWorldBounds = true;
    scene.physics.world.on('worldbounds', onWorldBounds);

    scene.physics.add.collider(player, tentaclesGroup, playerHit, null, scene);
    scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene);
}

function startGame(scene) {
    gameStarted = true;
    title.visible = false;
    instructions.visible = false;
    gameOverBanner.visible = false;
    scoreText.visible = true;
    //createTentacles(scene);
    tentacleSpawnTimer.paused = false;
}

function restartGame() {
    tentaclesGroup.clear(true, true)
    gapsGroup.clear(true, true)
    title.visible = true;
    instructions.visible = true;
    player.destroy();

    prepareGame(game.scene.scenes[0]);
    game.scene.scenes[0].physics.resume();
}

function updateScore(_, gap) {
    score++;
    scoreText.setText(score);
    gap.destroy();
}

function playerHit(player) {
    game.scene.scenes[0].physics.pause();
    gameOver = true;
    gameStarted = false;

    player.anims.play('swim stop');

    gameOverBanner.visible = true
    scoreText.visible = false;
    //restartButton.visible = true
    tentacleSpawnTimer.paused = true;
}

function onWorldBounds(collider) {
    playerHit(player);
}

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};