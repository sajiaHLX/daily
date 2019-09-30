let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
let {
    readFile
} = require('./utils/fsPromise'),
    mime = require('mime');
let port = 8686;
let handle = function handle(req, res) {
    let {
        method,
        headers: requestHeaders
    } = req, {
        pathname,
        query
    } = url.parse(req.url, true),
        pathReg = /\.([a-z0-9]+)$/i;

    //静态资源文件处理
    if (pathReg.test(pathname)) {
        readFile(`./static${pathname}`).then(result => {
            //读取成功:根据请求资源文件的类型
            let suffix = pathReg.exec(pathname)[1]
            res.writeHead(200, {
                'content-type': `${mime.getType(suffix)};charset=utf-8;`
            });
            res.end(result);
        }).catch(error => {
            //读取失败：最可能是客户端读取失败（也就是客户端请求的地址是错误的，我们应该响应的内容是404）
            res.writeHead(404, {
                'Content-type': 'text.plain;charset=utf-8;'
            });
            res.end('NOT FOUND!');
        });
        return;
        // readFile('./static/index.html')
    }

    //API接口请求处理


};
http.createServer(handle).listen(port, () => {
    console.log(`server is success，listen on ${port}!`);
});