'use strict';

function preload() {
  //背景の画像
  this.load.spritesheet(
    'world',
    'assets/world.png',
    {frameWidth: 16, frameHeight: 16}
  );
  //光
  this.load.spritesheet(
    'light',
    'assets/pipo-hikarimono002.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  //光の受け皿
  this.load.spritesheet(
    'lightspace',
    'assets/pipo-hikarimono012.png',
    { frameWidth: 64, frameHeight: 64 }
  );
};

function create() {
  //背景の描画；
  this.backgroundMap = this.make.tilemap({
    data: firstMap,
    tileWidth: c.GRID_SIZE,
    tileHeight: c.GRID_SIZE,
  });
  this.backgroundTiles = this.backgroundMap.addTilesetImage('world');
  this.backgroundMap.createStaticLayer(0, this.backgroundTiles, 0, 0);

  this.playerLight = this.physics.add.sprite(400, 320, 'light');
  this.playerLight.depth = 10;

  this.anims.create({
    key: 'player-light-stable',
    frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1
  });

  this.playerLight.anims.play('player-light-stable', false);

  this.lightspaceTwo = this.physics.add.sprite(450, 320, 'lightspace').setScale(0.5);
  this.lightspaceTwo.depth = 1;

  this.anims.create({
    key: 'lightspace-2',
    frames: this.anims.generateFrameNumbers('lightspace', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightspaceTwo.anims.play('lightspace-2', false);

  this.lightTwo = this.physics.add.sprite(240, 240, 'light');
  this.lightTwo.depth = 2;
  
  this.anims.create({
    key: 'light-2',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightTwo.anims.play('light-2', false);

  this.physics.add.collider(this.playerLight, this.lightTwo);
  this.physics.add.overlap(this.lightTwo, this.lightspaceTwo,
    (a, b) => {
      this.flags.isTwoOverlap = true;
    },
    null, this);

  this.completedText = this.add.text(200, 200, "completed!", {fontSize: 30, fontFamily: "Arial"});
  this.completedText.visible = false;

  this.keys = {};
  this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.flags = {};
  this.flags.isTwoOverlap = false;
  this.flags.isCompleted = false;
};

function update() {
  this.playerLight.setVelocityX(0);
  this.playerLight.setVelocityY(0);
  this.lightTwo.setVelocityX(0);
  this.lightTwo.setVelocityY(0);

  // キー入力
  if (this.keys.keyW.isDown) {
    this.playerLight.setVelocityY(-500);
  }
  if (this.keys.keyS.isDown) {
    this.playerLight.setVelocityY(500);
  }
  if (this.keys.keyA.isDown) {
    this.playerLight.setVelocityX(-500);
  }
  if (this.keys.keyD.isDown) {
    this.playerLight.setVelocityX(500);
  }
  if (this.keys.keyW.isDown && this.keys.keyA.isDown) {
    this.playerLight.setVelocityY(-355);
    this.playerLight.setVelocityX(-355);
  }
  if (this.keys.keyA.isDown && this.keys.keyS.isDown) {
    this.playerLight.setVelocityY(355);
    this.playerLight.setVelocityX(-355);
  }
  if (this.keys.keyS.isDown && this.keys.keyD.isDown) {
    this.playerLight.setVelocityY(355);
    this.playerLight.setVelocityX(355);
  }
  if (this.keys.keyD.isDown && this.keys.keyW.isDown) {
    this.playerLight.setVelocityY(-355);
    this.playerLight.setVelocityX(355);
  }

  // flag判定の伝播
  this.flags.isCompleted = this.flags.isTwoOverlap;

  // flagによるオブジェクトの描画
  this.completedText.visible = this.flags.isCompleted;

  // flagのオフ
  this.flags.isTwoOverlap = false;
};

const config = {
  type: Phaser.CANVAS,
  width: c.CANVAS_WIDTH,
  height: c.CANVAS_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {debug: false}
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
