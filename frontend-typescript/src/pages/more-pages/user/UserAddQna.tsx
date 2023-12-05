import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IQna from '../../../types/IQna';
import designesis from '../../../assets/js/designesia';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import UserQnaService from '../../../services/user/UserQnaService';

function UserAddQna() {
    useEffect(() => {
        designesis();
    }, []);

    // TODO: 변수 정의
    // Todo : 공유 저장소 변수(state.변수명) 가져오기
    // Todo : 사용법 : useSelector((state) => {state.변수명})
    // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
    const { user } = useSelector((state: RootState) => state.auth);

    // qna 변수 초기화
    const initialQna = {
        qid: null, // 기본키
        userId: 0,
        questioner: '',
        question: '',
        answerer: '',
        answer: '',
        answerYn: 'N',
    };

    // qna 객체
    const [qna, setQna] = useState<IQna>(initialQna);
    // 저장버튼 클릭후 submitted = true 변경됨

    // input 태그에 수동 바인딩
    const handleInputChange = (event: any) => {
        const { name, value } = event.target; // 화면값
        setQna({ ...qna, [name]: value }); // 변수저장
    };

    // 저장 함수
    const saveQna = () => {
        // 임시 qna 객체
        var data: any = {
            userId: user?.userId,
            questioner: user?.name,
            question: qna.question,
            answerer: qna.answerer,
            answer: qna.answer,
            answerYn: qna.answerYn,
        };

        UserQnaService.create(data) // 저장 요청
            .then((response: any) => {
                setQna(initialQna);
                alert('질문이 제출 되었습니다.');
                navigate(`/user-qna-list`);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // 강제페이지 이동 함수
    let navigate = useNavigate();

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
                                <div className="subtitle wow fadeInUp mb-3">User</div>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                    질문 하기
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
                                                    value={user?.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="field-set mb20">
                                                <span className="d-label">Question</span>
                                                <textarea
                                                    name="question"
                                                    id="question"
                                                    className="form-control"
                                                    value={qna.question}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{ height: '300px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-main opt-1 mt-3"
                                        style={{ width: '100px', fontSize: '15px' }}
                                        onClick={saveQna}
                                    >
                                        제출하기
                                    </button>
                                    <Link
                                        role="button"
                                        className="btn-main opt-1 mt-3 ms-3"
                                        style={{
                                            width: '100px',
                                            fontSize: '15px',
                                        }}
                                        to={`/user-qna-list`}
                                    >
                                        돌아가기
                                    </Link>
                                </div>
                            </div>

                            {/* 공백용 div */}
                            <div className="spacer-single"></div>
                        </div>
                    </div>
                </section>
                {/* 본문 종료 */}
            </div>
        </>
    );
}

export default UserAddQna;
