// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { app, database } from '../../../../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, doc } from 'firebase/firestore';


// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Image from 'next/image'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const AdminLoginPage = () => {

    const auth = getAuth(app)
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


  //   const login = () => {

  //     signInWithEmailAndPassword(auth, username, password)
  //         .then((response) => {
  //             console.log(response.user)
  //             sessionStorage.setItem('Token', response.user.accessToken);
  //             alert('You can now login.')
  //             router.push('/super-admin/dashboard')
  //         })
  //         .catch(err => {
  //             alert('Credentials are invalid. Please try again later.')
  //         });
  // }

  // useEffect(() => {
  //   const token = sessionStorage.getItem('Token')

  //   if(token){
  //       router.push('/super-admin/login')
  //   }
  // }, [])

  return (

    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }} className='card-after'>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src='/images/logo.png' alt='Wabya Logo' width={'190px'} height={'50px'} layout='fixed' />

          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName} Admin
            </Typography>
            <Typography variant='body2'>Please sign-in to your account </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='username' label='Username' sx={{ marginBottom: 4 }}  type='text'  onChange={(event) => setUsername(event.target.value)} value={username} />
            <TextField autoFocus fullWidth id='password' label='Password' sx={{ marginBottom: 4 }}  type='password'  onChange={(event) => setPassword(event.target.value)} value={password} />

            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >

            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7, fontWeight:600 }}
              onClick={ () => router.push('/super-admin/dashboard')} >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

AdminLoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AdminLoginPage
