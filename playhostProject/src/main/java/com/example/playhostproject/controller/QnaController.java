package com.example.playhostproject.controller;

import com.example.playhostproject.model.entity.Library;
import com.example.playhostproject.model.entity.Qna;
import com.example.playhostproject.service.QnaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : QnaController
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
@RestController
@Slf4j
@RequestMapping("/api")
public class QnaController {

    @Autowired
    QnaService qnaService;


    /**
     * Todo : QNA 상세 조회
     */
    @GetMapping("/qna/{qid}")
    public ResponseEntity<Object> findById(@PathVariable int qid) {
        try {
            Optional<Qna> optionalQna = qnaService.findById(qid);
            if(optionalQna.isEmpty() == false) {
                return new ResponseEntity<>(optionalQna.get() , HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : Qna 전체 조회 + 페이징 처리
     */
    @GetMapping("/qna")
    public ResponseEntity<Object> findAllByQuestionContaining(@RequestParam(defaultValue = "") String question,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Qna> qnaPage
                    = qnaService.findAllByQuestionContaining(question, pageable);
//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("qna", qnaPage.getContent()); // 부서배열
            response.put("currentPage", qnaPage.getNumber()); // 현재페이지번호
            response.put("totalItems", qnaPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", qnaPage.getTotalPages()); // 총페이지수

            if (qnaPage.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
//                데이터 없음
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    Todo : - - - - - - - - - - - - - - - - - - 유저 Q & A
    /**
     * Todo : QNA 전체 조회
     *
     * @param userId
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/user/qna")
    public ResponseEntity<Object> findAllByUserIdAndQuestionContainingOrderByQidDesc(
            @RequestParam int userId,
            @RequestParam String question,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

//            유저의 qna 정보
            Page<Qna> qnaPage = qnaService.findAllByUserIdAndQuestionContainingOrderByQidDesc(userId,question, pageable);

//            리액트 전송 : 부서배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("qna", qnaPage.getContent());
            response.put("currentPage", qnaPage.getNumber());          // 현재페이지번호 전송
            response.put("totalItems", qnaPage.getTotalElements());    // 총 건수(개수) 전송
            response.put("totalPages", qnaPage.getTotalPages());       // 총 페이지수 전송

//            신호 보내기
            if (true) {
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
     * Todo : QNA  등록
     *
     * @param qna
     * @return
     */
    @PostMapping("/user/qna")
    public ResponseEntity<Object> save(@RequestBody Qna qna) {
        try {
            qnaService.save(qna);
            return new ResponseEntity<>("Q & A 가 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : QNA 상세 조회
     */
    @GetMapping("/user/qna/{qid}")
    public ResponseEntity<Object> userFindById(@PathVariable int qid) {
        try {
            Optional<Qna> optionalQna = qnaService.findById(qid);
            if(optionalQna.isEmpty() == false) {
                return new ResponseEntity<>(optionalQna.get() , HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : Q & A 수정
     */
    @PutMapping("/user/qna/{qid}")
    public ResponseEntity<Object> update(
            @PathVariable int qid,
            @RequestBody Qna qna
    ) {
        try {
            Qna qna1 = qnaService.save(qna);
            return new ResponseEntity<>("수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * TODO : 삭제하기
     */
    @DeleteMapping("/user/qna/deletion/{qid}")
    public ResponseEntity<Object> removeById(@PathVariable int qid) {
        try {
            boolean bSuccess = qnaService.removeById(qid);
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //    Todo : - - - - - - - - - - - - - - - - - - 어드민 Q & A
    /**
     * Todo : QNA 상세 조회
     */
    @GetMapping("/admin/qna/{qid}")
    public ResponseEntity<Object> adminFindById(@PathVariable int qid) {
        try {
            Optional<Qna> optionalQna = qnaService.findById(qid);
            if(optionalQna.isEmpty() == false) {
                return new ResponseEntity<>(optionalQna.get() , HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : Q & A 수정
     */
    @PutMapping("/admin/qna/{qid}")
    public ResponseEntity<Object> adminUpdate(
            @PathVariable int qid,
            @RequestBody Qna qna
    ) {
        try {
            Qna qna1 = qnaService.save(qna);
            return new ResponseEntity<>("수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * TODO : 삭제하기
     */
    @DeleteMapping("/admin/qna/deletion/{qid}")
    public ResponseEntity<Object> adminRemoveById(@PathVariable int qid) {
        try {
            boolean bSuccess = qnaService.removeById(qid);
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
