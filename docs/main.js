'use strict';

function preload() {
  //背景の画像
  this.load.spritesheet(
    'world',
    'assets/worldBig.png',
    {frameWidth: 32, frameHeight: 32}
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

/**
 * grid top-left to pixel
 * @param {int} gridNum 
 * @returns {int}
 */
 function g2p(gridNum) {
  return c.GRID_SIZE * gridNum;
}

/**
 * grid center to pixel
 * @param {int} gridNum 
 * @returns {int}
 */
 function gc2p(gridNum) {
  return g2p(gridNum) + c.GRID_PAD;
}

function create() {
  // add background tiles
  this.backgroundMap = this.make.tilemap({
    data: firstMap,
    tileWidth: c.GRID_SIZE,
    tileHeight: c.GRID_SIZE,
  });
  this.backgroundTiles = this.backgroundMap.addTilesetImage('world');
  this.backgroundMap.createStaticLayer(0, this.backgroundTiles, 0, 0);

  // add players
  this.playerLight = this.physics.add.sprite(gc2p(10), gc2p(7), 'light');
  this.playerLight.depth = 10;

  this.anims.create({
    key: 'player-light-stable',
    frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1
  });

  this.playerLight.anims.play('player-light-stable', false);

  // add reaction objects
  this.lightspaceTwo = this.physics.add.sprite(gc2p(10), gc2p(1), 'lightspace').setScale(0.5);
  this.lightspaceTwo.depth = 1;

  this.anims.create({
    key: 'lightspace-2',
    frames: this.anims.generateFrameNumbers('lightspace', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightspaceTwo.anims.play('lightspace-2', false);

  this.lightTwo = this.physics.add.sprite(gc2p(10), gc2p(5), 'light');
  this.lightTwo.depth = 2;

  this.anims.create({
    key: 'light-2',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightTwo.anims.play('light-2', false);

  this.lightspaceOne = this.physics.add.sprite(gc2p(10), gc2p(12), 'lightspace').setScale(0.5);
  this.lightspaceOne.depth = 1;

  this.anims.create({
    key: 'lightspace-1',
    frames: this.anims.generateFrameNumbers('lightspace', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightspaceOne.anims.play('lightspace-1', false);
  this.lightspaceOne.visible = false;

  this.lightOne = this.physics.add.sprite(gc2p(10), gc2p(10), 'light');
  this.lightOne.depth = 2;

  this.anims.create({
    key: 'light-1',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightOne.anims.play('light-1', false);
  this.lightOne.visible = false;

  this.lightspaceThree = this.physics.add.sprite(gc2p(1), gc2p(14), 'lightspace').setScale(0.5);
  this.lightspaceThree.depth = 1;

  this.anims.create({
    key: 'lightspace-3',
    frames: this.anims.generateFrameNumbers('lightspace', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightspaceThree.anims.play('lightspace-3', false);
  this.lightspaceThree.visible = false;

  this.lightThree = this.physics.add.sprite(gc2p(5), gc2p(14), 'light');
  this.lightThree.depth = 2;

  this.anims.create({
    key: 'light-3',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightThree.anims.play('light-3', false);
  this.lightThree.visible = false;

  this.lightspaceFour = this.physics.add.sprite(gc2p(20), gc2p(17), 'lightspace').setScale(0.5);
  this.lightspaceFour.depth = 1;

  this.anims.create({
    key: 'lightspace-4',
    frames: this.anims.generateFrameNumbers('lightspace', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightspaceFour.anims.play('lightspace-4', false);
  this.lightspaceFour.visible = false;

  this.lightFour = this.physics.add.sprite(gc2p(17), gc2p(17), 'light');
  this.lightFour.depth = 2;

  this.anims.create({
    key: 'light-4',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightFour.anims.play('light-4', false);
  this.lightFour.visible = false;

  // add obstacles

  // add text objects
  this.completedText = this.add.text(g2p(15), g2p(18), "completed!", { fontSize: 64, fontFamily: "Arial" });
  this.completedText.visible = false;

  // add key objects
  this.keys = {};
  this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // add flags
  this.flags = {};
  this.flags.isTwoOverlap = false;
  this.flags.isOneOverlap = false;
  this.flags.isThreeOverlap = false;
  this.flags.isFourOverlap = false;
  this.flags.isCompleted = false;

  // collisions and overlaps
  this.physics.add.collider(this.playerLight, this.lightTwo);
  this.physics.add.overlap(this.lightTwo, this.lightspaceTwo,
    (a, b) => {
      this.flags.isTwoOverlap = true;
      b.destroy();
    },
    null, this);
  this.physics.add.collider(this.playerLight, this.lightOne);
  this.physics.add.overlap(this.lightOne, this.lightspaceOne,
    (a, b) => {
      this.flags.isOneOverlap = true;
      b.destroy();
    },
    null, this);
  this.physics.add.collider(this.playerLight, this.lightThree);
  this.physics.add.overlap(this.lightThree, this.lightspaceThree,
    (a, b) => {
      this.flags.isThreeOverlap = true;
      b.destroy();
    },
    null, this);
  this.physics.add.collider(this.playerLight, this.lightFour);
  this.physics.add.overlap(this.lightFour, this.lightspaceFour,
    (a, b) => {
      this.flags.isFourOverlap = true;
      b.destroy();
    },
    null, this);
};

function update() {
  this.playerLight.setVelocityX(0);
  this.playerLight.setVelocityY(0);
  this.lightTwo.setVelocityX(0);
  this.lightTwo.setVelocityY(0);
  this.lightOne.setVelocityX(0);
  this.lightOne.setVelocityY(0);
  this.lightThree.setVelocityX(0);
  this.lightThree.setVelocityY(0);
  this.lightFour.setVelocityX(0);
  this.lightFour.setVelocityY(0);

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
  this.flags.isCompleted = this.flags.isFourOverlap;

  // flagによるオブジェクトの描画
  this.completedText.visible = this.flags.isCompleted;
  if (this.flags.isTwoOverlap) {
    this.lightOne.visible = true;
    this.lightspaceOne.visible = true;
  }
  if (this.flags.isOneOverlap) {
    this.lightThree.visible = true;
    this.lightspaceThree.visible = true;
  }
  if (this.flags.isThreeOverlap) {
    this.lightFour.visible = true;
    this.lightspaceFour.visible = true;
  }

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
