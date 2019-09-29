let http =require('http'),
    url = require('url'),
    path=require('path'),
    fs=require('fs');
let port=8686;
let handle=function handle(req,res){
    //req：request请求对象，包含了客户端请求的信息
    //req.url存储的是
    //req.method 客户端请求的方式
    //res:reponse 响应对象，包含了一些属性和方法，可以让服务器端返回内容
    let {url,method}=req;
    console.log(url,method);
};
http.createServer(handle).listen(port,()=>{
    console.log(`server is success，listen on ${port}!`);
});