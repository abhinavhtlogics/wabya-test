// ** Files Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import { collection, getDoc, doc } from 'firebase/firestore'


// ** MUI Components


const Dashboard = () => {

  const router = useRouter()
  const [coach, setCoach] = useState(null);
  const [coachId,setCoachId]=useState();

  useEffect(() => {

    const coachId = sessionStorage.getItem('coachId')
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


    if(!coachId){
        router.push('/pages/login')
    }
}, [coachId])


  return (

          <section className="user-profile">
            <div className="container">
              <div className="row">

                    <div className="col-sm-12 top">
                      <div className="inner-info">
                        <figure><img src="../images/user-image.png" alt=""/></figure>
                        {
                          coach ?
                          (
                              <h2>{coach.coach_name}</h2>
                          ) : null
                        }
                      <div className="right-area">
                        <div className="accepting-info">
                        <span>Accepting New Clients</span>
                            <label className="switch">
                      <input className="switch-input" type="checkbox" />
                      <span className="switch-label" data-on="Yes" data-off="No"></span>
                      <span className="switch-handle"></span>
                    </label>
                      </div>

                      <div className="dropdown">
                          <div className="inner">
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit My Profile</button>
                          <ul className="dropdown-menu">
                            <li><Link href='/edit-profile' passHref><a className="dropdown-item">Edit Profile</a></Link></li>
                          <li><Link href='/change-password' passHref><a className="dropdown-item">Change Password</a></Link></li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      </div>
                    </div> {/* <!--/ top --> */}

                    <div className="col-sm-4 left mrb-30">
                      <div className="info-grid">
                      <p>Information</p>
                      <p>Contact Details: <span><a href="mailto:name@gmail.com">name@gmail.com</a></span></p>
                      <p>Time Zone: <span>Europe, London</span></p>
                      <p>Languages: <span>English, French</span></p>

                      </div>
                    </div> {/* <!--/ left --> */}

                    <div className="col-sm-8 right mrb-30">
                      <div className="info-grid">
                      <h3>Bio</h3>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eusimod tincidunt ut laoret dolore manga aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamorper. sed diam nonummy nibh eusimod tincidunt ut laoret dolore manga aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamorper.</p>
                      <h3>About</h3>
                      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eusimod tincidunt ut laoret dolore manga aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamorper.</p>

                      </div>
                    </div> {/* <!--/ left --> */}
              </div> {/* <!--/ row --> */}
            </div>
          </section>


  )
}

export default Dashboard
