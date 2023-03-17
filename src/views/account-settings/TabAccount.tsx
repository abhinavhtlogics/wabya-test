// ** React Imports
import { useState, ElementType, ChangeEvent, forwardRef, useEffect } from 'react'
import { app, database } from '../../../firebaseConfig'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore';


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
    const auth = getAuth(app);
    const [proName, setName] = useState('');
    const [proPhone, setPhone] = useState('');
    const [proCountry, setCountry] = useState('');
    const [proLanguage, setLanguage] = useState('');
    const [proTimeZone, setTimeZone] = useState('');
    const [proBio, setBio] = useState('');
    const [proAbout, setAbout] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [calUname, setCalUname] = useState('');

    const databaseRef = collection(database, 'profile');

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

  const addProfileData = () => {
    addDoc(databaseRef, {
      fullname: proName,
      contact_number: Number(proPhone),
      country : proCountry,
      language : proLanguage,
      time_zone : proTimeZone,
      bio : proBio,
      about: proAbout,
      api : apiKey,
      uname : calUname
    })
      .then(() => {
        alert('Profile added successfully.')

        setName('')
        setPhone('')
        setCountry('')
        setLanguage('')
        setTimeZone('')
        setBio('')
        setAbout('')
        setApiKey('')
        setCalUname('')
        router.push('/dashboard')
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className='inner-info'>

      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled className='btn' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input name='pro_image'
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {/* <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled> */}
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type='text' fullWidth label='Name' placeholder='Name' defaultValue={proName} onChange={event => setName(event.target.value)} name='pro_fullname' />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='Email'
              defaultValue='' name='pro_email'
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Phone' placeholder='Phone' name='pro_phone' defaultValue={proPhone} onChange={event => setPhone(event.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Country' placeholder='Country' name='pro_country' defaultValue={proCountry} onChange={event => setCountry(event.target.value)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
              <Select onChange={event => setCountry(event.target.value)}
                multiple
                defaultValue={['English']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Time Zone</InputLabel>
              <Select
                multiple onChange={event => setTimeZone(event.target.value)}
                defaultValue={['India']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Time Zone' id='select-multiple-language' />}
              >
                <MenuItem value='India'>India</MenuItem>
                <MenuItem value='Europe'>Europe</MenuItem>
                <MenuItem value='London'>London</MenuItem>
                <MenuItem value='Spain'>Spain</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              name='pro_bio'
              defaultValue= {proBio}
              onChange={event => setBio(event.target.value)}

              // defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='About'
              minRows={2}
              placeholder='About'
              defaultValue={proAbout}
              name='pro_about'
              onChange={event => setAbout(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label='API Key'
              minRows={2}
              placeholder='API key'
              defaultValue={apiKey}
              name='api_key'
              onChange={event => setApiKey(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Username'
              minRows={2}
              placeholder='Cal Username'
              defaultValue={calUname}
              name='cal_uname'
              onChange={event => setCalUname(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>

            <button type='submit' className="btn btn-save" onClick={addProfileData}>
              Save Changes
            </button>
            <button type='reset' className="btn reset-btn">
              Reset
            </button>
          </Grid>
        </Grid>
      </form>

    </div>
  )
}

export default TabAccount
