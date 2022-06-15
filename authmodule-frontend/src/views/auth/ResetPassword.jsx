import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../../redux/apis/Auth'

const ResetPassword = () => {
  const [alertData, setAlertData] = useState({
    status: false,
    message: '',
    type: ''
  })

  const navigate = useNavigate()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const { id, resetLink } = useParams()

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const data = {
      cPassword: formdata.get('confirm_password'),
      password: formdata.get('new_password')
    }

    if (data.cPassword && data.password) {
      if (data.password === data.cPassword) {
        const resetRes = await resetPassword({ data, id, resetLink })
        if (resetRes.data.success) {
          setAlertData({
            status: true,
            message: resetRes.data.message,
            type: 'success'
          })
          document.getElementById('reset-form').reset()
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          setAlertData({
            status: true,
            message: resetRes.data.message,
            type: 'error'
          })
        }
      } else {
        setAlertData({
          status: true,
          message: 'New Password & Confirm Password does not match!',
          type: 'error'
        })
      }
    } else {
      setAlertData({
        status: true,
        message: 'Password & Confirm password is required!',
        type: 'error'
      })
    }
  }

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid items sm={12} md={6} lg={6}>
          <Box
            component='form'
            noValidate
            sx={{ width: '80%', margin: '30px auto' }}
            id='reset-form'
            onSubmit={e => handleSubmit(e)}
          >
            <Typography variant='h5' gutterBottom component='div'>
              Reset Password
            </Typography>
            <TextField
              label='New Password'
              required
              fullWidth
              id='new_password'
              name='new_password'
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
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save New Password'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ResetPassword
