import React, { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import CartService from "../../services/cart/CartService";
import designesis from "../../assets/js/designesia";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ICartDto from "../../types/Dto/ICartDto";
import { ToastContainer, toast } from "react-toastify";

function CartList() {
  useEffect(() => {
    designesis();
  }, []);
  // 변수정의
  // cart 변수
  const [cart, setCart] = useState<Array<ICartDto>>([]);
  // 페이지
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [count, setCount] = useState(1);

  const { user } = useSelector((state: RootState) => state.auth);

  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  // 강제페이지 이동 함수
  let navigate = useNavigate();

  useEffect(() => {
    retrieveCart();
  }, [page, pageSize]);

  const retrieveCart = () => {
    CartService.getAll(user?.userId , page - 1, pageSize)
      .then((response: any) => {
        const { cart, totalPages } = response.data;
        setCart(cart);
        setCount(totalPages);
      })
      .catch((e: Error) => {
       
      });
  };

  // 삭제 확인 한번더
  const onRemove = (scno: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteCart(scno);
    } else {
      toastMessage("취소되었습니다.");
    }
  };

  const deleteCart = (scno: number) => {
    CartService.remove(scno)
      .then((response: any) => {
        toastMessage("삭제되었습니다.");
        retrieveCart();
      })
      .catch((e: Error) => {
    console.log(e);
      });
  };

  // 합계 함수
  const priceSum = () => {
    let price = 0;
    for (let index = 0; index < cart.length; index++) {
      price += cart[index].finalPrice;
    }
    return price;
  };

  // (삭제) 버튼 커지지 않게
  let dbtn = {
    border: "1px radius rgba(0, 0, 0, 0.05)",
  };

  // 여백
  let text = {
    height: "200px",
  };

  const goOrder = () => {
    navigate("/checkout");
  };

  const toastMessage = (title : any = null ,message: any = null) => {
    toast.info(
      <div>
        <div>{title}</div>
        <div style={{ whiteSpace: "pre-line" }}>{message}</div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
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
          <h2
            className="container text-center wow fadeInUp mb-5 mt-5"
            data-wow-delay=".2s"
          >
            장바구니
            <br />
            <br />
            {cart && cart.length > 0 && (
              <h4>총 {cart.length}개의 품목이 담겨있습니다.</h4>
            )}
          </h2>
        </section>
        {/* <!-- section close --> */}

        <section className="no-top no-bottom">
          <div className="swiper-wrapper">
            {/* 장바구니에 품목이 있을때 */}

            {cart && cart.length > 0 ? (
              <div className="container">
                {/* 장바구니 목록 */}
                <div className="row">
                  <div className="col-lg-12 text-center wow fadeInUp"></div>

                  <div className="row"></div>

                  {cart &&
                    cart.map((data, index) => (
                      <div className="mb-3">
                        <div
                          className="card custom-card bg-dark mb-3"
                          key={data.userId}
                          style={{ borderRadius: "20px", position: "relative" }}
                        >
                          <div className="row g-0 p-4">
                            <div className="col-md-2 p-2">
                              <img
                                src={data.imgUrl}
                                className="img-fluid"
                                alt="..."
                                style={{ height: 20 + "vh", width: 30 + "vw" }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="containercard-body m-2 ">
                                {/* 상품명 */}
                                <h3 className="card-title">{data.name}</h3>
                                {/* 가격 */}
                                <h3 className="card-title">
                                {data.discount !== 0 && <><del>{data.price.toLocaleString()} 원</del> <br/></>} 
                                  {data.finalPrice.toLocaleString()} 원
                                </h3>

                                {/* 할인율 */}
                                {data.discount !== 0 && (
                                  <h5
                                    className="card-title"
                                    style={{ color: "orange" }}
                                  >
                                    {data.discount} % 할인 제품
                                  </h5>
                                )}

                                <div className="mt-3">
                                  {/* 삭제 버튼 시작 */}
                                  <button
                                    // type="button"
                                    onClick={() => onRemove(data.cid)}
                                    // deleteCart(data.cid)}

                                    className="btn-danger w-25 offset-lg-11 mt-3"
                                    style={{ borderRadius: "5px" }}
                                  >
                                    장바구니에서 삭제하기
                                  </button>
                                  {/* 삭제 버튼 끝 */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="corner-number">#{index + 1}</div>
                          
                        </div>
                      </div>
                    ))}

                  {/* 장바구니 목록 끝 */}

                  {/* todo: 나중에 전체조회 페이지로 이동 링크 */}
                  <div className="offset-lg-10 mt-2">
                    <Link className="btn-main" to="/">
                      장바구니에 품목 추가하기
                    </Link>
                  </div>
                  <h3 className="mt-5 mb-5">
                    총 금액 : {cart && priceSum().toLocaleString()}원
                  </h3>
                </div>

                {/* todo: 주문하기 나중에 checkout에 링크 */}
                <div className="container offset-lg-4">
                  {cart && (
                    <button
                      type="button"
                      onClick={goOrder}
                      className="btn-main w-25 mt-5 mb-5 "
                    >
                      주문하기
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* 장바구니에 품목이 없을때 */
              <>
                <div className="container">
                  <div className="row gx-5 align-items-center">
                    <div className="text-center">
                      <h4>
                        <div style={text}>
                          장바구니에 상품이 없습니다 <br />
                          <br /> 추가하러 가시겠습니까?
                        </div>
                        <div className="col-lg-12 offset-lg-5">
                          <Link className="btn-main mt-5 mb-5" to="/">
                            전체조회 페이지로 이동
                          </Link>
                        </div>
                      </h4>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ width: "600px" }}
              />
        </section>
      </div>
    </>
  );
}

export default CartList;
