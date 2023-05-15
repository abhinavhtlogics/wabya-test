// ** Files Imports
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, database,storage } from "../../../../firebaseConfig";
import emailjs from '@emailjs/browser';
import { Alert } from 'antd'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
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
  const form = useRef();
  const form2 = useRef();
  const databaseRef = collection(database, "client_user");
  const coachRef = collection(database, "coaches_user");
  const planRef = collection(database, "admin_plans");
  const meetingRef = collection(database, "meeting");
  const helpRef = collection(database, "help");
  const msgRef = collection(database, "message");
  const requestRef = collection(database, "newPlanRequest");


  const [SearchVal, setSearchVal] = useState('');
  const [requestPlanId, setrequestPlanId] = useState('');
  const [helpText, sethelpText] = useState('');
  const [ShowHelpErr, setShowHelpErr] = useState(false);

  const [coachText, setcoachText] = useState('');
  const [ShowCoachErr, setShowCoachErr] = useState(false);
  const [ShowEmailSuccess, setShowEmailSuccess] = useState(false);

  const [selectOption, setSelectOption] = useState(true);
  const [emailOption, setemailOption] = useState(false);
  const [callOption, setcallOption] = useState(false);


  const showEmailForm = () => {
    setSelectOption(false);
    setemailOption(true);
    setcallOption(false);
  };


  const makePhoneCall = () => {
    const phoneNumber = mycoach[0].coach_phone; // Replace with the phone number you want to call
    const dialCode = 'tel:'; // This is the dial code used to indicate that a phone call should be made
  
    // Construct the full phone number URL by concatenating the dial code and phone number
    const phoneUrl = dialCode + phoneNumber;
  
    // Use the window.open() method to open the phone number URL in a new window, which should trigger the phone app on the user's device
    window.open(phoneUrl);
  };
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
  const [isContactCoach, setisContactCoach] = useState(false);
  const [isUploadNotes, setisUploadNotes] = useState(false);
  const [isUpdateBilling, setisUpdateBilling] = useState(false);


  const [isVideoCallVisible, setIsVideoCallVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [selectedTime, setselectedTime]: any = useState();
  const [next, setNext] = useState(false);

  const [eventChoose, setEventChoose] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [coach, setCoach] = useState(false);

  const [mycoach, setMyCoach] = useState(null);
  const [myplan, setMyPlan] = useState(null);
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
  const [res_action, setres_action] = useState("");


  //const [coachesCalUsername, setcoachesCalUsername] = useState('abhinav-kumar-r6xoe0');
  const [coachesCalDefaultScheduleId, setcoachesCalDefaultScheduleId] =
    useState();

  const [coachesCalUserId, setcoachesCalUserId] = useState();

  

    const [collectionUpdateId, setcollectionUpdateId] =
    useState("");

  const [updateAction, setupdateAction] = useState(false);
  const [clientCalName, setclientCalName] = useState("");
  const [clientCalEmail, setclientCalEmail] = useState("");

  const [clientFirebaseName, setclientFirebaseName] = useState("");
  const [clientFirebaseFirstName, setclientFirebaseFirstName] = useState("");
  const [clientFirebaseEmail, setclientFirebaseEmail] = useState("");
  const [clientPlanId, setclientPlanId] = useState("");

  const [clientFirebaseId, setclientFirebaseId] = useState("");

  const [BookedId, setBookedId] = useState();
  const [mySession, setmysSession] = useState([]);


  const [percent, setPercent] = useState(0);
  const [filecount, setfilecount] = useState(0);
  
  const [percentage, setpercentage] = useState("%");
  const [fileUrl, setfileUrl] = useState("");
  const [fileName, setfileName] = useState("");
  const [fileType, setfileType] = useState("");
  const resourceRef = collection(database, 'resources');

  const [file, setFile] = useState(null);
  const [showpercent, setshowpercent] = useState(false);
  const [showfile, setshowfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const scheduleNewSes = () => {
    setcollectionUpdateId("");
    setmodal_action('SCHEDULE A SESSION');
    setres_action("scheduled");
    setarray1([]);
    settimeslot_load(false);
    setupdateAction(false);
    coachSession();
  };

  const scheduleReSes = (event) => {
    setcollectionUpdateId(event.target.getAttribute('data-id'));
    setmodal_action('RESCHEDULE A SESSION');
    setres_action("rescheduled");
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
      

        setmeetingLink(data.url);
        setNext(true);

        setBookedId(data.id);

     
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

    setNext(true);
};



 // add new record
 const sendHelpMsg = () => {
  if(helpText == ""){
setShowHelpErr(true);
  }else{
    setShowHelpErr(false);
  addDoc(msgRef, {
    message: helpText,
    status:1,
   senderId:sessionStorage.getItem("userId"),
  })
    .then(() => {
      toast.success('Data sent successfully')
      getData()
    

      emailjs.sendForm('service_48nilue', 'template_3uazkzk', form.current, 'bHrOxc3becdFqRykK')
      .then((result) => {
          console.log(result.text);
          sethelpText('')
      }, (error) => {
          console.log(error.text);
      });
     
    })
    .catch((err) => {
      console.error(err);
    })
  }
}


const sendCoachMsg = () => {
  setShowCoachErr(false);
  setShowEmailSuccess(false);
  if(coachText == ""){
setShowCoachErr(true);
  }else{
    
    

      emailjs.sendForm('service_48nilue', 'template_l4z15n1', form2.current, 'bHrOxc3becdFqRykK')
      .then((result) => {
          console.log(result.text);
          setcoachText('')
          // handleContactCancel();
          setShowEmailSuccess(true)
      }, (error) => {
          console.log(error.text);
      });
     
   
  }
}
function test(){
  console.log('abc');
}

const addNewRequest = async (event :  any) =>{

  if(await countMyRequest() == 0){
    var new_plan_id=event.target.getAttribute("data-plan-id");
 
    addDoc(requestRef, {
      plan_id: clientPlanId,
      new_plan_id:new_plan_id,
     client_id:sessionStorage.getItem("userId"),
    })
      .then(() => {
        getNewRequest();
        toast.success('Data Updated successfully')
      
        
      })
      .catch((err) => {
        console.error(err);
      })
  }
  else{
    var new_plan_id=event.target.getAttribute("data-plan-id");
    const client_id=sessionStorage.getItem("userId");
   // const fieldToEdit = doc(collection(database, "newPlanRequest"),client_id);
    //const fieldToEdit = query(requestRef, where('client_id', '==', client_id));

    const collectionRef = collection(database, "newPlanRequest");
    const q = query(collectionRef, where("client_id", "==", client_id));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doce) => {
      const fieldToEdit = doc(database, "newPlanRequest", doce.id);
      updateDoc(fieldToEdit, {
        new_plan_id: new_plan_id,
        
        // ...
      });
    });

    getNewRequest();
  }
  
  }


  // coach data fetch
  const countMyRequest = async () => {
    console.log('test');
    console.log(sessionStorage.getItem("userId"));
    const collectionRef = collection(database, "newPlanRequest");
    const queryDoc = query(collectionRef, where("client_id", "==", sessionStorage.getItem("userId")));
  
    const snapshot = await getDocs(queryDoc);
    const count_data = snapshot.size;
  
    console.log(`Number of documents in collection: ${count_data}`);
        console.log(count_data);
        return count_data;
      }


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
//console.log(data);
//console.log(meeting);

for (let index = 0; index < data.data.length; index++) {


//console.log(data.data[index].room);

  for (let index2 = 0; index2 < meeting.length; index2++) {

    //console.log(meeting[index].meetingName);

    if(data.data[index].room == meeting[index2].meetingName){
      // console.log(index);
      // console.log(index2);
      // console.log(data.data[index].room);
      // console.log(data.data[index].start_time);
      // console.log(data.data[index].duration);
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

  const showContactCoach = (event) => {
    console.log('testtttt');
    event.preventDefault();
    setisContactCoach(true);
  };

  const showUploadNotes = (event) => {
    console.log('testtttt');
    event.preventDefault();
    setisUploadNotes(true);
  };

  const showUpdateBilling = (event) => {
    console.log('testtttt');
    event.preventDefault();
    setisUpdateBilling(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible(false);
  };


  const handleContactOk = () => {
    setisContactCoach(false);
  };
  const handleContactCancel = () => {
    setisContactCoach(false);
  };

  const handleUploadOk = () => {
    setisUploadNotes(false);
  };

  const handleUploadCancel = () => {
    setisUploadNotes(false);
  };


  const handleUpdateBilling = () => {
    setisUpdateBilling(false);
  };

  const handleUpdateBillingCancel = () => {
    setisUpdateBilling(false);
  };
 

  const handleCancel = () => {
    setIsVideoCallVisible(false);
  };

  const showVideoCallModal = () => {
    setIsVideoCallVisible(true);
  };

  const showVideoCallModalOk = () => {
    setIsVideoCallVisible(false);
  };

  const showVideoCallModalCancel = () => {
    setIsVideoCallVisible(false);
  };

  const [userId, setUserId] = useState();
  const [meeting, setMeeting] = useState([]);
  const [help, setHelp] = useState(null);

  const [meetingByDate, setMeetingByDate] = useState([]);

  const [allFiles, setAllFiles] = useState([]);
  const [allNewRequest, setallNewRequest] = useState([]);

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
    getHelpText();


   
    if (coachesCalApiKey) {
    
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



   // get all meeting data
   const getHelpText = async () => {
    
    const queryDoc = query(helpRef, where("status", "==", 1));

    await getDocs(queryDoc).then((response) => {
      setHelp(
        response.docs.map((data) => {
          console.log(data);
          return { ...data.data(), help_id: data.id };
        })
      );
    });
   //  console.log(coachDoc);
    // if (coachDoc.exists()) {
    //   setMyCoach(coachDoc.data());

    //   // //console.log('here');
    //   console.log(coachDoc.data);
    // } else {
    //   //console.log("No client found");
    // }
  };
  const fetchCoach = async () => {
    // const coachRef = doc(collection(database, "coaches_user"), coachesFirebaseId);
    // const coachDoc = await getDoc(coachRef);

    const queryDoc = query(coachRef, where("__name__", "==", coachesFirebaseId));

    await getDocs(queryDoc).then((response) => {
      setMyCoach(
        response.docs.map((data) => {
          console.log(data);
          return { ...data.data(), coach_id: data.id };
        })
      );
    });







    
   //  console.log(coachDoc);
    // if (coachDoc.exists()) {
    //   setMyCoach(coachDoc.data());

    //   // //console.log('here');
    //   console.log(coachDoc.data);
    // } else {
    //   //console.log("No client found");
    // }
  };



  const fetchMyPlan = async () => {
   // const myplanRef = doc(collection(database, "admin_plans"), coachesFirebaseId);
    // const coachDoc = await getDoc(coachRef);

    const queryDoc = query(planRef, where("__name__", "==", clientPlanId));

    await getDocs(queryDoc).then((response) => {
      setMyPlan(
        response.docs.map((data) => {
          console.log(data);
          return { ...data.data(), plan_id: data.id };
        })
      );
    });







    
   
  };


  // get all meeting data
  const getMeetingByDate = async (todayDate: string) => {
    const userId = sessionStorage.getItem("userId");

    const queryDoc = query(meetingRef, where("coachId", "==", coachesFirebaseId),where("meetingDate", "==", todayDate));

    await getDocs(queryDoc).then((response) => {
      setMeetingByDate(
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
     // setclientCalAPIkey("cal_test_023256ac85011cded16d8d4f8f137d99");
      //setclientCaluserName(client.client_uname);
      setclientFirebaseId(client.id);
      setclientFirebaseName(client.client_name);
      const firstName = client.client_name.split(' ')[0];
      setclientFirebaseFirstName(firstName);
console.log(firstName);
      setclientFirebaseEmail(client.client_email);
      //setcoachesCalUsername(client.assign_coach_uname);
      setclientPlanId(client.plan_id);
      setcoachesFirebaseId(client.assign_coach_id);
      getFiles();
     // fetchCoach();
    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [client]);



  useEffect(() => {
    if (coachesFirebaseId != '') {
      console.log(coachesFirebaseId);
      console.log('testtttttttt');
      console.log(clientPlanId);
      fetchCoach();
      getNewRequest();
    //  fetchMyPlan();


    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [coachesFirebaseId]);


  useEffect(() => {
    if (allNewRequest.length > 0) {
      console.log('ne wplan ');
      setrequestPlanId(allNewRequest[0].new_plan_id);


    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [allNewRequest]);

  const getFiles = async () => {
    const meetRef = collection(database, "resources");
   const queryDoc = query(meetRef, where("parentId", "in", [coachesFirebaseId, sessionStorage.getItem("userId")]));
   // const queryDoc = query(meetRef, where("parentId", "==", coachesFirebaseId)
  //  .where("parentId", "==", sessionStorage.getItem("userId"))

    await getDocs(queryDoc).then((response) => {
      console.log(response.docs);
      setAllFiles(
        response.docs.map((data) => {
          return { ...data.data(), file_id: data.id };
        })
      );
     
      console.log(allFiles);
     // setshowfile(true);
    });
  };



  const getNewRequest = async () => {
    //const meetRef = collection(database, "resources");
   const queryDoc = query(requestRef, where("client_id", "==", sessionStorage.getItem("userId")));
   // const queryDoc = query(meetRef, where("parentId", "==", coachesFirebaseId)
  //  .where("parentId", "==", sessionStorage.getItem("userId"))

    await getDocs(queryDoc).then((response) => {
      console.log(response.docs);
      setallNewRequest(
        response.docs.map((data) => {
          return { ...data.data(), new_request_id: data.id };
        })
      );
     
      console.log(allFiles);
     // setshowfile(true);
    });
  };


  useEffect(() => {
    // Fetch your data from an API or elsewhere
   
    // Sort the data by name in ascending order

    if(allFiles.length > 0){
      const sortedData = allFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));

      setAllFiles(sortedData);
    }
    
  }, [allFiles]);
  
  

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

 
  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }
  useEffect(() => {
    if(meeting.length>0){
  getSessionHistory();


    }
  }, [meeting]);
  useEffect(() => {

 

    if (fileUrl != "") {
    addInFirebase();
    }

}, [fileUrl])
  
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

  if(!client){
    return <div><img src={`${router.basePath}/images/loading.gif`} style={{ display:"block", margin:"0px auto"}} /></div>;
  }
 

function handleFileChange(event) {
  console.log('test');
  setFile(event.target.files[0]);
//handleSubmit();
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
 

  function handleSearch(event) {
    console.log(event.target);
   setSearchVal(event.target.value);
//handleSubmit();

  }
  

  function handleSubmit() {
    // event.preventDefault();
 
 
     if (file != null) {
      
        console.log(file);
       // Upload the file to Firebase Cloud Storage
      // const storageRef = storage().ref();
       //const fileRef = storageRef.child('files/' + file.name);
       setshowpercent(true);
       let randomString = '';

          const randomNum = Math.floor(Math.random() * 1000);

  // Convert the number to a string and pad it with leading zeros if necessary
  const randomNumber = randomNum.toString().padStart(3, '0');
  console.log(randomNumber);
       randomString +=randomNumber;
  
       // Generate three random letters
       for (let i = 0; i < 3; i++) {
         const randomCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
         const randomLetter = String.fromCharCode(randomCode);
         randomString += randomLetter;
         console.log(randomLetter);
       }

    

       const uniqueId = new Date().getTime();
       console.log(uniqueId);
       randomString +=uniqueId;

       console.log(randomString);
     const storageRef = ref(storage, `/resources/`+randomString+``)
       const uploadTask =  uploadBytesResumable(storageRef, file);
       uploadTask.on("state_changed",
     (snapshot) => {
     const percent = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
 // update progress
         setPercent(percent);
         },
     (err) => console.log(err),
         () => {
     // download url
         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         console.log(url);
         setfileName(file.name);
         
         setfileType(file.type);
         setfileUrl(url);
         setshowpercent(false);
         setfilecount(filecount + 1);
         setFile(null);
      //   toast.success('File Uploaded!');
     });
     }
     ); 
      
         }
       
     }
    
     function addInFirebase() {
       
      const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // add 1 because months are zero-indexed
const year = today.getFullYear();
      addDoc(resourceRef, {
          resourceURL: fileUrl,
          parentId : sessionStorage.getItem("userId"),
          fileName : fileName,
          fileType : fileType,
          uploadDate : ''+date+'-'+month+'-'+year,
         
        })
          .then(() => {
           // toast.success('File Uploaded')
            //router.push('/client/login')
            setErrorMessage("File Uploaded");
            getFiles();
          
          })
          .catch((err) => {
            console.error(err);
          })
         
       }


      
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
                {client ? <> {clientFirebaseFirstName} </> : null}
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
          onCancel={handleCancel2}
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
{
                     mySession.length> 0 ? mySession.map((mySes, index) => {
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
                    }) : <tr><td colspan='5'>No data Found</td></tr> }
                    


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* modal - view session history ends */}





        <Modal
          centered
          className="session-history-modal"
          visible={isContactCoach}
          onOk={handleContactOk}
          onCancel={handleContactCancel}
          width={800}
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">


           

                {/* <i className="fa fa-angle-left"></i> */}
                
              </div>
         { selectOption ?
         <>
            <div className="row">
                <div className="col-md-4">.</div>
                <div className="col-md-8"><h2>Select Option</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-6 cal-time"><button onClick={showEmailForm} className="btn btn-time">Send Email to Coach</button></div>
                </div>

                <div className="row">
                <div className="col-md-3">.</div>
                <div className="col-md-6 cal-time"><button className="btn btn-time" onClick={makePhoneCall}>Call to Coach</button></div>
                  </div>
</>
                  : null}

{ emailOption ?
         <>
         <div className="row">
                <div className="col-md-4">.</div>
                <div className="col-md-8"><h2>Send Email</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-2">.</div>
                <div className="col-md-8" style={{'marginBottom':'10px','fontSize':'18px', 'display':'none'}}>Coach Email - {mycoach ? mycoach[0].coach_email : null }</div></div>

              <div className="row">
                <div className="col-md-2">.</div>
          <div className="col-md-8">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form2}
                >
                  <div className="form-group">
                    <textarea
                      name="coachText"
                      id=""
                      cols="30"
                      rows="10"
                      className="form-control"
                      placeholder="message"
                      onChange={(event) => setcoachText(event.target.value)} value={coachText}
                    ></textarea> 
                     <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                    <input type="hidden" name="email" value={mycoach ? mycoach[0].coach_email : null }/>
                  </div>
                  {ShowCoachErr ?  <b>Message Can't be Empty </b> : null }
                  {ShowEmailSuccess ?  <b style={{'color':'green'}}>Email Send </b> : null }
                  <div className="two-button">
                    <button className="btn btn-send btn-primary" style={{'marginTop':'20px'}} onClick={sendCoachMsg}>send</button>
                   
                  </div>
                 
                </form>
                </div>
                
              </div>
              </> :null }
            </div>
          </div>
        </Modal>





        <Modal
          centered
          className="session-history-modal"
          visible={isUpdateBilling}
          onOk={handleUpdateBilling}
          onCancel={handleUpdateBillingCancel}
          width={800} 
         
        >
         

             
         <div className="row">
                <div className="col-md-4">.</div>
                <div className="col-md-8"><h2>Update Billing</h2></div>
         
         </div>
              <div className="row">
                <div className="col-md-2">.</div>
                <div className="col-md-8" style={{'marginBottom':'10px','fontSize':'18px', 'display':'none'}}>Coach Email - {mycoach ? mycoach[0].coach_email : null }</div></div>

              <div className="row">
                <div className="col-md-2">.</div>
          <div className="col-md-8">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form2}
                >
                  <div className="form-group">
                   <label>Bank Name</label>
                    <input type="text" className="form-control" name="message"  onChange={(event) => setcoachText(event.target.value)} value={helpText}/>
                     <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                    <input type="hidden" name="email" value={mycoach ? mycoach[0].coach_email : null }/>
                  </div>
                  {ShowCoachErr ?  <b>Message Can't be Empty </b> : null }
                  {ShowEmailSuccess ?  <b style={{'color':'green'}}>Email Send </b> : null }



                  <div className="form-group">
                   <label>Account Number</label>
                    <input type="text" className="form-control" name="message"  onChange={(event) => setcoachText(event.target.value)} value={helpText}/>
                       </div>
                  {ShowCoachErr ?  <b>Message Can't be Empty </b> : null }
                  {ShowEmailSuccess ?  <b style={{'color':'green'}}>Email Send </b> : null }



                  <div className="form-group">
                   <label>Account Holder Name</label>
                    <input type="text" className="form-control" name="message"  onChange={(event) => setcoachText(event.target.value)} value={helpText}/>
                       </div>
                  {ShowCoachErr ?  <b>Message Can't be Empty </b> : null }
                  {ShowEmailSuccess ?  <b style={{'color':'green'}}>Email Send </b> : null }




                  <div className="two-button">
                    <button className="btn btn-send btn-primary" style={{'marginTop':'20px'}} onClick={sendCoachMsg}>send</button>
                   
                  </div>
                 
                </form>
                </div>
                
              </div>
             
        </Modal>







        <Modal
          centered
          className="session-history-modal"
          visible={isUploadNotes}
          onOk={handleUploadOk}
          onCancel={handleUploadCancel}
          width={800} 
         
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">

              <div className="col-sm-12">
          <section className="client-password">
          <div className="row">
                    
                  <div className="col-sm-4"></div>
                    <div className="col-sm-6">
                    <h2>Upload Notes</h2>
                      </div>   
                    </div>

                {/* <i className="fa fa-angle-left"></i> */}
                <form noValidate autoComplete='off' style={{'marginTop':'5%'}} onSubmit={e => e.preventDefault()} className='form-password'>
                
                  <div className="row">
                    
                  <div className="col-sm-2"></div>
                    <div className="col-sm-6">
                    
                    {/* <label  className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> choose File
    <input id="file-upload" type="file" onChange={handleFileChange}/>
</label> */}
<input  type="file" onChange={handleFileChange} className='btn btn-primary' style={{width:'100%'}}/>




                       
                    </div>
                  

                    <div className="col-sm-2">

                      <input type="submit" value="SAVE" className='btn btn-save btn-primary' onClick={handleSubmit} />
                    
                     
                     </div>

                     <div className="col-sm-2">

                    
                      { showpercent ?
    percent  : null}
    { showpercent ?
    "%"  : null}
                     </div>
</div>

{/* <div className="row">
                    
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                    <input type="submit" value="SAVE" className='btn btn-primary' onClick={handleSubmit} />
                   
                    </div>
</div> */}


                    
                 
                 
                  <div className="row">
                  <div className="col-sm-12">
                      {errorMessage && <Alert message={errorMessage} className='mt-4' type="success"/> }
                    </div>

                  </div>
                </form>
                
</section>              </div>  
              </div>
       
            </div>
          </div>
        </Modal>




        {/* video join call - modal starts */}
        <Modal
          centered
          className="video-call-modal"
          visible={isVideoCallVisible}
          onOk={showVideoCallModalOk}
          onCancel={showVideoCallModalCancel}
          width={1400}
          height={620}
          footer={[]}
        >
          <div className="modal-data">
            <div className="modall">
              {/* <div className="history-modal">
                <h4>Join Video Call</h4>
              </div> */}
              <div className="video-call-frame">
                <iframe
                  src="https://abhinav19.daily.co/kNbrMIQyrVBz0KjApLVt"
                  width="100%"
                  height="540px"
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
                        <h2>This meeting is { res_action } </h2>
                        <p>
                          We emailed you and the other attendees a calendar
                          invitation with all the details.
                        </p>
                      </div>
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>What</strong>
                        </div>
                        <div className="right-meet">
                          <p>{meetingtitle}</p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
                        <div className="left-meet">
                          <strong>When</strong>
                        </div>
                        <div className="right-meet">
                          <p>Friday, March 17, 2023</p>
                          <p>
                            15:30 - 16:30 <span> (India Standard Time) </span>
                          </p>
                        </div>
                      </div> */}
                      {/* <div className="meet">
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
                      </div> */}
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
                      <td colSpan={2}>
                        <button
                          className="btn btn-book my-4"
                          onClick={scheduleNewSes}
                        >
                          Book a new session
                        </button>
                      </td>
                     
                      <td>
                        {/* <button className='btn btn-coach' onClick={videoSession}>

                          <Video /> Join Video
                        </button> */}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                       {/* <td>
                        <p> </p>
                      </td>  */}
                      <td>{mycoach ? mycoach[0].coach_name : null }</td>
                      <td></td>
                      <td>
                        <Link href="#" onClick={showContactCoach}>
                          <a className="btn btn-coach" onClick={showContactCoach}> contact coach</a>
                        </Link>
                      </td>
                    </tr>

                    {meeting.map((data) => {

var myArr2=data.meetingTime.split(':');

var myArr=new Date(data.meetingDate).toLocaleDateString().split('/');



            if (new Date(data.meetingDate).toLocaleDateString() == new Date().toLocaleDateString() )
            
            return (
                        <>
                          <tr className="table-pad">
                            {/* <td>{data.coach_name}</td> */}
                            <td>
                              {new Date(data.meetingDate).toLocaleDateString()}
                            
                              
                            </td>
                            <td>
                              {/* <Link
                                passHref
                                href={`videocall/${data.meetingName}`}
                                target="_blank"
                               
                              >
                                <a className="btn btn-coach">Join Video</a>
                              </Link> */}
                                {myArr2[0]}H{myArr2[1]}
                            </td>
                            <td>
                              <button
                                className="btn btn-schedule"
                                data-id={data.meeting_id}
                                onClick={scheduleReSes}
                              
                              >
                                reschedule
                              </button>
                            </td>
                          </tr>
                        </>
                      );











                      if (new Date(data.meetingDate).getTime() > new Date().getTime() )
                     
                     
                      return (
                        
                        <>
                          <tr className="table-pad">
                            {/* <td>{data.coach_name}</td> */}
                            <td className="meetdate">
                              {/* {new Date(data.meetingDate).toLocaleDateString()} */}
                          {myArr[2]}/{myArr[1]}/{myArr[0]}
                        
                              
                            </td>
                            <td>
                              {/* <Link
                                passHref
                                href="#"
                                
                               
                              >
                                <a className="btn">Join Video</a>
                              </Link> */}
                                {myArr2[0]}H{myArr2[1]}
                            </td>
                            <td>
                           
                              <button
                                className="btn btn-schedule"
                                data-id={data.meeting_id}
                                onClick={scheduleReSes}
                              
                              >
                                reschedule
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
                            <div className={`tooltip ${data.plan_id === clientPlanId ? 'planactive' : ''}`}>
                              <button className={`btn btn-${data.slug}`}>
                                {" "}
                                {data.plan_name}{" "}
                              </button>
                              <div className="tooltiptext">
                                <p>{data.plan_desc}</p>
                                <button className="btn buy-req btnn">
                                  {" "}
                                  {data.plan_id === clientPlanId ? 'Buy Again' : 'Request'}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">

         { data.plan_id == requestPlanId ?

                            <button  data-plan-id={data.plan_id} className="btn btnn buy-pro buyagain-btn" onClick={addNewRequest}>
                              {" "}
                             Requested
                            </button>


                :
                <button  data-plan-id={data.plan_id} className={`btn btnn buy-pro  ${data.plan_id === clientPlanId ? 'buyagain-btn' : ''}`} onClick={addNewRequest}>
                {" "}
                {data.plan_id === clientPlanId ? 'Buy Again' : 'Request'}
              </button>
                }
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="update">
                  <Link href="#" passHref onClick={showUpdateBilling}>
                    <a className="update-billing" onClick={showUpdateBilling}>
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
              <h3>my notes. <span className="upload_notes_client" onClick={showUploadNotes}>Upload Notes</span></h3>
              <div className="divider-bottom"> </div>
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
                        onKeyUp={handleSearch}
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

                {allFiles.length> 0 ? allFiles.map((myfile, index) => {
             return (
              myfile.fileName.toLowerCase().indexOf(SearchVal.toLowerCase()) !== -1
              ? 
          <div className="col-sm-4 fi-coll">
              <a href={myfile.resourceURL} target='_blank'>
            <div className="inner">
             
              <figure><img src="../../images/file-icon.jpg" alt=""/></figure>
            <h4>{myfile.fileName} <span>{myfile.uploadDate}</span></h4>
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
              </div></a>
            </div>
            :null

             );
          }): <div className="col-sm-12 fi-coll" style={{'text-align':'center'}}>No File Found </div>
        }
         
 
               
               
            
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
                  <li>Create a safe and thought-provoking space</li>
                  <li>Explore and clarify what you want to achieve</li>
                  <li>Draw out your solutions and strategies</li>
                  <li>Promote accountability for the process and results</li>
                  <li>Encourage self-discovery throught</li>
                </ul>
                <h5>a client's responsibility is to :</h5>
                <ul>
                  <li>Show up with a curious &amp; open mind</li>
                  <li>Embrace self-discovery</li>
                  <li>Take inspired action</li>
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
                  {help ? help[0].helpText : null }
                </p>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  ref={form}
                >
                  <div className="form-group">
                    <textarea
                      name="helpText"
                      id=""
                      cols="30"
                      rows="4"
                      className="form-control"
                      placeholder="message"
                      onChange={(event) => sethelpText(event.target.value)} value={helpText}
                    ></textarea> 
                     <input type="hidden" name="message" value={helpText}/>
                    <input type="hidden" name="name" value={client.client_name}/>
                  </div>
                  {ShowHelpErr ?  <b>Message Can't be Empty </b> : null }
                  <div className="two-button">
                    <button className="btn btn-send" onClick={sendHelpMsg}>send</button>
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
