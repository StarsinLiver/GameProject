package com.example.playhostproject.model.entity;

import com.example.playhostproject.model.entity.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * packageName : com.example.simpledms.model.entity.advenced
 * fileName : FileDb
 * author : GGG
 * date : 2023-11-10
 * description : 첨부파일 엔티티
 * 요약 :
 *          1) 시컨스 안씀 - UUID 사용 (전 세계 유일한 값)
 *          2) 저장될 첨부파일명 -> UUID 명으로 저장
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-10         GGG          최초 생성
 */
@Entity
@Table(name="NEWS")
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
@SQLDelete(sql = "UPDATE NEWS SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE UUID = ?")
public class FileDb extends BaseTimeEntity {

    // 속성 === TB_FILE_DB 테이블 컬럼명(일치)
    @Id
    private String uuid;        // 기본키

    private String fileTitle;

    private String fileContent;

    private String fileName;

    @Lob
    private byte[] fileData;    // 첨부파일(이진파일) -> DB에 BLOB 형태로 저장됨

    private String fileUrl;     // 파일 다운로드 url
}
