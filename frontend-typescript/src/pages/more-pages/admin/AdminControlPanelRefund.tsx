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
import AdminLibraryService from "../../../services/admin/AdminLibrary";
import ILibraryDto from "../../../types/Dto/ILibraryDto";
import ILibrary from "../../../types/ILibrary";
import UserLibraryService from "../../../services/user/UserLibraryService";
import emailjs from "emailjs-com";
import IUser from "../../../types/auth/IUser";

function AdminControlPanelRefund() {
  const { lid } = useParams();

  useEffect(() => {
    designesis();
    reteiveRefund();
  }, []);

  const initialRefundDetail = {
    lid: null,
    requestRefund: "",
    insertTime: "",
    finalPrice: null,
    refundReason: "",
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
    AdminLibraryService.get(lid)
      .then((response: any) => {
        setRefundDetail(response.data);
        console.log(response);
      })
      .catch((e: Error) => {
        alert("정보를 가져오는데 실패 하였습니다.");
      });
  };

  const onClickRefund = () => {
    let data: ILibrary = {
      lid: refundDetail.lid,
      userId: refundDetail.userId,
      pid: refundDetail.pid,
      finalPrice: refundDetail.finalPrice,
      insertTime: refundDetail.insertTime,
      requestRefund: refundDetail.requestRefund,
      refundReason: refundDetail.refundReason,
      refund: "Y",
      refundTime: null,
    };

    AdminLibraryService.update(lid, data)
      .then((response: any) => {
        alert("환불되었습니다.");
        sendVerificationEmail();
        navigate("/control-panel-refund");
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
      to_email: refundDetail?.email,
      to_name: refundDetail?.uname,
      from_name: "playhost 팀",
      message: `저희 playHost를 이용해주셔서 감사합니다.
                환불요청신청이 완료되어 내역을 알려드립니다.
                -----------------------------------------
                환불 요청내용
                -----------------------------------------
                환불 타이틀명 : ${refundDetail.pname}
                가격 : ${refundDetail.price} 원
                -----------------------------------------

                    이용해주셔서 감사합니다.
                    `,
    };

    emailjs
      .send(
        `${process.env.REACT_APP_EMAIL_JS_SERVICE_ID}`, // 서비스 ID
        `template_8i7gn6k`,
        templateParams,
        `${process.env.REACT_APP_EMAIL_JS_API_KEY}` // public-key
      )
      .then((response) => {
        console.log("이메일이 성공적으로 보내졌습니다:", response);
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
        {/* <!-- section begin --> */}
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
        {/* <!-- section close --> */}

        {/* 본문 */}
        <section>
          <div className="container">
            <div className="row">
              {/* 본문 */}
              <div className="col-md-7">
                <div className="blog-read">
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    유저의 요청
                  </h2>
                  <div
                    id="contact_form"
                    className="position-relative z1000 wow fadeInUp mb-3"
                  >
                    <div className="post-text">
                      <textarea
                        disabled
                        name="refundReason"
                        id="refundReason"
                        className="form-control"
                        placeholder="refundReason"
                        value={refundDetail.refundReason}
                        required
                        style={{ height: "200px", width: "650px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="spacer-single"></div>

                <div id="blog-comment">
                  {refundDetail.refund == "Y" ? (
                    <>
                      <h4>환불 요청이 완료된 건입니다.</h4>
                      <div className="spacer-half"></div>
                    </>
                  ) : (
                    <>
                      <h4>환불 하시겠습니까?</h4>
                      <div className="spacer-half"></div>
                      <a
                        role="button"
                        className="btn-main opt-1"
                        style={{
                          width: "100px",
                          fontSize: "15px",
                        }}
                        onClick={onClickRefund}
                      >
                        환불
                      </a>
                    </>
                  )}

                  <Link
                    role="button"
                    className="btn-main opt-1 ms-3"
                    style={{
                      width: "100px",
                      fontSize: "15px",
                    }}
                    to="/control-panel-refund"
                  >
                    돌아가기
                  </Link>
                  <div className="spacer-single"></div>
                </div>
              </div>

              {/* 사이드 바 */}
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
                      <span className="date" style={{ width: "90px" }}>
                        현재 제품 가격
                      </span>
                      <a href="#">{refundDetail.price} 원</a>
                    </li>
                    <li>
                      <span className="date" style={{ width: "70px" }}>
                        현재 할인율
                      </span>
                      <a href="#">{refundDetail.discount} %</a>
                    </li>
                    <li>
                      <span className="date" style={{ width: "90px" }}>
                        유저 구입 가격
                      </span>
                      <a href="#">{refundDetail.finalPrice} 원</a>
                    </li>
                    <li>
                      <span className="date" style={{ width: "90px" }}>유저 구입 날짜</span>
                      <a href="#">{refundDetail.insertTime}</a>
                    </li>
                    <li>
                      <span className="date">제품 태그</span>
                      <a href="#">{refundDetail.tag}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 본문 종료 */}
      </div>
    </>
  );
}

export default AdminControlPanelRefund;
