import {request1} from "./request"
export function getHome(){
  return request1({
    url:'/data',
    params:{
      id:1
    }
  })
}
export function getHomeGoods(){
  return request1({
    url:'/data',
    params:{
      id:1
    }
  })
}
