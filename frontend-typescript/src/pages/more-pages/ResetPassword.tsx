import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import customMarquee from "../../assets/js/custom-marquee";
import AuthService from "../../services/auth/AuthService";
import designesis from "../../assets/js/designesia";
function ResetPassword() {
    const {email} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
      customMarquee();
      designesis();
      // Todo : isLoggedIn (로그인 상태변수 true / false)
      // Todo : isLoggedIn == true 강제이동
      if (isLoggedIn) {
        navigate("/");
      }
    }, []);

    // Todo : 공유 저장소 변수(state.변수명) 가져오기
    // Todo : 사용법 : useSelector((state) => {state.변수명})
    // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const [message, setMessage] = useState("");
    const [seconds , setSeconds] = useState<number>(-1);

    useEffect(() => {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          setMessage(`패스워드가 변경되었습니다. ${seconds}초 뒤에 로그인 페이지로 이동됩니다.`)
        }
        if(seconds == 0) {
          navigate("/login");
        }
      }, 1000);
      return () => clearInterval(countdown);
    },[seconds]);
  
    // Todo : 유효성 체크 lib
    // Todo : Formik 객체 초기화 (initialValues) : html 태그에서
    // Todo : 체크대상 (email , name) : Field 태그
    const initialValues = {
      password : "",
      repassword : ""
    };
  
    // Todo : 함수 정의
    // Todo : Formit 라이브러리 : validationSchema
    // Todo : validationSchema : 유효성 체크 규칙을 정의
    // Todo : validationSchema = Yup.object().shape({유효성 체크규칙})
    const validationSchema = Yup.object().shape({
      // email 유효성 규칙 :
      password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) => {
          if (
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
          ) {
            return true;
          }
          return false;
        }
      )
      .required("This field is required!"),
    // oneOf([Yup.ref("password")], "Password must match") : 패스워드 한번더 맞게 쳐야함
    repassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    });
  
    // Todo : 로그인 함수 : submit(Formit)
    // Todo : Formit lib 에서 자동으로 email , name 값을 보내줌
    const handleLogin = (formValue: any) => {
      const { password , repassword } = formValue;

      let data = {
        email : email,
        password : password
      }

      AuthService.resetPassword(data)
      .then((response : any) => {
        setSeconds(3);
        sendVerificationEmail();
      })
      .catch((e : Error )=> {
        console.log(e);
      })
    };
  
    const sendVerificationEmail = () => {
      // 이메일 보내기
      // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
      const templateParams = {
        to_email: email,
        from_name: "playHost team",
        message: `  비밀번호가 바뀌었습니다.
                    만약 당사자가 아니시라면 확인 부탁드립니다.
                      `,
      };
  
      emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`,
        `template_8i7gn6k`,
        templateParams,
        `${process.env.REACT_APP_EMAIL_JS_API_KEY}`
      )
        .then((response: any) => {
          // setIsEmailSent(true);
        })
        .catch((error: Error) => {
          console.error("이메일 보내기 실패:", error);
          // 이메일 전송 실패 처리 로직 추가
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
                    <h4>비밀번호 변경</h4>
                  </div>
                  <div className="spacer-10"></div>
                  {/* Formik 태그 시작 */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    {/* Form 태그 시작 */}
                    {({ errors, touched }) => (
                      <Form id="form_register" className="form-border">
                        {/* 유저 이메일  */}
                        <div className="col-md-12">
                            <div className="field-set">
                              <label>새로운 비밀번호:</label>
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
                          </div>
                          <div className="col-md-12">
                            <div className="field-set">
                              <label>비밀번호 재입력:</label>
                              <Field
                                type="password"
                                name="repassword"
                                id="repassword"
                                className={
                                  "form-control" +
                                  (errors.repassword && touched.repassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="repassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        <div className="spacer-20"></div>
                        {/* 로그인 버튼 */}
                        <div id="submit">
                          <input
                            type="submit"
                            id="send_message"
                            value="Reset Password"
                            className="btn-main btn-fullwidth rounded-3"
                          />
                        </div>
                      </Form>
                    )}
                    {/* Form 태그 끝 */}
                  </Formik>
                  {/* Formik 태그 끝 */}
                </div>
                {message && (
                  <p className="alert alert-success mt-3 text-center">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ResetPassword