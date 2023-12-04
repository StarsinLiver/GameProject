package com.example.playhostproject.controller;

import com.example.playhostproject.model.dto.ProductDto;
import com.example.playhostproject.model.dto.ProductDto2;
import com.example.playhostproject.model.entity.Product;
import com.example.playhostproject.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : ProductController
 * author : san26
 * date : 2023-11-16
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-16         san26          최초 생성
 */
@RestController
@Slf4j
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductService productService;

    /**
     * Todo : 페이징 처리가 없는 전체 조회 + name Containing
     */
    @GetMapping("/product-no-page")
    public ResponseEntity<Object> findAllByNameContainingNoPge(@RequestParam(defaultValue = "") String name
    ) {
        try {

            List<Product> list = productService.findAllByNameContainingNoPge(name);
            if (list.isEmpty() == false) {
//                성공
                return new ResponseEntity<>(list, HttpStatus.OK);
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
     * Todo : 전체 조회 + 페이징 처리 + name Containing
     */
    @GetMapping("/product")
    public ResponseEntity<Object> findAllByNameContaining(@RequestParam(defaultValue = "") String name,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "8") int size
    ) {
        try {
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
     * Todo : 일반 계정 : 전체 조회 + name containing , tag containing
     */
    @GetMapping("/product-tag")
    public ResponseEntity<Object> findAllByNameContainingAndTagContaining(@RequestParam(defaultValue = "") String name,
                                                                          @RequestParam(defaultValue = "") String tag,
                                                                          @RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "8") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage
                    = productService.findAllByNameContainingAndTagContaining(name, tag, pageable);

            List<Product> list = productService.findAllByTagContaining(tag);

//          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("product", productPage.getContent()); // 부서배열
            response.put("mainProduct", list); // 부서배열
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

    //    todo : 상세페이지 필요!! 상세 조회!
    @GetMapping("/product/{pid}")
    public ResponseEntity<Object> findById(@PathVariable int pid) {
        try {
            Optional<Product> optionalProduct = productService.findById(pid);
            return new ResponseEntity<>(optionalProduct, HttpStatus.OK);

        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 전체 조회 + tag like 검색 + thumbnail table full join / list + page처리 두개
     */
    @GetMapping("/product/thumbnail")
    public ResponseEntity<Object> selectAllByThumbNailJoinByPaging(@RequestParam(defaultValue = "") String tag,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "8") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<ProductDto> list = productService.selectAllByThumbNailJoin(tag);
            Page<ProductDto> productDtoPage = productService.selectAllByThumbNailJoinByPaging(tag, pageable);

            //          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("productDtoPage", productDtoPage.getContent()); // 페이징 처리 있음 배열
            response.put("list", list); //                                  페이징 처리 없음 배열
            response.put("currentPage", productDtoPage.getNumber()); // 현재페이지번호
            response.put("totalItems", productDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productDtoPage.getTotalPages()); // 총페이지수

            if (productDtoPage.isEmpty() == false) {
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
     * Todo : finalPrice == 0원인 전체조회
     */
    @GetMapping("/product/final-price/zero")
    public ResponseEntity<Object> selectAllByThumbNailJoinByPagingAndFinalPriceLikeZero(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductDto> productDtoPage = productService.selectAllByThumbNailJoinByPagingAndFinalPriceLikeZero(pageable);

            //          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("productDtoPage", productDtoPage.getContent()); // 페이징 처리 있음 배열
            response.put("currentPage", productDtoPage.getNumber()); // 현재페이지번호
            response.put("totalItems", productDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productDtoPage.getTotalPages()); // 총페이지수

            if (productDtoPage.isEmpty() == false) {
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
     * Todo : finalPrice == 0원인 전체조회
     */
    @GetMapping("/product/discount/zero")
    public ResponseEntity<Object> selectAllByThumbNailJoinByPagingAndDiscountNotLikeZero(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductDto> productDtoPage = productService.selectAllByThumbNailJoinByPagingAndDiscountNotLikeZero(pageable);

            //          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("productDtoPage", productDtoPage.getContent()); // 페이징 처리 있음 배열
            response.put("currentPage", productDtoPage.getNumber()); // 현재페이지번호
            response.put("totalItems", productDtoPage.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productDtoPage.getTotalPages()); // 총페이지수

            if (productDtoPage.isEmpty() == false) {
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
     * 좋아요 내림차순(DESC) 전체조회
     */
    @GetMapping("/product/tag/isLikeDesc")
    public ResponseEntity<Object> findProductsOrderByLikeCountDesc(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String tag,
            @RequestParam(defaultValue = "0") int firstPrice,
            @RequestParam(defaultValue = "9999999999") int lastPrice
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductDto2> productDtoIsLike = productService.findProductsOrderByLikeCountDesc(name, tag, firstPrice, lastPrice, pageable);

            //          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("product", productDtoIsLike.getContent()); // 페이징 처리 있음 배열
            response.put("currentPage", productDtoIsLike.getNumber()); // 현재페이지번호
            response.put("totalItems", productDtoIsLike.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productDtoIsLike.getTotalPages()); // 총페이지수

            if (productDtoIsLike.isEmpty() == false) {
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
     * 좋아요 오름차순(ASC) 전체조회
     */
    @GetMapping("/product/tag/isLikeAsc")
    public ResponseEntity<Object> findProductsOrderByLikeCount(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String tag,
            @RequestParam(defaultValue = "0") int firstPrice,
            @RequestParam(defaultValue = "9999999999") int lastPrice
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductDto2> productDtoIsLike = productService.findProductsOrderByLikeCount(name, tag, firstPrice, lastPrice, pageable);

            //          리액트 전송 : 부서배열 , 페이징정보 [자료구조 : Map<키이름, 값>]
            Map<String, Object> response = new HashMap<>();
            response.put("product", productDtoIsLike.getContent()); // 페이징 처리 있음 배열
            response.put("currentPage", productDtoIsLike.getNumber()); // 현재페이지번호
            response.put("totalItems", productDtoIsLike.getTotalElements()); // 총건수(개수)
            response.put("totalPages", productDtoIsLike.getTotalPages()); // 총페이지수

            if (productDtoIsLike.isEmpty() == false) {
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

    @GetMapping("/product/all-tags")
    public ResponseEntity<Object> findAllTags() {
        try {

            List<String> list = productService.findAllTag();

            if(list.isEmpty() == false) {
                return new ResponseEntity<>(list, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
