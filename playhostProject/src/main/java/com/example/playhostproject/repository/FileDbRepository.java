package com.example.playhostproject.repository;


import com.example.playhostproject.model.entity.FileDb;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.repository.advenced
 * fileName : FileDbRepository
 * author : GGG
 * date : 2023-11-10
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-10         GGG          최초 생성
 */
@Repository
public interface FileDbRepository extends JpaRepository<FileDb, String> {
    // like 검색
    Page<FileDb> findAllByFileTitleContainingOrderByInsertTimeDesc(String fileTitle, Pageable pageable);
}
