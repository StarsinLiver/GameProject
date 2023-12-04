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
 * fileName : Cart
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
@Table(name = "CART")
@SequenceGenerator(
        name = "SQ_CART_GENERATOR"
        , sequenceName = "SQ_CART"
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
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE CART SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE CID = ?")

public class Cart extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_CART_GENERATOR")
    private Integer cid;        // 기본키
    private Integer userId;     // 유저 참조키 (설정은 안해놓음)
    private String completeYn;     // 결제 완료
    private Integer pid;        // Product 참조키
}
