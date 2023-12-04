package com.example.playhostproject.repository;

import com.example.playhostproject.model.dto.IsLikeDto;
import com.example.playhostproject.model.dto.ReviewDto;
import com.example.playhostproject.model.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : ReviewRepository
 * author : san26
 * date : 2023-11-13
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-13         san26          최초 생성
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    // todo : 버그때문에 리뷰테이블 전체조회는 dto 사용할것!!

    // 리뷰 전체 조회 (부모 + 댓글)
//    @Query(value = "SELECT RID AS rid " +
//            ", TITLE AS title " +
//            ", CONTENT AS content " +
//            ", WRITER AS writer " +
//            ", IS_LIKE AS isLike " +
//            ", Group_Id AS groupId " +
//            ", PARENT_ID AS parentId " +
//            ", PID AS pid " +
//            "FROM REVIEW " +
//            "WHERE PID = :pid " +
//            "AND   DELETE_YN = 'N' " +
//            "START WITH PARENT_ID = 0 " +
//            "CONNECT BY PRIOR RID = PARENT_ID " +
//            "ORDER SIBLINGS BY GROUPID DESC ", nativeQuery = true)
//    Page<ReviewDto> selectByParentAll(@Param("pid") int pid, Pageable pageable);

    // 리뷰 전체조회(부모글만)
    @Query(value = "SELECT RID AS rid " +
            ", TITLE AS title " +
            ", CONTENT AS content " +
            ", WRITER AS writer " +
            ", EMAIL AS email " +
            ", IS_LIKE AS isLike " +
            ", Group_Id AS groupId " +
            ", PARENT_ID AS parentId " +
            ", PID AS pid " +
            ", INSERT_TIME AS insertTime " +
            "FROM REVIEW " +
            "WHERE PID = :pid " +
            "AND   DELETE_YN = 'N' " +
            "AND PARENT_ID = 0 ", nativeQuery = true)
    Page<ReviewDto> selectByParentAll(@Param("pid") int pid, Pageable pageable);


    // 리뷰 부모ID를 받아 자식 전체 조회
    @Query(value = "SELECT RID AS rid " +
            ", TITLE AS title " +
            ", CONTENT AS content " +
            ", WRITER AS writer " +
            ", EMAIL AS email " +
            ", IS_LIKE AS isLike " +
            ", Group_Id AS groupId " +
            ", PARENT_ID AS parentId " +
            ", PID AS pid " +
            ", INSERT_TIME AS insertTime " +
            "FROM REVIEW " +
            "WHERE PID = :pid " +
            "AND   DELETE_YN = 'N' " +
            "AND PARENT_ID = :parentId ", nativeQuery = true)
    List<ReviewDto> selectByChildAll(@Param("pid") int pid, @Param("parentId") int parentId);


    // 리뷰 부모글 저장 함수
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO REVIEW " +
            "VALUES (SQ_REVIEW.NEXTVAL, :#{#reviewParent.title}, :#{#reviewParent.content}, :#{#reviewParent.email} , :#{#reviewParent.writer}, :#{#reviewParent.isLike}, SQ_REVIEW.CURRVAL,0, :#{#reviewParent.pid}, TO_CHAR(SYSDATE,'YYYY-MM-DD HH:MI:SS'), NULL, 'N', NULL)", nativeQuery = true)
    int insertByParent(@Param("reviewParent") Review reviewParent);


    // 리뷰(부모) 댓글 동시삭제
    @Transactional
    @Modifying
    @Query(value = "UPDATE REVIEW " +
            "SET DELETE_YN = 'Y', DELETE_TIME = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH:MI:SS') " +
            "WHERE GROUP_ID = :groupId ", nativeQuery = true)
    int removeAllByGroupId(@Param("groupId") int groupId);

    // todo : 추가   유저 이메일 조회
    @Query(value = "SELECT EMAIL FROM PROJECT_USER WHERE PROJECT_USER.USER_ID = :userId ", nativeQuery = true)
    String selectByEmail(@Param("userId") int userId);

    // 페이징 없는 리스트
    @Query(value = "SELECT RID AS rid " +
            ", TITLE AS title " +
            ", CONTENT AS content " +
            ", WRITER AS writer " +
            ", EMAIL AS email " +
            ", IS_LIKE AS isLike " +
            ", Group_Id AS groupId " +
            ", PARENT_ID AS parentId " +
            ", PID AS pid " +
            ", INSERT_TIME AS insertTime " +
            "FROM REVIEW " +
            "WHERE PID = :pid " +
            "AND   DELETE_YN = 'N' " +
            "AND PARENT_ID = 0 ", nativeQuery = true)
    List<ReviewDto> findByPid(int pid);

    ////    추가
    @Query(value = "SELECT " +
            "    P.PID, " +
            "    P.NAME AS name,   " +
            "            P.SHORT_DESCRIPTION AS shortDescription,   " +
            "            P.IMG_URL AS imgUrl,   " +
            "            P.PRICE AS price,   " +
            "            P.FINAL_PRICE AS finalPrice,   " +
            "            P.TAG AS tag,   " +
            "            P.DISCOUNT AS discount,   " +
            "            P.UUID AS uuid,   " +
            "            P.INSERT_TIME AS insertTime,  " +
            "    COUNT(CASE WHEN R.IS_LIKE = 1 THEN 1 END) AS likeCount, " +
            "    COUNT(CASE WHEN R.PARENT_ID = 0 THEN 1 END) AS reviewCount, " +
            "    CASE " +
            "        WHEN COUNT(CASE WHEN R.PARENT_ID = 0 THEN 1 END) <> 0 " +
            "        THEN COUNT(CASE WHEN R.IS_LIKE = 1 THEN 1 END) / COUNT(CASE WHEN R.PARENT_ID = 0 THEN 1 END) " +
            "        ELSE 0 " +
            "    END AS likeOrderBy " +
            "FROM " +
            "    PRODUCT P " +
            "LEFT JOIN " +
            "    REVIEW R ON P.PID = R.PID  AND (R.DELETE_YN = 'N' OR R.DELETE_YN IS NULL) " +
            "    WHERE    P.FINAL_PRICE >= :minPrice   " +
            "            AND P.FINAL_PRICE <= :maxPrice " +
            "            AND P.TAG LIKE '%' || :tag || '%'   " +
            "            AND P.NAME LIKE '%' || :name || '%'   " +
            "            AND P.DELETE_YN = 'N'   " +
            " " +
            "GROUP BY " +
            "    P.PID, P.NAME, P.SHORT_DESCRIPTION, P.IMG_URL, P.PRICE, P.FINAL_PRICE, P.TAG, P.DISCOUNT, P.UUID, P.INSERT_TIME  " +
            "ORDER BY " +
            "CASE WHEN :order IS NOT NULL AND :order = 'DESC' THEN likeOrderBy END DESC, " +
            "CASE WHEN :order IS NOT NULL AND :order = 'ASC' THEN likeOrderBy END ASC, " +
            "insertTime DESC",// Added condition for optional order parameter
            nativeQuery = true)
    Page<IsLikeDto> findByIsLike(@Param("tag") String tag, @Param("name") String name, @Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, Pageable pageable, @Param("order") String order);

}
