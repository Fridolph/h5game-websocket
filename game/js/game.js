var Game = function () {
  var gameDiv; // dom元素
  var nextDiv; // 游戏矩阵  
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var cur; // 当前方块  
  var next; // 下一个方块  
  var nextDivs = []; // divs
  var gameDivs = [];

  // 初始化Div
  var initDiv = function (container, data, divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i * 20) + 'px';
        newNode.style.left = (j * 20) + 'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }

  // 刷新div
  var refreshDiv = function (data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] === 0) {
          divs[i][j].className = 'none';
        } else if (data[i][j] === 1) {
          divs[i][j].className = 'done';
        } else if (data[i][j] === 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }

  // 检测点是否合法
  var check = function (pos, x, y) {
    if (pos.x + x < 0) {
      return false
    } else if (pos.x + x >= gameData.length) {
      return false
    } else if (pos.y + y < 0) {
      return false
    } else if (pos.y + y >= gameData[0].length) {
      return false
    } else if (gameData[pos.x + x][pos.y + x] === 1) {
      return false
    } else {
      return true
    }
  }

  // 设置数据
  var setData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
        }
      }
    }
  }

  // 清除数据
  var clearData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }

  // 检测数据是否合法
  var isValid = function(pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] !== 0) {
          if (!check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // 旋转
  var rotate = function() {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }

  // 下移
  var down = function() {
    if (cur.canDown(isValid)) {
      clearData();
      cur.down();
      setData();
      refreshDiv(gameData, gameDivs);
      
      return true;
    } else {
      return false;
    }
  }
  // 左移
  var left = function() {
    if (cur.canLeft(isValid)) {
      clearData();
      cur.left();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  // 右移
  var right = function() {
    if (cur.canRight(isValid)) {
      clearData();
      cur.right();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }

  // 方块移动到底部后，给它固定
  var fixed = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] === 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }

    refreshDiv(gameData, gameDivs);
  }

  // 使用下一个方块
  var performNext = function(type, dir) {
    cur = next;
    setData();
    next = SquareFactory.prototype.make(type, dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }

  // 初始化
  var init = function (doms) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    cur = SquareFactory.prototype.make(2, 2);
    next = SquareFactory.prototype.make(3, 3);
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);

    cur.origin.x = 5;
    cur.origin.y = 5;

    setData();

    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }

  // 导出API
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function() {
    while (down()) {}
  }
  this.fixed = fixed;
  this.performNext = performNext;
}