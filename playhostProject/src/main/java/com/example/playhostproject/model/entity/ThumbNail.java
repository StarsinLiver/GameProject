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
 * fileName : ThumbNail
 * author : GGG
 * date : 2023-11-28
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-28         GGG          최초 생성
 */

@Entity
@Table(name="THUMBNAIL")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE THUMBNAIL SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE UUID = ?")
public class ThumbNail extends BaseTimeEntity {

    // 속성 ===  테이블 컬럼명(일치)
    @Id
    private String uuid;        // 기본키

    private String fileName;

    @Lob
    private byte[] fileData;    // 첨부파일(이진파일) -> DB에 BLOB 형태로 저장됨

    private String fileUrl;     // 파일 다운로드 url
}
