import Link from 'next/link'
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app,database } from '../../../../firebaseConfig'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";


const ViewBasic = () => {

  const router = useRouter()
  const [meeting,setMeeting] = useState([]);


  // const coachId = router.query.coach_id;
  // const getMeeting = async () => {

  //   const meetingRef = collection(database, 'meeting');
  //   const queryDoc = query(meetingRef, where("coachId", "==", coachId));

  //   await getDocs(queryDoc).then((response) => {
  //     setMeeting(
  //       response.docs.map((data) => {
  //         return { ...data.data(), meeting_id: data.id };
  //       })
  //     );
  //   });
  // };

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        if (router.query.coach_id !== undefined) { // check if coach_id is defined
          const coachesCollection = collection(database, 'client_user');
          const coachesQuery = query(coachesCollection, where('assign_coach_id', '==', router.query.coach_id));
          const coachesSnapshot = await getDocs(coachesQuery);
          const coachesData = coachesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMeeting(coachesData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoaches();
  }, [router.query.coach_id]);

  useEffect(() => {
    const token = sessionStorage.getItem('adminId')

    if(!token){
        router.push('/super-admin/login')
    }

}, []);



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

          { meeting.map((data) => {
            return (
                <>
                  <div className='col-sm-3 cl-coll'>
                    <div className='info'>
                      <figure> <img src='../../../images/clients-01.png' alt='' /> </figure>
                      <h3> { data.client_name } <span>Private</span> </h3>
                      <p> <span>Next Session</span> </p>
                      <p>{ new Date(data.meetingDate).toLocaleDateString("en-US", { weekday: 'long' }) }</p>
                      <p>{ new Date(data.meetingDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) }</p>
                      <p>{ data.meetingTime }</p>
                    </div>
                  </div>
                </>
              );
            })}

        </div>
        {/* <!--/ row --> */}
      </div>
    </section> // view-client-listing via coach
  )
}

export default ViewBasic
