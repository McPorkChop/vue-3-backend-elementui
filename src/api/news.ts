import http from "../utils/http";

const request = (url: string, data: object) => {
  return http.request({
    method: "post",
    url: "/news/" + url,
    data
  });
};

export function list(
  category: number,
  start: string,
  end: string,
  title: string,
  id: number,
  pageNumber?: number,
  pageSize?: number
) {
  const data = {
    categoryId: category,
    startTime: start,
    endTime: end,
    title,
    id,
    pageNumber,
    pageSize
  };
  return request("getList", data);
}

export function add(category: number, title: string, content: string) {
  const data = {
    category,
    title,
    content
  };
  return request("add/", data);
}

export function edit(id:string,category:string,title:string,content:string,img:string){
  const data={
    id,
    categoryId:category,
    title,
    content,
    imgUrl:img
  }
  return request("editInfo/",data);
}

export function del(...ids:number[]){
  return request("deleteInfo/",{id:[...ids]})
};

export var category: any= {
  list(all:boolean=false){
    return request(`getCategory${all?"All":""}/`,{});
  },
  add(name:string,parent:number=0){
    let data={categoryName:name} as {categoryName:string,parentId?:number};
    if(parent>0)data.parentId=parent;
    return request(`add${parent>0?"Children":"First"}Category/`,{categoryName:name});
  }
  ,del(id:number){
    return request("deleteCategory/",{categoryId:id});
  },
  edit(id:number,name:string){
    return request("editCategory/",{id,categoryName:name});
  }
};;