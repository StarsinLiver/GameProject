package com.example.playhostproject.controller;

import com.example.playhostproject.model.entity.user.Role;
import com.example.playhostproject.model.entity.user.User;
import com.example.playhostproject.security.dto.UserDto;
import com.example.playhostproject.security.dto.response.UserRes;
import com.example.playhostproject.security.jwt.JwtUtils;
import com.example.playhostproject.security.services.UserDetailsImpl;
import com.example.playhostproject.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * packageName : com.example.playhostproject.controller
 * fileName : AuthController
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
@RestController
@Slf4j
@RequestMapping("/api")
public class AuthController {

    @Autowired
    AuthService authService;

    //  Todo : 인증/권한 체크 관리 객체
    @Autowired
    AuthenticationManager authenticationManager;

    //  Todo : 웹 토큰 객체
    @Autowired
    JwtUtils jwtUtils;

    //  Todo : 패스워드 암호화 객체
    @Autowired
    PasswordEncoder passwordEncoder;


//    Todo : 일반 로그인

    /**
     * Todo : 유저 로그인
     *
     * @param user
     * @return
     */
    @PostMapping("/auth/signin")
    public ResponseEntity<Object> login(@RequestBody User user) {
        try {
//            Todo : 1) 인증 시작 : id/pw 로 db에 있는지 조사
//                     authentication : 인증을 통과한 객체(id / pw , 유저명 , 인증여부 = true/false)
            Authentication authentication = authenticationManager.authenticate(
                    // 아이디와 패스워드로, Security 가 알아 볼 수 있는 token 객체로 생성해서 인증처리
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

//            Todo : 2) 인증된 객체들를 홀더에 저장해둠
            SecurityContextHolder.getContext().setAuthentication(authentication);

//            Todo : 3) JWT(웹토큰) 발행
            String jwt = jwtUtils.generateJwtToken(authentication);

//            Todo : 4) 인증된 객체(authentication : 유저 및 환경정보)
//                     => authentication.getPrincipal() : 순수한 유저 정보
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//            Todo : 5) 리액트 전송시 : 웹토큰 + id (email) + 유저명 + 권한
//                  5-1) 권한을 임시 변수에 저장
            String role = userDetails.getAuthority().toString();

            Optional<User> user1 = authService.findByEmail(userDetails.getEmail());

//            Todo : 결과 전송을 위한 DTO : UserRes 객체
            UserRes userRes = new UserRes(jwt, user1.get().getUserId(), user1.get().getName(), userDetails.getEmail(), role);

            return new ResponseEntity<>(userRes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Todo : 유저 회원가입 + 수정
     *
     * @param user
     * @return
     */
    @PostMapping("/auth/signup")
    public ResponseEntity<Object> register(@RequestBody User user) {
        try {
//            Todo : 1) 요청된 유저객체  id(email) 있는지 확인
            if (authService.existByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body("에러 : 이메일이 이미 있습니다.");
            }
//           Todo : 2) 신규 유저 생성 : 권한 없이 생성
            User user1 = User.builder()
                    .email(user.getEmail())
//                    패스워드 암호화
                    .password(passwordEncoder.encode(user.getPassword()))
                    .name(user.getName())
                    .build();
//            Todo : 3) 리엑트에서 요청한 권한이 있는지 조사
            String role = user.getRole(); // 요청 권한 가져오기
            if (role.equals("ROLE_ADMIN")) {
                user1.setRole(Role.ROLE_ADMIN.name());
            } else {
                user1.setRole(Role.ROLE_USER.name());
            }

//            Todo : 신규 유저 저장
            authService.siginup(user1);

            return new ResponseEntity<>(user1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 회원 수정
     *
     * @param user
     * @return
     */
    @PutMapping("/auth/update")
    public ResponseEntity<Object> update(@RequestBody User user) {
        try {

            if (user.getPassword() != null) {
                Optional<User> user1 = authService.findByEmail(user.getEmail());
                String databasePassword = user1.get().getPassword().toString();
                //            Todo : 유저 패스워드 인코딩 , 패스워드를 바꿧다면
                if (user.getPassword() != null && user.getPassword().equals(databasePassword)) {
                } else if (user.getPassword() != null) {
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                }
            }

//            Todo : 유저 저장
            authService.siginup(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Todo : 유저 이메일이 있는지 확인
     */
    @PostMapping("/auth/forgot-password")
    public ResponseEntity<Object> forgotPassword(@RequestBody User user) {
        try {
            boolean exist = authService.existByEmail(user.getEmail());
            if (exist) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    Todo : 유저 패스워드 수정전에 맞는지 확인
    @PostMapping("/auth/find-password")
    public ResponseEntity<Object> findPassword(@RequestBody User user) {
        try {

            Optional<User> user1 = authService.findByEmail(user.getEmail());
            if (passwordEncoder.matches(user.getPassword(), user1.get().getPassword())) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/auth/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestBody User user) {
        try {
            boolean bSuccess = authService.resetPassword(user.getEmail(), passwordEncoder.encode(user.getPassword()));
            if (bSuccess) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Todo : 유저 정보 삭제하기
     */
    @DeleteMapping("/auth/withdraw/{userId}")
    public ResponseEntity<Object> removeById(@PathVariable int userId) {
        try {
            boolean bSuccess = authService.removeById(userId);

            if (bSuccess) {
                return new ResponseEntity<>("회원 정보가 삭제되었어요!", HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //    Todo : OAuth2 로그인
    @GetMapping("/auth/login/oauth2/code/{registrationId}")
    public ResponseEntity<Object> socialLogin(@RequestParam String code, @PathVariable String registrationId) {
        try {
            UserDto user = authService.socialLogin(code, registrationId);


//            Todo : 3) JWT(웹토큰) 발행
            String jwt = jwtUtils.generateJwtToken(user);

//            Todo : 결과 전송을 위한 DTO : UserRes 객체
            UserRes userRes = new UserRes(jwt, user.getUserId(), user.getName(), user.getEmail(), user.getRole());

            return new ResponseEntity<>(userRes, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
