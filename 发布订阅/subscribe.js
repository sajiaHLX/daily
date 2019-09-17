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
            })
            !isExist?pond.push(fn):null;
        }
    }
    window.Subscribe=Subscribe;
}(window);
let subscribe=new Subscribe();
subscribe.add();
subscribe.remove();
subscribe.fire();