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

  const router = useRouter()
  const [idd,setIdd] = useState(router.query.id);

  //setIdd(""+router.query+"");

  //const clientRef = collection(database, "client_user")
  const itemRef = doc(collection(database, "client_user"), idd);

  const [CDetail, setCDetail] = useState([]);

   // get all meeting data
   const getClientDetail = async () => {
    //const userId = sessionStorage.getItem("userId");
console.log('testing');

    // queryDoc = query(clientRef, where("client_id", "==", id));



    await getDoc(itemRef).then((response) => {
      setCDetail(response.data());
      console.log(response.data());
    });
  };


  useEffect(() => {
    if (idd) {
      console.log(idd);

      getClientDetail();


    }
  }, [idd]);

  useEffect(() => {
    console.log(CDetail);
  }, [CDetail]);
  
  return (

    <section className="client-profile">
      <div className="container">
        <div className="row">

        <div className="col-sm-12 top">
          <div className="inner-info">
            <figure><img src={`${router.basePath}/images/clients-01.png`} alt=""/></figure>
            <h2> {!CDetail ? null : CDetail.client_name} <span>Private</span></h2>
          <div className="right-area">
            <p><a href="#" className="btn">Start Call</a></p>
            <p><Link href='/client-resources' passHref><a className="btn btn-resources">Resources</a></Link></p>
          </div>
          </div>
        </div>

        <div className="col-sm-4 left mrb-30">
          <div className="info-grid">
          <p>Contact Details: <span><a href="mailto:name@gmail.com">{!CDetail ? null : CDetail.client_email}</a></span></p>
          <p>Time Zone: <span>{!CDetail ? null : CDetail.client_zone }</span></p>
          <p>Current Package <span>Pay as you go</span></p>
          <p>Last Session: <span>10 November 2023</span></p>
          <p>Completed Sessions: <span>00</span></p>
          <p>Next Sessions: <span>Thursday</span><span>10 November 2023</span><span>09:30</span></p>
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
