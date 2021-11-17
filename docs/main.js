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
  for (let y = 0; y < c.VERTICAL_PIXELS; y++) {
      for (let x = 0; x < c.HORIZONTAL_PIXELS; x++) {
      this.add.image( c.GRID_SIZE*x + c.GRID_PAD, c.GRID_SIZE*y + c.GRID_PAD, 'world', firstMap[y][x]);
    }
  }

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


  this.completedText = this.add.text(0, 0, "completed!", {fontSize: 30,fontFamily: "Arial"});
  this.completedText.visible = false;

  this.keys = {};
  this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.flags = {};
  this.flags.isOneTouched = false;
  this.flags.isCompleted = false;
};

function update() {
  if (this.keys.keyW.isDown) {
    this.playerLight.y += -5;
  }
  if (this.keys.keyS.isDown) {
    this.playerLight.y += 5;
  }
  if (this.keys.keyA.isDown) {
    this.playerLight.x += -5;
  }
  if (this.keys.keyD.isDown) {
    this.playerLight.x += 5;
  }

  this.flags.isCompleted = this.flags.isOneTouched;
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
