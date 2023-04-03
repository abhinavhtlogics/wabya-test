// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const ApplyWabyaBasic = () => {

  const [isThankModal, setIsThankModal] = useState(false)

  const thankModal = () => {
    setIsThankModal(true)
  }

  return (
    <>
    <Header/>
    <section className="work-together">
      <div className="container">
        <div className="row align-items-center">

        <div className="col-sm-12">
          <div className="wt-title mrb-30">
            <h2>Let’s work together</h2>

            {
            isThankModal ?
              (
                <>
                <div className="thank-modal">
                  <div className="front-pricing thank-note apply-thank">
                    <div className="pr-modal">
                      <div><i className="fa fa-angle-left"></i></div>
                      <div><span>thank you</span></div>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>Well done on taking the first step in your coaching journey with wabya! <br /> Someone from the team will be in touch with you shortly</p>
                    </div>
                  </div>
                </div>
                </>
              ) : null
            }

            <p><strong>Please note, we only work with coaches who have graduated from an ICF, EMCC or AC-accredited coaching programme.</strong></p>
        </div>

          <div className="inner">
          <form>
            <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="name"/></div>
          <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="surname"/></div>
          <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="email"/></div>
          <div className="col-sm-6 form-group"><input className="form-control" name="" placeholder="mobile number"/></div>
          <div className="col-sm-6 form-group"><textarea className="form-control" placeholder="a bit about me"></textarea></div>
          <div className="col-sm-6 form-group"></div>
          <div className="col-sm-12 form-group">
              <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="accept"/>
              <small><strong>I have graduated from an ICF, EMCC or AC-accredited coaching programme</strong></small>
            </div>
            </div>
          <div className="col-sm-12 form-group"><input className="btn" value="submit" type="button" onClick={thankModal}/></div>
          </form>
          </div>
        </div> {/* <!--/ col-sm --> */}

        </div> {/* <!--/ row --> */}
      </div>
    </section> {/* <!--/ work-together --> */}
    <Footer/>
    </>
  )
}

ApplyWabyaBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ApplyWabyaBasic
