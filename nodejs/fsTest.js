let fsPromise=require('./utils/fsPromise');
let {readFile,unlink,copyFile,readdir,writeFile}=fsPromise;

//合并并且压缩css
//先把所有的css文件读取出来
readdir('less').then((result)=>{
    return result.filter(item=> /\.css$/i.test(item));
}).then(result=>{
    let arg=[];
    result.forEach(item=>{
        arg.push(readFile(`less/${item}`));
    });
    return Promise.all(arg);
}).then(result=>{
    //result：一个数组，存放所有文件读取的内容
    result=result.join('');
    return result=result.replace(/( |\n|\r)/g,'');
}).then(result=>{
    return writeFile('less/build.min.css',result);
}).then(()=>{
    console.log('创建成功');
});