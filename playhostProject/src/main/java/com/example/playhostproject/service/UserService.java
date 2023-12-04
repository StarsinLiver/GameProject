package com.example.playhostproject.service;

import com.example.playhostproject.model.entity.user.User;
import com.example.playhostproject.repository.UserRepository;
import com.example.playhostproject.security.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : UserService
 * author : GGG
 * date : 2023-11-20
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-20         GGG          최초 생성
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    /**
     * Todo : 로그인 회원가입 등
     * @param userId
     * @return
     */
    public Optional<UserDto> selectByUserId(int userId) {
        Optional<UserDto> userDto = userRepository.selectByUserId(userId);
        return userDto;
    }

    /**
     * Todo : 포인트 업데이트
     */
    public boolean updateUserPoint(int userId , int finalPrice) {
        int point = userRepository.updateUserPoint(userId,finalPrice);
        if(point > 0) {
            return true;
        }
        return false;
    }

    /**
     * Todo : 포인트 업데이트
     */
    public boolean updateUserPointBuy(int userId , int point) {
        int point1 = userRepository.updateUserPointBuy(userId,point);
        if(point1 > 0) {
            return true;
        }
        return false;
    }



}
