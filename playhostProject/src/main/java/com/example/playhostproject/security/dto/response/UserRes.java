package com.example.playhostproject.security.dto.response;

import lombok.*;


/**
 * packageName : com.example.simpledms.model.vo
 * fileName : User
 * author : kangtaegyung
 * date : 2023/07/29
 * description : UserRes
 * 요약 : 클라이언트로 서버 결과를 전송할 클래스(웹토큰 과 인증정보가 있음)
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/07/29         kangtaegyung          최초 생성
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserRes {

  private String accessToken;
  private Integer userId;
  private String name;
  private String tokenType = "Bearer";

  private String email;

//  private String name;

  private String role;  // 권한명

  public UserRes(String accessToken,int userId ,String name , String email, String role) {
    this.accessToken = accessToken;
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
