'use strict';

const GRID_SIZE = 16;
const GRID_PAD = GRID_SIZE / 2;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRASS_FLOOR_NUM = 32;

const config = {
  type: Phaser.AUTO,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  scene: {
    preload,
    create,
    update,
  },  
};  

let game = new Phaser.Game(config);

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
};

function create() {
  //背景の描画；
  for (let i = 0; i < CANVAS_WIDTH / GRID_SIZE; i++) {
    for (let j = 0; j < CANVAS_HEIGHT / GRID_SIZE; j++) {
      this.add.image( GRID_SIZE*i + GRID_PAD, GRID_SIZE*j + GRID_PAD, 'world', GRASS_FLOOR_NUM);
    }
  }

  let light = this.add.sprite(400, 300, 'light');

  this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
  });
  
  light.anims.play('down', false);
};

function update() {

};

