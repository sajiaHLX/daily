import {request1} from './request'
export function getDetail(id){
  return request1({
    url:'/detail',
    params:{
      id
    }
  })
}
export class Goods{
  constructor(itemInfo){
    this.title=itemInfo.title
    this.collection=itemInfo.collection
  }
}