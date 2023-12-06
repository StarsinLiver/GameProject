import React, { useEffect, useState } from "react";
import designesis from "../../../assets/js/designesia";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ILibraryDto from "../../../types/Dto/ILibraryDto";
import ILibrary from "../../../types/ILibrary";
import UserLibraryService from "../../../services/user/UserLibraryService";
import IUser from "../../../types/auth/IUser";
import emailjs from "emailjs-com";

function UserRefund() {
  const { lid } = useParams();

  useEffect(() => {
    designesis();
    reteiveRefund();
  }, []);

  const initialRefundDetail = {
    lid: null,
    requestRefund: "",
    insertTime: "",
    refundReason: "",
    finalPrice: null,
    refund: "",
    refundTime: "",
    pid: null,
    pname: "",
    price: 0,
    tag: "",
    discount: 0,
    userId: 0,
    uname: "",
    email: "",
  };
  const [refundDetail, setRefundDetail] =
    useState<ILibraryDto>(initialRefundDetail);
  const navigate = useNavigate();

  // Todo : 환불 정보 받기
  const reteiveRefund = () => {
    UserLibraryService.get(lid)
      .then((response: any) => {
        setRefundDetail(response.data);
        setUserDto(response.data);
      })
      .catch((e: Error) => {
        alert("정보를 가져오는데 실패 하였습니다.");
      });
  };

  // input 태그에 수동 바인딩
  const handleInputChange = (event: any) => {
    const { name, value } = event.target; // 화면값
    setRefundDetail({ ...refundDetail, [name]: value }); // 변수저장
  };

  const onClickRefund = () => {
    let data: ILibrary = {
      lid: refundDetail.lid,
      userId: refundDetail.userId,
      pid: refundDetail.pid,
      finalPrice: refundDetail.finalPrice,
      insertTime: refundDetail.insertTime,
      requestRefund: "Y",
      refundReason: refundDetail.refundReason,
      refund: "N",
      refundTime: null,
    };

    UserLibraryService.update(lid, data)
      .then((response: any) => {
        alert("환불 요청이 처리되었습니다.");
        sendVerificationEmail();
        navigate("/user-library");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // Todo : 환불 신청 캔슬
  const onClickCancleRefund = () => {
    let data: ILibrary = {
      lid: refundDetail.lid,
      userId: refundDetail.userId,
      pid: refundDetail.pid,
      finalPrice: refundDetail.finalPrice,
      insertTime: refundDetail.insertTime,
      requestRefund: "N",
      refundReason: null,
      refund: "N",
      refundTime: null,
    };

    UserLibraryService.update(lid, data)
      .then((response: any) => {
        alert("환불이 취소되었습니다.");
        navigate("/user-library");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [userDto, setUserDto] = useState<IUser>();
  // Todo : 이메일 발송
  // const [isEmailSent, setIsEmailSent] = useState(false);
  const sendVerificationEmail = () => {
    // 이메일 보내기
    // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
    const templateParams = {
      to_email: userDto?.email,
      to_name: userDto?.name,
      from_name: "관리자",
      message: `저희 playHost를 이용해주셔서 감사합니다.
                환불요청신청이 완료되어 내역을 알려드립니다.
                최종 환불 신청이 완료되면 다시 알려드리겠습니다.

                    이용해주셔서 감사합니다.
                    `,
    };

    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`,
        `template_8i7gn6k`,
        templateParams,
        `${process.env.REACT_APP_EMAIL_JS_API_KEY}`
      )
      .then((response) => {
        // setIsEmailSent(true);
        // 이메일 전송 성공 처리 로직 추가
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
        // 이메일 전송 실패 처리 로직 추가
      });
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {/* <!-- 섹션 1번 begin --> */}
        <section id="subheader" className="jarallax">
          <div className="de-gradient-edge-bottom"></div>
          <img
            src={require("../../../assets/images/background/subheader-game.webp")}
            className="jarallax-img"
            alt=""
          />

          {/* 헤더 부분 */}
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">Admin</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  환불 요청 페이지
                </h2>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 섹션 1번 close --> */}

        {/* 섹션 2번 시작 */}
        <section>
          <div className="container">
            <div className="row">
              {/* 본문 시작 */}
              <div className="col-md-7">
                <div className="blog-read">
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    환불 내용을 적어주세요
                  </h2>

                  {/* Input 태그 시작 */}
                  <div className="post-text">
                    <div
                      id="contact_form"
                      className="position-relative z1000 wow fadeInUp mb-3"
                    >
                      {refundDetail.refund === "Y" ? (
                        <>
                          <textarea
                            // type="text"
                            name="refundReason"
                            id="refundReason"
                            className="form-control"
                            placeholder="refundReason"
                            value={refundDetail.refundReason}
                            required
                            disabled
                            style={{ height: "200px", width: "650px" }}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <textarea
                            // type="text"
                            name="refundReason"
                            id="refundReason"
                            className="form-control"
                            placeholder="refundReason"
                            value={refundDetail.refundReason}
                            onChange={handleInputChange}
                            required
                            style={{ height: "200px", width: "650px" }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {/* Input 태그 끝 */}
                </div>

                <div className="spacer-single"></div>

                {/* 버튼 시작 */}
                <div id="blog-comment">
                  {refundDetail.requestRefund == "Y" &&
                    refundDetail.refund === "N" && (
                      <>
                        <h4>환불 요청 중입니다. </h4>
                        <div className="spacer-half"></div>
                        <a
                          role="button"
                          className="btn-main opt-1 me-3"
                          style={{
                            width: "150px",
                            fontSize: "15px",
                          }}
                          onClick={onClickRefund}
                        >
                          환불 내용 수정
                        </a>
                        <a
                          role="button"
                          className="btn-main opt-1"
                          style={{
                            width: "110px",
                            fontSize: "15px",
                          }}
                          onClick={onClickCancleRefund}
                        >
                          환불 취소
                        </a>
                      </>
                    )}

                  {refundDetail.requestRefund === "N" &&
                    refundDetail.refund === "N" && (
                      <>
                        <h4>환불 하시겠습니까?</h4>
                        <div className="spacer-half"></div>
                        <a
                          role="button"
                          className="btn-main opt-1"
                          style={{
                            width: "110px",
                            fontSize: "15px",
                          }}
                          onClick={onClickRefund}
                        >
                          환불 요청
                        </a>
                      </>
                    )}

                  {refundDetail.refund === "Y" && (
                    <>
                      <h4>환불 요청이 완료된 건입니다. </h4>
                      <div className="spacer-half"></div>
                    </>
                  )}

                  <Link
                    role="button"
                    className="btn-main opt-1 ms-3"
                    style={{
                      width: "100px",
                      fontSize: "15px",
                    }}
                    to="/user-library"
                  >
                    돌아가기
                  </Link>
                  <div className="spacer-single"></div>
                </div>
                {/* 버튼 끝 */}
              </div>
              {/* 본문 종료 */}

              {/* 사이드 바 종료 */}
              <div id="sidebar" className="col-md-5">
                <div className="widget widget-post">
                  <h4>유저의 상세정보</h4>
                  <div className="small-border"></div>
                  <ul>
                    <li>
                      <span className="date">이름</span>
                      <a href="#">{refundDetail.uname}</a>
                    </li>
                    <li>
                      <span className="date">이메일</span>
                      <a href="#">{refundDetail.email}</a>
                    </li>
                  </ul>
                </div>

                <div className="widget widget-post">
                  <h4>제품의 상세정보</h4>
                  <div className="small-border"></div>
                  <ul>
                    <li>
                      <span className="date">제품 이름</span>
                      <a href="#">{refundDetail.pname}</a>
                    </li>
                    <li>
                      <span className="date">제품 넘버</span>
                      <a href="#">{refundDetail.pid}</a>
                    </li>
                    <li>
                      <span className="date">제품 가격</span>
                      <a href="#">{refundDetail.price} 원</a>
                    </li>
                    <li>
                      <span className="date">할인율</span>
                      <a href="#">{refundDetail.discount} %</a>
                    </li>
                    <li>
                      <span className="date">당시 가격</span>
                      <a href="#">{refundDetail.finalPrice} 원</a>
                    </li>
                    <li>
                      <span className="date">제품 태그</span>
                      <a href="#">{refundDetail.tag}</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 사이드 바 종료 */}
            </div>
          </div>
        </section>
        {/* 섹션 2번 종료 */}
      </div>
    </>
  );
}

export default UserRefund;
