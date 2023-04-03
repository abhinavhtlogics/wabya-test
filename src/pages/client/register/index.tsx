// ** React Imports
import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// import Firebase database
import { database } from '../../../../firebaseConfig'
import { collection, addDoc ,where, query,startAt,limit,orderBy,getDocs} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import Image from 'next/image'

// form validation
import { useFormik } from "formik";
import * as Yup from "yup";

// material ui icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = () => {

  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false);


  const initialValues = {
    clientName: "",
    clientEmail: "",
    clientPhone : "",
    clientCountry : "",
    clientZone : "",
    clientLanguage : "",
    // clientApi : "",
    // clientUsername: "",
    clientPassword : "",

  }

  //  yup form validation
  const signUpSchema = Yup.object({
    clientName: Yup.string().min(2).max(25).required("Name field is required"),
    clientEmail: Yup.string().email('Invalid email').required("Email field is required"),
    clientPhone: Yup.string().min(10).max(12).required("Phone number field is required"),
    clientCountry: Yup.string().required("Country field is required"),
    clientZone: Yup.string().required("Time Zone field is required"),
    clientLanguage: Yup.string().required("Language field is required"),
    // clientApi: Yup.string().required("Cal API key field is required"),
    // clientUsername: Yup.string().required("Cal Username field is required"),
    clientPassword: Yup.string().min(6).required("Password field is required"),
  });

  // formik form validates

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues : initialValues,
    validationSchema : signUpSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, action) => {
      console.log(
        "🚀 ~ file: index.tsx ~ line 81 ~ Registration ~ values",
        values,

          addDoc(clientRef, {
            client_name: values.clientName,
            client_country : values.clientCountry,
            client_email : values.clientEmail,
            client_language : values.clientLanguage,
            client_password : values.clientPassword,
            client_phone : Number(values.clientPhone),
            client_zone : values.clientZone,
            client_api : String(),
            client_uname : String(), 
            client_uid : Number(),
            assign_coach_id:coachData[randomNo].coach_id,
            assign_coach_api:coachData[randomNo].coach_api,
            assign_coach_uname:coachData[randomNo].coach_uname,
          })
            .then(() => {
              toast.success('Client registered successfully')
              router.push('/client/login')
            })
            .catch((err) => {
              console.error(err);
            })

      );
      action.resetForm();
    },
  });

console.log(
  "🚀 ~ file: index.tsx ~ line 90 ~ Registration ~ errors",
  errors
);

const clientRef = collection(database, 'client_user');

const coachRef = collection(database, 'coaches_user');
const [coachData, setCoachData] = useState([]);

const [randomNo, setrandomNo] = useState(0);

  // coach data fetch
  const getCoachData = async () => {
console.log('test');
    const queryDoc = query(coachRef, where('coach_api', '!=', ''));

    await getDocs(queryDoc).then(response => {
      setCoachData(
        response.docs.map(data => {
          return { ...data.data(), coach_id: data.id }
        })
      )
    })
  }
  useEffect(() => {


    getCoachData();

    


  }, [])

  useEffect(() => {


    console.log(coachData);
    
    setrandomNo(Math.floor(Math.random() * (2 - 0 + 1)) + 0);


  }, [coachData])


  return (
    <Box className='content-center'>
      <ToastContainer theme="colored" autoClose={2000}/>
      <Card sx={{ zIndex: 1 }} className='card-after'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>

          <form onSubmit={handleSubmit} className='form-client-register'>
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientName'
              id='clientName'
              label='Name'
              sx={{ marginBottom: 4 }}
              value={values.clientName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

              {
              errors.clientName && touched.clientName ?
                (
                  <p className="form-error">*{errors.clientName}</p>
                ) : null
              }

            <TextField
              fullWidth
              type='email'
              name='clientEmail'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={values.clientEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
                errors.clientEmail && touched.clientEmail ?
                (
                  <p className="form-error">*{errors.clientEmail}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientPhone'
              id='clientPhone'
              label='Phone Number'
              sx={{ marginBottom: 4 }}
              value={values.clientPhone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
                errors.clientPhone && touched.clientPhone ?
                (
                  <p className="form-error">*{errors.clientPhone}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientCountry'
              id='clientCountry'
              label='Country'
              sx={{ marginBottom: 4 }}
              value={values.clientCountry}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
                errors.clientCountry && touched.clientCountry ?
                (
                  <p className="form-error">*{errors.clientCountry}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientZone'
              id='clientZone'
              label='Time Zone'
              sx={{ marginBottom: 4 }}
              value={values.clientZone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
                errors.clientZone && touched.clientZone ?
                (
                  <p className="form-error">*{errors.clientZone}</p>
                ) : null
              }
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientLanguage'
              id='clientLanguage'
              label='Languages'
              sx={{ marginBottom: 4 }}
              value={values.clientLanguage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
                errors.clientLanguage && touched.clientLanguage ?
                (
                  <p className="form-error">*{errors.clientLanguage}</p>
                ) : null
              }



            <TextField
              fullWidth
              type={visible ? 'text' : 'password'}
              name='clientPassword'
              label='Password'
              sx={{ marginBottom: 4 }}
              value={values.clientPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className='text-pass'
            />
            <span className="pass-eye" onClick={()=>setVisible(!visible)}>
            {
              visible ?
              <EyeOutline fontSize='small' /> :
              <EyeOffOutline fontSize='small' />
            }
            </span>

              {
                errors.clientPassword && touched.clientPassword ?
                (
                  <p className="form-error">*{errors.clientPassword}</p>
                ) : null
              }

{/* <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientApi'
              id='clientApi'
              label='Cal API Key'
              sx={{ marginBottom: 4 }}
              value={values.clientApi}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
              errors.clientApi && touched.clientApi ?
                (
                  <p className="form-error">*{errors.clientApi}</p>
                ) : null
              } */}

            {/* <TextField
              autoFocus
              fullWidth
              type='text'
              name='clientUsername'
              id='clientUsername'
              label='Cal Username'
              sx={{ marginBottom: 4 }}
              value={values.clientUsername}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {
              errors.clientUsername && touched.clientUsername ?
                (
                  <p className="form-error">*{errors.clientUsername}</p>
                ) : null
              } */}

            <Button fullWidth size='large' type='submit' variant='contained' sx={{ my: 7 }} >
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/client/login'>
                  <LinkStyled>Sign In</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
