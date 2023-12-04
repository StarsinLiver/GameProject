// IThumbNail.ts : 인터페이스

export default interface IThumbNail {
    uuid?: any | null,          // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileUrl: string,             // 파일다운로드 URL
}