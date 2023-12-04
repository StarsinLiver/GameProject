package com.example.playhostproject.model.dto;

/**
 * packageName : com.example.playhostproject.model.dto
 * fileName : ReviewDto
 * author : GGG
 * date : 2023-11-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-17         GGG          최초 생성
 */
public interface ReviewDto {

    public Integer getRid();        // 기본키
    public String getTitle();       // 제목
    public String getContent();     // 컨텐츠
    public String getEmail();     // 이메일
    public String getWriter();      // 작성자
    public String getIsLike();      // 좋아요
    public Integer getGroupId();    // 자식 ID
    public Integer getparentId();   // 부모 ID
    public String getInsertTime(); // todo : 추가 작성시간
    public Integer getPid();        // Product 참조키
}
