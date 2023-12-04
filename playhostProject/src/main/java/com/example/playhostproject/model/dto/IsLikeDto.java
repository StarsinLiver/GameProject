package com.example.playhostproject.model.dto;

import java.math.BigDecimal;

/**
 * packageName : com.example.playhostproject.model.dto
 * fileName : IsLikeDto
 * author : GGG
 * date : 2023-11-30
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-30         GGG          최초 생성
 */
public interface IsLikeDto {

    //    P.PID , P.NAME , P.SHORT_DESCRIPTION , P.IMG_URL , P.PRICE , P.FINAL_PRICE , P.TAG , P.DISCOUNT , P.UUID
    public Integer getPid();

    public String getName();

    public String getShortDescription();

    public String getImgUrl();

    public BigDecimal getPrice();

    public BigDecimal getFinalPrice();

    public String getTag();

    public BigDecimal getDiscount();

    public String getUuid();

    public Long getLikeCount();
    public Long getReviewCount();

}
