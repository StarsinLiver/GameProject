
export default interface IProductDto2 {
    pid? : any | null ,
    name : string | null ,
    shortDescription : string | null ,
    imgUrl : string  , // 헤더 이미지
    price : number | null , // 원래 가격
    finalPrice : number , // 상정된 가격
    tag : string ,
    discount : number ,
    uuid : string  | null ,
    insertTime : string ,
    fileUrl : string,    // 사용자 지정 이미지
    isLike : number
  }
  