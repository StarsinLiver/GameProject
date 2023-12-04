package com.example.playhostproject.repository;

import com.example.playhostproject.model.entity.user.User;
import com.example.playhostproject.security.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : UserRepository
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
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Todo : 이메일로 유저정보 찾기
     * @param email
     * @return
     */
    Optional<User> findByEmail(String email);

    /**
     * Todo : 이메일로 유저 정보가 있는지 확인
     * @param email
     * @return
     */
    boolean existsByEmail(String email);

    /**
     * Todo : 이메일정보로 유저 패스워드 변경
     */
    @Query(value = "UPDATE PROJECT_USER SET PASSWORD = :password WHERE EMAIL = :email" , nativeQuery = true)
    @Transactional
    @Modifying
    int resetPassword(@Param("email") String email , @Param("password") String password);

    /**
     * TODO : userDto : 로그인시 유저 정보 기본키 , 이름 , 권한 넘기기
     */
    @Query(value = "SELECT USER_ID AS userId , NAME AS name , ROLE AS role , EMAIL AS email FROM PROJECT_USER " +
            "WHERE EMAIL = :email ", nativeQuery = true)
    Optional<UserDto> selectByEmail(@Param("email") String email);

    /**
     * Todo : 유저 정보 보기
     *
     * @param userId
     * @return
     */
    @Query(value = "SELECT USER_ID AS userId " +
            ", NAME AS name  " +
            ", EMAIL AS email " +
            ", PASSWORD AS password " +
            ", DESCRIPTION AS description " +
            ", INSERT_TIME AS insertTime " +
            ", ROLE AS role " +
            ", POINT AS point " +
            "FROM PROJECT_USER " +
            "WHERE USER_ID = :userId", nativeQuery = true)
    Optional<UserDto> selectByUserId(@Param("userId") int userId);

    /**
     * Todo : 환불 신청 -> 유저 포인트 업데이트
     */
    @Transactional
    @Modifying
    @Query(value = "UPDATE PROJECT_USER " +
            "SET POINT = POINT + :finalPrice " +
            "WHERE USER_ID = :userId", nativeQuery = true)
    int updateUserPoint(@Param("userId") int userId, @Param("finalPrice") int finalPrice);


    //    Todo: 구매시 포인트 업데이트
    @Transactional
    @Modifying
    @Query(value = "UPDATE PROJECT_USER " +
            "SET POINT = :point " +
            "WHERE USER_ID = :userId", nativeQuery = true)
    int updateUserPointBuy(@Param("userId") int userId, @Param("point") int point);
}
