// ** React Imports
import { useState, ElementType, ChangeEvent, forwardRef, useEffect } from 'react'
import { useRouter } from 'next/router'

// firebase config
import { database, storage } from '../../../firebaseConfig'
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore'
import { useFormik } from 'formik';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { Alert } from 'antd'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import Link from '@mui/material/Link'
// import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

// import AlertTitle from '@mui/material/AlertTitle'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

// ** Styled Components
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
// import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))
const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabAccount = () => {

    const router = useRouter()

    useEffect(() => {
      const token = sessionStorage.getItem('coachId')

      if(!token){
          router.push('/pages/login')
      }
    }, [])

  // ** State

  const [imgSrc, setImgSrc] = useState<string>('/images/user-image.png')
  const [date, setDate] = useState<Date | null | undefined>(null)

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

    // edit profile coach
    const [proName, setName] = useState('');
    const [proEmail, setEmail] = useState('');
    const [proPhone, setPhone] = useState('');
    const [proCountry, setCountry] = useState('');
    const [proLanguage, setLanguage] = useState('');
    const [proTimeZone, setTimeZone] = useState('');
    const [proBio, setBio] = useState('');
    const [proAbout, setAbout] = useState('');
    const [proImage,setImage] = useState('');
    const [message, setMessage] = useState(false);

    useEffect(() => {

      const editAdmin = async () => {

        const coachIds = sessionStorage.getItem('coachId');
        const userCollection = collection(database, 'coaches_user');
        const userDocRef = doc(userCollection, coachIds);
        const userDoc = await getDoc(userDocRef);

        setName(userDoc.data().coach_name),
        setEmail(userDoc.data().coach_email),
        setPhone(userDoc.data().coach_phone),
        setCountry(userDoc.data().coach_country),
        setLanguage(userDoc.data().coach_language),
        setTimeZone(userDoc.data().coach_timezone),
        setBio(userDoc.data().coach_bio),
        setAbout(userDoc.data().coach_about)
        setImage(userDoc.data().coach_profile)
      };
      editAdmin();

    }, []);


    const handleSubmit = async () =>{

      const coachIds = sessionStorage.getItem('coachId');
      const userDocRef = doc(collection(database, 'coaches_user'), coachIds);

      const updatedData = {
        coach_name: proName,
        coach_phone : proPhone,
        coach_country : proCountry,
        coach_timezone : proTimeZone,
        coach_language : proLanguage,
        coach_bio : proBio,
        coach_about : proAbout,
        coach_profile : fileUrl
      };
      await updateDoc(userDocRef, updatedData);
      setMessage(true);

      //reflect changes instant
      const nameField = document.getElementById("pro_fullname");
      const bioField = document.getElementById("pro_bio");
      const aboutField = document.getElementById("pro_about");
      const countryField = document.getElementById("pro_country");
      const languageField = document.getElementById("pro_language");
      const timezoneField = document.getElementById("pro_timezone");
      const phoneField = document.getElementById("pro_phone");

      nameField.value = updatedData.coach_name;
      bioField.value = updatedData.coach_bio;
      aboutField.value = updatedData.coach_about;
      countryField.value = updatedData.coach_country;
      languageField.value = updatedData.coach_language;
      timezoneField.value = updatedData.coach_timezone;
      phoneField.value = updatedData.coach_phone;
    }

    const handleClose = () => {
      setMessage(false);
    };

    const [file, setFile] = useState(null);
    const [fileUrl, setfileUrl] = useState("");
    const MAX_FILE_SIZE = 800 * 1024;

    function handleFileChange(event) {

      const selectedFile = event.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Only JPEG and PNG files are allowed!');

        return;
      }
      if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds the limit of 800kb");

        return;
      }

      setFile(selectedFile);
    }

    function profile(){
      if (file != null) {

        const storageRef = ref(storage, `/coach/profile/${file.name}`)
        const uploadTask =  uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
          (snapshot) => {

            console.log('snapshot');

          },
      (err) => console.log(err),
          () => {
      // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setfileUrl(url);
          console.log('File Uploaded!');
      });
      }
      );

    }
    }

    useEffect(() => {

      console.log(file);
      if(file != null){
        profile();
      }

    }, [file]);


  return (
    <div className='inner-info'>

      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {file ? (<ImgStyled src={URL.createObjectURL(file)} alt='Profile Pic' />) : (<ImgStyled src={proImage} alt='Profile Pic' />)}

              <Box>
                <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input name='pro_image'
                    hidden
                    type='file'
                    onChange={handleFileChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <Typography variant='body2' sx={{ marginTop: 5 }}>
                PNG or JPEG. Max 800KB.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='text' fullWidth label='Name' placeholder='Name' value={proName} onChange={event => setName(event.target.value)}  id='pro_fullname' name='pro_fullname' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type='text' fullWidth label='Email' placeholder='Email' value={proEmail} onChange={event => setEmail(event.target.value)} name='pro_email' id='pro_email' disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Phone' placeholder='Phone' name='pro_phone' id='pro_phone' value={proPhone} onChange={event => setPhone(event.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Country' placeholder='Country' name='pro_country' id='pro_country' value={proCountry} onChange={event => setCountry(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Language' placeholder='Language' name='pro_language' id='pro_language' value={proLanguage} onChange={event => setLanguage(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Time Zone' placeholder='Time Zone' name='pro_timezone' id='pro_timezone' value={proTimeZone} onChange={event => setTimeZone(event.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              name='pro_bio'
              id='pro_bio'
              value= {proBio}
              onChange={event => setBio(event.target.value)}

              // value='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='About'
              minRows={2}
              placeholder='About'
              value={proAbout}
              id='pro_about'
              name='pro_about'
              onChange={event => setAbout(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>

            <button type='submit' className="btn btn-save" onClick={handleSubmit}>
              Save Changes
            </button>
            {/* <button type='reset' className="btn reset-btn">
              Reset
            </button> */}
          </Grid>
          <Grid item xs={12}>
          {message ? (
              <Alert message="Profile updated successfully" type="success" showIcon closable afterClose={handleClose} />
          ) : null}
          </Grid>
        </Grid>
      </form>

    </div>
  )
}

export default TabAccount
