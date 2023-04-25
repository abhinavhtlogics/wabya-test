// ** MUI Imports
// import { Typography } from '@mui/material'
// import Link from 'next/link'
import { ReactNode, useState, useEffect,useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from 'firebase/app';
import { database,storage } from '../../../firebaseConfig'
import {ref,
    uploadBytesResumable,
    getDownloadURL } from "firebase/storage"
import { collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { Modal } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'antd'

const Resources = () => {

  const [file, setFile] = useState(null);
  const [showpercent, setshowpercent] = useState(false);
  const [showfile, setshowfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allFiles, setAllFiles] = useState([]);
   // get all meeting data

   
const getFiles = async () => {
  const meetRef = collection(database, "resources");
  const queryDoc = query(meetRef, where("parentId", "==", sessionStorage.getItem("coachId")));

  await getDocs(queryDoc).then((response) => {
    console.log(response.docs);
    setAllFiles(
      response.docs.map((data) => {
        return { ...data.data(), file_id: data.id };
      })
    );
   
    console.log(allFiles);
    setshowfile(true);
  });
};

useEffect(() => {
 getFiles();
}, []);



  const [percent, setPercent] = useState(0);
  const [filecount, setfilecount] = useState(0);
  
  const [percentage, setpercentage] = useState("%");
  const [fileUrl, setfileUrl] = useState("");
  const [fileName, setfileName] = useState("");
  const [fileType, setfileType] = useState("");
  const resourceRef = collection(database, 'resources');


 
  const [murl, setmurl] = useState('https://abhinav19.daily.co/n8qwqVewdGXwVk9dNDzg');

  function handleFileChange(event) {
    console.log('test');
    setFile(event.target.files[0]);
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
            parentId : sessionStorage.getItem("coachId"),
            fileName : fileName,
            fileType : fileType,
            uploadDate : ''+date+'-'+month+'-'+year,
           
          })
            .then(() => {
             // toast.success('File Uploaded')
              //router.push('/client/login')
              setErrorMessage("File Uploaded");
              getFiles();
              var element = document.getElementById("myres");
  element.scrollIntoView({ behavior: 'smooth' });
            })
            .catch((err) => {
              console.error(err);
            })
           
         }


         useEffect(() => {

   

            if (fileUrl != "") {
            addInFirebase();
            }
        
        }, [fileUrl])
 
  return (
    <>
    <section className="timesheet-resources">
   
      <div className="container">
        <div className="row">

        <div className="col-sm-2 left mrb-30">
          <figure><img src="https://firebasestorage.googleapis.com/v0/b/wabya-45dba.appspot.com/o/coach%2Fprofile%2FJF%20small.jpg?alt=media&token=355995a3-3064-45bd-add5-98ccc77227d6" alt=""/></figure>
        </div> {/* <!--/ left --> */}

        <div className="col-sm-10 right mrb-30">
          <h2>My Resources</h2>

          <div className="col-sm-12">
          <section className="client-password">
         
         <h4 style={{ textAlign: 'left' }}>Upload Notes</h4>
            <div className="row">
           
              <div className="col-sm-8">
                <div className='inner-info'>
                
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-password'>
                  <div className="row">
                    
                    <div className="col-sm-6">
                    
                    <label  className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> choose File
    <input id="file-upload" type="file" onChange={handleFileChange}/>
</label>


{ showpercent ?
    percent  : null}
    { showpercent ?
    "%"  : null}


                       
                    </div>

                    <div className="col-sm-6">
                      <input type="submit" value="save" className='btn btn-save' onClick={handleSubmit} />
                    </div>

                    
                  </div>
                 
                  <div className="row">
                  <div className="col-sm-12">
                      {errorMessage && <Alert message={errorMessage} className='mt-4' type="success"/> }
                    </div>

                  </div>
                </form>
                </div>
              </div>
             
            </div>
            </section>
          </div>
          <h4 style={{ textAlign: 'left' }}>My Notes</h4>
          <div className="file-info">


         








          
            <div className="file-scroll section" id="myres">
          <div className="row">


         
          <div className="col-sm-12">
            <div className="product_search_form">
              <form id="searchForm" action="" method="POST">

                <input type="text" name="keyword" id="keyword" className="form-control"  placeholder="search"/>
                <input className="btn btn-search" type="submit"/>
                <i className="fa fa-fw fa-search" title="search" aria-hidden="true"></i>
              </form>
				    </div>
          </div>

          {allFiles.map((myfile, index) => {
             return (
            
          <div className="col-sm-4 fi-coll">
              <a href={myfile.resourceURL} target='_blank'>
            <div className="inner">
             
              <figure><img src="../images/pdf.png" alt=""/></figure>
            <h4>{myfile.fileName} <span>{myfile.uploadDate}</span></h4>
            
              </div></a>
            </div>

             );
          })
        }
         

          

          
         

         

          </div> {/* <!--/ row --> */}
          </div> {/* <!--/ file-scroll --> */}
          </div> {/* <!--/ file-info --> */}
        </div> {/* <!--/ right --> */}


        </div> {/* <!--/ row --> */}
      </div>
    </section> {/* <!--/ client-resources --> */}
    </>
  )
}

export default Resources
