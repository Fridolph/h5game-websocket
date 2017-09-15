var Local = function () {
  var game; // 游戏对象
  const INTERVAL = 200;  // 间隔时间
  let timer = null;  // 定时器
  // 绑定键盘事件
  var bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode === 38) { //up
        game.rotate();
      } else if (e.keyCode === 39) { // right
        game.right();
      } else if (e.keyCode === 40) { // down
        game.down();
      } else if (e.keyCode === 37) { // left
        game.left();
      } else if (e.keyCode === 32) { // space
        game.fall();
      }
    }
  }

  // 移动相关
  var move = function() {
    // 不断下落
    if(!game.down()) {
      game.fixed(); // 固定不动
      // 传2个参数，一个方块种类，下一个方块的旋转次数
      game.performNext(generateType(), generateDir()); 
    }    
  }

  // 随机生成一个方块种类
  var generateType = function() {
    return Math.ceil(Math.random()*7) - 1;
  }

  // 随机生成一个旋转次数
  var generateDir = function() {
    return Math.ceil(Math.random()*4) - 1;
  }

  // 开始
  var start = () => {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next')
    }

    game = new Game();
    game.init(doms);
    bindKeyEvent();

    timer = setInterval(move, INTERVAL);
  }

  // 导出API
  this.start = start;
}