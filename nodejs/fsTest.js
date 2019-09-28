let fsPromise=require('./utils/fsPromise');
fsPromise.readFile('less/2.css').then(result=>{
    console.log(result);
});