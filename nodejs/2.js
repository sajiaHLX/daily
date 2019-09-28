var js1=require('./1');
module.exports={
    avg(...arg){
        return js1.sum(...arg)/arg.length;
    }
};
