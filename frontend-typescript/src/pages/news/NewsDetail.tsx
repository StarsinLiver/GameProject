import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import designesis from "../../assets/js/designesia";
import FileDbService from "../../services/news/advanced/FileDbService";
import INews from "../../types/advanced/INews";

function NewsDetail() {
  useEffect(() => {
    designesis();
  }, []);

  const { uuid } = useParams();
  const initialFileDb = {
    uuid: "",
    fileTitle: "",
    fileContent: "",
    fileUrl: "",
    insertTime: "",
    updateTime: ""
  };

  const [uploadFileDb, setUploadFileDb] = useState<INews>(initialFileDb);
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [previewImage, setPreviewImage] = useState<string | undefined>(uploadFileDb.fileUrl);
  let navigate = useNavigate();

  const getFileDb = (uuid: string) => {
    FileDbService.getFileDb(uuid)
      .then((response: any) => {
        setUploadFileDb(response.data);
        setPreviewImage(response.data.fileUrl); // 수정 전 이미지를 먼저 미리보기에 표시
    
      })
      .catch((e: Error) => {
      
      });
  };

  useEffect(() => {
    if (uuid) getFileDb(uuid);
  }, [uuid]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUploadFileDb({ ...uploadFileDb, [name]: value });
  };

  const updateFileDb = () => {
    let currentFile = selectedFiles?.[0];

    FileDbService.updateFileDb(uploadFileDb, currentFile)
      .then((response: any) => {
       
        alert("수정되었습니다.");
        navigate(`/news/${uuid}`);
      })
      .catch((e: Error) => {
     
      });
  };

  const selectFile = (event: any) => {
    setSelectedFiles(event.target.files as FileList);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="subheader" className="jarallax">
          <img
            src={require("../../assets/images/background/subheader-news.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">News</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  수정하기
                </h2>
                <br />
              </div>
            </div>
          </div>
        </section>

        <div className="edit-form container">
          <div className="mb-3 col-md-12">
            <label htmlFor="fileTitle" className="form-label">
              제목
            </label>
            <input
              type="text"
              className="form-control"
              id="fileTitle"
              required
              name="fileTitle"
              value={uploadFileDb.fileTitle}
              onChange={handleInputChange}
              style={{ background: 'transparent', color: 'white' }}
            />
          </div>

          <div className="mb-3 col-md-12">
            <label htmlFor="fileContent" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="fileContent"
              required
              name="fileContent"
              value={uploadFileDb.fileContent}
              onChange={handleInputChange}
              style={{ height: 400 + "px", background: 'transparent', color: 'white' }}
            />
          </div>

          <div className="mb-3 col-md-12">
            <h4>이미지 미리보기</h4>
            {previewImage && (
              <img
                src={previewImage}
                className="card-img-top"
                alt="미리보기"
                style={{
                  width: "360px",
                  height: "200.14px",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>

          <div className="container text-center">
            <label
              className="btn btn-default p-0 mb-3"
              style={{ borderRadius: "10px", width: "300px", height: "30px" }}
            >
              <input
                type="file"
                onChange={selectFile}
                style={{
                  color: "black",
                  backgroundColor: "white",
                  width: "300px",
                  height: "30px",
                }}
              />
            </label>
            <br />
            {!selectedFiles && (
              <div className="text-danger">🚨수정될 이미지 파일 업로드는 필수입니다.</div>
            )}
            <button
              className="btn btn-success mb-3 me-3"
              disabled={!selectedFiles}
              onClick={updateFileDb}
              style={{ borderRadius: "10px", width: "100px", height: "40px" }}
            >
              수정하기
            </button>
            <Link to={`/news/${uuid}`}>
              <button
                className="btn btn-warning mb-3"
                style={{ borderRadius: "10px", width: "100px", height: "40px" }}
              >
                뒤로가기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsDetail;
