package com.example.playhostproject.controller;

import com.example.playhostproject.model.entity.ThumbNail;
import com.example.playhostproject.service.ProductService;
import com.example.playhostproject.service.ThumbNailService;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : ThumbNailController
 * author : GGG
 * date : 2023-11-28
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-28         GGG          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api")
public class ThumbNailController {

    @Autowired
    ThumbNailService thumbNailService;

    @Autowired
    ProductService productService;

    /**
     * Todo : 저장 하기
     *
     * @param
     * @param
     * @param thumbNail
     * @return
     */
    @PostMapping("/admin/thumbNail/upload/{appid}")
    public ResponseEntity<Object> create(   // 객체로 받을수 없어서 각각 변수로 받아와야 함
                                            @PathVariable int appid ,
                                            @RequestParam MultipartFile thumbNail  // 첨부파일
    ) {
        try {
            if(productService.existByPid(appid)) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            ThumbNail thumbNail1 = thumbNailService.save(
                    null,               // 기본키
                    thumbNail              // 첨부파일
            );  // db 저장

            // Todo : uuid 보내기
            return new ResponseEntity<>(thumbNail1.getUuid(), HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Todo : 이미지 보내기
     *
     * @param uuid
     * @return
     */
    @GetMapping("/thumbNail/{uuid}")
    public ResponseEntity<byte[]> findByIdDownloading(@PathVariable String uuid) {
        ThumbNail thumbNail = thumbNailService.findById(uuid).get();         // 상세조회

        return ResponseEntity.ok()
//           Todo : header() : 헤더 (1)첨부파일로 전송한다고 표시, (2) 첨부파일명 표시
//                  HttpHeaders.CONTENT_DISPOSITION : 첨부파일 표시
//                  "attachment; filename=\"" + thumbNail.getFileName() + "\"" : 첨부파일명 표시
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + thumbNail.getFileName() + "\"")
//           TODO : body() : 바디 - 실제 이미지 전송(리액트)
                .body(thumbNail.getFileData());    // 첨부파일
    }

    /**
     * Todo :  상세조회
     */
    @GetMapping("/thumbNail/get/{uuid}")
    public ResponseEntity<Object> findById(@PathVariable String uuid) {
//    상세조회 실행
        try {
            Optional<ThumbNail> optionalThumbNail = thumbNailService.findById(uuid);

            if (optionalThumbNail.isPresent()) {
//                성공
                return new ResponseEntity<>(optionalThumbNail.get(), HttpStatus.OK);
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
    @PutMapping("/admin/thumbNail/{uuid}")
    public ResponseEntity<Object> create(   // 객체로 받을수 없어서 각각 변수로 받아와야 함
                                            @PathVariable String uuid,          // 기본키
                                            @RequestParam MultipartFile thumbNail  // 첨부파일
    ) {
        uuid = (uuid.equals("undefined")) ? null : uuid;
        try {
            ThumbNail thumbNail1 = thumbNailService.save(
                    uuid,               // 기본키
                    thumbNail           // 첨부파일
            );  // db 저장

            return new ResponseEntity<>(thumbNail1.getUuid(), HttpStatus.OK);
        } catch (Exception e) {
//            DB 에러가 났을경우 : INTERNAL_SERVER_ERROR 프론트엔드로 전송
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제함수
    @DeleteMapping("/admin/thumbNail/deletion/{uuid}")
    public ResponseEntity<Object> delete(@PathVariable String uuid) {
//        프론트엔드 쪽으로 상태정보를 보내줌
        try {
            boolean bSuccess = thumbNailService.removeById(uuid);

            if (bSuccess == true) {
//                delete 문이 성공했을 경우
                return new ResponseEntity<>(HttpStatus.OK);
            }
//            delete 실패했을 경우( 0건 삭제가 될경우 )
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
//            DB 에러가 날경우
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
