package com.example.playhostproject.model.entity;

import com.example.playhostproject.model.entity.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.playhostproject.model.entity
 * fileName : Product
 * author : san26
 * date : 2023-11-12
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-12         san26          최초 생성
 */
@Entity
@Getter
@Table(name = "PRODUCT")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE PRODUCT SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE PID = ?")
public class Product extends BaseTimeEntity {
    @Id
    private Integer pid;      // 기본키
    private String name;      // 제품 이름
    private String shortDescription;      // 짧은 설명
    private String imgUrl;    // 제품 이미지(전체조회) URL
    private Integer price;    // 제품 가격
    private Integer finalPrice;
    private String tag;       // 제품 태그
    private Integer discount; // 제품 할인율
    private String uuid;        // 썸네일 테이블 참조
}
