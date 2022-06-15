import {
  Alert,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material'
import React, { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../redux/apis/Auth'
import { setToken } from '../../utils/TokenStore'

const RegistrationPage = () => {
  const [value, setValue] = useState(new Date())
  const [gender, setGender] = useState('')

  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const handleChange = newValue => {
    setValue(newValue)
  }

  const [alertData, setAlertData] = useState({
    status: false,
    message: '',
    type: ''
  })

  const handleGenderChange = event => {
    setGender(event.target.value)
  }

  const onlyNumbers = e => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 10)
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const data = {
      email: formdata.get('email'),
      password: formdata.get('password'),
      confirm_password: formdata.get('confirm_password'),
      fullName: formdata.get('fullName'),
      birthDate: value,
      phone: formdata.get('phone'),
      gender: gender,
      tc: formdata.get('tc') === 'true' ? true : false
    }

    if (
      data.email &&
      data.password &&
      data.fullName &&
      data.birthDate &&
      data.gender &&
      data.phone &&
      data.tc
    ) {
      if (data.password === data.confirm_password) {
        setAlertData({
          status: true,
          message: 'Data save successfully',
          type: 'success'
        })

        const response = await registerUser(data)
        if (response.data.success) {
          //Token
          setToken(response.data.token)
          setValue(new Date())
          setGender('')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          setAlertData({
            status: true,
            message: response.data.message,
            type: 'error'
          })
        }
      } else {
        setAlertData({
          status: true,
          message: 'Password does not match!',
          type: 'error'
        })
      }
    } else {
      setAlertData({
        status: true,
        message: 'All fields are required!',
        type: 'error'
      })
    }
  }

  return (
    <>
      <Box
        component='form'
        noValidate
        sx={{ width: '80%', margin: '30px auto' }}
        id='registration-form'
        onSubmit={e => handleSubmit(e)}
      >
        <TextField
          label='Full Name'
          required
          fullWidth
          id='fullName'
          name='fullName'
          margin='normal'
        />
        <TextField
          label='Email'
          required
          fullWidth
          id='email'
          name='email'
          margin='normal'
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ mb: 1, mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label='Birth Date'
                  inputFormat='dd/MM/yyyy'
                  name='birthDate'
                  value={value}
                  onChange={handleChange}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1, mt: 2 }}>
              <Select
                name='gender'
                value={gender}
                displayEmpty
                label='Gender'
                onChange={handleGenderChange}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value=''>
                  <em>Gender</em>
                </MenuItem>
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>

        <TextField
          label='Phone Number'
          required
          fullWidth
          id='phone'
          name='phone'
          margin='normal'
          type='number'
          inputProps={{ maxLength: 10 }}
          onInput={e => onlyNumbers(e)}
        />
        <TextField
          label='Password'
          required
          fullWidth
          id='password'
          name='password'
          type='password'
          margin='normal'
        />

        <TextField
          label='Confirm Password'
          required
          fullWidth
          id='confirm_password'
          name='confirm_password'
          type='password'
          margin='normal'
        />

        <FormControlLabel
          control={<Checkbox value={true} color='primary' name='tc' id='tc' />}
          label='I agree to terms & conditions'
        />

        {alertData.status && (
          <Box>
            <Alert severity={alertData.type}> {alertData.message} </Alert>
          </Box>
        )}

        <Box textAlign='center'>
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 4, px: 5 }}
          >
            {isLoading ? <CircularProgress /> : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default RegistrationPage
