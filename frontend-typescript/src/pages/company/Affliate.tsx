import React, { useEffect } from "react";
import designesis from "../../assets/js/designesia";

function Affliate() {
  useEffect(() => {
    designesis();
  }, []);
  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" className="jarallax">
          <img
            src={require("../../assets/images/background/subheader-affliate.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">
                  Affliate program
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  Join our affiliate team and Earn 10% commission
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row row-flex">
              <div
                className="col-lg-4 mb30 wow fadeInRight"
                data-wow-delay=".2s"
              >
                <div className="de-step-s1">
                  <div className="d-number wow rotateIn" data-wow-delay=".2s">
                    1
                  </div>
                  <h4>Join for Affiliate Program</h4>
                  <p className="">
                    Amet amet enim reprehenderit et ullamco tempor minim
                    reprehenderit amet cupidatat ullamco ut magna enim ad
                    commodo nisi exercitation quis reprehenderit anim et ad aute
                    officia dolor amet dolore dolore.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mb30 wow fadeInRight"
                data-wow-delay=".4s"
              >
                <div className="de-step-s1">
                  <div className="d-number wow rotateIn" data-wow-delay=".4s">
                    2
                  </div>
                  <h4>Promote Our Website</h4>
                  <p className="">
                    Amet amet enim reprehenderit et ullamco tempor minim
                    reprehenderit amet cupidatat ullamco ut magna enim ad
                    commodo nisi exercitation quis reprehenderit anim et ad aute
                    officia dolor amet dolore dolore.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 mb30 wow fadeInRight"
                data-wow-delay=".6s"
              >
                <div className="de-step-s1">
                  <div className="d-number wow rotateIn" data-wow-delay=".6s">
                    3
                  </div>
                  <h4>Get Your Commision</h4>
                  <p className="">
                    Amet amet enim reprehenderit et ullamco tempor minim
                    reprehenderit amet cupidatat ullamco ut magna enim ad
                    commodo nisi exercitation quis reprehenderit anim et ad aute
                    officia dolor amet dolore dolore.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 text-center">
              <a className="btn-main btn-lg wow zoomIn" href="#">
                Join Today
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Affliate;
