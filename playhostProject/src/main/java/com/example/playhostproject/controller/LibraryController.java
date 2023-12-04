package com.example.playhostproject.controller;

import com.example.playhostproject.model.dto.LibraryDto;
import com.example.playhostproject.model.entity.Library;
import com.example.playhostproject.model.entity.Qna;
import com.example.playhostproject.security.dto.UserDto;
import com.example.playhostproject.service.LibraryService;
import com.example.playhostproject.service.QnaService;
import com.example.playhostproject.service.ReviewService;
import com.example.playhostproject.service.UserService;
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
 * fileName : LibraryController
 * author : GGG
 * date : 2023-11-21
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-21         GGG          최초 생성
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class LibraryController {
    @Autowired
    LibraryService libraryService;

    @Autowired
    UserService userService;

    @Autowired
    ReviewService reviewService;

    @Autowired
    QnaService qnaService;

    // 전체조회 + name like 검색
    @GetMapping("/user/library")
    public ResponseEntity<Object> librarySelectByNameContaining(
            @RequestParam int userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

//            유저의 게임 정보
            Page<LibraryDto> libraryDtos = libraryService.selectAllByUserId(userId, pageable);

//            유저의 게임 정보 , 환불 정보 등
            List<LibraryDto> libraryDtosNoPage = libraryService.selectAllByUserIdNoPage(userId);

//            유저의 qna 정보
            List<Qna> qnaList = qnaService.findAllByUserIdOrderByQidDesc(userId);

//            유저 정보
            Optional<UserDto> userDto = userService.selectByUserId(userId);

//            리액트 전송 : 부서배열, 페이징 정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("libraryDto", libraryDtos.getContent());
            response.put("libraryDtoNoPage", libraryDtosNoPage);
            response.put("qnaList", qnaList);
            response.put("userDto", userDto.get());
            response.put("currentPage", libraryDtos.getNumber());          // 현재페이지번호 전송
            response.put("totalItems", libraryDtos.getTotalElements());    // 총 건수(개수) 전송
            response.put("totalPages", libraryDtos.getTotalPages());       // 총 페이지수 전송

//            신호 보내기
            if (response.isEmpty() == false) {
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

    @GetMapping("/user/library/{pid}/{userId}")
    public ResponseEntity<Object> bSuccess(@PathVariable int pid, @PathVariable int userId) {
        try {
            boolean bSuccess = libraryService.bSuccess(pid, userId);
            if (bSuccess == true) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else if (bSuccess == false) {
                return new ResponseEntity<>(false, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    todo : 상세페이지에서 라이브러리에 바로 추가하기
    @PostMapping("/user/library")
    public ResponseEntity<Object> create(@RequestBody Library library) {
        try {
            Library library2 = libraryService.save(library);
            return new ResponseEntity<>(library2, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 환불 상세 조회 페이지
     */
    @GetMapping("/user/library/{lid}")
    public ResponseEntity<Object> adminSelectLibraryByLid(@PathVariable int lid) {
        try {
            Optional<LibraryDto> optionalLibraryDto = libraryService.adminSelectLibraryByLid(lid);
            if (optionalLibraryDto.isEmpty() == false) {
                return new ResponseEntity<>(optionalLibraryDto.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 환불 요청 처리
     */
    @PutMapping("/user/library/{lid}")
    public ResponseEntity<Object> updateLibrary(@PathVariable int lid, @RequestBody Library library) {
        try {
            libraryService.save(library);
            return new ResponseEntity<>("환불 요청이 완료 되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
