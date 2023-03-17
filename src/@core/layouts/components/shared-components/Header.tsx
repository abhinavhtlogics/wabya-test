import Link from 'next/link'
import { app } from '../../../../../firebaseConfig'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'

// import { useState } from 'react'


const Header = () => {

    const auth = getAuth(app)
    const router = useRouter()
    const { asPath, pathname } = useRouter();

    // alert(pathname)

    const logout = () => {
      sessionStorage.removeItem('coachId');
      router.push('/pages/login')
    }

    const clientLogout = () => {
      sessionStorage.removeItem('userId');
      router.push('/client/login')
    }


  return (

    <>
    {
      router.pathname === '/client/dashboard' || router.pathname === '/client/change-password' ?
      (
        <header className='admin-header client-header'>
          <div className='menu-head'>
            <div className='container'>
              <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                  <Link href='/client/dashboard' passHref>
                    <a className='navbar-brand'>
                      <img src='../../images/admin.png' alt='Long Island Tub Refinishing Logo' />
                    </a>
                  </Link>

                  <div className='profile-button'>
                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary'
                          type='button'
                          aria-expanded='false'
                          onClick={clientLogout}
                        >
                        log out
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span className='navbar-toggler-icon'></span>
                  </button>


                </div>
              </nav>
            </div>
          </div>
        </header>
      )
      :
      (
        <header className='admin-header coach-header'>
          <div className='menu-head'>
            <div className='container'>
              <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                  <Link href='/dashboard' passHref>
                    <a className='navbar-brand'>
                      <img src='../images/admin.png' alt='Long Island Tub Refinishing Logo' />
                    </a>
                  </Link>

                  <div className='profile-button'>
                    <figure>
                      <img src='../images/user-image.png' alt='' />
                    </figure>

                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                        Name Surname
                        </button>
                        <ul className='dropdown-menu'>
                          <li>
                            <Link href='/dashboard' passHref>
                              <a className='dropdown-item'>Profile</a>
                            </Link>
                          </li>
                          <li>
                            <Link href='/timesheet' passHref>
                              <a className='dropdown-item'>Timesheet</a>
                            </Link>
                          </li>
                          <li>
                            <Link href='/resources' passHref>
                              <a className='dropdown-item'>Resources</a>
                            </Link>
                          </li>
                          <li>
                              <a className='dropdown-item' onClick={logout}>Log Out</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span className='navbar-toggler-icon'></span>
                  </button>

                  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav'>
                      <li className={router.pathname == "/calender" ? "active" : ""}>
                        <Link href='/calender' passHref>
                          <a>Calendar</a>
                        </Link>
                      </li>
                      <li className={router.pathname == "/clients" ? "active" : ""}>
                        <Link href='/clients' passHref>
                          <a>Clients</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            {/* <!--/ menu-head --> */}
          </div>
        </header>
      )
    }

    </>
  )
}

export default Header
