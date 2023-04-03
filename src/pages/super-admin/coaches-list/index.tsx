import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs,doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachesList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'coaches_user');
  const [fireData, setFireData] = useState([]);
  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token')
    getData()

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])

  // fetch all coaches records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
          return {...data.data(), coach_id: data.id}
        }))
      })
  }

  // view single coach record

  // delete coach

  const deleteDocument = (coach_id) => {
    let fieldToEdit = doc(database, 'coaches_user', coach_id);

      deleteDoc(fieldToEdit)
      .then(() => {
        toast.success('Coach deleted successfully!!')
        getData()
      })
      .catch((err) => {
        toast.error('Coach record is not deleted!')
      })
  }

  return (
    <section className='coaches-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 mrb-30'>
            <h2>Coaches List</h2>
          </div>
          <div className='coach-table'>
            <div className='table-responsive'>

                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Coach Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fireData.map((data) => {
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{data.coach_name}</td>
                        <td>{data.coach_email}</td>
                        <td>

                            <Link href={`/super-admin/view-client/${data.coach_id}`} passHref>
                              <a className='btn btn-edit'>
                                <i className='fa fa-eye'></i>
                              </a>
                            </Link>

                            <ToastContainer />
                            {/* <button className='btn btn-delete' onClick={() => deleteDocument(data.coach_id)}>
                              <i className='fa fa-trash'></i>
                            </button> */}

                        </td>
                      </tr>
                      </>
                      )
                    })}


                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoachesList
