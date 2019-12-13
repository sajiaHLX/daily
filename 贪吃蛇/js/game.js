(function () {  
  var that;
  function Game(map){
    this.food = new Food();
    this.snack = new Snack();
    this.map = map;
    that=this;
  }
  Game.prototype.start = function () {  
    this.food.render(this.map);
    this.snack.render(this.map);

    // 让蛇移动起来
    runSnack();
    // 通过键盘控制蛇的移动
    bindKey();
    // 蛇遇到食物
    // 蛇碰到边界游戏结束

  }
  function bindKey(){
    document.addEventListener('keydown',function(e){
      switch(e.keyCode){
        case 37:
          if(that.snack.direction=='right'){
          }else{
            that.snack.direction = 'left';
          }
          break;
        case 38:
          if(that.snack.direction=='bottom'){
          }else{
            that.snack.direction = 'top';
          }
          break;
        case 39:
          if(that.snack.direction=='left'){
          }else{
            that.snack.direction = 'right';
          }
          break;
        case 40:
          if(that.snack.direction=='top'){
          }else{
            that.snack.direction = 'bottom';
          }
          break;
      }
    },false)
  }
  function runSnack(){
    var timerId = setInterval(() => {
      that.snack.move(that.food,that.map);
      that.snack.render(that.map);

      var maxX = that.map.offsetWidth / that.snack.width;
      var maxY = that.map.offsetHeight / that.snack.height;
      var headX = that.snack.body[0].x;
      var headY = that.snack.body[0].y;
      if(headX<0 || headX>maxX-1){
        alert('Game Over!');
        clearInterval(timerId);
      }

      if(headY<0 || headY>maxY-1){
        alert('Game Over!');
        clearInterval(timerId);
      }
    }, 250);

  }  
  window.Game = Game;
})();

