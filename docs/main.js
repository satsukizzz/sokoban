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
  this.move = 0;
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

  this.anims.create({
    key: 'player-light-stable',
    frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1
  });

  this.playerLight.anims.play('player-light-stable', false);

  this.lightOne = this.physics.add.sprite(450, 320, 'light');

  this.anims.create({
    key: 'light-1-stable',
    frames: this.anims.generateFrameNumbers('light', { start: 3, end: 5 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightOne.anims.play('light-1-stable', false);

  this.physics.add.overlap(this.playerLight, this.lightOne,
    (a, b) => {
      b.destroy();
      this.flags.isOneTouched = true;
    },
    null, this);

  this.lightTwo = this.physics.add.sprite(240, 240, 'light');

  this.anims.create({
    key: 'light-2-stable',
    frames: this.anims.generateFrameNumbers('light', { start: 6, end: 8 }),
    frameRate: 5,
    repeat: -1
  });

  this.lightTwo.anims.play('light-2-stable', false);

  this.physics.add.collider(this.playerLight, this.lightTwo);

  this.completedText = this.add.text(0, 0, "completed!", {fontSize: 30,fontFamily: "Arial"});
  this.completedText.visible = false;

  this.keys = {};
  this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.flags = {};
  this.flags.isOneTouched = false;
  this.flags.isTwoTouched = false;
  this.flags.isCompleted = false;
};

function update() {
  this.playerLight.setVelocityX(0);
  this.playerLight.setVelocityY(0);
  this.lightTwo.setVelocityX(0);
  this.lightTwo.setVelocityY(0);

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
  }

  this.flags.isCompleted = this.flags.isOneTouched && this.flags.isTwoTouched;
  if(this.flags.isCompleted) {
    this.completedText.visible = true;
  }

  this.move += 0.01;
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
