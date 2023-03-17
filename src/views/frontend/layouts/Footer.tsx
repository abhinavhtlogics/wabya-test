import Link from 'next/link'

// import Script from 'next/script'

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 left'>
              <div className='row'>
                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>Home</h4>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>About</h4>
                    <ul>
                      <li>
                        <Link href='#'>Meet our community</Link>
                      </li>
                      <li>
                        <Link href='#'>Mission & Vision</Link>
                      </li>
                      <li>
                        <Link href='#'>Our Founders</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>Coaching Journey</h4>
                    <ul>
                      <li>
                        <Link href='#'>This is coaching</Link>
                      </li>
                      <li>
                        <Link href='#'>The coaching journey</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>Pricing</h4>
                    <ul>
                      <li>
                        <Link href='#'>Pricing Options</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>FAQ</h4>
                    <ul>
                      <li>
                        <Link href='#'>Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href='#'>Terms & Conditions</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div className='wg-1'>
                    <h4>Contact</h4>
                    <ul>
                      <li>
                        <Link href='/contact'>Contact us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-sm-4 right'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='wg-1'>
                    <div className='coach-btn'>
                      <Link href='#'>
                        <a className='btn'>Coach with us</a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='wg-1'>
                    <div className='icon-ft'>
                      <a target='_blank' href='#'>
                        <i className='fa fa-instagram'></i>
                      </a>
                      <a target='_blank' href='#'>
                        <i className='fa fa-youtube-play'></i>
                      </a>
                      <a target='_blank' href='#'>
                        <i className='fa fa-linkedin'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Bootstrap Core JavaScript --> */}

      <script src="https://code.jquery.com/jquery-3.6.3.min.js" async> </script>
      <script src="/js/bootstrap.bundle.min.js" async> </script>
      <script src="/js/owl.carousel.min.js" async> </script>
      <script src="/js/jquery.twentytwenty.js" async> </script>
      <script src="/js/jquery.event.move.js" async> </script>
      <script type="text/javascript" src="/js/script.js" async> </script>
    </>
  )
}

export default Footer
