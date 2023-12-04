package com.example.playhostproject.service;

import com.example.playhostproject.model.entity.Qna;
import com.example.playhostproject.repository.QnaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : QnaService
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
public class QnaService {
    
    @Autowired
    QnaRepository qnaRepository;

    /**
     * Todo : Qna 저장 + 수정
     */
    public Qna save (Qna qna) {
        Qna qna1 = qnaRepository.save(qna);
        return qna1;
    }

    /**
     * Todo : Qna 전체 조회 + 페이징 처리
     */
    public Page<Qna> findAllByQuestionContaining(String question , Pageable pageable) {
        Page<Qna> page = qnaRepository.findAllByQuestionContaining(question,pageable);
        return page;
    }

    /**
     * Todo : Qna 전체 조회  (페이징 x)
     */
    public List<Qna> findAllByQuestionContainingNoPage(String question) {
        List<Qna> qnaList = qnaRepository.findAllByQuestionContaining(question);
        return qnaList;
    }

    /**
     * Todo : Qna 상세 조회
     */
    public Optional<Qna> findById (int qid) {
        Optional<Qna> optionalQna = qnaRepository.findById(qid);
        return optionalQna;
    }

    /**
     * Todo : Qna 삭제
     */
    public boolean removeById(int qid) {
        if(qnaRepository.existsById(qid)) {
            qnaRepository.deleteById(qid);
            return true;
        }
        return false;
    }

    /**
     * Todo : 유저 아이디 값으로 qna 찾기
     */
    public List<Qna> findAllByUserIdOrderByQidDesc(int userId) {
        List<Qna> qnaList = qnaRepository.findAllByUserIdOrderByQidDesc(userId);
        return qnaList;
    }

    /**
     * Todo : 유저 아이디 값을 qna 찾기 + 페이징 처리
     */
    public Page<Qna> findAllByUserIdAndQuestionContainingOrderByQidDesc(int userId ,String question , Pageable pageable) {
        Page<Qna> page = qnaRepository.findAllByUserIdAndQuestionContainingOrderByQidDesc(userId,question,pageable);
        return page;
    }
    


}
