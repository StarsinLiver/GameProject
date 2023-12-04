import React, { useEffect } from "react";
import designesis from "../assets/js/designesia";
import { Link } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    designesis();
  });

  return (
    <div className="no-bottom no-top" id="content">
     
      {/* 입력 부분 */}
      <section >
        <div className="container mt-6">
          <div id="notfound-wrapper">
            <div id="notfound text-center">
              <div className="notfound">
                <div
                  className="notfound-404 wow bounceInDown text-center mb-5"
                  
                >
                  <h1>⚠ Oops!</h1>
                </div>
                <div className="text-center mb-5">
                  <h2>404 - Not Found</h2>
                  <h2>페이지를 찾을 수 없습니다.</h2>
                </div>
                <div className="text-center">
                  <h4>
                    원하시는 결과를 찾을 수 없습니다.
                    <br />
                    올바른 URL을 입력하였는지 확인하세요. 자세한 내용은 페이지
                    관리자에게 문의바랍니다.
                  </h4>
                  <button className="btn-main mt-5">
                    <Link to="/" style={{ color: "white" }}>
                      홈으로
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 입력 부분 끝 */}
    </div>
  );
}

export default NotFound;
