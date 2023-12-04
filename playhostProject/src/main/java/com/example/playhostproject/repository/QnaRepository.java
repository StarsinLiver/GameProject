package com.example.playhostproject.repository;

import com.example.playhostproject.model.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : QnaRepository
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
public interface QnaRepository extends JpaRepository<Qna , Integer> {

    /**
     * Todo : 전체 조회 + 페이징 처리
     * @param Question
     * @param pageable
     * @return
     */
    Page<Qna> findAllByQuestionContaining(String Question , Pageable pageable);
    List<Qna> findAllByQuestionContaining(String Question);

    List<Qna> findAllByUserIdOrderByQidDesc(int userId);

    Page<Qna> findAllByUserIdAndQuestionContainingOrderByQidDesc(int userId ,String question , Pageable pageable);
}
