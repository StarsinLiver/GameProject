import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import IOauth2 from "../../types/auth/IOauth2";
import { useAppDispatch } from "../../store/store";
import { oauthLogin } from "../../store/slices/auth";
import designesis from "../../assets/js/designesia";

function Oauth2() {
  useEffect(() => {
    designesis();
    console.log("registrationId",registrationId);
    console.log("code" , code);
  }, []);
  let navigate = useNavigate();
  let { registrationId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링을 searchParams 형태로 가져오고
  const code = searchParams.get("code"); // offset 값 변수에 저장

  let app: IOauth2 = {
    code,
    registrationId,
  };

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  // Todo : 공유 로그인 함수 호출
  dispatch(oauthLogin(app))
    // Todo : .unwrap() : redux의 공유함수 에러처리를 샐행하게 하는 함수
    .unwrap()
    .then(() => {
      navigate("/");
      window.location.reload(); // 페이지 새로고침
    })
    .catch((e: Error) => {
      console.log(e);
      alert("아이디 또는 비밀번호가 맞지 않습니다.");
      navigate("/login");
    });

  return (
    <>
      <div className="float-text show-on-scroll">
        <span>
          <a href="#">Scroll to top</a>
        </span>
      </div>
      <div className="scrollbar-v show-on-scroll"></div>
      {/* <!-- page preloader begin --> */}
      <div id="de-loader"></div>
      {/* <!-- page preloader close --> */}
    </>
  );
}

export default Oauth2;
