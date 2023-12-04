import React, { useEffect } from 'react'
import designesis from '../../assets/js/designesia';
import { useNavigate } from 'react-router-dom';

// 공백 추가
let blank = {
  height: "200px",
};

let head = {
  height: "200px",
};

let text = {
  height : "350px",
}

function NullPage() {
  useEffect(()=> {
    designesis();
  },[])

  let navigate = useNavigate()

  const pageBack = () => { 
   navigate(-1);
   }

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
                검색하신 상품이 없습니다.
              </h2>

              <h4 style={text} className="text-center wow fadeInUp">
                현재 상품을 준비중에 있습니다. 잠시만 기다려 주세요.
                </h4>
              <div className="swiper-wrapper">
              <div className="col-lg-12 offset-lg-5">
                  <button className="btn-main mb-5" onClick={pageBack}>
                    뒤로가기
                  </button>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- section close --> */}
      </div>
    </>
  )
}

export default NullPage