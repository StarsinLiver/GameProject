package com.example.playhostproject.service;

import com.example.playhostproject.model.entity.user.Role;
import com.example.playhostproject.model.entity.user.User;
import com.example.playhostproject.repository.UserRepository;
import com.example.playhostproject.security.dto.UserDto;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Map;
import java.util.Optional;

/**
 * packageName : com.example.playhostproject.service
 * fileName : AuthService
 * author : san26
 * date : 2023-11-14
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-11-14         san26          최초 생성
 */
@Service
@Slf4j
public class AuthService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    Environment env;

    RestTemplate restTemplate = new RestTemplate();

    /**
     * Todo : 유저 로그인
     *
     * @param email
     * @param password
     * @return
     */
    public Optional<UserDto> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.get().getPassword().equals(password) && user != null) {
            return selectByEmail(email);
        }
        return null;
    }

    /**
     * Todo : 유저 회원가입
     */
    public User siginup(User user) {
        User user1 = userRepository.save(user);
        return user1;
    }

    /**
     * Todo : 유저 값 찾기
     */
    public Optional<UserDto> selectByEmail(String email) {
        Optional<UserDto> optionalUserDto = userRepository.selectByEmail(email);
        return optionalUserDto;
    }

    /**
     * Todo : 이메일로 값 찾기
     *
     * @param email
     * @return
     */
    public Optional<User> findByEmail(String email) {
        Optional<User> optionalUserDto = userRepository.findByEmail(email);
        return optionalUserDto;
    }

    /**
     * Todo : 유저 이메일로 패스워드 변경
     * @param email
     * @return
     */
    public boolean resetPassword(String email , String password) {
        int result = userRepository.resetPassword(email,password);
        System.out.println("result : " + result);
        if(result > 0) {
            return true;
        }
        return false;
    }

    public boolean existByEmail(String email) {
        if(userRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }
    /**
     * Todo : 유저 정보 삭제하기
     */
    public boolean removeById(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    //    Todo : OAuth2 서비스
    public UserDto socialLogin(String code, String registrationId) {
//        Todo : 구글 api
        if(registrationId.equals("google")) {
            String accessToken = getAccessToken(code, registrationId);
            UserDto user = getUser(accessToken, registrationId);
            return user;
//            Todo : 카카오 api
        } else {
            JSONObject jsonObject = getKakaoAccessToken(code, registrationId);
            UserDto userDto = getKakaoUser(jsonObject, registrationId);
            return userDto;
        }
    }

//    Todo : 구글 api
    //    Todo : accessToken 값 가져오기
    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }


    //    Todo : 유저 정보 가져오기
    public UserDto getUser(String accessToken, String registrationId) {
        String baseUrl = env.getProperty("oauth2." + registrationId + ".user");

        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("access_token", accessToken)
                .build(false);  // 인코딩 하지않음

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ResponseEntity<User> response = restTemplate.exchange(uriComponents.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), User.class);
        User user = response.getBody();

//       Todo : 유저 정보가 있으면 바로 주기
        if (!userRepository.existsByEmail(user.getEmail())) {
            //        Todo : 없으면 회원가입
            user.setRole(Role.ROLE_USER.name());
            user.setPoint(0);
            siginup(user);
        }
        return selectByEmail(user.getEmail()).get();
    }

//    Todo : 카카오 api
    private JSONObject getKakaoAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        return WebClient.builder()
                .baseUrl(tokenUri)
                .build()
                .post()
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData(params))
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
    }

    //    Todo : 유저 정보 가져오기
    public UserDto getKakaoUser(JSONObject tokenInfo, String registrationId) {
        // [STEP2] 인가 코드를 기반으로 토큰을 발급받습니다.
        String accessToken = String.valueOf(tokenInfo.get("access_token"));
        int refreshTokenExpiresIn = (int) tokenInfo.get("refresh_token_expires_in");
        String refreshToken = String.valueOf(tokenInfo.get("refresh_token"));
        String scope = String.valueOf(tokenInfo.get("scope"));

        // [STEP3] 접근 코드를 기반으로 사용자 정보를 조회합니다.
        JSONObject userInfo = findUserInfo(accessToken, registrationId);
        String kakaoAccount = String.valueOf(userInfo.get("kakao_account"));

        try {
            Map<String, Object> account = (Map<String, Object>) userInfo.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) account.get("profile");
            String email = (String) account.get("email");
            String name = (String) profile.get("nickname");
            String profile_image_url = (String) profile.get("profile_image_url");

            if (!userRepository.existsByEmail(email)) {
                siginup(User.builder().name(name).email(email).role(Role.ROLE_USER.name()).point(0).build());
            }

            return userRepository.selectByEmail(email).get();
        } catch (Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }

    private JSONObject findUserInfo(String accessToken, String registrationId) {
        // 전달 받은 토큰을 기반으로 사용자 정보를 조회합니다.
        String baseUrl = env.getProperty("oauth2." + registrationId + ".user");

        return WebClient.builder()
                .baseUrl(baseUrl)
                .build()
                .post()
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
    }
}
