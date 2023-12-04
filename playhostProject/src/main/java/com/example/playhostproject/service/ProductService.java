package com.example.playhostproject.service;

import com.example.playhostproject.model.dto.ProductDto;
import com.example.playhostproject.model.dto.ProductDto2;
import com.example.playhostproject.model.entity.Product;
import com.example.playhostproject.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : ProductService
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

@Service
@Slf4j
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    /**
     * Todo : 상품 등록
     *
     * @param product
     * @return
     */
    public Product save(Product product) {
//        Todo : 태그가 없으면
        if(product.getTag().equals("") && product.getPrice() == 0) {
            product.setTag("무료");
        }
        Product product1 = productRepository.save(product);
        return null;
    }

    /**
     * Todo : selectBox 에 쓰일 태그들만 검색
     */
    public List<String> findAllTag() {
        List<String > list = productRepository.findAllTag();
        return list;
    }

    /**
     * Todo : 상품이 있는지 확인
     */
    public boolean existByPid(int pid) {
        if(productRepository.existsById(pid)) {
            return true;
        }
        return false;
    }

    /**
     * Todo : 상품 상세 조회
     */
    public Optional<Product> findById(int pid) {
        Optional<Product> optionalProduct = productRepository.findById(pid);
        return optionalProduct;
    }


    /**
     * Todo : 상품 전체 tag containing 조회
     */
    public List<Product> findAllByTagContaining(String tag) {
        List<Product> productPage = productRepository.findAllByTagContaining(tag);
        return productPage;
    }

    /**
     * Todo : 상품 전체 name containing 조회
     */
    public List<Product> findAllByNameContainingNoPge(String name) {
        List<Product> productPage = productRepository.findAllByNameContaining(name);
        return productPage;
    }

    /**
     * Todo : 상품 전체 name containing 조회
     */
    public Page<Product> findAllByNameContaining(String name, Pageable pageable) {
        Page<Product> productPage = productRepository.findAllByNameContaining(name, pageable);
        return productPage;
    }

    /**
     * Todo : 상품 전체 name + tag containing 조회
     */
    public Page<Product> findAllByNameContainingAndTagContaining(String name,String tag ,  Pageable pageable) {
        Page<Product> productPage = productRepository.findAllByNameContainingAndTagContaining(name, tag ,pageable);
        return productPage;
    }

    /**
     * Todo : 상품 전체 조회 tag like 검색 + thumbnail full join
     */
    public List<ProductDto> selectAllByThumbNailJoin(String tag) {
        List<ProductDto> list = productRepository.selectAllByThumbNailJoin(tag);
        return list;
    }

    /**
     * Todo : 상품 전체 조회 tag like 검색 + thumbnail full join + 페이징 처리
     */
    public Page<ProductDto> selectAllByThumbNailJoinByPaging(String tag , Pageable pageable) {
        Page<ProductDto> page = productRepository.selectAllByThumbNailJoinByPaging(tag , pageable);
        return page;
    }

    /**
     * Todo : finalPrice == 0원인 전체조회
     */
    public Page<ProductDto> selectAllByThumbNailJoinByPagingAndFinalPriceLikeZero(Pageable pageable) {
        Page<ProductDto> page = productRepository.selectAllByThumbNailJoinByPagingAndFinalPriceLikeZero(pageable);
        return page;
    }

    /**
     * Todo : discount == 0% 인 전체 조회
     */
    public Page<ProductDto> selectAllByThumbNailJoinByPagingAndDiscountNotLikeZero(Pageable pageable) {
        Page<ProductDto> page = productRepository.selectAllByThumbNailJoinByPagingAndDiscountNotLikeZero(pageable);
        return page;
    }

    /**
     * TODO : 좋아요 내림차순(DESC) 조회
     */
    public Page<ProductDto2> findProductsOrderByLikeCountDesc(String name, String tag, int firstPrice, int lastPrice, Pageable pageable) {
        Page<ProductDto2> page = productRepository.findProductsOrderByLikeCountDesc(name, tag, firstPrice, lastPrice, pageable);
        return page;
    }

    /**
     * TODO : 좋아요 오름차순(ASC) 조회
     */
    public Page<ProductDto2> findProductsOrderByLikeCount(String name, String tag, int firstPrice, int lastPrice, Pageable pageable) {
        Page<ProductDto2> page = productRepository.findProductsOrderByLikeCount(name, tag, firstPrice, lastPrice, pageable);
        return page;
    }
    
    /**
     * Todo : 상품 삭제
     */
    public boolean removeById(int pid) {
        if (productRepository.existsById(pid)) {
            productRepository.deleteById(pid);
            return true;
        }
        return false;
    }


}
