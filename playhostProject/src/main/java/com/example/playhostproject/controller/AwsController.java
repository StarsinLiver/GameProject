package com.example.playhostproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.xml.bind.SchemaOutputResolver;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : AwsController
 * author : GGG
 * date : 2023-11-29
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-29         GGG          최초 생성
 */
@Controller
public class AwsController {

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String redirectAll() {
        return "forward:/index.html";
    }
    @RequestMapping(value = "/{path:[^\\.]*}", method = RequestMethod.GET)
    public String redirect() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/login/oauth2/code/**",method = RequestMethod.GET)
    public String redirect2() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/news/**",method = RequestMethod.GET)
    public String redirect3() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/game-detail/**",method = RequestMethod.GET)
    public String redirect4() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/reset-password/**",method = RequestMethod.GET)
    public String redirect5() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/control-panel/**",method = RequestMethod.GET)
    public String redirect6() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/user-qna/**",method = RequestMethod.GET)
    public String redirect7() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/add-user-qna/**",method = RequestMethod.GET)
    public String redirect8() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/user-refund/**",method = RequestMethod.GET)
    public String redirect9() {
        return "forward:/index.html";
    }


}
