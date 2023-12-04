// IFileDb.ts : 인터페이스

export default interface INews {
    uuid?: any | null,          // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileTitle: string,          // 제목
    fileContent: string,        // 내용
    fileUrl: string,             // 파일다운로드 URL
    insertTime: string,
    updateTime: string
}