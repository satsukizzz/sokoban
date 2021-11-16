'use strict';

class FirstScene extends Phaser.Scene {
  constructor () {
    super({key: "firstScene", active: true});
    this.move = 0;
  }

  preload() {
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

  create() {
    //背景の描画；
    this.image = Array.from(firstMap);
    for (let y = 0; y < c.VERTICAL_PIXELS; y++) {
        for (let x = 0; x < c.HORIZONTAL_PIXELS; x++) {
        this.image[y][x] = this.add.image( c.GRID_SIZE*x + c.GRID_PAD, c.GRID_SIZE*y + c.GRID_PAD, 'world', firstMap[y][x]);
      }
    }

    this.text = this.add.text(100, 100, this.move).setFontSize(64).setColor('#ff0');
    this.text2 = this.add.text(100, 150, this.move).setFontSize(64).setColor('#f00');
    // this.text.setDepth(1);
    this.text2.setDepth(3);
    
    const light = this.add.sprite(400, 320, 'light');
    light.setDepth(2);

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('light', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });

    light.play('down', false);
  };

  update() {
    this.text.x = 100 + this.move;
    this.text.y = 100 + this.move;
    this.move += 0.1;
  };
}

const config = {
  type: Phaser.CANVAS, //なぜかWEBGLだとdepthがうまくいかずに別の画像レンダーされてしまう問題があるのでCANVAS
  width: c.CANVAS_WIDTH,
  height: c.CANVAS_HEIGHT,
  scene: [
    FirstScene,
  ],
};

const game = new Phaser.Game(config);
