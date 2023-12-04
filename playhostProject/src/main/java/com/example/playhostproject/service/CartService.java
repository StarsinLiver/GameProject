package com.example.playhostproject.service;

import com.example.playhostproject.model.dto.CartDto;
import com.example.playhostproject.model.entity.Cart;
import com.example.playhostproject.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : CartService
 * author : GGG
 * date : 2023-11-15
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-15         GGG          최초 생성
 */
@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    /**
     * 저장(수정) 함수
     */
    public Cart save(Cart cart) {
        Cart cart2 = cartRepository.save(cart);
        return cart2;
    }

    /**
     * Todo :  Cart 아이디 값을 받아 옴
     *
     * @param pid
     * @param userId
     * @return
     */
    public int cartCid(int pid, int userId) {
        int cartCid = cartRepository.cartCid(pid, userId);
        return cartCid;
    }

    // 전체조회 + 페이징(조인) + DTO
    public Page<CartDto> selectByNameContaining(int userId , Pageable pageable) {
        Page<CartDto> page = cartRepository.selectByNameContaining(userId, pageable);
        return page;
    }


    // 조인 상세조회(1건 조회) 함수
    public Optional<CartDto> selectById(int cid) {
        Optional<CartDto> optionalCart = cartRepository.selectById(cid);
        return optionalCart;
    }

    // 삭제함수
    public boolean removeById(int cid) {
        if (cartRepository.existsById(cid)) {        // cid가 있으면
            cartRepository.deleteById(cid);         // 삭제진행
            return true;
        }
        return false;
    }

    /**
     * Todo : userId 로 CartDto 찾기
     */
    public Page<CartDto> selectByUserId(int userId, Pageable pageable) {
        Page<CartDto> page = cartRepository.selectByUserId(userId, pageable);
        return page;
    }

    @Transactional
    public boolean updateCompleteYnToY(int cid) {
        Optional<CartDto> cartDtoOptional = cartRepository.selectById(cid);

        if (cartDtoOptional.isPresent()) {
            cartRepository.updateCompleteStatusToY(cid);
            return true;
        }

        return false;
    }






}
