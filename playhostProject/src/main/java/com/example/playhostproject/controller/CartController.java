package com.example.playhostproject.controller;

import com.example.playhostproject.model.dto.CartDto;
import com.example.playhostproject.model.entity.Cart;
import com.example.playhostproject.model.entity.Library;
import com.example.playhostproject.security.dto.UserDto;
import com.example.playhostproject.service.CartService;
import com.example.playhostproject.service.LibraryService;
import com.example.playhostproject.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : CartController
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
@RestController
@Slf4j
@RequestMapping("/api/user")
public class CartController {
    @Autowired
    CartService cartService;

    @Autowired
    UserService userService;

    @Autowired
    LibraryService libraryService;


    // 전체조회
    @GetMapping("/cart")
    public ResponseEntity<Object> selectByCartContaining(
            @RequestParam int userId ,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
//            페이지 변수 저장 (page:현재페이지 번호, size: 한 페이지당 개수)
//            함수 매개변수 : Pageable(위의 값을 넣기)
//            사용법 : Pageable pageable = PageRequest.of(현재페이지번호, 한페이지당개수);
            Pageable pageable = PageRequest.of(page, size);

//            전체조회(dname="") + like 검색(dname="S")
            Page<CartDto> cartDtoPage
                    = cartService.selectByNameContaining(userId , pageable);

            Optional<UserDto> userDto = userService.selectByUserId(userId);

            int priceSum = 0;
            for(CartDto cartDto : cartDtoPage) {
                priceSum += cartDto.getFinalPrice();
            }

//            리액트 전송 : 부서배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("cart", cartDtoPage.getContent());                // Cart 배열 전송
            response.put("userDto", userDto.get());                // Cart 배열 전송
            response.put("priceSum", priceSum);                // Cart 배열 전송
            response.put("currentPage", cartDtoPage.getNumber());          // 현재페이지번호 전송
            response.put("totalItems", cartDtoPage.getTotalElements());    // 총 건수(개수) 전송
            response.put("totalPages", cartDtoPage.getTotalPages());       // 총 페이지수 전송

//            신호 보내기
            if (cartDtoPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }


        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    저장함수
    @PostMapping("/cart")
    public ResponseEntity<Object> create(@RequestBody Cart cart) {

        try {
            Cart cart2 = cartService
                    .save(cart);

            return new ResponseEntity<>(cart2, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세조회
    @GetMapping("/cart/{cid}")
    public ResponseEntity<Object> selectById(@PathVariable int cid) {
//    상세조회 실행
        try {
            Optional<CartDto> optionalCartDto = cartService.selectById(cid);

            if (optionalCartDto.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalCartDto.get(), HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            서버 에러
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 수정함수
    @PutMapping("/cart/{cid}")
    public ResponseEntity<Object> update(@RequestBody Cart cart, @PathVariable int cid) {
        try {
            Cart cart2 = cartService.save(cart);
            return new ResponseEntity<>(cart2, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cart 삭제
    @DeleteMapping("/cart/delete/{pid}/{userId}")
    public ResponseEntity<Object> delete(@PathVariable int pid, @PathVariable int userId) {
        try {
            int cid = cartService.cartCid(pid, userId);
            boolean bSuccess = cartService.removeById(cid);

            if (bSuccess == true) {
                return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
            }

            return new ResponseEntity<>("대상이 없습니다, 다시 확인해 주세요", HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Cart 삭제
    @DeleteMapping("/cart/deletion/{cid}")
    public ResponseEntity<Object> delete(@PathVariable int cid) {
        try {

            boolean bSuccess = cartService.removeById(cid);

            if (bSuccess == true) {
                return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
            }

            return new ResponseEntity<>("대상이 없습니다, 다시 확인해 주세요", HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //   todo : 시작시 장바구니 조회(추가한거 상세페이지 사용함)
    @GetMapping("/cart/cid/{pid}/{userId}")
    public ResponseEntity<Object> getCid(@PathVariable int pid, @PathVariable int userId) {
        try {
            int cid = 0;
            cid = cartService.cartCid(pid, userId);
            if (cid > 0) {
                return new ResponseEntity<>(cid, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(0, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // todo : 결제시 completeYn을 Y로 수정하는 수정함수
    @PutMapping("/cart/updateCompleteYn/{cid}")
    public ResponseEntity<Object> updateCompleteYn(@PathVariable int cid) {
        try {
            boolean updated = cartService.updateCompleteYnToY(cid);

            if (updated) {
                return new ResponseEntity<>("completeYn updated to 'Y' for Cart ID: " + cid, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Cart not found for ID: " + cid, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Todo : - - - - - - - - - - - - - - - - - - - - - - -  유저 CART
    /**
     * Todo : 유저 id 로 CartDto 찾기
     * @param userId
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/cart/userId")
    public ResponseEntity<Object> selectByUserId(
            @RequestParam(defaultValue = "") int userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
//            페이지 변수 저장 (page:현재페이지 번호, size: 한 페이지당 개수)
//            함수 매개변수 : Pageable(위의 값을 넣기)
//            사용법 : Pageable pageable = PageRequest.of(현재페이지번호, 한페이지당개수);
            Pageable pageable = PageRequest.of(page, size);

//            전체조회(dname="") + like 검색(dname="S")
            Page<CartDto> cartDtoPage
                    = cartService.selectByUserId(userId, pageable);

//            리액트 전송 : 부서배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("cart", cartDtoPage.getContent());                // Cart 배열 전송
            response.put("currentPage", cartDtoPage.getNumber());          // 현재페이지번호 전송
            response.put("totalItems", cartDtoPage.getTotalElements());    // 총 건수(개수) 전송
            response.put("totalPages", cartDtoPage.getTotalPages());       // 총 페이지수 전송

//            신호 보내기
            if (cartDtoPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }


        } catch (Exception e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Todo : 유저 라이브러리 업데이트
     * @param library
     * @return
     */
    @PostMapping("/cart-library-update")
    public ResponseEntity<Object> updateAllCart(@RequestBody Library library) {
        try {
            System.out.println("왔니");
            Library library1 = libraryService.save(library);

            return new ResponseEntity<>(library1, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
