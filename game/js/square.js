var Square = function() {
  // 方块数据
  this.data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  // 原点
  this.origin = {
    x: 0,
    y: 0
  }
  // 方向
  this.dir = 0;  
}

// 判断是否可以旋转
Square.prototype.canRotate = function(isValid) {
  var d = (this.dir + 1) % 4;
  
  var test = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  
  for (var i = 0; i < this.data.length; i++) {
    for (var j = 0; j < this.data[0].length; j++) {
      test[i][j] = this.rotates[d][i][j];
    }
  }
  
  return isValid(this.origin, test);
}

// 方块的旋转方法
Square.prototype.rotate = function(num) {
  if (!num) num = 1;
  this.dir = (this.dir + num) % 4;

  for (var i = 0; i < this.data.length; i++) {
    for (var j = 0; j < this.data[0].length; j++) {
      this.data[i][j] = this.rotates[this.dir][i][j];
    }
  }
}

// 判断是否可以下降
Square.prototype.canDown = function(isValid) {
  var test = {}
  test.x = this.origin.x + 1;
  test.y = this.origin.y;
  return isValid(test, this.data);
}

// 方块的下降方法
Square.prototype.down = function() {
  this.origin.x += 1;
}

// 判断是否可以左移
Square.prototype.canLeft = function(isValid) {
  var test = {}
  test.x = this.origin.x;
  test.y = this.origin.y - 1;
  return isValid(test, this.data);
}

// 方块的左移方法
Square.prototype.left = function() {
  this.origin.y -= 1;
}

// 判断是否可以右移
Square.prototype.canRight = function(isValid) {
  var test = {}
  test.x = this.origin.x;
  test.y = this.origin.y + 1;
  return isValid(test, this.data);
}

// 方块的右移方法
Square.prototype.right = function() {
  this.origin.y += 1;
}