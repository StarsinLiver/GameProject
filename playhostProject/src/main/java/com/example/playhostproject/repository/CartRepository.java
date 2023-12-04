package com.example.playhostproject.repository;

import com.example.playhostproject.model.dto.CartDto;
import com.example.playhostproject.model.entity.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : CartRepository
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
public interface CartRepository extends JpaRepository<Cart , Integer> {

    @Query(value = "SELECT CID FROM CART " +
            "WHERE PID = :pid AND USER_ID = :userId AND DELETE_YN = 'N'" ,nativeQuery = true)
    int cartCid(@Param("pid") int pid, @Param("userId") int userId);

    // like 검색 : 상품테이블(PRODUCT) 조인
    @Query(value = "SELECT CT.CID AS cid " +
            ", CT.USER_ID AS userId" +
            ", PD.PID AS pid" +
            ", PD.NAME    AS name " +
            ", PD.IMG_URL AS imgUrl " +
            ", PD.PRICE  AS price " +
            ", PD.FINAL_PRICE AS finalPrice " +
            ", PD.DISCOUNT AS discount " +
            ", CT.COMPLETE_YN AS completeYn " +
            "FROM CART CT " +
            ",PRODUCT PD " +
            "WHERE CT.PID = PD.PID " +
            "AND CT.DELETE_YN = 'N' " +
            "AND CT.COMPLETE_YN = 'N' " +
            "AND CT.USER_ID = :userId"
            , countQuery = "SELECT count(*) " +
            "FROM CART CT " +
            ",PRODUCT PD " +
            "WHERE CT.PID = PD.PID " +
            "AND CT.USER_ID = :userId " +
            "AND CT.DELETE_YN = 'N' " +
            "AND CT.COMPLETE_YN = 'N'", nativeQuery = true)
    Page<CartDto> selectByNameContaining(@Param("userId") int userId , Pageable pageable);


    // 상품 + 장바구니(조인) 상세조회 : 페이징 없음(객체)
    @Query(value = "SELECT CT.CID AS cid " +
            ", PD.NAME AS name " +
            ", PD.IMG_URL AS imgUrl " +
            ", PD.PRICE AS price " +
            ", PD.DISCOUNT AS discount " +
            ", CT.COMPLETE_YN AS completeYn " +
            "FROM CART CT " +
            ", PRODUCT PD " +
            "WHERE CT.PID = PD.PID " +
            "AND CT.CID = :cid " +
            "AND CT.DELETE_YN = 'N'", nativeQuery = true)
    Optional<CartDto> selectById(@Param("cid") int cid);

    /**
     * Todo : userId 로 CartDto 찾기
     */
    @Query(value = "SELECT C.CID AS cid , P.NAME AS name, P.IMG_URL AS imgUrl, P.PRICE AS price, P.DISCOUNT AS discount FROM CART C " +
            "JOIN PRODUCT P " +
            "ON P.PID = C.PID " +
            "WHERE C.USER_ID = :userId" , countQuery = "SELECT COUNT(*) FROM CART C " +
            "JOIN PRODUCT P " +
            "ON P.PID = C.PID " +
            "WHERE C.USER_ID = :userId" ,nativeQuery = true)
    Page<CartDto> selectByUserId(@Param("userId") int userId , Pageable pageable);

    /**
     * CompleteYn 업데이트?
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE CART SET COMPLETE_YN = 'Y' , UPDATE_TIME = TO_CHAR(SYSDATE,'YYYY-MM-DD HH24:MI:SS') , DELETE_YN = 'Y' , DELETE_TIME = TO_CHAR(SYSDATE,'YYYY-MM-DD HH24:MI:SS')  WHERE CID = :cid", nativeQuery = true)
    void updateCompleteStatusToY(@Param("cid") int cid);


}
