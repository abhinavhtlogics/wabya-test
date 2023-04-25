import { useRouter } from 'next/router'

// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Styles Imports
import {database} from '../../../firebaseConfig'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { Alert } from 'antd'

const EditCoachPassword = () => {

  const router = useRouter();

  const handleClick = (e) => {

    const inputEl1 = document.querySelector('#current_pass');
    const dummyEl1 = document.querySelector('#dummy1');
    const resultEl1 = document.querySelector('#result1');

    const inputEl2 = document.querySelector('#new_pass');
    const dummyEl2 = document.querySelector('#dummy2');
    const resultEl2 = document.querySelector('#result2');

    const inputEl3 = document.querySelector('#confirm_pass');
    const dummyEl3 = document.querySelector('#dummy3');
    const resultEl3 = document.querySelector('#result3');

      inputEl1.addEventListener('keyup', () => {
      const dummyText1 = Array(inputEl1.value.length).fill('*').join('');
      dummyEl1.innerHTML = dummyText1;
      resultEl1.innerHTML = inputEl1.value;
      })

      inputEl2.addEventListener('keyup', () => {
        const dummyText2 = Array(inputEl2.value.length).fill('*').join('');
        dummyEl2.innerHTML = dummyText2;
        resultEl2.innerHTML = inputEl2.value;
      })

      inputEl3.addEventListener('keyup', () => {
        const dummyText3 = Array(inputEl3.value.length).fill('*').join('');
        dummyEl3.innerHTML = dummyText3;
        resultEl3.innerHTML = inputEl3.value;
      })

  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [coachId, setCoachId] = useState('');
  const [new_pass_type, set_new_pass_type] = useState(false);
  

  useEffect(() => {

    const coachId = sessionStorage.getItem('coachId')
    setCoachId(coachId);

    if (!coachId) {
      router.push('/pages/login')
    }

}, [coachId])


  const checkCurrentPassword = async (coachId, currentPassword) => {
    const userD = doc(collection(database, 'coaches_user'), coachId);
    const userDoc = await getDoc(userD);
    const userData = userDoc.data();

    return userData.coach_password === currentPassword;
  };

  // function to change password
  const changePassword = async (coachId, newPassword) => {
    const update = doc(collection(database,"coaches_user"),coachId);
    await updateDoc(update, {
      coach_password: newPassword
    });
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !repeatPassword) {
      setErrorMessage("Please fill in all fields.");

      return;
    }

    if (newPassword !== repeatPassword) {
      setErrorMessage("New password and confirm password do not match.");

      return;
    }

    const currentPasswordMatches = await checkCurrentPassword(coachId, currentPassword);
    if (!currentPasswordMatches) {
      setErrorMessage("Current password is incorrect.");

      return;
    }

    await changePassword(coachId, newPassword);
    setErrorMessage("Password changed successfully!");
  };

  return (
    <section className="client-password">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>edit my password:</h3>
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-password'>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>current password:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="password" name="current_pass" id="current_pass" className='form-control' onClick={(e) => handleClick(e)} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} /> <span id="dummy1" onClick={(e) => handleClick(e)}></span>
                        <span id="result1">Result is : </span>
                    </div>

                 
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>new password:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="password" name="new_pass" id="new_pass" className='form-control' onClick={(e) => handleClick(e)} value={newPassword} onChange={e => setNewPassword(e.target.value)} /> <span id="dummy2" onClick={(e) => handleClick(e)}></span>
                       
                        <span id="result2">Result is : </span>

                              </div>

                                    
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>confirm new password:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="password" name="confirm_pass" id="confirm_pass" className='form-control' onClick={(e) => handleClick(e)} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} /> <span id="dummy3" onClick={(e) => handleClick(e)}></span>
                        <span id="result3">Result is : </span>
                    </div>
                   
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="submit" value="Save" className='btn btn-save' onClick={handleChangePassword} />
                    </div>
                    <div className="col-sm-12">
                      {errorMessage && <Alert message={errorMessage} className='mt-4' type="success"/> }
                    </div>
                  </div>
                </form>
                </div>
              </div>
              <div className="col-sm-5">
                  <figure>
                    <img src="../../images/banner-bg.png" alt="Images Logo" />
                  </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditCoachPassword
