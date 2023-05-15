// ** React Imports
import { ReactNode, useState,useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { database } from '../../../firebaseConfig'
import { collection, addDoc ,where, query,startAt,limit,orderBy,getDocs} from 'firebase/firestore'
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import Calendar from "react-calendar";

const CoachSessionBasic = () => {

  const [isTrue, setIsTrue] = useState(false)
  const [isThankModal, setIsThankModal] = useState(false)
  const coachRef = collection(database, 'coaches_user');
const planRef = collection(database, 'admin_plans');
const [coachData, setCoachData] = useState([]);
const [randomNo, setrandomNo] = useState(0);
const clientRef = collection(database, 'client_user');
const [planData, setplanData] = useState([]);
const [coachId, setcoachId] = useState(0);

const [client_name, set_client_name] = useState('');
const [client_email, set_client_email] = useState('');
const [client_password, set_client_password] = useState('');
const [client_repassword, set_client_repassword] = useState('');



const [clientMsg, setClientMsg] = useState('');
const [clientEmailMsg, setClientEmailMsg] = useState('');
const [clientPassMsg, setClientPassMsg] = useState('');
const [clientRepassMsg, setsetClientRePassMsg] = useState('');

const [isShow, setisShow] = useState(true);

  const [Month, setMonth] = useState("");
  const [Date_, setDate_] = useState();
  const [Day_, setDay_] = useState("");

  const [date, setDate] = useState(new Date());
  const [array1, setarray1]: any[] = useState([]);
  const meetingRef = collection(database, "meeting");
  const [timeslot_load, settimeslot_load] = useState(false);
  const [meetingdate, setmeetingdate] = useState("");
  const [meetingByDate, setMeetingByDate] = useState([]);
  const [selectedTime, setselectedTime]: any = useState();
  const [meetingtime, setmeetingtime] = useState("");
  const [collectionUpdateId, setcollectionUpdateId] =
  useState("");

const [updateAction, setupdateAction] = useState(false);
const [modal_action, setmodal_action] = useState("");
  const [res_action, setres_action] = useState("");


  const [ismodalShow, setismodalShow] = useState(false);
  // fetching records
  const [fireData, setFireData] = useState([]);
 
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientTimeZone, setClientTimeZone] = useState("");
  const [clientLanguage, setClientLanguage] = useState("");

  const [count, setCount] = useState(1);
  const [bookingLoad, setbookingLoad] = useState(false);
  const [bookingError, setbookingError] = useState(false);
  function addMinutes(time, minutes) {
    var date = new Date(
      new Date("01/01/2015 " + time).getTime() + minutes * 60000
    );
    var tempTime =
      (date.getHours().toString().length == 1
        ? "0" + date.getHours()
        : date.getHours()) +
      ":" +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds()
        : date.getSeconds());
    return tempTime;
  }

  function isReserved(time) {
    // assume reserved times are stored in an array called 'reservedTimes'
    for (let i = 0; i < meetingByDate.length; i++) {
      if (time === meetingByDate[i].meetingTime) {
        // if the time slot is reserved, return true
        return true;
      }
    }
    // if the time slot is not reserved, return false
    return false;
  }
  const thankModal = () => {
    setIsThankModal(true)
  }

  const handleTimeClick = (event: any) => {
    // //console.log( event.target.getAttribute("data-key"));
    ////console.log( event.target.getAttribute("data-time"));
    setmeetingtime(event.target.getAttribute("data-time"));

    // selectedTime.splice(0, selectedTime.length);
    //selectedTime.splice(0, array1.length);
    setselectedTime(event.target.getAttribute("data-key"));
    ////console.log(meetingdate);
    //console.log(meetingtime);
    var startTime = meetingdate + " " + meetingtime;
    //console.log(startTime);

    var newTime = new Date(
      new Date(
        "1970/01/01 " + event.target.getAttribute("data-time")
      ).getTime() +
        coachesEventTimeInterval * 60000
    ).toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    //console.log(newTime);
    setmeetingendtime(newTime);
    setshowNext(true);
  };


  useEffect(() => {
   
    var starttime = "09:00:00";
   var interval = "90";
   var endtime = "17:00:00";
   var timeslots = [starttime];
   
   console.log(meetingByDate);
   
   while (starttime < endtime) {
   
     starttime = addMinutes(starttime, interval); 
   
     if(!isReserved(starttime)){
     timeslots.push(starttime);
     }
     settimeslot_load(false);
   }
   
   setarray1(timeslots);
   
   
     }, [meetingByDate]);

  const calDiv = () =>{
   // event.preventDefault();
    setIsTrue(true);
  }


   // coach data fetch
   const getCoachData = async () => {
    console.log('test');
        const queryDoc = query(coachRef, where('coach_email', '!=', ''));
    
        await getDocs(queryDoc).then(response => {
          console.log(response.docs.length);
          setCoachData(
            response.docs.map(data => {
              return { ...data.data(), coach_id: data.id }
            })
          )
        })
      }

// coach data fetch
const getAllPlans = async () => {
  console.log('testsss');
      const queryDoc = query(planRef,where('status', '==', '1'));
  
      await getDocs(queryDoc).then(response => {
        console.log(response.docs.length);
        setplanData(
          response.docs.map(data => {
            return { ...data.data(), plan_id: data.id }
          })
        )
      })
    }
  

      useEffect(() => {


        getCoachData();
    
        getAllPlans();
    
    
      }, [])
    
      useEffect(() => {
    
    
        console.log(coachData);


        
        setrandomNo(Math.floor(Math.random() * (coachData.length - 0 + 1)) + 0);
         
       // setcoachId(coachData[randomNo].coach_id)
    
      }, [coachData])


      useEffect(() => {
    
    
        console.log(coachData);

        
        
        if(coachData.length > 0){
         
        setcoachId(coachData[randomNo].coach_id)
        }
    
      }, [randomNo])




  // coach data fetch
  const countData = async (client_em:string) => {
    console.log('test');
        const queryDoc = query(clientRef, where('client_email', '==', client_em));
    let count_data=0
        await getDocs(queryDoc).then(response => {
          console.log(response.docs.length);
          count_data=response.docs.length;
        })
        return count_data;
      }


       // formik form validates
       const onChange =  (event) => {

         console.log(event.target);

         if(event.target.name == 'client_name'){
          set_client_name(event.target.value);
         }

         if(event.target.name == 'client_email'){
          set_client_email(event.target.value);
         }

         if(event.target.name == 'client_password'){
          set_client_password(event.target.value);
         }

         if(event.target.name == 'client_repassword'){
          set_client_repassword(event.target.value);
         }


       }



        // formik form validates
        const onSubmit = async (event) => {

          console.log(event.target);
          let err=0;
 
         if(client_name ==''){
          setClientMsg('Client Name is Required');
          err=err+1;

         }

         if(client_email ==''){
          setClientEmailMsg('Client Email is Required');
          err=err+1;
         }

         if(client_password ==''){
          setClientPassMsg('Client Password is Required');
          err=err+1;
         }

         if(client_repassword ==''){
          setsetClientRePassMsg('Client Confirm Password is Required');
          err=err+1;
         }


         if(err == 0){

          if(await countData(client_email.toLowerCase()) == 0){
          
      
                addDoc(clientRef, {
                  client_name: client_name,
                  client_email : client_email,
                  client_password : client_password,
                  assign_coach_id:coachId,
                  plan_id:planData[0].plan_id,
                 
                })
                  .then(() => {
                    console.log('done');
                    toast.success('Client registered successfully')
                    //router.push('/client/login')
                  })
                  .catch((err) => {
                    console.error(err);
                  })
      
          
           
                }else{
                  toast.error('Email Already Registerd')
                }
           
          

         }
 
        }


        /**Get Timeslot */

  const getTimeslots = async (date) => {
    settimeslot_load(true);

    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

    console.log(todayDate);

    getMeetingByDate(todayDate);

    setmeetingdate(todayDate);

    var startTime = "";
    var endTime = "";
    const d = date;
    var selectedDay = date.getDay();
    //console.log("selected days: " + selectedDay + "");

    setDate(date);
    setMonth(date.toLocaleString("default", { month: "long" }));
    setDate_(date.getDate());
    setDay_(date.toLocaleDateString("default", { weekday: "long" }));

    var included = 1;
    setarray1([]);

   

      // //console.log(res);
      //console.log(data);






    //getBookedSchedule();
  };

 
 

  // const scheduleNext = () => {
  //   setNext(true)
  // }

  const scheduleNewSes = () => {
    setcollectionUpdateId("");
    setmodal_action('SCHEDULE A SESSION');
    setres_action("scheduled");
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(false);
   // coachSession();
  };
    
  // get all meeting data
  const getMeetingByDate = async (todayDate: string) => {
    

    const queryDoc = query(meetingRef, where("coachId", "==", coachId),where("meetingDate", "==", todayDate));

    await getDocs(queryDoc).then((response) => {
      setMeetingByDate(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });
  };
  return (
    <>

    <section className="journey-wrap">
      <div className="container">
        <div className="row mrb-70">
        <div className="col-sm-6 left">
          <h2><span>book a free coaching session</span>start your journey</h2>
        <p>Before you can sign up for your free session, please select the type of <br/>coach you'd like to work with when you'd like your session to be held</p>
        </div>

        <div className="col-sm-6 right">
          <figure><img src="../images/shape-06.png" alt=""/></figure>
        </div>
      </div> {/* <!--/ row --> */}

      {
        isTrue ?
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 session-form">
                <form>
                <div className="col-sm-12 date-time mrb-60">
                  <h3>select your date & time</h3>
                <div className="time-btn"><button className="btn" onClick={scheduleNewSes}>select an available time</button></div>
                </div>

                <div className="col-sm-12 date-time mrb-30">
                  <h3>fill in your details</h3>
                </div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_name" value={client_name}
              onChange={onChange} placeholder="name"/> {clientMsg}</div>

                <div className="col-sm-6 form-group"><input className="form-control"  placeholder="surname"/></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_email" value={client_email}
              onChange={onChange} placeholder="email"/>{clientEmailMsg}</div>

                <div className="col-sm-6 form-grdoup"></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_password" value={client_password}
              onChange={onChange} placeholder="account password *"/>{clientPassMsg}</div>

                <div className="col-sm-6 form-group form-p"><small><strong>* required for login for your free session. <br/>Password must be at least 8 characters and include uppercase, a number and special character</strong></small></div>

                <div className="col-sm-6 form-group"><input className="form-control" name="client_repassword" value={client_repassword}
              onChange={onChange} placeholder="repeat account password"/>{clientRepassMsg}</div>

                <div className="col-sm-6 form-group">
                  <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="accept"/>
                  <label className="custom-control-label ml-2">I accept the <a href="#">terms of service</a></label>
                </div>
                </div>
              </form>
              </div> {/* <!--/ session-form --> */}
	          </div>

            <div className="row">
              <div className="col-sm-12 bottom">
                <p><button className="btn" onClick={onSubmit}>book my session</button></p>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}

            {
              isThankModal ?
                (
                  <>
                  <div className="thank-modal">
                    <div className="front-pricing thank-note">
                      <div className="pr-modal">
                        <div><i className="fa fa-angle-left"></i></div>
                        <div><span>thank you</span></div>
                      </div>
                      <div className="divider"></div>
                      <div className="para-modal">
                        <p>Well done on taking the first step in your journey! <br/> You'll receive a confirmation email - please check it hasn't landed in your spam</p>
                      </div>
                    </div>
                  </div>
                  </>
                ) : null
            }
          </>
        ) :
        (
          <>
            <div className="row mrb-60">
              <div className="col-sm-12 title-text text-center">
                <h3>Our rates are based on the coach experience level you need, so before you start your journey, choose your coach experience</h3>
              <p>Note: we won’t take payment details until you’ve completed your free discovery session <br/>and decided to go ahead with your coaching journey</p>
              </div>
            </div>

            <div className="row justify-content-md-center">
              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>novice</h4>
                <ul>
                  <li>This is a newly-accredited coach</li>
                <li>Good place to start if you’ve never been coached</li>
                <li>Pick this if you’re on a budget.</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="/client/register" className="btn">select</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}

              <div className="col-sm-4 pw-coll">
                <div className="inner">
                  <h4>experienced</h4>
                <ul>
                  <li>This coach has more than 100 client sessions under their belt.</li>
                <li>Pick this if you’re familiar with coaching</li>
                <li>Pick this if budget isn’t a concern</li>
                </ul>

                <ul>
                <h5>Prices per session</h5>
                <li>First session: <span>FREE</span></li>
                <li>Pay as you go: <span>£40</span></li>
                <li>Bundle: <span>£210 for 6</span> sessions</li>
                </ul>
                <p className="btn-wrap"><a href="/client/register" className="btn">select</a></p>
                </div>
              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}
 
            <div className="row">
              <div className="col-sm-12 bottom">
                {/* <p><button onClick={calDiv} className="btn">continue</button></p> */}
                <p><Link  href="#" onClick={calDiv}><a className="btn" onClick={calDiv}>continue</a></Link></p>

              </div> {/* <!--/ col-sm --> */}
            </div> {/* <!--/ row --> */}
          </>
        )
      }


{ ismodalShow ?
<>
                <div className="history-modal">
                  <h4>New Booking</h4>
                </div>

                <div className="reschedule-zone">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="coach-fig">
                        <figure>
                          <img
                            src="../../images/clients-01.png"
                            alt="Coach Name"
                          />
                        </figure>
                        {/* <p>{coachesCalName}</p> */}
                        <p>
                          <strong>next session</strong>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="resc-cal">
                        <h5>select a date &amp; time</h5>
                        <Calendar onChange={getTimeslots} value={date} />
                        <h5>time zone</h5>
                        {/* <p>{coachesCalTimezone}</p> */}
                      </div>
                    </div>
                    {isShow ? (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>

                          {array1.map((timeSlot, index) => {
                            return selectedTime == index ? (
                              <button
                                className="btn btn-time"
                                data-key={index}
                                key={index} 
                                data-time={timeSlot}
                                style={{ backgroundColor: "#6dc1a4" }}
                                onClick={handleTimeClick}
                              >
                                {timeSlot}
                              </button>
                            ) : (
                              <button
                                className="btn btn-time"
                                data-time={timeSlot}
                                data-key={index}
                                key={index}
                                onClick={handleTimeClick}
                              >
                                {timeSlot}
                              </button>
                            );
                          })}

                          {timeslot_load ? (
                            <div className="btn btn-time"> Loading...</div>
                          ) : null}
                        </div>
                        <button className="btn btn-next" >
                          next <i className="fa fa-arrow-right"></i>
                        </button>
                        {bookingLoad ? <p>Loading, Please Wait...</p> : null}

                        {bookingError ? <p>Something Went Wrong...</p> : null}
                      </div>
                    ) : (
                      <div className="col-sm-4">
                        <div className="cal-time">
                          <p>
                            {Day_} {Month} {Date_}
                          </p>
                          {timeslot_load ? (
                            <div className="btn btn-time">
                              Timeslot Loading...
                            </div>
                          ) : null}
                          <p>No Timeslot Available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </> : null }


      </div>
    </section> {/* <!--/ book a free coaching session  --> */}

    </>
  )
}

CoachSessionBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CoachSessionBasic
