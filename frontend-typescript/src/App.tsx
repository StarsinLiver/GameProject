import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/game-servers/Games";
import Location from "./pages/location/Location";
import Faq from "./pages/support/Faq";
import Contact from "./pages/support/Contact";
import News from "./pages/news/News";
import About from "./pages/company/About";
import Affliate from "./pages/company/Affliate";
import Login from "./pages/more-pages/Login";
import Register from "./pages/more-pages/Register";
import NewsSingle from "./pages/news/NewsSingle";
import Elements from "./pages/Elements";
import CartList from "./pages/Cart/CartList";
import CheckOut from "./pages/Cart/Checkout";
import { SuccessPage } from "./pages/Cart/Success";
import Fail from "./pages/Cart/Fail";
import AdminControllPanel from "./pages/more-pages/admin/AdminControllPanel";
import ForgotPassword from "./pages/more-pages/ForgotPassword";
import HomePage from "./pages/homepage/HomePage";
import AdminControlPanelModify from "./pages/more-pages/admin/AdminControlPanelModify";
import GameDetail from "./pages/game-servers/GameDetail";
import AdminControlPanelRefundList from "./pages/more-pages/admin/AdminControlPanelRefundList";
import AdminControlPanelRefund from "./pages/more-pages/admin/AdminControlPanelRefund";
import GameTagAction from "./pages/game-servers/GameTagAction";
import GameTagAdventure from "./pages/game-servers/GameTagAdventure";
import GameTagSimulation from "./pages/game-servers/GameTagSimulation";
import GameTagIndi from "./pages/game-servers/GameTagIndi";
import GameTagCasual from "./pages/game-servers/GameTagCasual";
import GameTagStrategy from "./pages/game-servers/GameTagStrategy";
import GameTagRpg from "./pages/game-servers/GameTagRpg";
import UserLibrary from "./pages/more-pages/user/UserLibrary";
import AdminControlPanelQnaList from "./pages/more-pages/admin/AdminControlPanelQnaList";
import AdminControlPanelQna from "./pages/more-pages/admin/AdminControlPanelQna";
import UserQnaList from "./pages/more-pages/user/UserQnaList";
import UserRefund from "./pages/more-pages/user/UserRefund";
import UserQna from "./pages/more-pages/user/UserQna";
import UserAddQna from "./pages/more-pages/user/UserAddQna";
import AddNews from "./pages/news/AddNews";
import NewsDetail from "./pages/news/NewsDetail";
import AdminGamesDetail from "./pages/more-pages/admin/AdminGameDetail";
import AdminLibrary from "./pages/more-pages/admin/AdminLibrary";
import Oauth2 from "./pages/more-pages/Oauth2";
import ResetPassword from "./pages/more-pages/ResetPassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="dark-scheme">
      <div id="wrapper">
        {/* scroll to top 왼쪽 */}
        <div className="float-text show-on-scroll">
          <span>
            <a href="#">Scroll to top</a>
          </span>
        </div>
        <div className="scrollbar-v show-on-scroll"></div>
        {/* <!-- page preloader begin --> */}
        <div id="de-loader"></div>
        {/* <!-- page preloader close --> */}

        {/* 공통 부분 Header */}
        <Header />

        {/* Router */}
        <Routes>
          {/* HomePage */}
          {/* <Route path="/index" element={<Index />} /> */}
          <Route path="/" element={<HomePage />} />

          {/* Game Servers */}
          <Route path="/games" element={<Games />} />
          <Route path="/game-detail/:pid" element={<GameDetail />} />
          <Route path="/game-tag-action" element={<GameTagAction />} />
          <Route path="/game-tag-adventure" element={<GameTagAdventure />} />
          <Route path="/game-tag-simulation" element={<GameTagSimulation />} />
          <Route path="/game-tag-strategy" element={<GameTagStrategy />} />
          <Route path="/game-tag-rpg" element={<GameTagRpg />} />
          <Route path="/game-tag-casual" element={<GameTagCasual />} />
          <Route path="/game-tag-indi" element={<GameTagIndi />} />

          {/* Location */}
          <Route path="/location" element={<Location />} />

          {/* Support */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />

          {/* News */}
          <Route path="/news" element={<News />} />
          <Route path="/news/:uuid" element={<NewsSingle />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/news-detail/:uuid" element={<NewsDetail />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/affliate" element={<Affliate />} />

          {/* more-pages */}
          {/* 로그인 , 회원가입 , 이메일 , 패스워드 찾기 */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/oauth2/code/:registrationId"
            element={<Oauth2 />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />

          {/* 어드민 계정 */}
          <Route path="/admin-library" element={<AdminLibrary />} />
          <Route path="/control-panel" element={<AdminControllPanel />} />
          <Route path="/control-panel/:pid" element={<AdminGamesDetail />} />
          <Route
            path="/control-panel-modify"
            element={<AdminControlPanelModify />}
          />
          <Route
            path="/control-panel-refund"
            element={<AdminControlPanelRefundList />}
          />
          <Route
            path="/control-panel-refund/:lid"
            element={<AdminControlPanelRefund />}
          />
          <Route
            path="/control-panel-qna"
            element={<AdminControlPanelQnaList />}
          />
          <Route
            path="/control-panel-qna/:qid"
            element={<AdminControlPanelQna />}
          />

          {/* 유저 계정 */}
          <Route path="/user-library" element={<UserLibrary />} />
          <Route path="/user-qna-list" element={<UserQnaList />} />
          <Route path="/user-qna/:qid" element={<UserQna />} />
          <Route path="/add-user-qna/:userId" element={<UserAddQna />} />
          <Route path="/user-refund/:lid" element={<UserRefund />} />

          {/* 나머지 않쓰이는? 것들인가 */}
          <Route path="/elements" element={<Elements />} />
          {/* <Route path="/news-single" element={<NewsSingle />} /> */}

          {/* shop */}
          <Route path="/cart" element={<CartList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<Fail />} />

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 공통 부분 Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
