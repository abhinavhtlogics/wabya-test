import Link from 'next/link'
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


const ClientsBasic = () => {

  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/pages/login')
    }
}, [])

  return (
    <section className='clients-listing'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 filter-coll'>
            <div className='client-filter'>
              <div className='dropdown'>
                <div className='inner'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Filter Clients
                  </button>
                  <ul className='dropdown-menu'>
                    <div className='form-check'>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          All
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Active
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Inactive
                        </label>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
            <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
          <div className='col-sm-3 cl-coll'>
          <Link href='/clientDetail' passHref>
              <div className='info'>
                <figure>
                  <img src='../images/clients-01.png' alt='' />
                </figure>
                <h3>
                  Clients Name <span>Private</span>
                </h3>
                <p>
                  <span>Next Session</span>
                </p>
                <p>Thursday</p>
                <p>10 November 2023</p>
                <p>09:30</p>
              </div>
            </Link>
          </div>
          {/* <!--/ cl-coll --> */}
        </div>
        {/* <!--/ row --> */}
      </div>
    </section> // client-listing
  )
}

export default ClientsBasic
