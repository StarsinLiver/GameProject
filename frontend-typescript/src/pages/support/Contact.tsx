import React, { useState } from "react";
import { useEffect } from "react";
import designesis from "../../assets/js/designesia";
import emailjs, { send } from "emailjs-com";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import customMarquee from "../../assets/js/custom-marquee";

function Contact() {
  const [message, setMessage] = useState("");
  const [anyQuestion, setAnyQuestion] = useState<string | null>("");

  // Todo : 유효성 체크 lib
  // Todo : Formik 객체 초기화 (initialValues) : html 태그에서
  // Todo : 체크대상 (question) : Field 태그
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };

  // Todo : 함수 정의
  // Todo : Formit 라이브러리 : validationSchema
  // Todo : validationSchema : 유효성 체크 규칙을 정의
  // Todo : validationSchema = Yup.object().shape({유효성 체크규칙})
  const validationSchema = Yup.object().shape({});

  useEffect(() => {
    customMarquee();
    designesis();
  }, []);

  // Todo : 로그인 함수 : submit(Formit)
  // Todo : Formit lib 에서 자동으로 email , password 값을 보내줌
  const sendMessage = (formValue: any) => {
    const { name, email, phone } = formValue;
    sendVerificationEmail(name, email, phone);
  };

  const sendVerificationEmail = (
    name: string,
    email: string,
    phone: string
  ) => {
    // 이메일 보내기
    // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
    const templateParams = {
      to_email: "san2636@naver.com",
      from_name : name,
      message: `
                    이메일 : ${email}
                    핸드폰 : ${phone}

                    ----------------
                    질문 : ${anyQuestion}
                      `,
    };
    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`, // 서비스 ID
        `template_p4jxv0a`,
        templateParams,
        `${process.env.REACT_APP_EMAIL_JS_API_KEY}` // public-key
      )
      .then((response: any) => {
        alert(`문의가 성공적으로 전송되었습니다:`);
        window.location.reload();
      })
      .catch((error: Error) => {
        alert("문의에 실패하였습니다 다시 입력해주세요");
        window.location.reload();
      });
  };

  const onChangeTextArea = (e: any) => {
    setAnyQuestion(e.target.value);
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {/* <!-- section begin --> */}
        <section id="subheader" className="jarallax">
          <img
            src={require("../../assets/images/background/subheader-contact.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">Contact</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  궁금한 점이 있으신가요?
                </h2>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- section close --> */}

        {/* Form section 시작 */}
        <section>
          <div className="container position-relative z1000">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <p className="lead">
                  <a href="faq">자주 묻는 질문</a> 페이지를 먼저 확인하시고,
                  궁금한 점이 있다면 언제든 메세지를 보내주세요.
                </p>
                {/* Formik 시작 */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={sendMessage}
                >
                  {({ errors, touched }) => (
                    <Form
                      name="contactForm"
                      id="contact_form"
                      className="contactForm"
                    >
                      <div className="row gx-4">
                        <div className="col-lg-6 mb10">
                          <div className="field-set">
                            <span className="d-label">성함</span>
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder="당신의 이름"
                              required
                            />
                          </div>

                          <div className="field-set">
                            <span className="d-label">이메일</span>
                            <Field
                              type="text"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="당신의 이메일"
                              required
                            />
                          </div>

                          <div className="field-set">
                            <span className="d-label">휴대폰</span>
                            <Field
                              type="text"
                              name="phone"
                              id="phone"
                              className="form-control"
                              placeholder="당신의 전화번호"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="field-set mb20">
                            <span className="d-label">내용</span>
                            <textarea
                              name="message"
                              id="message"
                              className="form-control"
                              onChange={onChangeTextArea}
                              placeholder="메세지 내용"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* <div
                    className="g-recaptcha"
                    data-sitekey="insert-sitekey-here"
                  ></div> */}
                      <div id="submit" className="mt20">
                        <input
                          type="submit"
                          id="send_message"
                          value="Send Message"
                          className="btn-main"
                        />
                      </div>

                      <div id="success_message" className="success">
                        메세지가 성공적으로 전송되었습니다. 더 많은 질문을
                        원하신다면 새로고침 후 시도해주세요.
                      </div>
                      <div id="error_message" className="error">
                        죄송합니다. 메세지 전송 중 오류가 발생했습니다. 잠시 후
                        다시 시도해주세요.
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
        {/* Form section 종료 */}

        {message && (
          <p className="alert alert-success mt-3 text-center">{message}</p>
        )}
      </div>
    </>
  );
}

export default Contact;
