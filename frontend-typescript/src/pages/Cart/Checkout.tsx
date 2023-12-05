import { useCallback, useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";

// 고유 문자열 식별자 생성기(unique string ID generator)
import { nanoid } from "nanoid";
import ICart from "../../types/ICart";
import CartService from "../../services/cart/CartService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import designesis from "../../assets/js/designesia";
import { Link, useNavigate } from "react-router-dom";
import UserLibraryService from "../../services/user/UserLibraryService";
import IUser from "../../types/auth/IUser";
import ICartDto from "../../types/Dto/ICartDto";

const clientKey = `${process.env.REACT_APP_TOSS_PAYMENTS_CLIENT_KEY}`; // 토스페이먼츠에서 발급한 테스트 클라이언트 키
const customerKey = `${process.env.REACT_APP_TOSS_PAYMENTS_CUSTOMER_KEY}`; // 내 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID

function CheckOut() {
  const [render, setRender] = useState<Boolean>(false);
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    designesis();

    (async () => {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
      // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

      // ------  결제 UI 렌더링 ------
      // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
      // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 아래 variantKey는 문서용 테스트키와 연동되어 있습니다. 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
        { variantKey: "DEFAULT" }
      );

      // ------  이용약관 UI 렌더링 ------
      // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      paymentWidget.renderAgreement(
        "#agreement",
        { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
      );
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [render]);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  // Todo : 공유 저장소 변수(state.변수명) 가져오기
  // Todo : 사용법 : useSelector((state) => {state.변수명})
  // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
  const { user } = useSelector((state: RootState) => state.auth);

  const userName = useSelector((state: RootState) => state.auth.user?.name);
  // 변수정의
  // cart 변수
  const [cart, setCart] = useState<Array<ICartDto>>([]);
  const [userDto, setUserDto] = useState<IUser>();

  const [point, setPoint] = useState<number>(0);

  // 페이지
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [count, setCount] = useState(1);

  // 장바구니 전체조회

  const retrieveCart = () => {
    CartService.getAll(user?.userId, page - 1, pageSize)
      .then((response: any) => {
        const { cart, priceSum, totalPages, userDto } = response.data;
        setCart(cart);
        setUserDto(userDto);
        setPrice(priceSum);
        setCount(totalPages);
        setRender(true);
      })
      .catch((e: Error) => {
       
      });
  };

  // 금액 합계함수
  const priceSum = () => {
    const changePrice = price - point;
    if (changePrice === 0) {
      setPrice(1);
    } else {
      setPrice(changePrice);
    }
  };

  useEffect(() => {
    retrieveCart();
  }, [page, pageSize]);

  const handleChange = (event: any) => {
    setPoint(event.target.value);
  };

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [render, price]);

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
          <h2
            className="container text-center wow fadeInUp mb20 mt-5"
            data-wow-delay=".2s"
          >
            결제하기
          </h2>
        </section>
        {/* <!-- section close --> */}

        <div className="container">
          <br />
          <h3>🛒 {userName}님의 주문내역</h3>
          <hr />
          <div>
            {cart &&
              cart.map((data) => (
                <div className="card mb-2 bg-dark">
                  <div className="card-body m-2">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">
                      <span>
                        {data.discount !== 0 && (
                          <>
                            <del>{data.price} 원</del> {data.discount}% 할인{" "}
                            <br />
                          </>
                        )}
                        {`금액 : ${data.finalPrice}원`}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            <h3 className="mt-5 mb-5">
              총 금액 : {cart && price.toLocaleString()}원
            </h3>
            <h5 className="coupon-title">🎫 포인트</h5>
            <div>
              {/* 쿠폰 적용하는 부분 price 부분을 수정 */}
              <label>
                {userDto?.point && price < userDto?.point && (
                  <input
                    type="range"
                    onChange={handleChange}
                    style={{ width: "140px" }}
                    value={point}
                    max={price}
                    min="0"
                    step="10"
                  />
                )}
                {userDto?.point && price > userDto?.point && (
                  <input
                    type="range"
                    onChange={handleChange}
                    style={{ width: "140px" }}
                    value={point}
                    max={userDto.point}
                    min="0"
                    step="10"
                  />
                )}
                &nbsp;&nbsp;&nbsp; | &nbsp; {userDto?.point} 원 포인트 중{" "}
                {point} 원 사용
              </label>
              <br />
            </div>
            <hr />

            <div id="payment-widget" />
            <div id="agreement" />
            <div className="text-center">
              <button
                className="btn-main mt-5 mb-5 "
                onClick={async () => {
                  const paymentWidget = paymentWidgetRef.current;

                  try {
                    priceSum();

                    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                    // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
                    // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보

                    await paymentWidget?.requestPayment({
                      orderId: nanoid(), // 주문 고유 ID
                      orderName: "Game product", //  장바구니에 담긴 상품명
                      customerName: `${userDto?.name}`,  //  구매자 이름
                      customerEmail: `${userDto?.email}`, //   구매자 이메일
                      successUrl: `${window.location.origin}/success`, //   결제 성공시 이동되는 url
                      failUrl: `${window.location.origin}/fail`, //   결제 실패시 이동되는 url
                    });
                  } catch (error) {
                    // 에러 처리하기
                    console.error(error);
                  }
                }}
              >
                <Link to="#" onClick={priceSum} style={{ color: "#FFFFFF" }}>
                  {` 결제하기`}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
