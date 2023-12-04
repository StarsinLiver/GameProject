package com.example.playhostproject.controller;

import com.example.playhostproject.model.dto.LibraryDto;
import com.example.playhostproject.model.entity.Library;
import com.example.playhostproject.model.entity.Product;
import com.example.playhostproject.model.entity.Qna;
import com.example.playhostproject.security.dto.UserDto;
import com.example.playhostproject.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : AdminController
 * author : san26
 * date : 2023-11-15
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-15         san26          최초 생성
 */

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    ProductService productService;

    @Autowired
    LibraryService libraryService;

    @Autowired
    UserService userService;

    @Autowired
    QnaService qnaService;

    @Autowired
    ThumbNailService thumbNailService;

    /**
     * Todo : 어드민 계정 : 상품 등록
     *
     * @param product
     * @return
     */
    @PostMapping("/admin-controll-panel")
    public ResponseEntity<Object> save(@RequestBody Product product) {
        try {
            if (productService.existByPid(product.getPid())) {
                return new ResponseEntity<>("등록하신 상품이 이미 있습니다.", HttpStatus.BAD_REQUEST);
            }
            productService.save(product);
            return new ResponseEntity<>("상품이 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>("서버에러가 발생하였습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 어드민 계정 상품 상세 조회
     */
    @GetMapping("/admin-controll-panel/{pid}")
    public ResponseEntity<Object> findById(@PathVariable int pid) {
        try {
            Optional<Product> optionalProduct = productService.findById(pid);
            if (optionalProduct.isEmpty() == false) {
                return new ResponseEntity<>(optionalProduct.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 어드민 계정에서 상품조회
     */
    @GetMapping("/admin-controll-panel")
    public ResponseEntity<Object> adminFindAllBy(@RequestParam(defaultValue = "") String name,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size
    ) {
        try {
            System.out.println("받은 이름 : " + name);

            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage
                    = productService.findAllByNameContaining(name, pageable);
//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("product", productPage.getContent()); // 부서배열
            response.put("currentPage", productPage.getNumber()); // 현재페이지번호
            response.put("totalItems", productPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productPage.getTotalPages()); // 총페이지수

            if (productPage.isEmpty() == false) {
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

    /**
     * Todo : 어드민 계정 : 전체 조회 + name containing , tag containing
     */
    @GetMapping("/admin-controll-panel-tag")
    public ResponseEntity<Object> adminFindAllByNameContainingAndTagContaining(@RequestParam(defaultValue = "") String name,
                                                                               @RequestParam(defaultValue = "") String tag,
                                                                               @RequestParam(defaultValue = "0") int page,
                                                                               @RequestParam(defaultValue = "8") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage
                    = productService.findAllByNameContainingAndTagContaining(name, tag, pageable);

//            Todo : 태그들만 전송
            List<String> list = productService.findAllTag();
//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("product", productPage.getContent());  // 상품
            response.put("tag", list);                          // 태그
            response.put("currentPage", productPage.getNumber()); // 현재페이지번호
            response.put("totalItems", productPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productPage.getTotalPages()); // 총페이지수

            if (productPage.isEmpty() == false) {
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

    /**
     * Todo : 어드민 계정 : 상품 수정
     */
    @PutMapping("/admin-controll-panel/{pid}")
    public ResponseEntity<Object> adminUpdate(
            @PathVariable int pid,
            @RequestBody Product product
    ) {
        try {
            Product product1 = productService.save(product);
            return new ResponseEntity<>("수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 어드민 계정 : 상품 삭제
     */
    @DeleteMapping("/admin-controll-panel/deletion/{pid}")
    public ResponseEntity<Object> adminDelete(@PathVariable int pid) {
        try {
            boolean bSuccess = productService.removeById(pid);
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 상품 환불 요청이 'Y' , 환불 'N' 인것 들만 전체 조회
     */
    @GetMapping("/admin-controll-panel-library-N")

    public ResponseEntity<Object> adminFindAllByRefundN(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Library> libraryPage
                    = libraryService.selectAllByRequest(pageable);
//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("library", libraryPage.getContent()); // 부서배열
            response.put("currentPage", libraryPage.getNumber()); // 현재페이지번호
            response.put("totalItems", libraryPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", libraryPage.getTotalPages()); // 총페이지수

            if (libraryPage.isEmpty() == false) {
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

    /**
     * Todo : 환불 요청 상세조회
     */
    @GetMapping("/admin-controll-panel-library/{lid}")
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
     * Todo : 환불 처리
     */
    @PutMapping("/admin-controll-panel-library/{lid}")
    public ResponseEntity<Object> updateLibrary(@PathVariable int lid, @RequestBody Library library) {
        try {
            if (library.getRefund().equals("Y")) {
                library.setRefundTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                libraryService.save(library);
                boolean bSuccess = userService.updateUserPoint(library.getUserId(), library.getFinalPrice());
                if (bSuccess)
                    return new ResponseEntity<>("환불처리 완료되었습니다.", HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 어드민 창 : product 목록 , 환불 목록 , qna 목록 전체 조회
     */
    @GetMapping("/admin-console")
    public ResponseEntity<Object> adminConsole(
            @RequestParam int userId,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String tag,
            @RequestParam(defaultValue = "") String question,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);

//           Product 목록
            Page<Product> productPage
                    = productService.findAllByNameContainingAndTagContaining(name, tag, pageable);

//          환불 정보
            List<Library> libraryPageNoPage
                    = libraryService.selectAllByRequestNoPage();

//           qna 정보
            List<Qna> qnaList = qnaService.findAllByQuestionContainingNoPage(question);

//          어드민 정보
            Optional<UserDto> userDto = userService.selectByUserId(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("product", productPage.getContent());   // 상품 목록
            response.put("libraryNoPage", libraryPageNoPage);    // 환불 정보
            response.put("qnaList", qnaList);                       // qna 정보
            response.put("userDto", userDto.get());                 // 어드민 정보
            response.put("currentPage", productPage.getNumber());          // 현재페이지번호 전송
            response.put("totalItems", productPage.getTotalElements());    // 총 건수(개수) 전송
            response.put("totalPages", productPage.getTotalPages());       // 총 페이지수 전송
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

}
