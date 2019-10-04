new Promise((resolve,reject)=>{
    //resolve,reject:是任意执行的，但是大家都约定成功执行resolve，失败执行reject
    //Excutor函数（执行函数）中可以不管控异步操作（但是不管控异步操作没啥意义）
    resolve();
}).then(result=>{
    //resolve执行的时候会触发第一个回调函数执行
    console.log(1);
},reason=>{
    //reject执行的时候会触发第二个回调函数执行
    console.log(2);
});
