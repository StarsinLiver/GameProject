package com.example.playhostproject.repository;

import com.example.playhostproject.model.entity.ThumbNail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.playhostproject.repository
 * fileName : ThumbNailRepository
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
@Repository
public interface ThumbNailRepository extends JpaRepository<ThumbNail , String> {
}
