package com.example.playhostproject.security.dto;

/**
 * packageName : com.example.demo.model.dto
 * fileName : UserDto
 * author : GGG
 * date : 2023-11-09
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-09         GGG          최초 생성
 */
public interface UserDto {
    Integer getUserId();
    String getName();
    String getEmail();
    String getPassword();
    String getRole();
    String getDescription();
    String getInsertTime();
    Integer getPoint();

}
