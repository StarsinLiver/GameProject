package com.example.playhostproject.model.entity.user;

import com.example.playhostproject.model.entity.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * packageName : com.example.loginproject.model.exam03
 * fileName : User
 * author : GGG
 * date : 2023-10-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-17         GGG          최초 생성
 */
@Entity
@Getter
@Table(name = "PROJECT_USER")
@SequenceGenerator(
        name = "SQ_PROJECT_USER_GENERATOR"
        , sequenceName = "SQ_PROJECT_USER"
        , initialValue = 1
        , allocationSize = 1
)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Builder
@DynamicInsert
@DynamicUpdate
// soft delete
@Where(clause = "DELETE_YN = 'N'")
@SQLDelete(sql = "UPDATE PROJECT_USER SET DELETE_YN = 'Y', DELETE_TIME=TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') WHERE USER_ID = ?")

public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SQ_PROJECT_USER_GENERATOR")
    @Column(name = "USER_ID")
    private Integer userId;
    @Column(name = "NAME")
    private String name;
    @Column(name = "EMAIL")
    private String email; // Principal
    @Column(name = "PASSWORD")
    private String password; // Credential
    private String description;
    @Column(name = "ROLE")
    private String role;
    @Column(name = "POINT")
    private Integer point;
}
