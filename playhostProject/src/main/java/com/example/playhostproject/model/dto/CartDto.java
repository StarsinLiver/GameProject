package com.example.playhostproject.model.dto;

public interface CartDto {
    public Integer getCid();            // 장바구니 번호
    public Integer getPid();
    public Integer getUserId();

    public String getName();            // 상품 이름
    public String getImgUrl();          // 상품이미지
    public Integer getPrice();          // 상품 가격
    public Integer getFinalPrice();          // 상품

    public Integer getDiscount();      // 할인율

}
