// ** MUI Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import clientDetail from 'src/pages/clientDetail/[id]';
import { ConsoleNetworkOutline } from 'mdi-material-ui';



const ClientDetail = () => {

  
  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  const [coachData, setCoachData] = useState(null);

  const [planData, setPlanData] = useState(null);

  // get single client data
  useEffect(() => {
    const getClientData = async () => {
      try{

        console.log(router.query)
        if (router.query.id !== undefined) {

          const clientRef = doc(collection(database,"client_user"),router.query.id );
          const clientDoc = await getDoc(clientRef);

          if (clientDoc.exists()) {
            const clientData = clientDoc.data();
            setClientData(clientData);

            const coachRef = doc(collection(database,'coaches_user'),clientData.assign_coach_id);
            const coachDoc = await getDoc(coachRef);

            if (coachDoc.exists()) {
              const coachData = coachDoc.data();
              setCoachData(coachData);
            }



            const planRef = doc(collection(database,'admin_plans'),clientData.plan_id);
            const planDoc = await getDoc(planRef);

            if (coachDoc.exists()) {
              const planData = planDoc.data();

              console.log(planData);
              setPlanData(planData);
            }
          }
        }
      }catch (error) {
        console.log(error); 
      }
    };
    getClientData();
  }, [router.query.client_id]);


  return (

    <section className="client-profile">
      <div className="container">
        <div className="row">

        <div className="col-sm-12 top">
          <div className="inner-info">
            <figure><img src={`${router.basePath}/images/clients-01.png`} alt=""/></figure>
            <h2> {!clientData ? null : clientData.client_name} <span>Private</span></h2>
          <div className="right-area">
            <p><a href="#" className="btn">Join Call</a></p>
            <p><Link href='/client-resources' passHref><a className="btn btn-resources">Resources</a></Link></p>
          </div>
          </div>
        </div>

        <div className="col-sm-4 left mrb-30">
          <div className="info-grid">
          <p>Contact details <span><a href="mailto:name@gmail.com">{!clientData ? null : clientData.client_email}</a></span></p>
          <p>Time zone <span>{!clientData ? null : clientData.client_zone }</span></p>
          <p>Current package <span>{!planData ? null : planData.plan_name }</span></p>
          <p>Last session <span>10 November 2023</span></p>
          <p>Completed sessions <span>00</span></p>
          <p>Next sessions <span>Thursday</span><span>10 November 2023</span><span>09:30</span></p>
          </div>
        </div>

        <div className="col-sm-8 right mrb-30">


              <div className="info-grid">

          <div className="info-grid">


                <div className="client-light">
                    <div className="icons-bottom">
                      <span className="icons"><i className="fa fa-microphone-slash" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-video-camera" aria-hidden="true"></i></span>
                      <span className="icons active"><i className="fa fa-phone" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-arrows-alt" aria-hidden="true"></i></span>
                      <span className="icons"><i className="fa fa-bars" aria-hidden="true"></i></span>
                    </div>
                </div>
              </div>



      </div>
      </div>
        </div>
      </div>
    </section>
  )
}

export default ClientDetail
