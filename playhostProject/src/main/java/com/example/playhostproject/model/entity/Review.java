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
 * fileName : Review
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
@Table(name = "REVIEW")
@SequenceGenerator(
        name = "SQ_REVIEW_GENERATOR"
        , sequenceName = "SQ_REVIEW"
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
@SQLDelete(sql = "UPDATE REVIEW SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE RID = ?")

public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_REVIEW_GENERATOR")
    private Integer rid;        // 기본키
    private String title;       // 제목
    private String content;     // 컨텐츠
    private String email;       // todo : 추가 이메일
    private String writer;      // 작성자
    private String isLike;      // 좋아요
    private Integer groupId;    // 자식 ID
    private Integer parentId;   // 부모 ID
    private Integer pid;        // Product 참조키
}
