import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import designesis from "../../assets/js/designesia";
import {  useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartService from "../../services/cart/CartService";

import ILibrary from "../../types/ILibrary";
import IUser from "../../types/auth/IUser";
import ICartDto from "../../types/Dto/ICartDto";
import LibraryService from "../../services/library/LibraryService";
import UserService from "../../services/user/UserService";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// 공백 추가
let blank = {
  height: "200px",
};

let head = {
  height: "200px",
};

let text = {
  height: "350px",
};

export function SuccessPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  let [render, setRender] = useState<boolean>(false);
  const queryParameters = new URLSearchParams(window.location.search);
  let queryAmount: any = queryParameters.get("amount");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    retrieveCart();
    designesis();
  }, []);

  useEffect(() => {
    if (render) success();
  }, [render]);

  const [cart, setCart] = useState<Array<ICartDto>>([]);
  const [userDto, setUserDto] = useState<IUser>();
  let navigate = useNavigate();

  // 금액 합계함수
  const priceSum = (cart: any) => {
    let price = 0;
    for (let index = 0; index < cart.length; index++) {
      price += cart[index].finalPrice;
    }
    setPrice(price);
  };

  // 장바구니 전체 조회
  const retrieveCart = () => {
    CartService.getAll(user?.userId, 0, 100)
      .then((response: any) => {
       
        const { cart, userDto } = response.data;
        setCart(cart);
        setUserDto(userDto);
        priceSum(cart);
        setRender(true);
      })
      .catch((e: Error) => {
             });
  };

  const success = () => {
    
    // cart가 유효한지 확인
    if (cart && userDto && cart.length > 0) {
      // Todo : 유저 수정 함수

      let point =
        (userDto.point as number) - (price - queryAmount) + price / 100;
    

      UserService.updatePoint(user?.userId, point)
        .then((response: any) => {
       
        })
        .catch((e: Error) => {
        
        });

      // Todo : Cart 와 Library 업데이트
      cart.map((value, index) =>
        CartService.updateCompleteYn(value.cid)
          .then((response: any) => {
            

            let data: ILibrary = {
              lid: null,
              userId: value.userId,
              pid: value.pid,
              finalPrice: value.finalPrice,
              insertTime: "",
              requestRefund: null,
              refundReason: "",
              refund: null,
              refundTime: null,
            };

            LibraryService.create(data)
              .then((response: any) => {
                            })
              .catch((e: Error) => {
              
              });
          })
          .catch((e: Error) => {
           
            navigate("/checkout");
          })
      );
      sendVerificationEmail();
    }
  };

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
                결제가 완료되어 내역을 알려드립니다.

                    
                    ${cart.map(
                      (value) =>
                        "상품 아이디 : " +
                        value.pid +
                        "\n상품 이름 : " +
                        value.name +
                        "\n상품 가격 : " +
                        value.finalPrice +
                        "\n\n"
                    )}
                    
                    결제 금액 : ${price} 원

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
      .then((response: any) => {
       
        // setIsEmailSent(true);
        // 이메일 전송 성공 처리 로직 추가
          // 토스트 메시지 표시
    toast.success(
      "저희 사이트에서 구매해주셔서 감사합니다. 결제 완료 정보를 메일로 발송해드렸습니다.."
    );
      })
      .catch((error: Error) => {
        
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
            src={require("../../assets/images/background/subheader-game.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container">
            <div className="row gx-5 align-items-center">
              <div style={blank}></div>
              <h2
                className="text-center wow fadeInUp"
                data-wow-delay=".2s"
                style={head}
              >
                구매완료
              </h2>

              <h4 style={text} className="text-center wow fadeInUp">
                구매가 정상적으로 완료되었습니다
              </h4>
              <div className="swiper-wrapper">
                <div className="col-lg-12 offset-lg-5">
                  <a className="btn-main mb-5" href="/">
                    홈화면으로 이동
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- section close --> */}
      </div>
      <ToastContainer
        style={{ width: "400px" }} // Set your preferred width here
        position="bottom-center" // Set the position to bottom-center
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
