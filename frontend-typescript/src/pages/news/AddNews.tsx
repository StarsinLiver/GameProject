import React, { useEffect, useState } from "react";
import designesis from "../../assets/js/designesia";
import INews from "../../types/advanced/INews";
import FileDbService from "../../services/news/advanced/FileDbService";
import { useNavigate } from "react-router-dom";

function AddNews() {
  useEffect(() => {
    designesis();
  }, []);

  // todo: 변수 정의
  // todo: 객체 초기화
  const initialNews = {
    uuid: null, // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileTitle: "", // 제목
    fileContent: "", // 내용
    fileUrl: "", // 파일 다운로드 URL
    insertTime: "", // 입력시간
    updateTime: "" // 수정시간
  };

  // uploadFileDb 객체
  const [uploadFileDb, setUploadFileDb] = useState<INews>(initialNews);
  // todo 화면에 성공/실패 메시지 찍기 변수
  const [message, setMessage] = useState<String>("");
  //   todo: 현재 선택한 파일을 저장할 배열변수
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  let navigate = useNavigate();

  // todo : 함수 정의
  // todo: input 태그에 수동 바인딩
  const handleInputChange = (event: any) => {
    const { name, value } = event.target; // 화면값
    setUploadFileDb({ ...uploadFileDb, [name]: value }); // 변수저장
  };

  // 저장 함수
  const upload = () => {
    // 선택된 이미지 파일 배열변수
    // 변수명? = 옵셔널체이닝, 변수의 값이 null이면 undefined 바꾸어줌
    let currentFile = selectedFiles?.[0]; // 첫번째 선택된 파일

    FileDbService.upload(uploadFileDb, currentFile) // 저장 요청
      .then((response: any) => {
        alert("업로드 성공");
        
        navigate("/news");
      })
      .catch((e: Error) => {
       
      });
  };

  // todo : 파일 선택상자에서 이미지 선택시 실행되는 함수
  // 파일 선택상자 html 태그 : <input type="file" />

  const selectFile = (event: any) => {
    // 화면에서 이미지 선택시 저장된 객체 : event.target.files
    // 변수명 as 타입명 : 개발자가 변수가 무조건 특정타입이라고 보증함
    //                   (타입스크립트에서 체크 안함)
    setSelectedFiles(event.target.files as FileList);
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        {/* 상단부분 제목 */}
        <div id="top"></div>
        {/* <!-- section begin --> */}
        <section id="subheader" className="jarallax">
          <img
            src={require("../../assets/images/background/subheader-news.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle mb-3">News</div>
              </div>
              <div className="col-lg-6">
                <h2>글쓰기</h2>
                <br />
              </div>
            </div>
          </div>
        </section>
        {/* 상단 타이틀 끝 */}

        {/* 입력 부분 */}
        <section>
          <div className="container">
            <div className="row">
              <div className="spacer-double"></div>

              <div className="col-lg-12">
                <div
                  className="padding40 rounded-10"
                  data-bgcolor="rgba(255, 255, 255, .1)"
                >
                  <h4>뉴스 글쓰기</h4>
                  <hr />

                  <div className="row align-items-center container">
                    <div
                      id="contact_form"
                      className="position-relative z1000 mb-3"
                    >
                      <div className="col-lg-12">
                        <div className="row g-3 align-items-center mb-3">
                          <div className="col-1">
                            <label htmlFor="fileTitle" className="form-label">
                              제목
                            </label>
                          </div>

                          <div className="col-10">
                            <input
                              type="text"
                              className="form-control"
                              id="fileTitle"
                              required
                              name="fileTitle"
                              value={uploadFileDb.fileTitle}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <!-- 이미지내용 입력 박스 시작 --> */}
                      <div className="col-lg-12">
                        <div className="row g-3 align-items-center mb-3">
                          <div className="col-1">
                            <label htmlFor="fileContent" className="form-label">
                              내용
                            </label>
                          </div>

                          <div className="col-10 mb-3">
                            <textarea
                              name="fileContent"
                              id="fileContent"
                              className="form-control"
                              placeholder=""
                              value={uploadFileDb.fileContent}
                              onChange={handleInputChange}
                              required
                              style={{ height: "300px" }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 이미지를 업로드하지 않은 경우 메시지 출력 */}
                      {!selectedFiles && (
                        <div className="alert alert-warning wow fadeInUp" role="alert">
                          🚨이미지 업로드는 필수입니다.
                        </div>
                      )}
                      {/* <!-- 이미지내용 입력 박스 끝 --> */}
                    </div>

                    <hr />
                    <h4>💾이미지 업로드</h4>

                    <div className="input-group mb-3">
                      {/* upload 선택상자/버튼 start */}
                      <input
                        type="file"
                        className="form-control mb-3"
                        id="inputGroupFile02"
                        onChange={selectFile}
                      />
                    </div>
                    {/* upload 선택상자/버튼 end */}

                    <hr />

                    <button
                      className="btn btn-outline-warning col-3 container"
                      type="button"
                      id="inputGroupFileAddon04"
                      disabled={!selectedFiles}
                      onClick={upload}
                      style={{ width: "200px ", height: "38px" }}
                    >
                      글쓰기
                    </button>

                    {/* upload 성공/실패 메세지 출력 시작 */}
                    {message && (
                      <div className="alert alert-success" role="alert">
                        {message}
                      </div>
                    )}
                    {/* upload 성공/실패 메세지 출력 끝 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 입력 부분 끝 */}
      </div>
    </>
  );
}

export default AddNews;
