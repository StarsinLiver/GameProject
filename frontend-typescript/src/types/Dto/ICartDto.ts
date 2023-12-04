// ISimpleCart.ts : 인터페이스
// 상품(SimpleProduct) + 장바구니(SimpleCart) : 조인 타입
export default interface ICartDto {
    cid?: any | null,   // 장바구니 번호
    pid: number,
    userId: number,
    name?: string,
    imgUrl: string,
    price: number,
    finalPrice : number,
    discount: number
  }
  