import {request1} from "./request"
export function get(){
  return request1({
    url:'/data',
    params:{
      id:1
    }
  })
}