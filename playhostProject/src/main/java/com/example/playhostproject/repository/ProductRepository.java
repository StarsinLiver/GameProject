package com.example.playhostproject.repository;

import com.example.playhostproject.model.dto.ProductDto;
import com.example.playhostproject.model.dto.ProductDto2;
import com.example.playhostproject.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : ProductRepository
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
public interface ProductRepository extends JpaRepository<Product , Integer> {

//    Todo : List
    List<Product> findAllByNameContaining(String name);
    List<Product> findAllByTagContaining(String tag);

//    Todo : 페이징
    Page<Product> findAllByNameContaining(String name , Pageable pageable);

    Page<Product> findAllByNameContainingAndTagContaining(String name ,String tag, Pageable pageable);

//    Todo : select Box 에 사용될 태그들
    @Query(value = "SELECT DISTINCT TAG FROM PRODUCT" , nativeQuery = true)
    List<String> findAllTag();

    /**
     * Todo : 썸네일 테이블과 연동한 전체 조회 : List 형식
     */
    @Query(value = "SELECT P.PID AS pid " +
            ", P.NAME AS name " +
            ", P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice " +
            ", P.TAG AS tag " +
            ", P.DISCOUNT AS discount " +
            ", P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", P.INSERT_TIME AS insertTime " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.TAG LIKE '%' || :tag || '%'" ,nativeQuery = true)
    List<ProductDto> selectAllByThumbNailJoin(@Param("tag") String tag);

//    todo : 페이징 형식도 만들자!
    @Query(value = "SELECT P.PID AS pid " +
            ", P.NAME AS name " +
            ", P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice " +
            ", P.TAG AS tag " +
            ", P.DISCOUNT AS discount " +
            ", P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", P.INSERT_TIME AS insertTime " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.TAG LIKE '%' || :tag || '%'"
            , countQuery = "SELECT COUNT(*) " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.TAG LIKE '%' || :tag || '%'", nativeQuery = true)
    Page<ProductDto> selectAllByThumbNailJoinByPaging(@Param("tag") String tag , Pageable pageable);

    //    todo : finalPrice 가 0원인 전체조회
    @Query(value = "SELECT P.PID AS pid " +
            ", P.NAME AS name " +
            ", P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice " +
            ", P.TAG AS tag " +
            ", P.DISCOUNT AS discount " +
            ", P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", P.INSERT_TIME AS insertTime " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.FINAL_PRICE = 0"
            , countQuery = "SELECT COUNT(*) " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.FINAL_PRICE = 0", nativeQuery = true)
    Page<ProductDto> selectAllByThumbNailJoinByPagingAndFinalPriceLikeZero(Pageable pageable);


    //    todo : 할인율(discount) == 0 % 인 전체조회
    @Query(value = "SELECT P.PID AS pid " +
            ", P.NAME AS name " +
            ", P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice " +
            ", P.TAG AS tag " +
            ", P.DISCOUNT AS discount " +
            ", P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", P.INSERT_TIME AS insertTime " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.DISCOUNT > 0"
            , countQuery = "SELECT COUNT(*) " +
            "FROM PRODUCT P " +
            "FULL JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.DELETE_YN = 'N' " +
            "AND P.DISCOUNT > 0", nativeQuery = true)
    Page<ProductDto> selectAllByThumbNailJoinByPagingAndDiscountNotLikeZero(Pageable pageable);


    // 좋아요 내림차순(DESC) 조회
    @Query(value = "SELECT P.PID AS pid" +
            ", P.NAME AS name" +
            " , P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice" +
            ", P.TAG AS tag " +
            ", P.INSERT_TIME AS insertTime " +
            ", P.DISCOUNT AS discount " +
            ",P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", COUNT(R.IS_LIKE) AS isLike " +
            "FROM PRODUCT P " +
            "LEFT JOIN REVIEW R " +
            "ON P.PID = R.PID " +
            "LEFT JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.NAME LIKE '%' || :name || '%' " +
            "AND P.FINAL_PRICE >= :firstPrice  " +
            "AND P.FINAL_PRICE <= :lastPrice " +
            "AND P.TAG LIKE '%' || :tag ||'%' " +
            "AND P.DELETE_YN = 'N' " +
            "GROUP BY P.PID " +
            ", P.NAME " +
            ", P.SHORT_DESCRIPTION " +
            ", P.IMG_URL " +
            ", P.PRICE " +
            ", P.FINAL_PRICE " +
            ", P.TAG " +
            ", P.INSERT_TIME " +
            ", P.DISCOUNT " +
            ", P.UUID " +
            ", T.FILE_URL " +
            "ORDER BY COUNT(R.IS_LIKE) DESC ",
            countQuery = "SELECT COUNT(*)" +
                    " FROM PRODUCT P  " +
                    " LEFT JOIN REVIEW R  " +
                    " ON P.PID = R.PID  " +
                    " LEFT JOIN THUMBNAIL T  " +
                    " ON P.UUID = T.UUID  " +
                    " WHERE P.NAME LIKE '%' || :name || '%'  " +
                    " AND P.FINAL_PRICE >= :firstPrice   " +
                    " AND P.FINAL_PRICE <= :lastPrice  " +
                    " AND P.TAG LIKE '%' || :tag ||'%'  " +
                    "AND P.DELETE_YN = 'N' " +
                    " GROUP BY P.PID  " +
                    " , P.NAME  " +
                    " , P.SHORT_DESCRIPTION  " +
                    " , P.IMG_URL  " +
                    " , P.PRICE  " +
                    " , P.FINAL_PRICE  " +
                    " , P.TAG  " +
                    " , P.INSERT_TIME  " +
                    " , P.DISCOUNT  " +
                    " , P.UUID  " +
                    " , T.FILE_URL  " +
                    " ORDER BY COUNT(R.IS_LIKE) DESC", nativeQuery = true)
    Page<ProductDto2> findProductsOrderByLikeCountDesc(@Param("name") String name ,@Param("tag") String tag, @Param("firstPrice") int firstPrice , @Param("lastPrice") int lastPrice,  Pageable pageable);


    // 좋아요 오름차순(ASC) 조회
    @Query(value = "SELECT P.PID AS pid" +
            ", P.NAME AS name" +
            " , P.SHORT_DESCRIPTION AS shortDescription " +
            ", P.IMG_URL AS imgUrl " +
            ", P.PRICE AS price " +
            ", P.FINAL_PRICE AS finalPrice" +
            ", P.TAG AS tag " +
            ", P.INSERT_TIME AS insertTime " +
            ", P.DISCOUNT AS discount " +
            ",P.UUID AS uuid " +
            ", T.FILE_URL AS fileUrl " +
            ", COUNT(R.IS_LIKE) AS isLike " +
            "FROM PRODUCT P " +
            "LEFT JOIN REVIEW R " +
            "ON P.PID = R.PID " +
            "LEFT JOIN THUMBNAIL T " +
            "ON P.UUID = T.UUID " +
            "WHERE P.NAME LIKE '%' || :name || '%' " +
            "AND P.FINAL_PRICE >= :firstPrice  " +
            "AND P.FINAL_PRICE <= :lastPrice " +
            "AND P.TAG LIKE '%' || :tag ||'%' " +
            "AND P.DELETE_YN = 'N' " +
            "GROUP BY P.PID " +
            ", P.NAME " +
            ", P.SHORT_DESCRIPTION " +
            ", P.IMG_URL " +
            ", P.PRICE " +
            ", P.FINAL_PRICE " +
            ", P.TAG " +
            ", P.INSERT_TIME " +
            ", P.DISCOUNT " +
            ", P.UUID " +
            ", T.FILE_URL " +
            "ORDER BY COUNT(R.IS_LIKE)  ",
            countQuery = "SELECT COUNT(*)" +
                    " FROM PRODUCT P  " +
                    " LEFT JOIN REVIEW R  " +
                    " ON P.PID = R.PID  " +
                    " LEFT JOIN THUMBNAIL T  " +
                    " ON P.UUID = T.UUID  " +
                    " WHERE P.NAME LIKE '%' || :name || '%'  " +
                    " AND P.FINAL_PRICE >= :firstPrice   " +
                    " AND P.FINAL_PRICE <= :lastPrice  " +
                    " AND P.TAG LIKE '%' || :tag ||'%'  " +
                    "AND P.DELETE_YN = 'N' " +
                    " GROUP BY P.PID  " +
                    " , P.NAME  " +
                    " , P.SHORT_DESCRIPTION  " +
                    " , P.IMG_URL  " +
                    " , P.PRICE  " +
                    " , P.FINAL_PRICE  " +
                    " , P.TAG  " +
                    " , P.INSERT_TIME  " +
                    " , P.DISCOUNT  " +
                    " , P.UUID  " +
                    " , T.FILE_URL  " +
                    " ORDER BY COUNT(R.IS_LIKE) ", nativeQuery = true)
    Page<ProductDto2> findProductsOrderByLikeCount(@Param("name") String name , @Param("tag") String tag, @Param("firstPrice") int firstPrice , @Param("lastPrice") int lastPrice, Pageable pageable);
}
