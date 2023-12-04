package com.example.playhostproject.service;

import com.example.playhostproject.model.entity.FileDb;
import com.example.playhostproject.model.entity.ThumbNail;
import com.example.playhostproject.model.entity.ThumbNail;
import com.example.playhostproject.repository.ThumbNailRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;
import java.util.UUID;

/**
 * packageName : com.example.playhostproject.service
 * fileName : ThumbNailService
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
@Service
@Slf4j
public class ThumbNailService {

    @Autowired
    ThumbNailRepository thumbNailRepository;


    //    전체조회
    public Page<ThumbNail> findAll(Pageable pageable) {
        Page<ThumbNail> page = thumbNailRepository.findAll(pageable);
        return page;

    }


    // 상세 조회(1건 조회) 함수
    public Optional<ThumbNail> findById(String uuid) {
        Optional<ThumbNail> optionalFileDb = thumbNailRepository.findById(uuid);
        return optionalFileDb;
    }

    // 삭제함수
    public boolean removeById(String uuid) {
        if(thumbNailRepository.existsById(uuid)) {    // uuid 있는지 확인
            thumbNailRepository.deleteById(uuid); // 삭제 진행
            return true;
        }
        return false;
    }



    // todo : 저장(수정) 함수(업로드)
    public ThumbNail save(String uuid,
                          MultipartFile file   // 첨부파일 객체 (MultipartFile)
    )  {
        ThumbNail thumbNail2 = null;
        try {
            // 기본키 : uuid
            if(uuid == null) {
                // 저장 실행
                // 1) DB에 이미지 저장
                // 2) DB에 이미지를 다운로드 할 수 있는 url 저장 (다운로드 URL 만들기 필요)
                // 3) 파일명(중복이 안되는) : uuid(기본키) 사용(유일값)

                // TODO : 1) uuid 만들기
                String tmpUuid = UUID.randomUUID()              // UUID 랜덤 생성함수
                        .toString()                             // 문자열 변환
                        .replace("-", "");      // -를 빈문자열로 변환(편의상)

                // TODO : 2) 다운로드 url 만들기
                String fileDownloadUri = ServletUriComponentsBuilder
                        .fromCurrentContextPath()               // 기본 경로 : localhost:8000
                        .path("/api/thumbNail/")          // 추가 경로 : 기본경로 + /api/thumbNail/
                        .path(tmpUuid)                          // 기본경로 + 추가경로 + uuid 붙임
                        .toUriString();                         // 문자열 변환
                // 최종 url 예 : localhost:8000/api/thumbNail/xxxxiiiii

                // TODO : 3) 위의 정보를 ThumbNail 객체에 저장 후 DB save 함수 실행
                ThumbNail thumbNail = new ThumbNail(
                        tmpUuid,                        // UUID
                        file.getOriginalFilename(),     // 실제 이미지 파일명 (예)course.jpg)
                        file.getBytes(),                // 이미지 파일 크기   (100byte...)
                        fileDownloadUri);               // 다운로드 url
                thumbNail2 = thumbNailRepository.save(thumbNail);

            } else {
                // 수정 실행

                // TODO : 2) 다운로드 url 만들기
                String fileDownloadUri = ServletUriComponentsBuilder
                        .fromCurrentContextPath()               // 기본 경로 : localhost:8000
                        .path("/api/thumbNail/")          // 추가 경로 : 기본경로 + /api/thumbNail/
                        .path(uuid)                             // 기본경로 + 추가경로 + 기존 uuid 붙임
                        .toUriString();                         // 문자열 변환
                // 최종 url 예 : localhost:8000/api/thumbNail/xxxxiiiii

                // TODO : 3) 위의 정보를 ThumbNail 객체에 저장 후 DB save 함수 실행
                ThumbNail thumbNail = new ThumbNail(
                        uuid,                           // 기존 UUID
                        file.getOriginalFilename(),     // 실제 이미지 파일명 (예)course.jpg)
                        file.getBytes(),                // 이미지 파일 크기   (100byte...)
                        fileDownloadUri);               // 다운로드 url
                thumbNail2 = thumbNailRepository.save(thumbNail);

            }

        } catch (Exception e) {
            log.debug(e.getMessage());
        }
        return thumbNail2;
    }

}
