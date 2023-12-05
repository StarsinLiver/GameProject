import React, { useEffect } from 'react';
import customMarquee from '../../assets/js/custom-marquee';
import designesis from '../../assets/js/designesia';

function Location() {
    useEffect(() => {
        customMarquee(); // 얘가 문제...
        designesis();
    }, []);
    return (
        <>
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>

                {/* <-- Location 지도 섹션 시작 --> */}
                <section className="jarallax">
                    <div className="de-gradient-edge-top"></div>
                    <div className="de-gradient-edge-bottom"></div>
                    <img src={require('../../assets/images/background/bg-grid.webp')} className="jarallax-img" alt="" />
                    <div className="container z-1000">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="subtitle wow fadeInUp mb-3">Location</div>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                                    <span className="text-gradient">Playhost</span> 팀은 <br />
                                    당신을 위해 매일 <br /> 새로운 게임을 제공합니다.
                                </h2>
                            </div>
                            <div className="col-lg-6 mt-5">
                                <p className="wow fadeInUp mt-4" style={{ lineHeight: '30px' }}>
                                    Playhost 팀은{' '}
                                    <span className="text-gradient" style={{ fontSize: '30px', fontWeight: '600' }}>
                                        대한민국
                                    </span>
                                    에 위치합니다. <br />
                                    대한민국에서 전 세계의 다양한 게임들을 손쉽고 빠르게 만나보세요! <br />
                                    당사는 귀하의 취향에 맞춘 이상적인 게임 경험을 제공하기 위해 노력하고 있습니다.
                                </p>
                            </div>

                            <div className="spacer-10"></div>

                            <div className="col-lg-12 wow fadeInUp">
                                <div className="mb-sm-0">
                                    <div className="de-map-hotspot">
                                        {/* <div className="de-spot wow fadeIn" style={{top:'39%', left:'20%'}}>
                                        <span>United&nbsp;States</span>
                                        <div className="de-circle-1"></div>
                                        <div className="de-circle-2"></div>
                                    </div> */}
                                        <div className="de-spot wow fadeIn" style={{ top: '42%', left: '84%' }}>
                                            <span>Korea</span>
                                            <div className="de-circle-1"></div>
                                            <div className="de-circle-2"></div>
                                        </div>

                                        <img
                                            src={require('../../assets/images/misc/world-map.webp')}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="no-bottom wow fadeInRight d-flex z-1000">
                        <div className="de-marquee-list wow">
                            <div className="d-item">
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">대한민국</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                                <span className="d-item-txt">Korea</span>
                                <span className="d-item-display">
                                    <i className="d-item-block"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <-- Location 지도 섹션 끝 --> */}

                {/* Start your game 시작 */}
                <section className="pt0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="padding60 sm-padding40 jarallax position-relative">
                                    <img
                                        src={require('../../assets/images/background/1.webp')}
                                        className="jarallax-img"
                                        alt=""
                                    />
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="subtitle wow fadeInUp mb-3">Start your game</div>
                                            <h2 className="wow fadeInUp" data-wow-delay=".2s">
                                                여러분의 게임 잠재력의 가능성을 시험해 보세요
                                            </h2>
                                            <p className="wow fadeInUp">
                                                당신 안에 잠들어 있는 게임의 잠재력을 올려보세요!
                                            </p>
                                            <div className="spacer-10"></div>
                                            <a className="btn-main mb10 wow fadeInUp" href="/games">
                                                게임 주문하러 가기
                                            </a>
                                        </div>
                                    </div>

                                    <img
                                        src={require('../../assets/images/misc/avatar.webp')}
                                        className="sm-hide position-absolute bottom-0 end-0 wow fadeIn"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Start your game 끝 */}
            </div>
        </>
    );
}

export default Location;
