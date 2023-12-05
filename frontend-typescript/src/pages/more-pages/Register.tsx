import React, { useState } from "react";
import { useEffect } from "react";
import emailjs from "emailjs-com";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { register } from "../../store/slices/auth";
import customMarquee from "../../assets/js/custom-marquee";
import IUser from "../../types/auth/IUser";
import designesis from "../../assets/js/designesia";

function Register() {
  useEffect(() => {
    customMarquee();
    designesis();
    setRandomNumber(Math.floor(Math.random() * 8999 + 1000));
  }, []);

  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Todo : 이메일 발송
  const [randomNumber, setRandomNumber] = useState<number | null>(1111);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailRight, setIsEmailRight] = useState(false);
  const [sendEmailClick, setSendEmailClick] = useState(false);

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [resendClick, setResendClick] = useState(false);
  // 상태 추가
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  // Todo : isLoggedIn (로그인 상태변수 true / false)
  // Todo : isLoggedIn == true 강제이동
  if (isLoggedIn) {
    navigate("/home");
  }

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  // Todo : 유효성 체크 lib
  // Todo : Formik 객체 초기화 (initialValues) : html 태그에서
  // Todo : 체크대상 (email , password) : Field 태그
  const initialValues = {
    name: "",
    email: "",
    password: "",
    number: 0,
    repassword: "",
  };

  // Todo : 함수 정의
  // Todo : Formit 라이브러리 : validationSchema
  // Todo : validationSchema : 유효성 체크 규칙을 정의
  // Todo : validationSchema = Yup.object().shape({유효성 체크규칙})
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      // test : 유효성 조건을 개발자가 직접 작성하는 함수
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        // 유효성 체크
        (val) => {
          if (
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
          ) {
            return true;
          }
          return false;
        }
      )
      // 필드가 비었을때
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
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

  const handleResendEmail = (values: any) => {
    const newRandomNumber = Math.floor(Math.random() * 8999 + 1000);
    setRandomNumber(newRandomNumber);
    setVerificationCode(""); // 이전 입력값 초기화
    setResendClick(true);
    sendVerificationEmail(values.email, newRandomNumber);

     // 얼럿창으로 메시지 표시
  window.alert("인증번호가 재전송되었습니다. 메일을 확인해주세요.");
  };
  
  // Todo : 로그인 함수 : submit(Formit)
  // Todo : Formit lib 에서 자동으로 email , password 값을 보내줌
  const handleRegister = (formValue: any) => {
    const { name, email, password, number } = formValue;
    setSendEmailClick(true);
    number == randomNumber ? setIsEmailRight(true) : setIsEmailRight(false);
    const data: IUser = {
      email, // == email : email (생략 가능)
      password, // == password : password
      name, // 유저 이름
      description: "",
      insertTime: "",
      role: "ROLE_USER", // 권한
      point: 0,
    };
    if (isEmailRight) {
      // Todo : 공유 로그인 함수 호출
      dispatch(register(data))
        // Todo : .unwrap() : redux의 공유함수 에러처리를 샐행하게 하는 함수
        .unwrap()
        .then(() => {
          alert("회원가입에 성공하셨습니다.");
          navigate("/login");
          window.location.reload(); // 페이지 새로고침
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      sendVerificationEmail(email, randomNumber);
    }
  };

  const sendVerificationEmail = (email: any, randomNumber: any) => {
    const templateParams = {
      to_email: email,
      from_name: "playHost team",
      message: `이메일 확인 메시지입니다. ${randomNumber} 번호를 맞게 입력해주세요`,
    };

    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`,
        `template_8i7gn6k`,
        templateParams,
        `${process.env.REACT_APP_EMAIL_JS_API_KEY}`
      )
      .then((response) => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
      });
  };

  const handleVerification = () => {
    if (verificationCode === randomNumber?.toString()) {
      setVerificationMessage("💡확인되었습니다");
      setIsEmailRight(true);
    } else {
      setVerificationMessage("⚠인증번호가 일치하지 않습니다");
      setIsEmailRight(false);
    }
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section className="v-center jarallax">
          <div className="de-gradient-edge-top"></div>
          <div className="de-gradient-edge-bottom"></div>
          <img
            src={require("../../assets/images/background/5.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row align-items-center">
              <div className="col-lg-8 offset-lg-2">
                <div className="p-5 rounded-10 shadow-soft bg-dark-1">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                  >
                    {({ values, errors, touched }) => (
                      <Form
                        name="contactForm"
                        id="contact_form"
                        className="form-border"
                      >
                        <h4>계정이 없으신가요? 지금 가입하세요!</h4>
                        <p>
                          저희 사이트에 가입하시면 다양한 게임타이틀 구매는 물론, 최신 게임 뉴스 소식을 얻을 수 있습니다.
                        </p>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>이름:</label>
                              <Field
                                type="text"
                                name="name"
                                id="name"
                                className={
                                  "form-control" +
                                  (errors.name && touched.name
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>이메일:</label>
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
                          </div>
                          {/* <div className="col-md-6">
                        <div className="field-set">
                          <label>Choose a Username:</label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            className="form-control"
                          />
                        </div>
                      </div> */}
                          {/* <div className="col-md-6">
                        <div className="field-set">
                          <label>Phone:</label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="form-control"
                          />
                        </div>
                      </div> */}
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>비밀번호:</label>
                              <Field
                                type="text"
                                name="password"
                                id="password"
                                className={
                                  "form-control" +
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
                          <div className="col-md-6">
                            <div className="field-set">
                              <label>비밀번호 재입력:</label>
                              <Field
                                type="text"
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

                          {sendEmailClick && (
                            <div className="col-md-6">
                              <div className="field-set">
                                <label>이메일 인증번호 입력 :</label>
                                <Field
                                  type="text"
                                  name="number"
                                  id="number"
                                  value={verificationCode}
                                  onChange={(e: any) =>
                                    setVerificationCode(e.target.value)
                                  }
                                  className={
                                    "form-control" +
                                    (errors.email && touched.email
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <div className="d-flex align-items-center mt-2">
                                  <button
                                    type="button"
                                    className="btn-main color-2 me-3"
                                    onClick={handleVerification}
                                  >
                                    인증번호 확인
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-main color-2 ml-2"
                                    onClick={() => handleResendEmail(values)}
                                  >
                                    인증번호 재전송
                                  </button>
                             
                                </div>
                                {verificationMessage && (
                                  <p
                                    className={
                                      isEmailRight
                                        ? "text-success"
                                        : "text-danger"
                                    }
                                  >
                                    {verificationMessage}
                                  </p>
                                )}
                                <ErrorMessage
                                  name="number"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          )}

                          {sendEmailClick == false && (
                            <div className="col-lg-6 offset-lg-3 text-center">
                              <div id="submit">
                                <input
                                  type="submit"
                                  id="send_message"
                                  value="send Email"
                                  className="btn-main color-2"
                                />
                              </div>
                            </div>
                          )}
                          {sendEmailClick == true && (
                            <div className="col-lg-6 offset-lg-3 text-center">
                              <div id="submit">
                                <input
                                  type="submit"
                                  id="send_message"
                                  value={
                                    isEmailRight
                                      ? `Register Now`
                                      : `checkEmail Right`
                                  }
                                  className="btn-main color-2 mt-3"
                                />
                              </div>
                            </div>
                          )}

                          <div className="col-md-12">
                            <div id="mail_success" className="success">
                              Your message has been sent successfully.
                            </div>
                            <div id="mail_fail" className="error">
                              Sorry, error occured this time sending your
                              message.
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="col-lg-6 offset-lg-3">
                            <div className="title-line">
                              Or&nbsp;sign&nbsp;up&nbsp;with
                            </div>
                            <div className="row g-2">
                              <div className="col-lg-6">
                                <Link
                                  className="btn-sc btn-fullwidth mb10"
                                  to="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=431919365136-7pl1vo66ea1ioglqbbnc619pkl09cnsm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/oauth2/code/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&serviso&o2v=1&theme=glif&flowName=GeneralOAuthFlow"
                                >
                                  <img
                                    src={require("../../assets/images/svg/google_icon.svg")}
                                    alt=""
                                  />
                                  Google
                                </Link>
                              </div>
                              <div className="col-lg-6">
                                <Link
                                  className="btn-sc btn-fullwidth"
                                  to="https://kauth.kakao.com/oauth/authorize?client_id=44f5d067449f18cd91d5dc36a85d67c9&redirect_uri=http://localhost:3000/login/oauth2/code/kakao&response_type=code"
                                >
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
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
