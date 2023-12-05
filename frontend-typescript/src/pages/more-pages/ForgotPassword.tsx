import React, { useState } from "react";
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
import { Value } from "sass";

function ForgotPassword() {
  useEffect(() => {
    customMarquee();
    designesis();
    setRandomNumber(Math.floor(Math.random() * 8999 + 1000));
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const [isExistsEmail, setIsExistsEmail] = useState<boolean>(false);
  const [certificationNumber, setCertificationNumber] = useState<string>("");
  const [randomNumber, setRandomNumber] = useState<number | null>(1111);
  const [isEmailSent, setIsEmailSent] = useState(false);
  let navigate = useNavigate();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState("");
  const [resendClick, setResendClick] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
  });

  const handleLogin = (formValue: any) => {
    const { email } = formValue;
    let data = {
      email: email,
    };
    if (randomNumber === parseInt(certificationNumber)) {
      navigate(`/reset-password/${email}`);
      return;
    }
    if (isExistsEmail && randomNumber !== parseInt(certificationNumber)) {
      setMessage("번호가 맞지 않습니다. 이메일을 확인해주세요");
    }

    AuthService.findPassword(data)
      .then((response: any) => {
        setIsExistsEmail(true);
        sendVerificationEmail(email, randomNumber); // 수정된 부분
      })
      .catch((e: Error) => {
        setMessage("유저 정보가 없습니다. 다시 입력해주세요");
      });
  };

  // 이메일js를 이용한 이메일 전송 로직
  const sendVerificationEmail = (email: any, randomNumber: any) => {
    const templateParams = {
      to_email: email,
      from_name: "playHost team",
      message: `이메일 확인 메시지입니다. ${randomNumber} 번호를 맞게 입력해주세요`,
    };

    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`,
        `template_p4jxv0a`,
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

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificationNumber(e.target.value);
  };

  // 인증번호 검증 메시지 로직
  const handleVerify = () => {
    if (randomNumber === parseInt(certificationNumber)) {
      setMessage("인증번호 확인 완료");
    } else {
      setMessage("번호가 맞지 않습니다. 이메일을 확인해주세요");
    }
  };

  // 인증번호 재전송 로직
  const handleResendEmail = (values: any) => {
    const newRandomNumber = Math.floor(Math.random() * 8999 + 1000);
    setRandomNumber(newRandomNumber);
    setVerificationCode(""); // 이전 입력값 초기화
    setResendClick(true);
    sendVerificationEmail(values.email, newRandomNumber);

    // 얼럿창으로 메시지 표시
    window.alert("인증번호가 재전송되었습니다. 메일을 확인해주세요.");
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
                    <h4>비밀번호 찾기</h4>
                  </div>
                  <div className="spacer-10"></div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    {({ errors, touched, values }) => (
                      <Form id="form_register" className="form-border">
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
                        {isExistsEmail && (
                          <div className="field-set">
                            <label>이메일 인증번호</label>
                            <input
                              type="text"
                              name="certificationNumber"
                              id="certificationNumber"
                              onChange={inputOnChange}
                              className={"form-control"}
                            />
                          </div>
                        )}
                        {isExistsEmail && (
                          <div
                            className="field-set"
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <button
                              type="button"
                              className="btn-main btn-fullwidth rounded-3"
                              onClick={handleVerify}
                            >
                              인증번호 확인
                            </button>
                            <button
                              type="button"
                              className="btn-main btn-fullwidth rounded-3"
                              onClick={() => handleResendEmail(values)}
                            >
                              인증번호 재전송
                            </button>
                          </div>
                        )}

                        <div className="field-set">
                          <br />
                        </div>
                        <div className="spacer-20"></div>
                        <div id="submit">
                          <input
                            type="submit"
                            id="send_message"
                            value="계정 찾기"
                            className="btn-main btn-fullwidth rounded-3"
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {message && (
                    <p className="alert alert-success mt-3 text-center">
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ForgotPassword;
