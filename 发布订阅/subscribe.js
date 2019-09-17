//=>JQ
// let $plan = $.Callbacks();
//     $plan.add(function(x,y){});
//     $plan.remove(function () {  });
//     $plan.fire(10,20)//调动你发布的事件执行并且给每一个你发布的事件传递10和20两参数


~function anonymous(window){
    class Subscribe{
        constructor(){
            //创建一个容器
            //每一个实例都有一个自己独有的容器，管理自己需要执行的方法即可
            this.pond=[];
        }

        //向计划表（pond池子）中增加方法，去重
        //FN:就是我们需要增加的方法
        add(fn){
            let pond=this.pond;
            let isExist=false;
            pond.forEach(item => {
                item===fn?isExist=true:null;
            });
            !isExist?pond.push(fn):null;
        }

        //从计划表（pond池子）中移除方法
        remove(fn){
            let pond=this.pond;
            pond.forEach((item,index)=>{
                if(item===fn){
                    pond[index]=null;
                }
            });
        }

        //通知计划表中的方法依次执行,如果传递了参数，把这些参数依次赋值给执行的每一个方法
        fire(...arg){
            let pond=this.pond;
            for (var i = 0; i < pond.length; i++) {
                let item =pond[i];
                if(item===null){
                    pond.slice(i,1);
                    i--;
                    continue;
                }
                item(...arg);
            }
        }
    }
    window.Subscribe=Subscribe;
}(window);
/* let subscribe=new Subscribe();
let fn1=function fn1(x,y){
    console.log(1,x,y);
}
let fn2=function fn2(x,y){
    console.log(2);
}
let fn3=function fn3(x,y){
    console.log(3);
}
let fn4=function fn4(x,y){
    console.log(4);
}
subscribe.add(fn1);
subscribe.add(fn2);
subscribe.add(fn2);
subscribe.add(fn3);
subscribe.add(fn3);
subscribe.add(fn4);

setTimeout(()=>{
    subscribe.fire(100,200);
},2000); */