import React, { useEffect, useState } from 'react';

import designesis from '../../../assets/js/designesia';
import IQna from '../../../types/IQna';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminQnaService from '../../../services/admin/AdminQnaService';

function AdminControlPanelQna() {
    useEffect(() => {
        designesis();
    }, []);

    // TODO: 변수 정의
    // 검색어 키워드 변수(keyword)
    // qnaList 배열 변수에서 전송한 기본키(qid)
    const { qid } = useParams();

    // qna 변수 초기화
    const initialQna = {
        qid: '',
        userId: 0,
        questioner: '',
        question: '',
        answerer: '',
        answer: '',
        answerYn: 'N',
    };

    // qna 변수
    const [qna, setQna] = useState<IQna>(initialQna);

    // TODO: 함수 정의
    // todo : 첫번째 실행(전체조회 함수)
    useEffect(() => {
        if (qid) getQna(qid);
    }, [qid]);

    // input 태그에 수동 바인딩
    const handleInputChange = (event: any) => {
        const { name, value } = event.target; // 화면값
        setQna({ ...qna, [name]: value }); // 변수저장
    };

    // 강제페이지 이동 함수
    let navigate = useNavigate();

    // qid 값이 바뀌면 실행
    useEffect(() => {
        if (qid) getQna(qid);
    }, [qid]);

    // todo: Qna 상세조회 함수
    const getQna = (qid: string) => {
        AdminQnaService.get(qid) // 벡엔드로 상세조회 요청
            .then((response: any) => {
                setQna(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // todo: 수정 함수
    const updateQna = () => {
        let data: IQna = {
            qid: qna.qid,
            userId: qna.userId,
            questioner: qna.questioner,
            question: qna.question,
            answer: qna.answer,
            answerer: '관리자',
            answerYn: 'Y',
        };

        AdminQnaService.update(qid, data)
            .then((response: any) => {
                alert('답변이 완료되었습니다.');
                navigate(`/control-panel-qna`);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
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
                        src={require('../../../assets/images/background/subheader-game.webp')}
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
                                    Qna 답변 페이지
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
                            <div className="de-box-cat wow fadeInUp mb-3">
                                <h2 style={{ display: 'inline' }}>Question</h2>
                                &nbsp; &nbsp;
                                <i className="fa fa-solid fa-question"></i>
                                <br />
                                <br />
                                <div id="contact_form" className="position-relative z1000 wow fadeInUp mb-3">
                                    <div className="row gx-4" style={{ display: 'block' }}>
                                        <div className="col-lg-3 mb10">
                                            <div className="field-set">
                                                <span className="d-label">Questioner</span>
                                                <input
                                                    disabled
                                                    type="text"
                                                    name="questioner"
                                                    id="questioner"
                                                    className="form-control"
                                                    value={qna.questioner}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="field-set mb20">
                                            <span className="d-label">Question</span>
                                            <textarea
                                                disabled
                                                name="question"
                                                id="question"
                                                className="form-control"
                                                value={qna.question}
                                                required
                                                style={{ height: '300px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 공백용 div */}
                            <div className="spacer-single"></div>

                            <div className="de-box-cat wow fadeInUp mb-3">
                                <h2 style={{ display: 'inline' }}>Answer</h2>
                                &nbsp; &nbsp;
                                <i className="fa fa-solid fa-exclamation"></i>
                                <br />
                                <br />
                                <div id="contact_form" className="position-relative z1000 wow fadeInUp mb-3">
                                    <div className="row gx-4" style={{ display: 'block' }}>
                                        <div className="col-lg-3 mb10">
                                            <div className="field-set">
                                                <span className="d-label">Answerer</span>
                                                <input
                                                    type="text"
                                                    name="answerer"
                                                    id="answerer"
                                                    className="form-control"
                                                    placeholder="answerer"
                                                    disabled
                                                    value={'관리자'}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="field-set mb20">
                                                <span className="d-label">Answer</span>
                                                <textarea
                                                    name="answer"
                                                    id="answer"
                                                    className="form-control"
                                                    placeholder="Answer"
                                                    value={qna.answer}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{ height: '300px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        role="button"
                                        className="btn-main opt-1"
                                        style={{
                                            width: '100px',
                                            fontSize: '15px',
                                        }}
                                        onClick={updateQna}
                                    >
                                        답변하기
                                    </a>

                                    <Link
                                        role="button"
                                        className="btn-main opt-1 ms-3"
                                        style={{
                                            width: '100px',
                                            fontSize: '15px',
                                        }}
                                        to="/control-panel-qna"
                                    >
                                        돌아가기
                                    </Link>
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

export default AdminControlPanelQna;
