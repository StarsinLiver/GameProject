package com.example.playhostproject.controller;

import com.example.playhostproject.model.dto.IsLikeDto;
import com.example.playhostproject.model.dto.ReviewDto;
import com.example.playhostproject.model.entity.Review;
import com.example.playhostproject.service.ProductService;
import com.example.playhostproject.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : ReviewController
 * author : GGG
 * date : 2023-11-17
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-17         GGG          최초 생성
 */
@Slf4j
@RequestMapping("/api")
@RestController
public class ReviewController {
    @Autowired
    ReviewService reviewService;
    @Autowired
    ProductService productService;

    // 리뷰 전체(부모 조회
    @GetMapping("/review/parent")
    public ResponseEntity<Object> selectByParentAll(@RequestParam int pid,
                                                    @RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "6") int size) {
        try {

            Pageable pageable = PageRequest.of(page, size);

            Page<ReviewDto> reviewDtoPage = reviewService.selectByParentAll(pid, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("reviewList", reviewDtoPage.getContent()); // 배열
            response.put("currentPage", reviewDtoPage.getNumber()); // 현재페이지번호
            response.put("totalItems", reviewDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", reviewDtoPage.getTotalPages()); // 총페이지수

            if (reviewDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // 댓글 전체(부모id받음) 조회
    @GetMapping("/review/child")
    public ResponseEntity<Object> selectByChildAll(@RequestParam int pid,
                                                   @RequestParam int parentId) {
        try {

            List<ReviewDto> reviewDtoPage = reviewService.selectByChildAll(pid, parentId);


            if (reviewDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(reviewDtoPage, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // 상세 조회
    @GetMapping("/review/{rid}")
    public ResponseEntity<Object> findById(@PathVariable int rid) {
        try {
            Optional<Review> optionalReview = reviewService.findById(rid);
            if (optionalReview.isEmpty() == false) {
                return new ResponseEntity<>(optionalReview.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    Todo : - - - - - - - - - - - - - - - - - - 유저 Review

    // 댓글 저장
    @PostMapping("/user/review-child")
    public ResponseEntity<Object> createChild(@RequestBody Review review) {
        try {
            Review review2 = reviewService.saveChild(review);
            return new ResponseEntity<>(review2, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰(부모) 저장
    @PostMapping("/user/review-parent")
    public ResponseEntity<Object> createParent(@RequestBody Review review) {
        try {
            int insertCount = reviewService.insertByParent(review);
            return new ResponseEntity<>(insertCount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 수정 (2개 다ㅏㅏㅏㅏㅏㅏㅏ)
    @PutMapping("/user/review/{pid}")
    public ResponseEntity<Object> update(@PathVariable int pid, @RequestBody Review review) {
        try {
            Review review1 = reviewService.saveChild(review);
            return new ResponseEntity<>(review1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 답변만 삭제
    @DeleteMapping("/user/reply/deletion/{rid}")
    public ResponseEntity<Object> delete(@PathVariable int rid) {
        try {
            boolean bSuccess = reviewService.removeById(rid);
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시물 + 답변 2개이상 삭제
    @DeleteMapping("/user/review/deletion/parent/{groupId}")
    public ResponseEntity<Object> deleteParent(@PathVariable int groupId) {
        try {
            boolean bSuccess = reviewService.removeAllByGroupId(groupId);
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    따봉이
    @GetMapping("/review/no-page/{pid}")
    public ResponseEntity<Object> findByPid(@PathVariable int pid) {
        try {
            List<ReviewDto> list = reviewService.findByPid(pid);
            if (list != null) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // todo : 추가 유저 이메일 받아오기
    @PostMapping("/review/email/{userId}")
    public ResponseEntity<Object> selectByEmail(@PathVariable int userId) {
        try {
            String email = reviewService.seletByEmail(userId);
            return new ResponseEntity<>(email, HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/review/isLike")
    public ResponseEntity<Object> findByIsLike(@RequestParam(defaultValue = "") String tag, @RequestParam(defaultValue = "") String name, @RequestParam(defaultValue = "0") int minPrice , @RequestParam(defaultValue = "999999") int maxPrice , @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size, @RequestParam(defaultValue = "DESC") String order ){
        try {

            Pageable pageable = PageRequest.of(page, size);

            Page<IsLikeDto> isLikeDtoPage = reviewService.findByIsLike(tag,name,minPrice,maxPrice,pageable, order);
            List<String> tagList = productService.findAllTag();
            Map<String, Object> response = new HashMap<>();
            response.put("IsLikeProduct", isLikeDtoPage.getContent()); // 배열
            response.put("currentPage", isLikeDtoPage.getNumber()); // 현재페이지번호
            response.put("tagList", tagList); // 부서배열
            response.put("totalItems", isLikeDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", isLikeDtoPage.getTotalPages()); // 총페이지수
            if (isLikeDtoPage.isEmpty() == false) {
                return new ResponseEntity<>(response,HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}