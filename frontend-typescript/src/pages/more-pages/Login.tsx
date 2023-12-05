import React from "react";
import { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { login } from "../../store/slices/auth";
import customMarquee from "../../assets/js/custom-marquee";
import IUser from "../../types/auth/IUser";
import designesis from "../../assets/js/designesia";


function Login() {
  useEffect(() => {
    customMarquee();
    designesis();

    // Todo : isLoggedIn (로그인 상태변수 true / false)
    // Todo : isLoggedIn == true 강제이동
    if (isLoggedIn) {
      navigate("/");
    }
  });

  let navigate = useNavigate();

  // Todo : 공유 저장소 변수(state.변수명) 가져오기
  // Todo : 사용법 : useSelector((state) => {state.변수명})
  // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakaoRedirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;  
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const googleRedirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URL;

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  // Todo : 유효성 체크 lib
  // Todo : Formik 객체 초기화 (initialValues) : html 태그에서
  // Todo : 체크대상 (email , password) : Field 태그
  const initialValues = {
    email: "",
    password: "",
  };

  // Todo : 함수 정의
  // Todo : Formit 라이브러리 : validationSchema
  // Todo : validationSchema : 유효성 체크 규칙을 정의
  // Todo : validationSchema = Yup.object().shape({유효성 체크규칙})
  const validationSchema = Yup.object().shape({
    // email , password 유효성 규칙 :
    // string() : 자료형이 문자열인가?
    // required(에러메세지) => 필수필드
    email: Yup.string().required("email 은 필수 입력입니다."),
    password: Yup.string().required("password 는 필수 입력입니다."),
  });

  // Todo : 로그인 함수 : submit(Formit)
  // Todo : Formit lib 에서 자동으로 email , password 값을 보내줌
  const handleLogin = (formValue: any) => {
    const { email, password } = formValue;

    const data: IUser = {
      email, // == email : email (생략 가능)
      password, // == password : password
      name: "", // 유저 이름
      description : "",
      insertTime :"",
      role: null,
      point : null
    };

    // Todo : 공유 로그인 함수 호출
    dispatch(login(data))
      // Todo : .unwrap() : redux의 공유함수 에러처리를 샐행하게 하는 함수
      .unwrap()
      .then(() => {
        alert("로그인 성공했습니다.");
        navigate("/");
        window.location.reload(); // 페이지 새로고침
      })
      .catch((e: Error) => {
        console.log(e);
        alert("아이디 또는 비밀번호가 맞지 않습니다.");
      });
  };


  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section className="v-center jarallax">
          <div className="de-gradient-edge-top"></div>
          <div className="de-gradient-edge-bottom"></div>
          <img
            src={require("../../assets/images/background/2.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row align-items-center">
              <div className="col-lg-4 offset-lg-4">
                <div className="padding40 rounded-10 shadow-soft bg-dark-1">
                  <div className="text-center">
                    <h4>회원님의 계정에 로그인하세요!</h4>
                  </div>
                  <div className="spacer-10"></div>
                  {/* Formik 태그 시작 */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    {/* Form 태그 시작 */}
                    {({ errors , touched }) => (
                      <Form id="form_register" className="form-border">
                        {/* 유저 이메일  */}
                        <div className="field-set">
                          <label>이메일</label>
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className={
                              "form-control" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        {/* 유저 패스워드 */}
                        <div className="field-set">
                          <label>비밀번호</label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className={
                              "form-control form-input" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="field-set">
   
                          <br />
                        </div>
                        <div className="spacer-20"></div>
                        {/* 로그인 버튼 */}
                        <div id="submit">
                          <input
                            type="submit"
                            id="send_message"
                            value="Sign In"
                            className="btn-main btn-fullwidth rounded-3"
                          />
                        </div>
                      </Form>
                    )}
                    {/* Form 태그 끝 */}
                  </Formik>
                  {/* Formik 태그 끝 */}

                  {/* 이메일 또는 패스워드를 잃어 버렸을때 */}
                  <div className="title-line">
                    forgot&nbsp;email&nbsp;or&nbsp;password&nbsp;?
                  </div>
                  <div className="row g-2">
                    <div className="col-lg-6">
                      <a className="btn-sc btn-fullwidth mb10" href="/forgot-password">
                        <img
                          src={require("../../assets/images/svg/google_icon.svg")}
                          alt=""
                        />
                        비밀번호 찾기
                      </a>
                    </div>
                    <div className="col-lg-6">
                      <a className="btn-sc btn-fullwidth mb10" href="/register">
                        <img
                          src={require("../../assets/images/svg/google_icon.svg")}
                          alt=""
                        />
                        회원가입
                      </a>
                    </div>
                  </div>
                  {/* google 또는 facebook 로그인 */}
                  <div className="title-line">
                    Or&nbsp;login&nbsp;up&nbsp;with
                  </div>
                  <div className="row g-2">
                    <div className="col-lg-6">
                      <Link className="btn-sc btn-fullwidth mb10" to={`https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${googleClientId}&redirect_uri=${googleRedirectUrl}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&serviso&o2v=1&theme=glif&flowName=GeneralOAuthFlow`}>
                        <img
                          src={require("../../assets/images/svg/google_icon.svg")}
                          alt=""
                        />
                        Google
                      </Link>
                    </div>
                    <div className="col-lg-6">
                      <Link className="btn-sc btn-fullwidth" to={`https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUrl}&response_type=code`}>
                        <img
                          src={require("../../assets/images/svg/google_icon.svg")}
                          alt=""
                        />
                        Kakao
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
