import Link from "next/link"
import { app, database } from '../../../../firebaseConfig'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Contact = () => {

  const [ID, setID] = useState(null);
  const [contactName, setName] = useState('');
  const [contactEmail, setEmail] = useState('');
  const [contactMessage, setMessage] = useState('');
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'Contact');
  let router = useRouter()

  const addData = () => {
    addDoc(databaseRef, {
      contactName: contactName,
      contactEmail: contactEmail,
      contactMessage: contactMessage,
    })
      .then(() => {
        alert('Contact details added successfully.')
        
        // getData()
        setName('')
        setEmail('')
        setMessage('')
      })
      .catch((err) => {
        console.error(err);
      })
  }


  return(

    <>
      <section className="contact-wrap">
        <div className="container">
          <div className="row align-items-center">

          <div className="col-sm-6 left">
            <h2><span>Contact Us</span>How can we help you?</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet Duis autem vel eum iriure dolor in hendrerit velit esse.</p>
          <p>Want to join wabya as a coach?</p>
          <p><Link href="#"><a className="btn">Click here</a></Link></p>
          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-6 right">
            <div className="inner">
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <div className="form-group"><input className="form-control" placeholder="Name" type="text" name="contactName" onChange={event => setName(event.target.value)} value={ contactName } /></div>
              <div className="form-group"><input className="form-control" placeholder="Email" type="email" name="contactEmail" onChange={event => setEmail(event.target.value)} value={ contactEmail } /></div>
              <div className="form-group"><textarea className="form-control" placeholder="Message" name="contactMessage" onChange={event => setMessage(event.target.value)}>{contactMessage}</textarea></div>
            <div className="form-group"><input className="btn" value="Send" type="submit" onClick={addData}/></div>
            </form>
            </div>
          </div> {/* <!--/ col-sm --> */}

          </div> {/* <!--/ row --> */}
        </div>
      </section> {/* <!--/ contact-wrap --> */}
    </>
  )
}
export default Contact
