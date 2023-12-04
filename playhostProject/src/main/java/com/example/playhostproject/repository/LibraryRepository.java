package com.example.playhostproject.repository;

import com.example.playhostproject.model.dto.LibraryDto;
import com.example.playhostproject.model.entity.Library;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : LibraryRepository
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
public interface LibraryRepository extends JpaRepository<Library , Integer> {

    /**
     * Todo : 상품 환불 요청이 'Y' , 환불이 안된것 들만 전체 조회 + 페이징 처리
     * @param pageable
     * @return
     */
    @Query(value = "SELECT * FROM LIBRARY L " +
            "WHERE REQUEST_REFUND = 'Y' " +
            "AND REFUND = 'N'" ,countQuery =  "SELECT COUNT(*) FROM LIBRARY " +
            "WHERE REQUEST_REFUND = 'Y' " +
            "AND REFUND = 'N'"
             , nativeQuery = true)
    Page<Library> selectAllByRequest(Pageable pageable);

    /**
     * Todo : 상품 환불 요청이 'Y' , 환불이 안된것 들만 전체 조회 (페이징 처리 없음)
     * @param
     * @return
     */
    @Query(value = "SELECT * FROM LIBRARY L " +
            "WHERE REQUEST_REFUND = 'Y' " +
            "AND REFUND = 'N'" , nativeQuery = true)
     List<Library> selectAllByRequest();


    /**
     * Todo : 환불 상세 조회
     */
    @Query(value = "SELECT L.LID AS lid " +
            ", L.REQUEST_REFUND AS requestRefund " +
            ", L.INSERT_TIME AS insertTime " +
            ", L.FINAL_PRICE AS finalPrice " +
            ", L.REFUND_REASON AS refundReason " +
            ", L.REFUND AS refund " +
            ", L.REFUND_TIME AS refundTime " +
            ", P.PID AS pid " +
            ", P.NAME AS pname " +
            ", P.PRICE AS price " +
            ", P.TAG AS tag " +
            ", P.DISCOUNT AS discount " +
            ", U.USER_ID AS userId " +
            ", U.NAME AS uname " +
            ", U.EMAIL AS email " +
            "FROM LIBRARY L , PRODUCT P , PROJECT_USER U " +
            "WHERE  L.PID = P.PID " +
            "AND L.USER_ID = U.USER_ID " +
            "AND L.LID = :lid" ,nativeQuery = true)
    Optional<LibraryDto> adminSelectLibraryByLid(@Param("lid") int lid);

    /**
     * Todo : 유저 아이디 값으로 전체 조회
     */
    @Query(value = "SELECT L.LID AS lid " +
            ", L.REQUEST_REFUND AS requestRefund " +
            ", L.INSERT_TIME AS insertTime " +
            ", L.FINAL_PRICE AS finalPrice " +
            ", L.REFUND_REASON AS refundReason " +
            ", L.REFUND AS refund " +
            ", L.REFUND_TIME AS refundTime " +
            ", P.PID AS pid " +
            ", P.NAME AS pname " +
            ", P.PRICE AS price " +
            ", P.TAG AS tag " +
            ", P.IMG_URL AS imgUrl " +
            ", P.DISCOUNT AS discount " +
            "FROM LIBRARY L , PRODUCT P " +
            "WHERE L.PID = P.PID " +
            "AND L.REFUND = 'N' " +
            "AND USER_ID = :userId"
            , countQuery = "SELECT COUNT(*) " +
            "FROM LIBRARY L , PRODUCT P " +
            "WHERE L.PID = P.PID " +
            "AND L.REFUND = 'N' " +
            "AND USER_ID = :userId" ,  nativeQuery = true)
    Page<LibraryDto> selectAllByUserId(@Param("userId") int userId , Pageable pageable);

    /**
     * Todo : 유저 아이디 값으로 전체 조회
     */
    @Query(value = "SELECT L.LID AS lid " +
            ", L.REQUEST_REFUND AS requestRefund " +
            ", L.INSERT_TIME AS insertTime " +
            ", L.FINAL_PRICE AS finalPrice " +
            ", L.REFUND_REASON AS refundReason " +
            ", L.REFUND AS refund " +
            ", L.REFUND_TIME AS refundTime " +
            ", P.PID AS pid " +
            ", P.NAME AS pname " +
            ", P.PRICE AS price " +
            ", P.TAG AS tag " +
            ", P.IMG_URL AS imgUrl " +
            ", P.DISCOUNT AS discount " +
            "FROM LIBRARY L , PRODUCT P " +
            "WHERE L.PID = P.PID " +
//            "AND ROWNUM <= 4" +
            "AND USER_ID = :userId " +
            "ORDER BY L.INSERT_TIME DESC" , nativeQuery = true)
    List<LibraryDto> selectAllByUserIdNoPage(@Param("userId") int userId);

    // todo : 상세페이지 사용 상세조회 시작시 유저의 라이브러리에 게임이 있는지 확인함
    @Query(value = "SELECT PID FROM LIBRARY " +
            "WHERE PID = :pid AND USER_ID = :userId AND REFUND = 'N' ", nativeQuery = true)
    public int bSuccess(@Param("pid") int pid,@Param("userId") int userId);


}
