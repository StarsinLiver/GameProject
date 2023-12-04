package com.example.playhostproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

/**
 * packageName : com.example.loginproject2.config
 * fileName : MvcConfiguration
 * author : GGG
 * date : 2023-10-19
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-19         GGG          최초 생성
 */
@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    @Value("${react.server}")
    private String reactServer;


//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/templates/", "classpath:/static/")
//                .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES));
//    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
////                아래 url 허용
////               TODO: 사용법 : .allowedOrigins("http://허용할IP:허용할Port" , ...)
//                .allowedOrigins(reactServer)
////                .allowedOrigins("*")
////                Todo: 아래 추가해야 update, delete, insert, select 가 cors 문제가 안생김
//                .allowedMethods(
//                        HttpMethod.GET.name(),
//                        HttpMethod.POST.name(),
//                        HttpMethod.PUT.name(),
//                        HttpMethod.DELETE.name(),
//                        HttpMethod.PATCH.name()
//                )
//                .allowedHeaders("*")
//                .allowCredentials(false)
//                .exposedHeaders("*")
//                .maxAge(3000);
////              .allowedHeaders("Content-Type","Authorization");
//    }

    //    Todo : 선생님 소스
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                아래 url 허용
                .allowedOrigins(reactServer)
                .allowedOrigins("http://43.201.18.3:3000")
                .allowedHeaders("*")
                .allowCredentials(true)
//                .allowedOrigins("http://localhost:3000")
//                Todo: 아래 추가해야 update, delete, insert, select 가 cors 문제가 안생김
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.PATCH.name()
                );
    }


    // You can configure allowed Origin, Method, Header and Credential
    // and how long, as a duration, the response from a pre-flight request can be eached by clients
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("https://localhost:3000"));
////        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","FETCH"));
//        configuration.setAllowedMethods(Arrays.asList("*"));
//        // you can configure many allowed CORS headers
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}