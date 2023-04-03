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
            <h2>
              {/* <span>Contact Us</span> */}
              how can we help?</h2>
              <p>Leave us your contact info and a short message with your query - we’ll get back to you asap! </p>

          </div> {/* <!--/ col-sm --> */}

          <div className="col-sm-6 right">
            <div className="inner">
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <div className="form-group"><input className="form-control" placeholder="Name" type="text" name="contactName" onChange={event => setName(event.target.value)} value={ contactName } /></div>
              <div className="form-group"><input className="form-control" placeholder="Email" type="email" name="contactEmail" onChange={event => setEmail(event.target.value)} value={ contactEmail } /></div>
              <div className="form-group left">
                <small><strong>I’m a</strong></small>

                <span><input type="radio" name="contactChoose" id="choose_type" /> coach</span>
                <span><input type="radio" name="contactChoose" id="choose_type" /> client</span>
                <span><input type="radio" name="contactChoose" id="choose_type" /> curious visitor</span>
              </div>
              <div className="form-group"><textarea className="form-control" placeholder="Message" name="contactMessage" onChange={event => setMessage(event.target.value)}>{contactMessage}</textarea></div>
            <div className="form-group" style={{ textAlign: 'left'}}><button className="btn" type="submit" onClick={addData}>send</button></div>
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
