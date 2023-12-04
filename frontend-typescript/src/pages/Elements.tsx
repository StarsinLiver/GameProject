import React from 'react'
import { useEffect } from 'react';
import customMarquee from '../assets/js/custom-marquee';
import initElements from '../assets/js/elements';
import designesis from '../assets/js/designesia';

function Elements() {
  useEffect(()=> {
    customMarquee();
    initElements();
    designesis();
  },[])
  
  return (
    <>
        <div className="no-bottom no-top" id="content">

<div id="top"></div>

{/* slide */}
<section className="no-top no-bottom position-relative z-1000">
    <div className="v-center">
        <div className="swiper">
          {/* <!-- Additional required wrapper --> */}
          <div className="swiper-wrapper">
            {/* <!-- Slides --> */}
            <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(images/slider/1.webp)">
                    <div className="sw-caption">
                        <div className="container">
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-8 mb-sm-30">
                                    <div className="subtitle blink mb-4">Servers Are Available</div>
                                    <h1 className="slider-title text-uppercase mb-1">Thunder and City</h1>
                                </div>
                                <div className="col-lg-6">
                                    <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                                    <div className="spacer-10"></div>
                                    <a className="btn-main mb10" href="games.html">Order Your Game Server Now</a>
                                    <div className="spacer-double sm-hide"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sw-overlay"></div>
                </div>                            
            </div>
            
            {/* <!-- Slides --> */}
            <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(images/slider/2.webp)">
                    <div className="sw-caption">
                        <div className="container">
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-8 mb-sm-30">
                                    <div className="subtitle blink mb-4">Servers Are Available</div>
                                    <h1 className="slider-title text-uppercase mb-1">Mystic Racing</h1>
                                </div>
                                <div className="col-lg-6">
                                    <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                                    <div className="spacer-10"></div>
                                    <a className="btn-main mb10" href="games.html">Order Your Game Server Now</a>
                                    <div className="spacer-double sm-hide"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sw-overlay"></div>
                </div>                            
            </div>

            {/* <!-- Slides --> */}
            <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(images/slider/3.webp)">
                    <div className="sw-caption">
                        <div className="container">
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-8 mb-sm-30">
                                    <div className="subtitle blink mb-4">Servers Are Available</div>
                                    <h1 className="slider-title text-uppercase mb-1">Silent Wrath</h1>
                                </div>
                                <div className="col-lg-6">
                                    <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                                    <div className="spacer-10"></div>
                                    <a className="btn-main mb10" href="games.html">Order Your Game Server Now</a>
                                    <div className="spacer-double sm-hide"></div>
                                </div>
                            </div>
                        </div>
                    </div>                                
                    <div className="sw-overlay"></div>
                </div>
            </div>

            {/* <!-- Slides --> */}
            <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(images/slider/4.webp)">
                    <div className="sw-caption">
                        <div className="container">
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-8 mb-sm-30">
                                    <div className="subtitle blink mb-4">Servers Are Available</div>
                                    <h1 className="slider-title text-uppercase mb-1">Funk Dungeon</h1>
                                </div>
                                <div className="col-lg-6">
                                    <p className="slider-text">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                                    <div className="spacer-10"></div>
                                    <a className="btn-main mb10" href="games.html">Order Your Game Server Now</a>
                                    <div className="spacer-double sm-hide"></div>
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
                <div className="subtitle wow fadeInUp mb-3">Incredibly features</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Premium Game Server</h2>
            </div>

            <div className="col-lg-6"></div>

            <div className="col-lg-3 wow fadeInRight" data-wow-delay="0s">
                <div className=""></div>
                <img src={require('../assets/images/icons/1.png')} className="mb20" alt=""/>
                <h4>Super Quick Setup</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices. </p>
            </div>

            <div className="col-lg-3 wow fadeInRight" data-wow-delay=".3s">
                <div className=""></div>
                <img src={require('../assets/images/icons/2.png')} className="mb20" alt=""/>
                <h4>Premium Hardware</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices. </p>
            </div>

            <div className="col-lg-3 wow fadeInRight" data-wow-delay=".6s">
                <div className=""></div>
                <img src={require('../assets/images/icons/3.png')} className="mb20" alt=""/>
                <h4>DDos Protection</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices. </p>
            </div>

            <div className="col-lg-3 wow fadeInRight" data-wow-delay=".9s">
                <div className=""></div>
                <img src={require('../assets/images/icons/4.png')} className="mb20" alt=""/>
                <h4>Fast Support</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices. </p>
            </div>
        </div>
    </div>
</section>

<section className="no-bottom">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="padding60 jarallax position-relative">
                    <img src={require('../assets/images/background/1.webp')} className="jarallax-img" alt=""/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Start your game</div>
                            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Unlock Your Gaming Full Potential</h2>
                            <p className="wow fadeInUp">Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                            <div className="spacer-10"></div>
                            <a className="btn-main mb10 wow fadeInUp" href="games.html">Order Your Game Server Now</a>
                        </div>
                    </div>

                    <img src={require('../assets/images/misc/avatar.webp')} className="position-absolute bottom-0 end-0 wow fadeIn"  alt=""/>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="no-bottom">
    <div className="container">
        <div className="row align-items-center gx-5">
            <div className="col-lg-6">
                <img src={require('../assets/images/misc/server.webp')} className="img-fluid wow fadeIn" alt=""/>
            </div>

            <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Server locations</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s"><span className="text-gradient">25</span> servers available worldwide for your game.</h2>
                <p className="wow fadeInUp">Our collection of game server hosting options encompasses the most in-demand platforms of today. Within our offerings, you'll discover an extensive array of specialized tools and features tailored to each game, all of which we diligently keep up to date in sync with game and mod updates.</p>

                <div className="row wow fadeInUp">
                    <div className="col-lg-6">
                        <ul className="ul-style-2 text-white">
                            <li>Los Angeles, California</li>
                            <li>Sao Paolo, Brazil</li>
                            <li>London, United Kingdom</li>
                        </ul>
                    </div>

                    <div className="col-lg-6">
                        <ul className="ul-style-2 text-white">
                            <li>Los Angeles, California</li>
                            <li>Sao Paolo, Brazil</li>
                            <li>Singapore, Singapore</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<section className="jarallax">
    <img src={require('../assets/images/background/3.webp')} className="jarallax-img" alt=""/>
    <div className="de-gradient-edge-top"></div>
    <div className="de-gradient-edge-bottom"></div>
    <div className="container z-1000">
        <div className="row">
            <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">Most complete</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Game Collection</h2>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <ul id="filters" className="wow fadeInUp" data-wow-delay="0s">
                    <li><a href="#" data-filter="*" className="selected">All Projects</a></li>
                    <li><a href="#" data-filter=".popular">popular</a></li>
                    <li><a href="#" data-filter=".fps">fps</a></li>
                    <li><a href="#" data-filter=".survival">survival</a></li>
                    <li><a href="#" data-filter=".sandbox">sandbox</a></li>
                </ul>
                <div className="spacer-10"></div>
            </div>
        </div>

        <div className="row g-4">
            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Thunder and City</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/1.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Mystic Racing Z</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/2.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Silent Wrath</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/3.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Funk Dungeon</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/4.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Galactic Odyssey</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/5.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Warfare Legends</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/6.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Raceway Revolution</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/7.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

            <div className="col-lg-3">
                <div className="de-item">
                    <div className="d-overlay">
                        <div className="d-label">
                            20% OFF
                        </div>
                        <div className="d-text">
                            <h4>Starborne Odyssey</h4>
                            <p className="d-price">Starting at <span className="id-color">$14.99</span></p>
                        </div>
                    </div>
                    <img src={require('../assets/images/covers/8.webp')} className="img-fluid" alt=""/>
                </div>
            </div>

        </div>
    </div>
</section>

<section className="no-top no-bottom">
    <div className="container">
        <div className="row g-5">
            <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Happy gamers</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Testimonials</h2>
                <div className="wow fadeInUp">
                    <div className="owl-carousel owl-theme" id="testimonial-carousel-1-col">
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>Attending the automotive event was a dream come true for me. The thrill of seeing rare and iconic cars up close was unforgettable. From vintage classics to cutting-edge supercars.
                                    </p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/1.jpg')}/> <span>Michael S. (Car Enthusiast)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>I can't thank the organizers enough for putting together such an informative automotive event. The workshops and hands-on demonstrations were incredibly insightful.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/2.jpg')}/> <span>Sarah L. (Aspiring Mechanic)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>What a fantastic family-friendly automotive event! My kids were wide-eyed with excitement as they explored the various car displays and participated in the interactive activities.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/3.jpg')}/> <span>Jake M. (Family Attendee)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>The fusion of technology and automobiles at this event was mind-blowing. From electric and autonomous vehicles to cutting-edge infotainment systems.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/4.jpg')}/> <span>Amanda P. (Tech Enthusiast)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>I've attended numerous automotive events, but this one truly exceeded my expectations. The rare car auctions featured some of the most exquisite automobiles I've ever seen.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/5.jpg')}/> <span>Carlos R. (Vintage Car Collector)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>Attending this automotive event was like stepping into a world of speed and adrenaline. The track races were heart-pounding, and the skill displayed by the drivers was awe-inspiring.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/6.jpg')}/> <span>Elena B. (Racing Enthusiast)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>I'm restoring a classic car in my garage, and this event was a treasure trove of restoration tips and resources. The restoration workshops and seminars were incredibly informative.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/7.jpg')}/> <span>Daniel H. (Classic Car Hobbyist):</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                        <div className="item">
                            <div className="de_testi type-2">
                                <blockquote>
                                    <p>Capturing the beauty of automobiles against stunning backdrops was a photographer's dream come true at this event. The organizers provided designated photography zones.</p>
                                    <div className="de_testi_by">
                                        <img alt="" className="rounded-circle" src={require('../assets/images/people/8.jpg')}/> <span>Linda G. (Photography Enthusiast)</span>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Do you have</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Any questions?</h2>

                <div className="accordion s2 wow fadeInUp">
                    <div className="accordion-section">
                        <div className="accordion-section-title" data-tab="#accordion-1">
                            What is game hosting?
                        </div>
                        <div className="accordion-section-content" id="accordion-1">
                            <p>Game hosting refers to the process of renting or setting up servers to run multiplayer online games. These servers allow players to connect and play together in the same game world.</p>
                        </div>
                        <div className="accordion-section-title" data-tab="#accordion-2">
                            Why do I need game hosting?
                        </div>
                        <div className="accordion-section-content" id="accordion-2">
                            <p>Game hosting is essential for multiplayer gaming. It provides a dedicated server where players can join, ensuring a smooth and lag-free gaming experience. It also allows you to customize game settings and mods.</p>
                        </div>                                        
                        <div className="accordion-section-title" data-tab="#accordion-3">
                            How do I choose a game hosting provider?
                        </div>
                        <div className="accordion-section-content" id="accordion-3">
                            <p>Consider factors like server location, performance, scalability, customer support, and price when choosing a game hosting provider. Read reviews and ask for recommendations from fellow gamers.</p>
                        </div>
                        <div className="accordion-section-title" data-tab="#accordion-4">
                            What types of games can I host?
                        </div>
                        <div className="accordion-section-content" id="accordion-4">
                            <p>You can host various types of games, including first-person shooters, role-playing games, survival games, strategy games, and more. The type of game hosting you need depends on the game's requirements.</p>
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
                <div className="subtitle wow fadeInUp mb-3">Server locations</div>
            </div>
            <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s"><span className="text-gradient">25</span> servers available worldwide for your game.</h2>
            </div>
            <div className="col-lg-6">
                Take advantage of our server location testing tool to ensure optimal performance. Since your users are spread across various locations, it's important to identify the server location that provides the best experience for your members. Our ping tester can help you determine the ideal server location for your specific needs.
            </div>
        </div>
    </div>

    <div className="wow fadeInRight d-flex">
      <div className="de-marquee-list wow">
        <div className="d-item">
          <span className="d-item-txt">London</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Paris</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Frankurt</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Amsterdam</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Stockholm</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Helsinki</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Los Angeles</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Quebec</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Singapore</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Sydney</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Sau Paulo</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Bangkok</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
          <span className="d-item-txt">Jakarta</span>
          <span className="d-item-display">
            <i className="d-item-block"></i>
          </span>
         </div>
      </div>
    </div>

</section>

<section className="no-bottom">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">Server locations</div>
            </div>
            <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s"><span className="text-gradient">25</span> servers available worldwide for your game.</h2>
            </div>
            <div className="col-lg-6">
                Take advantage of our server location testing tool to ensure optimal performance. Since your users are spread across various locations, it's important to identify the server location that provides the best experience for your members. Our ping tester can help you determine the ideal server location for your specific needs.
            </div>
        </div>

        <div className="row">
            <div className="col-lg-12">
                <div className="spacer-20"></div>
                <ul className="de-server wow fadeInUp">
                    <li>London, England</li>
                    <li>Paris, France</li>
                    <li>Frankut, Germany</li>
                    <li>Amsterdam, Netherlands</li>
                    <li>Stockholm, Sweden</li>
                    <li>Helsinki, Finland</li>
                    <li>Los Angeles, USA</li>
                    <li>Quebec, Canada</li>
                    <li>Singapore, Singapore</li>
                    <li>Sydney, Australia</li>
                    <li>Sau Paulo, Brazil</li>
                    <li>Bangkok, Thailand</li>
                    <li>Jakarta, Indonesia</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section className="no-bottom">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="padding60 jarallax position-relative">
                    <img src={require('../assets/images/background/2.webp')} className="jarallax-img" alt=""/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Download now</div>
                            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Manage your server from mobile device</h2>
                            <p>Enim sit laborum enim ut in excepteur aliqua consequat est ut aliquip nostrud sunt deserunt consequat fugiat adipisicing minim aliquip do adipisicing cupidatat esse ut irure incididunt ullamco dolor laboris anim ea do ut anim.</p>                            
                            <a href="download.html"><img src={require('../assets/images/misc/download-appstore.webp')} className="img-fluid" alt="download"/></a>&nbsp;
                            <a href="download.html"><img src={require('../assets/images/misc/download-playstore.webp')} className="img-fluid" alt="download"/></a>
                        </div>
                    </div>

                    <img src={require('../assets/images/misc/man-with-phone.webp')} className="position-absolute bottom-0 end-0 wow fadeIn"  alt=""/>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="no-bottom">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-4">
                <div className="subtitle wow fadeInUp mb-3">Payment Methods</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">We accept</h2>
            </div>
            <div className="col-lg-8">
                <div className="row g-4">
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/visa.webp')} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/mastercard.webp')} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/paypal.webp')} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/skrill.webp')} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/jcb.webp')} className="img-fluid" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-2 col-4">
                        <div className="p-2 rounded-10" data-bgcolor="rgba(255, 255, 255, .05)">
                            <img src={require('../assets/images/payments/american-express.webp')} className="img-fluid" alt=""/>
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
                <div className="subtitle wow fadeInUp mb-3">Payment Methods</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">We accept</h2>
            </div>
        </div>

        <div className="row g-4">
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/visa.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/mastercard.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/paypal.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/skrill.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/jcb.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
            <div className="col-sm-2 col-4">
                <div className="p-2 rounded-10 grayscale hover-color" data-bgcolor="rgba(255, 255, 255, .05)">
                    <img src={require('../assets/images/payments/american-express.webp')} className="img-fluid" alt=""/>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="">
    <div className="container">
        <div className="row">
            <div className="col-lg-6">                            
                <div className="subtitle wow fadeInUp mb-3">Do you have</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Any questions?</h2>
            </div>

            <div className="row gx-4">
                <div className="col-lg-6">
                    <div className="accordion s2 wow fadeInUp">
                        <div className="accordion-section">
                            <div className="accordion-section-title" data-tab="#accordion-a1">
                                What is game hosting?
                            </div>
                            <div className="accordion-section-content" id="accordion-a1">
                                <p>Game hosting refers to the process of renting or setting up servers to run multiplayer online games. These servers allow players to connect and play together in the same game world.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-a2">
                                Why do I need game hosting?
                            </div>
                            <div className="accordion-section-content" id="accordion-a2">
                                <p>Game hosting is essential for multiplayer gaming. It provides a dedicated server where players can join, ensuring a smooth and lag-free gaming experience. It also allows you to customize game settings and mods.</p>
                            </div>                                        
                            <div className="accordion-section-title" data-tab="#accordion-a3">
                                How do I choose a game hosting provider?
                            </div>
                            <div className="accordion-section-content" id="accordion-a3">
                                <p>Consider factors like server location, performance, scalability, customer support, and price when choosing a game hosting provider. Read reviews and ask for recommendations from fellow gamers.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-a4">
                                What types of games can I host?
                            </div>
                            <div className="accordion-section-content" id="accordion-a4">
                                <p>You can host various types of games, including first-person shooters, role-playing games, survival games, strategy games, and more. The type of game hosting you need depends on the game's requirements.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-a5">
                                What is server latency or ping?
                            </div>
                            <div className="accordion-section-content" id="accordion-a5">
                                <p>Server latency or ping measures the time it takes for data to travel between your computer and the game server. Lower ping values indicate better responsiveness and less lag.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="accordion s2 wow fadeInUp">
                        <div className="accordion-section">
                            <div className="accordion-section-title" data-tab="#accordion-b1">
                                How do I manage a game server?
                            </div>
                            <div className="accordion-section-content" id="accordion-b1">
                                <p>Game server management varies depending on the hosting provider and game type. Typically, you'll have access to a control panel or command-line interface to configure settings, mods, and player access.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-b2">
                                Can I run mods on my game server?
                            </div>
                            <div className="accordion-section-content" id="accordion-b2">
                                <p>Yes, many game hosting providers support mods. You can install and manage mods to enhance gameplay or customize the game to your liking.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-b3">
                                What is DDoS protection, and do I need it?
                            </div>
                            <div className="accordion-section-content" id="accordion-b3">
                                <p>DDoS (Distributed Denial of Service) protection helps defend your game server from malicious attacks that could disrupt gameplay. It's essential for maintaining server stability, especially for popular games.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-b4">
                                How much does game hosting cost?
                            </div>
                            <div className="accordion-section-content" id="accordion-b4">
                                <p>Game hosting costs vary depending on the provider, server type, and game. Prices can range from a few dollars per month for small servers to hundreds for high-performance dedicated servers.</p>
                            </div>
                            <div className="accordion-section-title" data-tab="#accordion-b5">
                                Is there 24/7 customer support?
                            </div>
                            <div className="accordion-section-content" id="accordion-b5">
                                <p>Many reputable game hosting providers offer 24/7 customer support to assist with technical issues and server management.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<div className="spacer-double"></div>

</div>
    </>
  )
}

export default Elements