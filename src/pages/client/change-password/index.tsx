//  ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

import { useRouter } from 'next/router'

// ** React Imports
import { SyntheticEvent, useState, useEffect, forwardRef } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

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


const EditProfile = () => {

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
  const [proName, setName] = useState('');
  const [proPhone, setPhone] = useState('');
  const [proCountry, setCountry] = useState('');
  const [proBio, setBio] = useState('');
  const [proAbout, setAbout] = useState('');

  // ** State
  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
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
                        <input type="password" name="current_pass" id="current_pass" className='form-control' onClick={(e) => handleClick(e)} /> <span id="dummy1" onClick={(e) => handleClick(e)}></span>
                        <span id="result1">Result is : </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>new password:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="password" name="new_pass" id="new_pass" className='form-control' onClick={(e) => handleClick(e)} /> <span id="dummy2" onClick={(e) => handleClick(e)}></span>
                        <span id="result2">Result is : </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>confirm new password:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="password" name="confirm_pass" id="confirm_pass" className='form-control' onClick={(e) => handleClick(e)} /> <span id="dummy3" onClick={(e) => handleClick(e)}></span>
                        <span id="result3">Result is : </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="submit" value="save" className='btn btn-save' />
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

export default EditProfile
