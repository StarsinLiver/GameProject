import React, { useEffect } from 'react';
import designesis from '../../assets/js/designesia';

function Faq() {
    useEffect(() => {
        designesis();
    }, []);
    return (
        <>
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                {/* <!-- section begin --> */}
                <section id="subheader" className="jarallax">
                    <img
                        src={require('../../assets/images/background/subheader-faq.webp')}
                        className="jarallax-img"
                        alt=""
                    />
                    <div className="container z-1000">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="subtitle wow fadeInUp mb-3">Contact</div>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                    자주 묻는 질문
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- section close --> */}

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="accordion s2 wow fadeInUp">
                                    <div className="accordion-section">
                                        <div className="accordion-section-title" data-tab="#accordion-a1">
                                            게임 구매는 어떻게 이뤄지나요?
                                        </div>
                                        <div className="accordion-section-content" id="accordion-a1">
                                            <p>
                                                상품 목록을 확인하신 후, 구매가 완료되면 고객님의 이메일로 즉시 사용
                                                가능한 게임 키를 보내드립니다. <br />
                                                <br /> 해당 키를 본인이 사용하는 게임 플랫폼에 등록해주시면 됩니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-a2">
                                            포인트는 어떻게 얻고 또 어떻게 활용하나요?
                                        </div>
                                        <div className="accordion-section-content" id="accordion-a2">
                                            <p>
                                                게임을 구매하시면 게임 가격의 일부를 포인트로 적립 받으실 수 있습니다.{' '}
                                                <br />
                                                <br /> 적립된 포인트는 추후 다른 게임을 구매하실 때, 할인 수단으로
                                                활용하실 수 있습니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-a3">
                                            제가 한 질문의 답변은 어디서 확인하나요?
                                        </div>
                                        <div className="accordion-section-content" id="accordion-a3">
                                            <p>
                                                유저 본인의 라이브러리 페이지에 들어가시면, <br /> 내가 한 질문의 목록과
                                                답변 여부 및 답변 내용 등을 확인하실 수 있습니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-a4">
                                            구매한 게임을 환불하고 싶어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-a4">
                                            <p>
                                                유저 라이브러리 페이지에서 구매한 게임에 대한 환불을 진행하실 수
                                                있습니다. <br />
                                                <br /> 환불 요청은 관리자에게 전송되며, 환불 불가 사유에 위배 되지 않는
                                                한, 확인 즉시 처리됩니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-a5">
                                            구매하고 싶은 게임이 목록에 없어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-a5">
                                            <p>
                                                원하는 게임이 상품 목록에 없다면, 운영진에게 메세지를 보내주세요! <br />
                                                <br /> 검토 후 빠른 시일 안에 추가해 드리겠습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="accordion s2 wow fadeInUp">
                                    <div className="accordion-section">
                                        <div className="accordion-section-title" data-tab="#accordion-b1">
                                            상품 목록을 장르별로 한눈에 보고 싶어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-b1">
                                            <p>
                                                페이지 상단 Game 목록을 확인하시면, <br />
                                                <br /> 액션, RPG, 시뮬레이션 등, 다양한 장르의 게임을 한눈에 볼 수 있게
                                                정리된 페이지가 존재합니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-b2">
                                            계정 비밀번호를 변경하고 싶어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-b2">
                                            <p>
                                                유저 라이브러리 페이지에서 비밀번호를 비롯한 유저의 개인정보를 변경하실
                                                수 있습니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-b3">
                                            고객 응대 서비스가 존재하나요?
                                        </div>
                                        <div className="accordion-section-content" id="accordion-b3">
                                            <p>
                                                당사에서는 고객님의 요청을 이메일 메세지를 통해 전달받고 있습니다.{' '}
                                                <br />
                                                <br /> 스토어 이용 간 궁금한 점이 있다면 자유롭게 말씀해주세요.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-b4">
                                            할인 중이던 게임이 사라졌어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-b4">
                                            <p>
                                                당사의 게임 할인 이벤트는 일정과 수량에 맞춰 진행되고 있습니다. <br />
                                                <br /> 일정 상 마감되거나, 물량이 소진된다면 할인 이벤트는 조기에 종료될
                                                수 있습니다.
                                            </p>
                                        </div>
                                        <div className="accordion-section-title" data-tab="#accordion-b5">
                                            신규 출시 게임이나, 관련 소식들을 알고 싶어요.
                                        </div>
                                        <div className="accordion-section-content" id="accordion-b5">
                                            <p>
                                                페이지 상단부의 뉴스 페이지를 통해 새롭게 출시되는 게임 및 게임 업계에서
                                                이슈가 된 새로운 소식들을 확인하실 수 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="spacer-double"></div>

                            <div className="col-lg-12">
                                <div className="padding40 rounded-10" data-bgcolor="rgba(255, 255, 255, .1)">
                                    <div className="row align-items-center">
                                        <div className="col-lg-1">
                                            <img
                                                src={require('../../assets/images/icons/4.png')}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                        <div className="col-lg-9">
                                            <h4>원하시는 답변이 없으신가요? 저희에게 직접 알려주세요.</h4>
                                        </div>
                                        <div className="col-lg-2 text-lg-end">
                                            <a className="btn-main" href="contact">
                                                Contact Us
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Faq;
