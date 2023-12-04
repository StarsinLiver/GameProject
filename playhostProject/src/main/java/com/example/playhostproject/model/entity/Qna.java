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
 * fileName : Qna
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
@Table(name = "QNA")
@SequenceGenerator(
        name = "SQ_QNA_GENERATOR"
        , sequenceName = "SQ_QNA"
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
@SQLDelete(sql = "UPDATE QNA SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE QID = ?")

public class Qna extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_QNA_GENERATOR")
    private Integer qid;
    private Integer userId;         // 참조키
    private String questioner;      //질문자의 이름
    private String question;        //질문
    private String answerer;        // 답변자
    private String answer;          // 답변
    private String answerYn;        // 답변 yes or no
}
