// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CoachSessionBasic = () => {

  const [isTrue, setIsTrue] = useState(false)
  const [isThankModal, setIsThankModal] = useState(false)

  const thankModal = () => {
    setIsThankModal(true)
  }

  const calDiv = () =>{
    setIsTrue(true);
  }



  return (
    <>
    <Header/>
    <section className="journey-wrap">
      <div className="container">
        <div className="row mrb-70">
        <div className="col-sm-6 left">
          <h2><span>book a free coaching session</span>start your journey</h2>
        <p>Before you can sign up for your free session, please select the type of <br/>coach you'd like to work with when you'd like your session to be held</p>
        </div>

        <div className="col-sm-6 right">
          <figure><img src="../images/shape-06.png" alt=""/></figure>
        </div>
      </div> {/* <!--/ row --> */}

      {
        isTrue ?
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 session-form">
                <form>
                <div className="col-sm-12 date-time mrb-60">
                  <h3>select your date & time</h3>
                <div className="time-btn"><button className="btn">select an available time</button></div>
                </div>

                <div className="col-sm-12 date-time mrb-30">
                  <h3>fill in your details</h3>
                </div>

                <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="name"/></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="surname"/></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="email"/></div>

                <div className="col-sm-6 form-grdoup"></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="account password *"/></div>

                <div className="col-sm-6 form-group form-p"><small><strong>* required for login for your free session. <br/>Password must be at least 8 characters and include uppercase, a number and special character</strong></small></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="repeat account password"/></div>

                <div className="col-sm-6 form-group">
                  <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="accept"/>
                  <label className="custom-control-label ml-2">I accept the <a href="#">terms of service</a></label>
                </div>
                </div>
              </form>
              </div> {/* <!--/ session-form --> */}
	          </div>

            <div className="row">
              <div className="col-sm-12 bottom">
                <p><button className="btn" onClick={thankModal}>book my session</button></p>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}

            {
              isThankModal ?
                (
                  <>
                  <div className="thank-modal">
                    <div className="front-pricing thank-note">
                      <div className="pr-modal">
                        <div><i className="fa fa-angle-left"></i></div>
                        <div><span>thank you</span></div>
                      </div>
                      <div className="divider"></div>
                      <div className="para-modal">
                        <p>Well done on taking the first step in your journey! <br/> You'll receive a confirmation email - please check it hasn't landed in your spam</p>
                      </div>
                    </div>
                  </div>
                  </>
                ) : null
            }
          </>
        ) :
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 title-text text-center">
                <h3>Our rates are based on the coach experience level you need, so before you start your journey, choose your coach experience</h3>
              <p>Note: we won’t take payment details until you’ve completed your free discovery session <br/>and decided to go ahead with your coaching journey</p>
              </div>
            </div>

            <div className="row justify-content-md-center">
              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>novice</h4>
                <ul>
                  <li>This is a newly-accredited coach</li>
                <li>Good place to start if you’ve never been coached</li>
                <li>Pick this if you’re on a budget.</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="#" className="btn">select</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}

              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>experienced</h4>
                <ul>
                  <li>This coach has more than 100 client sessions under their belt.</li>
                <li>Pick this if you’re familiar with coaching</li>
                <li>Pick this if budget isn’t a concern</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="#" className="btn">select</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}

            <div className="row">
              <div className="col-sm-12 bottom">
                <p><button onClick={calDiv} className="btn">continue</button></p>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}
          </>
        )
      }



      </div>
    </section> {/* <!--/ book a free coaching session  --> */}
    <Footer/>
    </>
  )
}

CoachSessionBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CoachSessionBasic
