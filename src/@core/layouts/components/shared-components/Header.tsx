import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { database } from '../../../../../firebaseConfig'
import { collection, getDoc, doc } from 'firebase/firestore'

const Header = () => {

    const router = useRouter()
    const { asPath, pathname } = useRouter();

    const [coach, setCoach] = useState(null);
    const [coachId,setCoachId]=useState();


    const logout = () => {
      sessionStorage.removeItem('coachId');
      router.push('/pages/login')
    }

    const clientLogout = () => {
      sessionStorage.removeItem('userId');
      router.push('/client/login')
    }

    useEffect(() => {

      const coachId = sessionStorage.getItem('coachId')
      const userId = sessionStorage.getItem('userId')

      setCoachId(coachId);

      if (coachId) {
        const fetchCoach = async () => {
          const coachRef = doc(collection(database, "coaches_user"), coachId);
          const coachDoc = await getDoc(coachRef);

          if (coachDoc.exists()) {
            setCoach(coachDoc.data());
          } else {
            console.log("No coach found");
          }
        };
        fetchCoach();
      }

  }, [coachId])


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
                        {
                          coach ?
                          (
                              <>{coach.coach_name}</>
                          ) : null
                        }
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
