import React from "react";
import { useEffect } from "react";
import customMarquee from "../assets/js/custom-marquee";
import customSwiper1 from "../assets/js/custom-swiper-1";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import designesis from "../assets/js/designesia";

function Index() {
  useEffect(() => {
    customMarquee();
    customSwiper1();
    designesis();
  }, []);

  return (
    <>
      {/* <!-- content begin --> */}
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section className="no-top no-bottom position-relative z-1000">
          <div className="v-center">
            <div className="swiper">
              {/* <!-- Additional required wrapper --> */}
              <div className="swiper-wrapper">
                {/* <!-- Slides --> */}
                <div className="swiper-slide">
                  {/* TODO : ????? */}
                  <div
                    className="swiper-inner"
                    data-bgimage="url(images/slider/1.webp)"
                  >
                    <div className="sw-caption">
                      <div className="container">
                        <div className="row gx-5 align-items-center">
                          <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">
                              Servers Are Available
                            </div>
                            <h1 className="slider-title text-uppercase mb-1">
                              Galactic Odyssey
                            </h1>
                          </div>
                          <div className="col-lg-6">
                            <p className="slider-text">
                              Aute esse non magna elit dolore dolore dolor sit
                              est. Ea occaecat ea duis laborum reprehenderit id
                              cillum tempor cupidatat qui nisi proident nostrud
                              dolore.
                            </p>
                            <div className="sw-price wow fadeInUp">
                              <div className="d-starting">Starting at</div>
                              <div className="d-price">
                                <span className="d-cur">$</span>
                                <span className="d-val">9.99</span>
                                <span className="d-period">/monthly</span>
                              </div>
                            </div>
                            <div className="spacer-10"></div>
                            <a
                              className="btn-main mb10"
                              href="pricing-table-one.html"
                            >
                              Order Your Game Server Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sw-overlay"></div>
                  </div>
                </div>

                {/* <!-- Slides --> */}
                <div className="swiper-slide">
                  <div
                    className="swiper-inner"
                    data-bgimage="url(images/slider/2.webp)"
                  >
                    <div className="sw-caption">
                      <div className="container">
                        <div className="row gx-5 align-items-center">
                          <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">
                              Servers Are Available
                            </div>
                            <h1 className="slider-title text-uppercase mb-1">
                              Mystic Racing
                            </h1>
                          </div>
                          <div className="col-lg-6">
                            <p className="slider-text">
                              Aute esse non magna elit dolore dolore dolor sit
                              est. Ea occaecat ea duis laborum reprehenderit id
                              cillum tempor cupidatat qui nisi proident nostrud
                              dolore.
                            </p>
                            <div className="sw-price wow fadeInUp">
                              <div className="d-starting">Starting at</div>
                              <div className="d-price">
                                <span className="d-cur">$</span>
                                <span className="d-val">12.99</span>
                                <span className="d-period">/monthly</span>
                              </div>
                            </div>
                            <div className="spacer-10"></div>
                            <a
                              className="btn-main mb10"
                              href="pricing-table-one.html"
                            >
                              Order Your Game Server Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sw-overlay"></div>
                  </div>
                </div>

                {/* <!-- Slides --> */}
                <div className="swiper-slide">
                  <div
                    className="swiper-inner"
                    data-bgimage="url(images/slider/3.webp)"
                  >
                    <div className="sw-caption">
                      <div className="container">
                        <div className="row gx-5 align-items-center">
                          <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">
                              Servers Are Available
                            </div>
                            <h1 className="slider-title text-uppercase mb-1">
                              Silent Wrath
                            </h1>
                          </div>
                          <div className="col-lg-6">
                            <p className="slider-text">
                              Aute esse non magna elit dolore dolore dolor sit
                              est. Ea occaecat ea duis laborum reprehenderit id
                              cillum tempor cupidatat qui nisi proident nostrud
                              dolore.
                            </p>
                            <div className="sw-price wow fadeInUp">
                              <div className="d-starting">Starting at</div>
                              <div className="d-price">
                                <span className="d-cur">$</span>
                                <span className="d-val">14.99</span>
                                <span className="d-period">/monthly</span>
                              </div>
                            </div>
                            <div className="spacer-10"></div>
                            <a
                              className="btn-main mb10"
                              href="pricing-table-one.html"
                            >
                              Order Your Game Server Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sw-overlay"></div>
                  </div>
                </div>

                {/* <!-- Slides --> */}
                <div className="swiper-slide">
                  <div
                    className="swiper-inner"
                    data-bgimage="url(images/slider/4.webp)"
                  >
                    <div className="sw-caption">
                      <div className="container">
                        <div className="row gx-5 align-items-center">
                          <div className="col-lg-8 mb-sm-30">
                            <div className="subtitle blink mb-4">
                              Servers Are Available
                            </div>
                            <h1 className="slider-title text-uppercase mb-1">
                              Funk Dungeon
                            </h1>
                          </div>
                          <div className="col-lg-6">
                            <p className="slider-text">
                              Aute esse non magna elit dolore dolore dolor sit
                              est. Ea occaecat ea duis laborum reprehenderit id
                              cillum tempor cupidatat qui nisi proident nostrud
                              dolore.
                            </p>
                            <div className="sw-price wow fadeInUp">
                              <div className="d-starting">Starting at</div>
                              <div className="d-price">
                                <span className="d-cur">$</span>
                                <span className="d-val">15.99</span>
                                <span className="d-period">/monthly</span>
                              </div>
                            </div>
                            <div className="spacer-10"></div>
                            <a
                              className="btn-main mb10"
                              href="pricing-table-one.html"
                            >
                              Order Your Game Server Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sw-overlay"></div>
                  </div>
                </div>
              </div>
              {/* <!-- If we need pagination --> */}
              <div className="swiper-pagination"></div>

              {/* <!-- If we need navigation buttons --> */}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>

              {/* <!-- If we need scrollbar --> */}
              <div className="swiper-scrollbar"></div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">
                  Incredibly features
                </div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  Premium Game Server
                </h2>
              </div>

              <div className="col-lg-6"></div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay="0s"
              >
                <div>
                  <img src="images/icons/1.png" className="mb20" alt="" />
                  <h4>Super Quick Setup</h4>
                  <p>
                    Dolor minim in pariatur in deserunt laboris eu pariatur
                    labore excepteur cupidatat cupidatat duis dolor in.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".2s"
              >
                <div>
                  <img src="images/icons/2.png" className="mb20" alt="" />
                  <h4>Premium Hardware</h4>
                  <p>
                    Dolor minim in pariatur in deserunt laboris eu pariatur
                    labore excepteur cupidatat cupidatat duis dolor in.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".4s"
              >
                <div>
                  <img src="images/icons/3.png" className="mb20" alt="" />
                  <h4>DDos Protection</h4>
                  <p>
                    Dolor minim in pariatur in deserunt laboris eu pariatur
                    labore excepteur cupidatat cupidatat duis dolor in.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".6s"
              >
                <div>
                  <img src="images/icons/4.png" className="mb20" alt="" />
                  <h4>Fast Support</h4>
                  <p>
                    Dolor minim in pariatur in deserunt laboris eu pariatur
                    labore excepteur cupidatat cupidatat duis dolor in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="padding60 sm-padding40 sm-p-2 jarallax position-relative">
                  <img
                    src="images/background/1.webp"
                    className="jarallax-img"
                    alt=""
                  />
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="subtitle wow fadeInUp mb-3">
                        Start your game
                      </div>
                      <h2 className="wow fadeInUp" data-wow-delay=".2s">
                        Unlock Your Gaming Full Potential
                      </h2>
                      <p className="wow fadeInUp">
                        Aute esse non magna elit dolore dolore dolor sit est. Ea
                        occaecat ea duis laborum reprehenderit id cillum tempor
                        cupidatat qui nisi proident nostrud dolore id do
                        eiusmod. Lorem ipsum non labore.
                      </p>
                      <div className="spacer-10"></div>
                      <a
                        className="btn-main mb10 wow fadeInUp"
                        href="games.html"
                      >
                        Order Your Game Server Now
                      </a>
                    </div>
                  </div>

                  <img
                    src="images/misc/avatar.webp"
                    className="sm-hide position-absolute bottom-0 end-0 wow fadeIn"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="subtitle mb20">Customer reviews</div>
                <h2 className="wow fadeInUp">4.85 out of 5</h2>
                <div className="spacer-20"></div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div
                className="owl-carousel owl-theme wow fadeInUp"
                id="testimonial-carousel"
              >
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "I've been using Playhost for my game server needs, and
                        I couldn't be happier. The server uptime is fantastic,
                        and the customer support team is always quick to assist
                        with any issues."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/1.jpg" />{" "}
                        <span>Michael S.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "Running a game server used to be a hassle, but Playhost
                        makes it easy. The control panel is user-friendly, and I
                        love how they handle server maintenance and updates."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/2.jpg" />{" "}
                        <span>Robert L.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "I've tried several hosting providers in the past, and
                        Playhost is by far the best. Their server performance is
                        top-notch, and I've never experienced lag while playing
                        with friends."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/3.jpg" />{" "}
                        <span>Jake M.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        As a new server owner, I was worried about setup and
                        configuration, but Playhost made it a breeze. They have
                        detailed tutorials and helpful support, which made the
                        process smooth."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/4.jpg" />{" "}
                        <span>Alex P.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "The flexibility Playhost offers is incredible. I can
                        easily switch between game servers or even host multiple
                        games on the same plan. It's a gamer's dream come true!"
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/5.jpg" />{" "}
                        <span>Carlos R.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "I've been a loyal customer of Playhost for years now.
                        Their dedication to keeping their hardware up-to-date
                        ensures my gaming experience is always optimal."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/6.jpg" />{" "}
                        <span>Edward B.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "When our community needed a reliable server for our
                        esports tournaments, we turned to Playhost, and they've
                        never let us down. Their servers are perfect for
                        competitive gaming."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/7.jpg" />{" "}
                        <span>Daniel H.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <span className="d-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <p>
                        "The DDoS protection from Playhost is a lifesaver. We
                        used to get attacked regularly, but since switching to
                        their servers, we haven't had any downtime."
                      </p>
                      <div className="de_testi_by">
                        <img alt="" src="images/people/8.jpg" />{" "}
                        <span>Bryan G.</span>
                      </div>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row align-items-center gx-5">
              <div className="col-lg-6">
                <img
                  src="images/misc/server.webp"
                  className="img-fluid mb-sm-30 wow fadeIn"
                  alt=""
                />
              </div>

              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">
                  Server locations
                </div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                  <span className="text-gradient">25</span> servers available
                  worldwide for your game.
                </h2>
                <p className="wow fadeInUp">
                  Our collection of game server hosting options encompasses the
                  most in-demand platforms of today. Within our offerings,
                  you'll discover an extensive array of specialized tools and
                  features tailored to each game, all of which we diligently
                  keep up to date in sync with game and mod updates.
                </p>

                <ul className="de-server s2 wow fadeInUp">
                  <li>London, England</li>
                  <li>Paris, France</li>
                  <li>Frankut, Germany</li>
                  <li>Amsterdam, Netherlands</li>
                  <li>Stockholm, Sweden</li>
                  <li>Helsinki, Finland</li>
                  <li>Los Angeles, USA</li>
                  <li>
                    <a href="locations.html">View all available servers</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="jarallax">
          <img src="images/background/3.webp" className="jarallax-img" alt="" />
          <div className="de-gradient-edge-top"></div>
          <div className="de-gradient-edge-bottom"></div>
          <div className="container z-1000">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Most complete</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  Game Collection
                </h2>
              </div>
              <div className="col-lg-6 text-lg-end">
                <a className="btn-main mb-sm-30" href="games.html">
                  View all games
                </a>
              </div>
            </div>
            <div className="row g-4 sequence">
              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Thunder and City</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/1.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Mystic Racing Z</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/2.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Silent Wrath</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/3.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Funk Dungeon</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/4.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Galactic Odyssey</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/5.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Warfare Legends</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/6.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Raceway Revolution</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/7.webp"
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 gallery-item sandbox">
                <div className="de-item wow">
                  <div className="d-overlay">
                    <div className="d-label">20% OFF</div>
                    <div className="d-text">
                      <h4>Starborne Odyssey</h4>
                      <p className="d-price">
                        Starting at <span className="price">$14.99</span>
                      </p>
                      <a
                        className="btn-main btn-fullwidth"
                        href="pricing-table-one.html"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                  <img
                    src="images/covers/8.webp"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-top no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Do you have</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  Any questions?
                </h2>
              </div>

              <div className="clearfix"></div>

              <div className="col-lg-6">
                <div className="accordion s2 wow fadeInUp">
                  <div className="accordion-section">
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-a1"
                    >
                      What is game hosting?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-a1"
                    >
                      <p>
                        Game hosting refers to the process of renting or setting
                        up servers to run multiplayer online games. These
                        servers allow players to connect and play together in
                        the same game world.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-a2"
                    >
                      Why do I need game hosting?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-a2"
                    >
                      <p>
                        Game hosting is essential for multiplayer gaming. It
                        provides a dedicated server where players can join,
                        ensuring a smooth and lag-free gaming experience. It
                        also allows you to customize game settings and mods.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-a3"
                    >
                      How do I choose a game hosting provider?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-a3"
                    >
                      <p>
                        Consider factors like server location, performance,
                        scalability, customer support, and price when choosing a
                        game hosting provider. Read reviews and ask for
                        recommendations from fellow gamers.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-a4"
                    >
                      What types of games can I host?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-a4"
                    >
                      <p>
                        You can host various types of games, including
                        first-person shooters, role-playing games, survival
                        games, strategy games, and more. The type of game
                        hosting you need depends on the game's requirements.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-a5"
                    >
                      What is server latency or ping?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-a5"
                    >
                      <p>
                        Server latency or ping measures the time it takes for
                        data to travel between your computer and the game
                        server. Lower ping values indicate better responsiveness
                        and less lag.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="accordion s2 wow fadeInUp">
                  <div className="accordion-section">
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b1"
                    >
                      How do I manage a game server?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b1"
                    >
                      <p>
                        Game server management varies depending on the hosting
                        provider and game type. Typically, you'll have access to
                        a control panel or command-line interface to configure
                        settings, mods, and player access.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b2"
                    >
                      Can I run mods on my game server?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b2"
                    >
                      <p>
                        Yes, many game hosting providers support mods. You can
                        install and manage mods to enhance gameplay or customize
                        the game to your liking.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b3"
                    >
                      What is DDoS protection, and do I need it?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b3"
                    >
                      <p>
                        DDoS (Distributed Denial of Service) protection helps
                        defend your game server from malicious attacks that
                        could disrupt gameplay. It's essential for maintaining
                        server stability, especially for popular games.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b4"
                    >
                      How much does game hosting cost?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b4"
                    >
                      <p>
                        Game hosting costs vary depending on the provider,
                        server type, and game. Prices can range from a few
                        dollars per month for small servers to hundreds for
                        high-performance dedicated servers.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b5"
                    >
                      Is there 24/7 customer support?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b5"
                    >
                      <p>
                        Many reputable game hosting providers offer 24/7
                        customer support to assist with technical issues and
                        server management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="padding60 sm-padding40 jarallax position-relative">
                  <img
                    src="images/background/2.webp"
                    className="jarallax-img"
                    alt=""
                  />
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="subtitle wow fadeInUp mb-3">
                        Download now
                      </div>
                      <h2 className="wow fadeInUp" data-wow-delay=".2s">
                        Manage your server from mobile device
                      </h2>
                      <p>
                        Enim sit laborum enim ut in excepteur aliqua consequat
                        est ut aliquip nostrud sunt deserunt consequat fugiat
                        adipisicing minim aliquip do adipisicing cupidatat esse
                        ut irure incididunt ullamco dolor laboris anim ea do ut
                        anim.
                      </p>
                      <a href="download.html">
                        <img
                          src="images/misc/download-appstore.webp"
                          className="img-fluid mb-sm-20"
                          alt="download"
                        />
                      </a>
                      &nbsp;
                      <a href="download.html">
                        <img
                          src="images/misc/download-playstore.webp"
                          className="img-fluid mb-sm-20"
                          alt="download"
                        />
                      </a>
                    </div>
                  </div>

                  <img
                    src="images/misc/man-with-phone.webp"
                    className="sm-hide position-absolute bottom-0 end-0 wow fadeIn"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">
                  Payment Methods
                </div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                  We accept
                </h2>
              </div>
              <div className="col-lg-6">
                <div className="row g-4">
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/visa.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/mastercard.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/paypal.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/skrill.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/jcb.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 col-4">
                    <div
                      className="p-2 rounded-10"
                      data-bgcolor="rgba(255, 255, 255, .05)"
                    >
                      <img
                        src="images/payments/american-express.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <!-- content close --> */}
    </>
  );
}

export default Index;
