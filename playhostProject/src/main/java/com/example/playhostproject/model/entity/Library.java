package com.example.playhostproject.model.entity;

import lombok.*;
import org.hibernate.annotations.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * packageName : com.example.playhostproject.model.entity
 * fileName : Library
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
@Table(name = "LIBRARY")
@SequenceGenerator(
        name = "SQ_LIBRARY_GENERATOR"
        , sequenceName = "SQ_LIBRARY"
        , initialValue = 1
        , allocationSize = 1
)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "REFUND = 'N'")         // Refund 가 N 인 것들만 find
@EntityListeners(AuditingEntityListener.class)
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_LIBRARY_GENERATOR")
    private Integer lid;
    private Integer userId;         // 유저 참조키 (참조키 설정은 안해놓음)
    private Integer pid;            // Product 참조키
    private Integer finalPrice;            // Product 참조키
    private String insertTime;      // 구매날짜
    private String requestRefund;   // 환불 요청 Y,N      -- default 값 'N'
    private String refundReason;    // 환불 사유
    private String refund;          // 환불 Y , N         -- default 'N'
    private String refundTime;      // 환불된 시간        -- @Query 문으로 update

    @PrePersist
        //해당 엔티티 저장하기 전
    void onPrePersist() {
        this.insertTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

}
