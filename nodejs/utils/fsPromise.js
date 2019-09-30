let fs = require('fs'),
    path = require('path');

//存储的是当前模块执行所在的绝对路径（!=__dirname）
let dirname = path.resolve();

//mkdir && rmdir && readdir && readfile && copyfile && unlink
['mkdir', 'rmdir', 'readdir', 'readFile','copyFile','unlink'].forEach(item => {
    exports[item] = function (pathname,copypath='') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            if(item==='readFile'){
                //非图片或者音视频等富媒体资源设置utf-8
                if(!/(JPG|JPEG|PNG|GIF|SVG|ICO|BMP|EOT|TTF|WOFF|MP3|MP4|OGG|WAV|M4A|WMV|AVI)$/i.test(pathname)){
                    arg.unshift('utf-8');
                }
                
            }
            // item==='readFile'?arg.unshift('utf-8'):null;
            item==='copyFile'?arg.unshift(copypath):null;
            fs[item](pathname,...arg);
        });
    };
});

//write && append
['writeFile', 'appendFile'].forEach(item => {
    exports[item] = function (pathname,content) {
        pathname = path.resolve(dirname, pathname);
        if(typeof content !=='string'){
            //写入的字符串必须是字符串才可以
            content=JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname,content,'utf8',(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});




