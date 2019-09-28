let fs=require('fs');
fs.copyFile('./1.js','./less/11.js',(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('ok');
});