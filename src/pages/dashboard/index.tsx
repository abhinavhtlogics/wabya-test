// ** Files Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// firebase config
import { database, storage } from '../../../firebaseConfig'
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore'
import { useFormik } from 'formik';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


// ** MUI Components


const Dashboard = () => {

  const router = useRouter()
  const [coach, setCoach] = useState(null);
  const [coachId,setCoachId]=useState();

  const [accept_new_client,setAcceptNewUser]=useState(0);

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


const handleChange = async () =>{
  console.log(accept_new_client);
  let a=0;

  if(accept_new_client == 0){
    setAcceptNewUser(1);
    a=1;
  }
  else{
    setAcceptNewUser(0);
    a=0;
  }

  
 


  const coachIds = sessionStorage.getItem('coachId');
  const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

  const updatedData = {
    accept_new_client:a
  };
  await updateDoc(userDocRef, updatedData);
 // editAdmin();
  
}


useEffect(() => {
  console.log('testtt');

  const editAdmin = async () => {

   console.log('testtt');
    const coachIds = sessionStorage.getItem('coachId');
    const userCollection = collection(database, 'coaches_user');
    const userDocRef = doc(userCollection, coachIds);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());
    setAcceptNewUser(userDoc.data().accept_new_client)
    
  
  
  }
  editAdmin();
}, []);



  return (
    <>
    {
      coach ?
      (
          <>
          <section className="user-profile">
            <div className="container">
              <div className="row">

                    <div className="col-sm-12 top">
                      <div className="inner-info">
                        <figure><img src={coach.coach_profile} alt={coach.coach_name} /></figure>

                              <h2>{coach.coach_name}</h2>

                      <div className="right-area">
                        <div className="accepting-info">
                        <span>Accepting New Clients</span>
                        <label className="switch">
  <input
    className="switch-input"
    type="checkbox"
    
    checked={accept_new_client !== 0}
    onChange={(e) => {
      if (e.target.checked) {
        setAcceptNewUser(1);

        const coachIds = sessionStorage.getItem('coachId');
  const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

  const updatedData = {
    accept_new_client:1
  };
  updateDoc(userDocRef, updatedData);
      } else {
        setAcceptNewUser(0);
        const coachIds = sessionStorage.getItem('coachId');
        const userDocRef = doc(collection(database, 'coaches_user'), coachIds);
      
        const updatedData = {
          accept_new_client:0
        };
        updateDoc(userDocRef, updatedData);
      }
    }}
  />
  <span className={`switch-label  ${accept_new_client !== 0 ? 'btn-green' : 'btn-blue'}`} data-on="Yes" data-off="No"></span>
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
                      {/* <p>Information</p> */}
                      <p>Contact details <span><a href={`mailto:${coach.coach_email}`}>{coach.coach_email}</a></span></p>
                      <p>Time zone <span>{coach.coach_timezone}</span></p>
                      <p>Languages <span>{coach.coach_language}</span></p>

                      </div>
                    </div> {/* <!--/ left --> */}

                    <div className="col-sm-8 right mrb-30">
                      <div className="info-grid">
                      <h3>Bio</h3>
                      <p>{coach.coach_bio}</p>
                      <h3>About</h3>
                      <p>{coach.coach_about}</p>

                      </div>
                    </div> {/* <!--/ left --> */}
              </div> {/* <!--/ row --> */}
            </div>
          </section>
          </>
      ) : null
    }
    </>

  )
}

export default Dashboard
