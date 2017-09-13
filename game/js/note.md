结构调整

   script.js
   ↑       ↑ 
local.js remote.js
   ↑       ↑
    game.js
       ↑
    square.js
     ↑     ↑
square1.js  ... square7.js      ←   squareFactory.js


|-- local.js 本地游戏逻辑
|-- remote.js 对方游戏逻辑
|-- game.js 俄罗斯方块核心逻辑
|-- square.js 单个方块逻辑的公共部分
|-- squareFacotry.js 工厂类，生成方块