package com.example.playhostproject.service;

import com.example.playhostproject.model.dto.LibraryDto;
import com.example.playhostproject.model.entity.Library;
import com.example.playhostproject.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : LibraryService
 * author : san26
 * date : 2023-11-18
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-18         san26          최초 생성
 */
@Service
public class LibraryService {

    @Autowired
    LibraryRepository libraryRepository;

    /**
     * Todo : 환불 처리
     */
    public Library save(Library library) {
        Library library1 = libraryRepository.save(library);
        return library1;
    }

    /**
     * Todo : 환불 요청이 Y , 환불이 안된 상품들만 전체 조회 + 페이징 처리
     *
     * @param pageable
     * @return
     */
    public Page<Library> selectAllByRequest(Pageable pageable) {
        Page<Library> page = libraryRepository.selectAllByRequest(pageable);
        return page;
    }

    /**
     * Todo : 환불 요청이 Y , 환불이 안된 상품들만 전체 조회 (페이징 없음)
     *
     * @param
     * @return
     */
    public List<Library> selectAllByRequestNoPage() {
        List<Library> page = libraryRepository.selectAllByRequest();
        return page;
    }

    /**
     * Todo : 환불 요청 상세조회
     */
    public Optional<LibraryDto> adminSelectLibraryByLid(int lid) {
        Optional<LibraryDto> optionalLibraryDto = libraryRepository.adminSelectLibraryByLid(lid);
        return optionalLibraryDto;
    }

    /**
     * Todo : 유저 아이디 값으로 product 찾기 + 페이징 처리
     */
    public Page<LibraryDto> selectAllByUserId(int userId , Pageable pageable) {
        Page<LibraryDto> libraryDtos = libraryRepository.selectAllByUserId(userId , pageable);
        return libraryDtos;
    }

    /**
     * Todo : 유저 아이디 값으로 product 찾기
     */
    public List<LibraryDto> selectAllByUserIdNoPage(int userId) {
        List<LibraryDto> libraryDtos = libraryRepository.selectAllByUserIdNoPage(userId);
        return libraryDtos;
    }

    // todo : 상세페이지 사용 게임의 보유 유무 확인
    public boolean bSuccess(int pid, int userId) {
        int bSuccess = libraryRepository.bSuccess(pid, userId);
        if (bSuccess == pid) {
            return true;
        }
        return false;
    }

}
