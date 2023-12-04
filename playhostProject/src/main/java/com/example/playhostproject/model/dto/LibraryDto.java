package com.example.playhostproject.model.dto;

/**
 * packageName : com.example.playhostproject.model.dto
 * fileName : LibraryDto
 * author : san26
 * date : 2023-11-18
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-18         san26          최초 생성
 */

public interface LibraryDto {

    public Integer getLid();
    public String getRequestRefund();
    public Integer getFinalPrice();
    public String getInsertTime();
    public String getRefundReason();
    public String getRefund();
    public String getRefundTime();
    public Integer getPid();
    public String getPname();
    public Integer getPrice();
    public String getTag();
    public String getImgUrl();
    public Integer getDiscount();
    public Integer getUserId();
    public String getUname();
    public String getEmail();
}
