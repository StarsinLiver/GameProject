package com.example.playhostproject.service;

import com.example.playhostproject.model.dto.IsLikeDto;
import com.example.playhostproject.model.dto.ReviewDto;
import com.example.playhostproject.model.entity.Review;
import com.example.playhostproject.repository.ReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : ReviewService
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
@Service
@Slf4j
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    // 리뷰 전체(부모) 조회
    public Page<ReviewDto> selectByParentAll(int pid, Pageable pageable) {
        Page<ReviewDto> reviewDtoPage = reviewRepository.selectByParentAll(pid, pageable);
        return reviewDtoPage;
    }

    // 댓글 전체 조회
    public List<ReviewDto> selectByChildAll(int pid, int parentId) {
        List<ReviewDto> reviewDtoPage = reviewRepository.selectByChildAll(pid, parentId);
        return reviewDtoPage;
    }

    // 댓글 저장
    public Review saveChild(Review review) {
        Review review2 = reviewRepository.save(review);
        return review2;
    }

    // 리뷰(부모) 저장
    public int insertByParent(Review review) {
        int inserCount = reviewRepository.insertByParent(review);
        return inserCount;
    }

    // 상제 조회
    public Optional<Review> findById(int rid) {
        System.out.println("서비스 들어옴");
        Optional<Review> optionalReview = reviewRepository.findById(rid);
        System.out.println("서비스 성공함");
        return optionalReview;
    }

    // 댓글만 삭제 함수
    public boolean removeById(int rid) {
        if (reviewRepository.existsById(rid)) {
            reviewRepository.deleteById(rid);
            return true;
        }
        return false;
    }

    // 리뷰 댓글 동시 삭제
    public boolean removeAllByGroupId(int groupId) {
        System.out.println("서비스 내부진입");
        int deleteCount = reviewRepository.removeAllByGroupId(groupId);
        System.out.println("조회끝");
        if (deleteCount > 0) {
            System.out.println(deleteCount);
            System.out.println("서비스 성공함");
            return true;
        } else {
            System.out.println("서비스 실패함");
            return false;
        }
    }

    //    todo : 추가
//    유저 이메일 조회
    public String seletByEmail(int userId) {
        System.out.println("이베일 서비스 ");
        String Email = reviewRepository.selectByEmail(userId);
        System.out.println("이베일 서비스 나올준비");
        return Email;
    }

    //    따봉이
    public List<ReviewDto> findByPid(int pid) {
        List<ReviewDto> list = reviewRepository.findByPid(pid);
        return list;
    }

    // todo : 추가 외부에서 islike보기

    // todo : 추가 외부에서 islike보기

    public Page<IsLikeDto> findByIsLike(String tag, String name, int minPrice,int maxPrice, Pageable pageable,String order) {
        Page<IsLikeDto> page = reviewRepository.findByIsLike(tag, name, minPrice,maxPrice , pageable, order);
        System.out.println("이즈");
        return page;
    }
}
