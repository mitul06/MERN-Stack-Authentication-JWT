import { Alert, Box, Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/apis/Auth'
import { setUserToken } from '../../redux/AuthSlice'
import { getToken, setToken } from '../../utils/TokenStore'

const LoginPage = () => {
  const [alertData, setAlertData] = useState({
    status: false,
    message: '',
    type: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const data = {
      email: formdata.get('email'),
      password: formdata.get('password')
    }

    if (data.email && data.password) {
      const loginRes = await loginUser(data)
      if (loginRes.data.success) {
        setToken(loginRes.data.token)
        setAlertData({
          status: true,
          message: loginRes.data.message,
          type: 'success'
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        setAlertData({
          status: true,
          message: loginRes.data.message,
          type: 'error'
        })
      }

      // console.log('loginRes ---->', loginRes)
    } else {
      setAlertData({
        status: true,
        message: 'All fields are required!',
        type: 'error'
      })
    }
  }

  let token = getToken()

  useEffect(() => {
    if (token) {
      dispatch(
        setUserToken({
          token: token
        })
      )
    }
  }, [token, dispatch])

  return (
    <>
      <Box
        component='form'
        noValidate
        sx={{ width: '80%', margin: '30px auto' }}
        id='login-form'
        onSubmit={e => handleSubmit(e)}
      >
        <TextField
          label='Email'
          required
          fullWidth
          id='email'
          name='email'
          margin='normal'
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
            {isLoading ? <CircularProgress /> : 'Login'}
          </Button>
        </Box>
        <NavLink to='/forgot-password'>Forgot Password</NavLink>
      </Box>
    </>
  )
}

export default LoginPage
