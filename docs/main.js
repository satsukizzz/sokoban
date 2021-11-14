'use strict';

import * as c from "./const.js";
import * as maps from "./map.js";

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
  for (let i = 0; i < c.HORIZONTAL_PIXELS; i++) {
    for (let j = 0; j < c.VERTICAL_PIXELS; j++) {
      this.add.image( c.GRID_SIZE*i + c.GRID_PAD, c.GRID_SIZE*j + c.GRID_PAD, 'world', firstMap[j][i]);
    }
  }

  let light = this.add.sprite(400, 320, 'light');

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

const config = {
  type: Phaser.AUTO,
  width: c.CANVAS_WIDTH,
  height: c.CANVAS_HEIGHT,
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
