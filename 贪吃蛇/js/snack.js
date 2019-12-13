(function () {  
  var position = 'absolute';
  var elements = [];
  function Snack(options){
    options = options || {};

    // 蛇节的大小
    this.width = options.width || 20;
    this.height = options.height || 20;

    // 蛇移动的方向
    this.direction = options.direction || 'right';
    // 蛇的身体，蛇节
    this.body = [
      { x: 3, y: 2, color:'red'},
      { x: 2, y: 2, color:'blue'},
      { x: 1, y: 2, color:'blue'},
    ];
  }

  Snack.prototype.render = function (map) {  
    // 删除之前创建的蛇
    remove();

    for (var i=0,len=this.body.length ; i<len;i++){
      var object = this.body[i];

      var div=document.createElement('div');
      map.appendChild(div);
      
      elements.push(div);

      var style=div.style;
      style.position = position;
      style.width = this.width + 'px';
      style.height = this.height + 'px';
      style.left = object.x * this.width + 'px';
      style.top = object.y * this.height + 'px';
      style.backgroundColor = object.color;
    }
  }

  function remove(){
    for(var i = elements.length-1 ; i >= 0 ;i--){
      elements[i].parentNode.removeChild(elements[i]);
      elements.splice(i,1);
    }
  }
  // 控制蛇移动
  Snack.prototype.move = function (food,map) {  
    // 控制蛇的身体移动（当前蛇节到上一个蛇节的位置）
    for (let index = this.body.length - 1; index > 0 ; index--) {
      this.body[index].x = this.body[index-1].x;
      this.body[index].y = this.body[index-1].y;
    }

    // 控制蛇的头移动
    // 判断蛇移动的方向
    var head = this.body[0];
    switch(this.direction){
      case 'right':
        head.x += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'top':
        head.y -= 1;
        break;
      case 'bottom':
        head.y += 1;
        break;
    }
    // 判断蛇头和食物是否接触
    var headX = head.x * this.width;
    var headY = head.y * this.height;
    if(headX == food.x&& headY== food.y){
      // 让蛇增加一节
      var  last = this.body[this.body.length-1];
      this.body.push({
        x:last.x,
        y:last.y,
        color:last.color
      })
      // 重新生成食物
      food.render(map);
    }
  }

  function snackadd(){
    var div=document.createElement('div');
    map.appendChild(div);
    elements.push(div);

    var style=div.style;
    style.position = position;
    style.width = this.width + 'px';
    style.height = this.height + 'px';
    style.left = object.x * this.width + 'px';
    style.top = object.y * this.height + 'px';
    style.backgroundColor = object.color;
  }

  window.Snack = Snack;
})();
