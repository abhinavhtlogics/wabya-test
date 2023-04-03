// ** Files Imports
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, database } from "../../../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { Modal } from "antd";

// import Cal, { getCalApi } from "@calcom/embed-react";
import Calendar from "react-calendar";
import { AnyAaaaRecord } from "dns";
import { Video } from "mdi-material-ui";
import { Clock } from "mdi-material-ui";
import { ArrowRightCircleOutline } from "mdi-material-ui";

const Dashboard = () => {
  const router = useRouter();
  const databaseRef = collection(database, "client_user");
  const coachRef = collection(database, "coaches_user");
  const planRef = collection(database, "admin_plans");
  const meetingRef = collection(database, "meeting");

  /// For Testing
  //const [apiUrl, setapiUrl] = useState("https://api.cal.dev/");

  ///For Production

  const [apiUrl, setapiUrl]=useState('https://api.cal.com/');

  const [client, setClient] = useState(null);
  const [editDetail, setEditDetail] = useState(false);

  const editD = async () => {
    setEditDetail(true);

    const userIds = sessionStorage.getItem('userId');
    const userCollection = collection(database, 'client_user');
    const userDocRef = doc(userCollection, userIds);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc);

    setClientEmail(userDoc.data().client_email),
    setClientPhone(userDoc.data().client_phone),
    setClientCountry(userDoc.data().client_country),
    setClientLanguage(userDoc.data().client_language),
    setClientTimeZone(userDoc.data().client_zone)
  };
  const saveD = async () => {
    setEditDetail(false);

    const plan_id = sessionStorage.getItem('userId');
    const fieldToEdit = doc(database, 'client_user', plan_id);

    updateDoc(fieldToEdit, {
      client_email: clientEmail,
      client_phone : clientPhone,
      client_country : clientCountry,
      client_zone : clientTimeZone,
      client_language : clientLanguage
    })
    .then(() => {
      toast.success('Client details updated successfully!')
      setClientEmail('')
      setClientPhone('')
      setClientCountry('')
      setClientLanguage('')
      setClientTimeZone('')
    })
    .catch((err) => {
      console.log(err);
    })

  };

  const openCalendar = (event) => {
    //console.log(event.target.getAttribute("data-interval"));
    if (
      event.target.getAttribute("data-interval") != null ||
      event.target.getAttribute("data-interval") != ""
    ) {
      setcoachesEventTimeInterval(event.target.getAttribute("data-interval"));
      setcoachesCalEventSelected(
        event.target.getAttribute("data-coach_event_id")
      );
    } else {
      setcoachesEventTimeInterval(30);
    }

    setCoach(false);
    setEventChoose(false);
    setReschedule(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [selectedTime, setselectedTime]: any = useState();
  const [next, setNext] = useState(false);
  const [eventChoose, setEventChoose] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [coach, setCoach] = useState(false);
  const [coachesCalApiKey, setcoachesCalApiKey] = useState("");
  const [coachesFirebaseId, setcoachesFirebaseId] = useState("");
  const [coachesFirebaseName, setcoachesFirebaseName] = useState("");
  const [coachesEvents, setcoachesEvents] = useState([]);
  const [coachesEventTimeInterval, setcoachesEventTimeInterval] = useState(30);
  const [coachesCalUsername, setcoachesCalUsername] = useState("");
  const [coachesCalName, setcoachesCalName] = useState("");
  const [coachesCalEmail, setcoachesCalEmail] = useState("");
  const [coachesCalTimezone, setcoachesCalTimezone] = useState("");
  const [coachesCalEventSelected, setcoachesCalEventSelected] = useState();

  const [modal_action, setmodal_action] = useState("");

  //const [coachesCalUsername, setcoachesCalUsername] = useState('abhinav-kumar-r6xoe0');
  const [coachesCalDefaultScheduleId, setcoachesCalDefaultScheduleId] =
    useState();

  const [coachesCalUserId, setcoachesCalUserId] = useState();

  const [clientCalAPIkey, setclientCalAPIkey] = useState(
    "cal_test_023256ac85011cded16d8d4f8f137d99"
  );
  const [clientCaluserName, setclientCaluserName] =
    useState("abhinavkumar0325");

    const [collectionUpdateId, setcollectionUpdateId] =
    useState("");

    const [updateAction, setupdateAction] =
    useState(false);
  const [clientCalName, setclientCalName] = useState("");
  const [clientCalEmail, setclientCalEmail] = useState("");

  const [clientFirebaseName, setclientFirebaseName] = useState("");
  const [clientFirebaseEmail, setclientFirebaseEmail] = useState("");

  const [clientFirebaseId, setclientFirebaseId] = useState("");

  const [BookedId, setBookedId] = useState();
  const [mySession, setmysSession] = useState([]);

  const scheduleNewSes = () => {
    setcollectionUpdateId("");
    setmodal_action('SCHEDULE A SESSION');
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(false);
    coachSession();
  };

  const scheduleReSes = (event) => {
    setcollectionUpdateId(event.target.getAttribute('data-id'));
    setmodal_action('RESCHEDULE A SESSION');
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(true);
    coachSession();
  };

  const coachSession = () => {
    //setcoachesCalUsername("abhinavkumar0325");

    //setcoachesCalApiKey("cal_test_023256ac85011cded16d8d4f8f137d99");

    //setcoachesCalDefaultScheduleId(133);
    setCoach(false);
    setEventChoose(false);
    setReschedule(true);
  };
  const coachOk = () => {
    setCoach(false);
  };

  const coachCancel = () => {
    setCoach(false);
  };

  const videoSession = () => {
    setVideoCall(true);
  };
  const videoOk = () => {
    setVideoCall(false);
  };

  const videoCancel = () => {
    setVideoCall(false);
  };

  // const scheduleNext = () => {
  //   setNext(true)
  // }

  const scheduleNext = async () => {
    setbookingLoad(true);
    setbookingError(false);
    if(updateAction == false){
    //console.log("abc");

    // var objectWithData = {
    //   start: "" + meetingdate + " " + meetingtime + ":00 GMT+0530",
    //   end: "" + meetingdate + " " + meetingendtime + ":00 GMT+0530",

    //   name: "" + clientFirebaseName + "",
    //   email: "" + clientFirebaseEmail + "",
    //   timeZone: "" + coachesCalTimezone + "",
    //   eventTypeId: parseInt(coachesCalEventSelected,10),
    //   location: "",
    //   language: "",
    //   metadata: {},
    //   customInputs: [],
    // };
    try {
      const res = await fetch(
        "https://api.daily.co/v1/rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer a2c645d6f0369a165420d8b8b8a24894cfb18c209f1c43f8f2cb5ef35440f0a0",
          },

        }
      );
      const data = await res.json();
      console.log(data);
      setmeetingLink(data.url);
      setmeetingName(data.name);
      setmeetingApiCreated(data.api_created);
      setmeetingPrivacy(data.privacy);

      setmeetingCreatedAt(data.created_at);
      setBookedId(data.id);
      if (res.status == 200) {
        // setbookingLoad(false);
        // setmeetingtitle(data.title);
        // setmeetinguser(data.user.name);
        // setmeetinguser2(data.attendees[0].name);
        // setmeetinguseremail(data.user.email);
        // setmeetinguser2email(data.attendees[0].email);

        setmeetingLink(data.url);
        setNext(true);

        setBookedId(data.id);

        getUpcomingBooking();
      } else {
        setbookingLoad(false);
        setbookingError(true);
      }

      //console.log(data);
    } catch (err) {
      setbookingLoad(false);
      setbookingError(true);
      //console.log(err);
    }

  }
  else{
    updateMeeting();

  }

    // setNext(true);
  };

  const getBookingId = async () => {


        const meetRef = collection(database, "meeting");

        addDoc(meetRef, {
          meetingId: BookedId,
          clientId: sessionStorage.getItem("userId"),
          coachId: coachesFirebaseId,
          coach_name: coachesCalName,
          meetingDate: meetingdate,
          meetingTime: meetingtime,
          meetingEndTime: ""+meetingendtime+":00",
          meetingLink: meetingLink,
          meetingApiCreated:meetingApiCreated,
          meetingName:meetingName,
          meetingPrivacy:meetingPrivacy,
          meetingCreatedAt:meetingCreatedAt,
          status: "true",
        });


    // setNext(true);
  };



  const updateMeeting = async () => {


    const meetRef = doc(collection(database, "meeting"),collectionUpdateId);

   let update= updateDoc(meetRef, {

      meetingDate: meetingdate,
      meetingTime: meetingtime,
      meetingEndTime: ""+meetingendtime+":00",

    });


// setNext(true);
};




const getSessionHistory = async () => {

  const session=[];
  try {
    const res = await fetch(
      "https://api.daily.co/v1/meetings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" :"Bearer a2c645d6f0369a165420d8b8b8a24894cfb18c209f1c43f8f2cb5ef35440f0a0",
        },

      }
    );
    const data = await res.json();
    console.log(data);



    if (res.status == 200) {

console.log('meeting');
console.log(data);
console.log(meeting);

for (let index = 0; index < data.data.length; index++) {


//console.log(data.data[index].room);

  for (let index2 = 0; index2 < meeting.length; index2++) {

    //console.log(meeting[index].meetingName);

    if(data.data[index].room == meeting[index2].meetingName){
      // console.log(index);
      // console.log(index2);
      console.log(data.data[index].room);
      console.log(data.data[index].start_time);
      console.log(data.data[index].duration);
      let todate=new Date(data.data[index].start_time * 1000).getDate();
    let tomonth=new Date(data.data[index].start_time * 1000).getMonth()+1;
    let toyear=new Date(data.data[index].start_time * 1000).getFullYear();
    let original_date=tomonth+'/'+todate+'/'+toyear; console.log(original_date);
    let start_time=new Date(data.data[index].start_time * 1000).toLocaleTimeString();
      session.push({date:original_date,start_time:start_time,duration:data.data[index].duration,coach_name:meeting[index2].coach_name})
    }

  }

}

setmysSession(session);

    } else {

    }

    //console.log(data);
  } catch (err) {

  }



  // setNext(true);
};

  const bookSession = () => {
    setOpen(true);
  };
  const bookOk = () => {
    setOpen(false);
  };
  const bookCancel = () => {
    setOpen(false);
  };

  const rescheduleSession = () => {
    setReschedule(true);
  };
  const rescheduleOk = () => {
    setReschedule(false);
  };
  const rescheduleCancel = () => {
    setReschedule(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [userId, setUserId] = useState();
  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    setUserId(userId);

    if (userId) {
      const fetchClient = async () => {
        const clientRef = doc(collection(database, "client_user"), userId);
        const clientDoc = await getDoc(clientRef);
        if (clientDoc.exists()) {
          setClient(clientDoc.data());

          // //console.log('here');
          //console.log(clientDoc.data);
        } else {
          //console.log("No client found");
        }
      };
      fetchClient();
    }

    if (!userId) {
      router.push("/client/login");
    }

    // const token = sessionStorage.getItem('Token')
    getData();
    getCoachData();
    getMeeting();


    getUsers();
    if (coachesCalApiKey) {
      getBookedSchedule();
      getEventTypes();
    }
  }, [coachesCalApiKey, userId]);

  // get all meeting data
  const getMeeting = async () => {
    const userId = sessionStorage.getItem("userId");

    const queryDoc = query(meetingRef, where("clientId", "==", userId),where("meetingApiCreated", "==", true));

    await getDocs(queryDoc).then((response) => {
      setMeeting(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });
  };

  useEffect(() => {
    if (BookedId) {
      getBookingId();
    }
  }, [BookedId]);

  useEffect(() => {
    if (client != null) {
      console.log(client);
      //console.log(client.client_api);
      setclientCalAPIkey("cal_test_023256ac85011cded16d8d4f8f137d99");
      //setclientCaluserName(client.client_uname);
      setclientFirebaseId(client.id);
      setclientFirebaseName(client.client_name);
      setclientFirebaseEmail(client.client_email);
      setcoachesCalUsername(client.assign_coach_uname);
      setcoachesCalApiKey(client.assign_coach_api);
      setcoachesFirebaseId(client.assign_coach_id);
    }

    if (clientCalAPIkey != "") {
      getUpcomingBooking();
      //
    }

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [client, clientCalAPIkey]);

  // const handleTimeClick = (event: any) => {
  //   //console.log(event.target.getAttribute('data-key'))

  //   // selectedTime.splice(0, selectedTime.length);
  //   //selectedTime.splice(0, array1.length);
  //   setselectedTime(event.target.getAttribute('data-key'))
  //   //console.log(selectedTime)
  // }

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

  // fetching records
  const [fireData, setFireData] = useState([]);
  const [coachData, setCoachData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientTimeZone, setClientTimeZone] = useState("");
  const [clientLanguage, setClientLanguage] = useState("");

  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };
  const getData = async () => {
    await getDocs(planRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), plan_id: data.id };
        })
      );
    });
  };

  // coach data fetch
  const getCoachData = async () => {
    const queryDoc = query(coachRef, where("coach_api", "!=", ""));

    await getDocs(queryDoc).then((response) => {
      setCoachData(
        response.docs.map((data) => {
          return { ...data.data(), coach_id: data.id };
        })
      );
    });
  };

  const [date, setDate] = useState(new Date());
  const [array1, setarray1]: any[] = useState([]);

  const [meetingdate, setmeetingdate] = useState("");
  const [meetingCreatedAt, setmeetingCreatedAt] = useState("");

  const [meetingName, setmeetingName] = useState("");

  const [meetingLink, setmeetingLink] = useState("");

  const [meetingPrivacy, setmeetingPrivacy] = useState("");
  const [meetingApiCreated, setmeetingApiCreated] = useState("");

  const [meetingtime, setmeetingtime] = useState("");

  const [meetingtitle, setmeetingtitle] = useState("");
  const [meetinguser, setmeetinguser] = useState("");
  const [meetinguser2, setmeetinguser2] = useState("");
  const [meetinguseremail, setmeetinguseremail] = useState("");
  const [meetinguser2email, setmeetinguser2email] = useState("");
  const [type_load, settype_load] = useState(false);
  const [type_err_load, settype_err_load] = useState(false);
  const [timeslot_load, settimeslot_load] = useState(false);
  const [bookingLoad, setbookingLoad] = useState(false);
  const [bookingError, setbookingError] = useState(false);

  const [meetingendtime, setmeetingendtime] = useState("");
  const [showNext, setshowNext] = useState(false);

  const [upcomingMetting, setupcomingMetting] = useState([]);

  const [currentdate, setcurrentdate] = useState(new Date().toISOString());

  //const array1 = ['7:00','09:00', '10:00', '10:30', '11:00', '12:30', '14:00','17:00','18:00','20:00'];
  const [isShow, setisShow] = useState(true);

  const [Month, setMonth] = useState("");
  const [Date_, setDate_] = useState();
  const [Day_, setDay_] = useState("");


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

  /* Get All Event  of Coaches */

  const getEventTypes = async () => {
   // settype_load(true);

   // settype_err_load(false);

    try {
      const res = await fetch(
        "" + apiUrl + "v1/event-types?apiKey=" + coachesCalApiKey + "",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        //console.log(data);
        setcoachesEvents(data.event_types);

         if(data.event_types[0].id != null){


         setcoachesCalEventSelected(data.event_types[0].id);
         }
        settype_load(false);
      }
    } catch (err) {
      //console.log(err);
      settype_load(false);

      settype_err_load(true);
    }

    // setNext(true);
  };

  /* Get All Event  of Coaches */

  const getUpcomingBooking = async () => {
    try {
      const res = await fetch(
        "" + apiUrl + "v1/bookings?apiKey=" + clientCalAPIkey + "",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        //console.log(data);
        //setcoachesEvents(data.event_types);
        setupcomingMetting(data.bookings);
      }
    } catch (err) {
      //console.log(err);
    }

    // setNext(true);
  };

  /* Get All Event  of Coaches */

  const getUsers = async () => {
    try {
      const res = await fetch(
        "" + apiUrl + "v1/users?apiKey=" + coachesCalApiKey + "",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        //console.log(data);
        //setcoachesEvents(data.event_types);

        for (let index = 0; index < data.users.length; index++) {
          if (data.users[index].username == coachesCalUsername) {
            setcoachesCalUserId(data.users[index].id);


              setcoachesCalDefaultScheduleId(data.users[index].defaultScheduleId);


            setcoachesCalName(data.users[index].name);
            setcoachesCalEmail(data.users[index].email);
            setcoachesCalTimezone(data.users[index].timeZone);

            break;
          }
        }
      }
    } catch (err) {
      //console.log(err);
    }

    // setNext(true);
  };


  /**Get Timeslot */

  const getTimeslots = async (date) => {
    settimeslot_load(true);

    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

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

    var starttime = "09:00:00";
var interval = "90";
var endtime = "17:00:00";
var timeslots = [starttime];


while (starttime < endtime) {

  starttime = addMinutes(starttime, interval);
  timeslots.push(starttime);

}

setarray1(timeslots);


      // //console.log(res);
      //console.log(data);






    //getBookedSchedule();
  };

  /* Get Booked Schedule  of Coaches */

  const getBookedSchedule = async () => {
    var dateFrom = "2023-03-16";
    var dateTo = "2023-03-17";
    var busySchedule = [];

    try {
      const res = await fetch(
        "" +
          apiUrl +
          "v1/availability?apiKey=" +
          coachesCalApiKey +
          "&dateFrom=" +
          dateFrom +
          "&dateTo=" +
          dateTo +
          "&username=" +
          coachesCalUsername +
          "",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        if (data.busy.length > 0) {
          //console.log(data.busy);
          for (let index = 0; index < data.busy.length; index++) {
            var start = data.busy[index].start;

            let stime = new Date(start).toLocaleTimeString("en-US");

            var convertedStartTime = new Date("1/1/2013 " + stime);
            var startTime =
              convertedStartTime.getHours() +
              ":" +
              convertedStartTime.getMinutes() +
              ":00";

            var end = data.busy[index].end;

            let etime = new Date(end).toLocaleTimeString("en-US");

            var convertedEndTime = new Date("1/1/2013 " + etime);
            var endTime =
              convertedEndTime.getHours() +
              ":" +
              convertedEndTime.getMinutes() +
              ":00";

            busySchedule.push({ starttime: startTime, endtime: endTime });
            //setbookedTimeslot(busySchedule);

            //console.log(bookedTimeslot);
          }
        }
      }
    } catch (err) {
      //console.log(err);
    }
    //console.log(busySchedule);
    // getTimeslots();
  };
  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }
  useEffect(() => {
    if(meeting.length>0){
  getSessionHistory();


    }
  }, [meeting]);

  return (
    <section className="client-dashboard">
      <div className="container">
        <ToastContainer/>

        {/* <div className='row'>
          <div className='col-sm-12'>
            <div className='client-reminder'>
              <p>
                upcoming meeting reminder <span>10 minutes : Coach Name</span>
              </p>
              <div className='dismiss'>
                <h5>Join</h5> <hr />
                <h6>dismiss</h6>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-8 left">
            <div className="banner-text">
              <h2>
                <span>we are because you are</span>welcome{" "}
                {client ? <> {client.client_name} </> : null}
              </h2>
            </div>
          </div>
        </div>

        {/* modal - view session history starts */}
        <Modal
          centered
          className="session-history-modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1100}
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">
                {/* <i className="fa fa-angle-left"></i> */}
                <h4>History</h4>
              </div>
              <div className="table-session">
                <div className="table-responsive">
                  <table className="table table-sess">
                    <thead>
                      <tr>
                        <td></td>
                        <td>date</td>
                        <td>time</td>
                        <td>coach</td>
                        <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                          my notes
                        </td>
                      </tr>
                    </thead>
                    <tbody>

                    {mySession.map((mySes, index) => {
                      return (
                        <tr>
                        <th>session {index +1 }</th>
                        <td>{mySes.date}</td>
                        <td>{mySes.start_time}</td>
                        <td>{mySes.coach_name}</td>

                        <td>
                          <div className="file-shared">
                            <div>
                              <figure>
                                <img src="../../images/file-icon.jpg" alt="" />
                              </figure>
                              <h4>
                                File Name <span>Date Shared</span>
                              </h4>
                            </div>
                            <div>
                              <figure>
                                <img src="../../images/file-icon.jpg" alt="" />
                              </figure>
                              <h4>
                                File Name <span>Date Shared</span>
                              </h4>
                            </div>
                          </div>
                        </td>
                      </tr>

                      );
                    })}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* modal - view session history ends */}

        {/* video join call - modal starts */}
        <Modal
          centered
          className="session-history-modal"
          visible={videoCall}
          onOk={videoOk}
          onCancel={videoCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">
                <h4>Join Video Call</h4>
              </div>
              <div className="video-call-frame">
                <iframe
                  src="https://app.cal.com/video/dU8bH8FDcsaH1DFYFkS2Xw"
                  width="100%"
                  height="450px"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </Modal>
        {/* video join call - ends modal */}

        {/* book new session - modal starts */}
        <Modal
          centered
          className="session-history-modal session-book-modal"
          visible={open}
          onOk={bookOk}
          onCancel={bookCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            <div className="history-modal">
              <h4>book a new session</h4>
            </div>

            <div className="reschedule-zone">
              <div className="row">
                <div className="col-sm-2">
                  <div className="coach-fig">
                    <figure>
                      <img src="../../images/clients-01.png" alt="Coach Name" />
                    </figure>
                    <p>{coachesCalName}</p>
                    <p>
                      <strong>next session</strong>
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="resc-cal">
                    <h5>select a date &amp; time</h5>
                    <Calendar onChange={setDate} value={date} />
                    <h5>time zone</h5>
                    <p>GMT, London Time</p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="cal-time">
                    <p>Wednesday, January 11</p>

                    {array1.map((timeSlot, index) => {
                      return (
                        <button className="btn btn-time" key={index}>
                          {timeSlot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* book new session - modal ends */}

        {/* reschedule & choose coach a session - modal */}
        <Modal
          centered
          className="session-table"
          visible={coach}
          onOk={coachOk}
          onCancel={coachCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            {eventChoose ? (
              <>
                <h4>
                  Event Types
                  <span>
                    Create events to share for people to book on your calendar -{" "}
                    {coachesCalEmail}
                  </span>
                </h4>
                <div className="choose-event-type">
                  {coachesEvents.map((event, index) => {
                    return (
                      <div
                        className="event-types"
                        data-coach_event_id={event.id}
                        data-interval={event.length}
                        onClick={openCalendar}
                      >
                        <div
                          className="box-left"
                          data-coach_event_id={event.id}
                          data-interval={event.length}
                        >
                          <h5
                            data-interval={event.length}
                            data-coach_event_id={event.id}
                          >
                            {event.title}
                          </h5>
                          <span
                            data-interval={event.length}
                            data-coach_event_id={event.id}
                          >
                            <Clock /> {event.length}
                          </span>
                        </div>
                        <div
                          className="box-right"
                          data-interval={event.length}
                          data-coach_event_id={event.id}
                          onClick={openCalendar}
                        >
                          {/* <ArrowRightCircleOutline/> */}
                        </div>
                      </div>
                    );
                  })}

                  {type_load ? (
                    <div>
                      <h3>Loading....</h3>
                    </div>
                  ) : null}

                  {type_err_load ? (
                    <div>
                      <h3>Something Went Wrong</h3>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>

              </>
            )}
          </div>
        </Modal>

        <Modal
          centered
          className="session-history-modal session-reschedule-modal"
          visible={reschedule}
          onOk={rescheduleOk}
          onCancel={rescheduleCancel}
          width={1200}
          footer={[]}
        >
          <div className="modal-data">
            {next ? (
              <>
                <div className="meeting-schedule">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="tick-icon">
                        <i className="fa fa-check"></i>
                        <h2>This meeting is scheduled</h2>
                        <p>
                          We emailed you and the other attendees a calendar
                          invitation with all the details.
                        </p>
                      </div>
                      <div className="meet">
                        <div className="left-meet">
                          <strong>What</strong>
                        </div>
                        <div className="right-meet">
                          <p>{meetingtitle}</p>
                        </div>
                      </div>
                      <div className="meet">
                        <div className="left-meet">
                          <strong>When</strong>
                        </div>
                        <div className="right-meet">
                          <p>Friday, March 17, 2023</p>
                          <p>
                            15:30 - 16:30 <span> (India Standard Time) </span>
                          </p>
                        </div>
                      </div>
                      <div className="meet">
                        <div className="left-meet">
                          <strong>Who</strong>
                        </div>
                        <div className="right-meet">
                          <p>
                            {meetinguser} <br />
                            <span>{meetinguseremail}</span>
                          </p>
                          <p>
                            {meetinguser2} <br />
                            <span>{meetinguser2email}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="history-modal">
                  <h4>{modal_action}</h4>
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
                        <p>{coachesCalName}</p>
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
                        <p>{coachesCalTimezone}</p>
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
                        <button className="btn btn-next" onClick={scheduleNext}>
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
              </>
            )}
          </div>
        </Modal>
        {/* reschedule session = modal ends */}

        <div className="next-session">
          <div className="row">
            <div className="col-sm-8 left">
              <div className="banner-et">
                <div className="padd">
                  <div className="padd-left">
                    <h3>next session</h3>
                  </div>
                  <div className="padd-right">
                    <button className="btn btn-session" onClick={showModal}>
                      view session history
                    </button>
                  </div>
                </div>

                <table className="table table-coach">
                  <tbody>
                    <tr>
                      <td>
                        <button
                          className="btn btn-book my-4"
                          onClick={scheduleNewSes}
                        >
                          Book a new session
                        </button>
                      </td>
                      <td></td>
                      <td>
                        {/* <button className='btn btn-coach' onClick={videoSession}>

                          <Video /> Join Video
                        </button> */}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <p>Coach Name</p>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <Link href="#" passHref>
                          <a className="btn btn-coach"> contact coach</a>
                        </Link>
                      </td>
                    </tr>

                    {meeting.map((data) => {
                      return (
                        <>
                          <tr className="table-pad">
                            <td>{data.coach_name}</td>
                            <td>
                              {new Date(data.meetingDate).toLocaleDateString()}
                            </td>
                            <td>
                              <Link
                                passHref
                                href={data.meetingLink}
                                target="_blank"
                              >
                                <a className="btn">Join Video</a>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-schedule"
                                data-id={data.meeting_id}
                                onClick={scheduleReSes}
                              >
                                {" "}
                                reschedule{" "}
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-4 right">
              <div className="info-basic">
                <figure>
                  <img src="../../images/clients-01.png" alt="" />
                </figure>
                <h3>{client ? <> {client.client_name} </> : null}</h3>
                {/* { client ? ( <p> API key: {client.client_api} </p> )  : null }
                { client ? ( <p> Cal Uname: {client.client_uname} </p> )  : null } */}

                {editDetail ? (
                  <>
                    <form
                      noValidate
                      autoComplete='off'
                      onSubmit={e => e.preventDefault()}
                      className='client-edit-details'
                    >
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            email:
                            <span>
                              <input
                                type='email'
                                name='client_email'
                                id='client_email'
                                className='form-control'
                                placeholder='name@gmail.com'
                                value={clientEmail}
                                onChange={e => setClientEmail(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            mobile:
                            <span>
                              <input
                                type='text'
                                name='client_phone'
                                id='client_phone'
                                className='form-control'
                                placeholder='123-456-7890'
                                value={clientPhone}
                                onChange={e => setClientPhone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            country:
                            <span>
                              <input
                                type='text'
                                name='client_country'
                                id=''
                                className='form-control'
                                placeholder='United Kingdom'
                                value={clientCountry}
                                onChange={e => setClientCountry(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                        <div className='col-sm-6'>
                          <p>
                            time zone:
                            <span>
                              <input
                                type='text'
                                name='client_zone'
                                id=''
                                className='form-control'
                                placeholder='London GMT'
                                value={clientTimeZone}
                                onChange={e => setClientTimeZone(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <p>
                            languages:
                            <span>
                              <input
                                type='text'
                                name='client_language'
                                id=''
                                className='form-control'
                                placeholder='English; French'
                                value={clientLanguage}
                                onChange={e => setClientLanguage(e.target.value)}
                              />
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12'>
                          <div className='left-link'>
                            <a className='' onClick={() => saveD()}>
                              Save my details
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          email:{" "}
                          <span>
                            {client ? <> {client.client_email} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                        mobile:
                          <span>
                            {client ? <> {client.client_phone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          country:{" "}
                          <span>
                            {client ? <> {client.client_country} </> : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p>
                          time zone:{" "}
                          <span>
                            {client ? <> {client.client_zone} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p>
                          languages:{" "}
                          <span>
                            {client ? <> {client.client_language} </> : null}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="left-link">
                          <a className="" onClick={() => editD()}>
                            Edit my details &nbsp;
                          </a>
                          |
                          <Link href="/client/change-password" passHref>
                            <a className=""> Change my password</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="client-plans">
          <div className="row">
            <div className="col-sm-7">
              <h3>my plan</h3>
              <div className="divider-bottom"></div>

              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
              >
                {fireData.map((data) => {
                  return (
                    <>
                      <div className={data.slug}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="tooltip">
                              <button className={`btn btn-${data.slug}`}>
                                {" "}
                                {data.plan_name}{" "}
                              </button>
                              <div className="tooltiptext">
                                <p>{data.plan_desc}</p>
                                <button className="btn buy-req btnn">
                                  {" "}
                                  request
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn btnn buy-pro">
                              {" "}
                              request
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="update">
                  <Link href="#" passHref>
                    <a className="update-billing">
                      Update my billing information
                    </a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-sm-5">
              <figure>
                <img src="../../images/banner-bg.png" alt="Images Logo" />
              </figure>
            </div>
          </div>
        </div>

        <div className="client-notes">
          <div className="row">
            <div className="col-sm-7">
              <h3>my notes</h3>
              <div className="divider-bottom"></div>
            </div>
          </div>
          <div className="client-bg">
            <div className="file-scroll">
              <div className="row">
                <div className="col-sm-12">
                  <div className="product_search_form">
                    <form id="searchForm" action="" method="POST">
                      <input
                        type="text"
                        name="keyword"
                        id="keyword"
                        className="form-control"
                        placeholder="search"
                      />
                      <input className="btn btn-search" type="submit" />
                      <i
                        className="fa fa-fw fa-search"
                        title="search"
                        aria-hidden="true"
                      ></i>
                    </form>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                      {/* <div className="note-sec-full">
                        <h4>your notes drive is almost full</h4>
                        <div className="divider-bottom"></div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 fi-coll">
                  <div className="inner">
                    <div className="download-left">
                      <figure>
                        <img src="../../images/file-icon.jpg" alt="" />
                      </figure>
                      <h4>
                        File Name <span>Date Shared</span>
                      </h4>
                    </div>
                    <div className="download-right">
                      <figure>
                        <img
                          src="../../images/download.png"
                          alt=""
                          className="download-file"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="client-contact">
          <div className="row">
            <div className="col-sm-5">
              <div className="coach-resp">
                <h5>a coach's responsibility is to :</h5>
                <ul>
                  <li>Create a safe and thought-provoking space;</li>
                  <li>Explore and clarify what you want to achieve;</li>
                  <li>Draw out your solutions and strategies;</li>
                  <li>Promote accountability for the process and results;</li>
                  <li>Encourage self-discovery throught.</li>
                </ul>
                <h5>a client's responsibility is to :</h5>
                <ul>
                  <li>Show up with a curious &amp; open mind;</li>
                  <li>Embrace self-discovery;</li>
                  <li>Take inspired action;</li>
                  <li>
                    Hold yourself accountable for the process and results.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="client-help">
                <h3>how can we help you?</h3>
                <p>
                  Is there anything we can do to help you improve your wabya
                  journey? <br />
                  Send us a message with any comments or feedback
                </p>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-group">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="4"
                      className="form-control"
                      placeholder="message"
                    ></textarea>
                  </div>
                  <div className="two-button">
                    <button className="btn btn-send">send</button>
                    <button className="btn btn-chat">
                      <i className="fa fa-whatsapp"></i> chat now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
