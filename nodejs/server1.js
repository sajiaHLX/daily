let express=require('express'),
    app=express(),
    port=8686;

//创建服务和监听端口两件事都处理了,并且有请求过来执行的是app这个方法
app.listen(port,()=>{
    console.log(`sever is success,listen on ${port}!`);
});

//静态资源文件处理
app.use(express.static('./static'));

//API处理
app.get('/getUser',(req,res)=>{
    res.send({
        message:'ok'
    });
});
