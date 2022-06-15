import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/apis/Auth'

const ForgotPassword = () => {
  const [alertData, setAlertData] = useState({
    status: false,
    message: '',
    type: ''
  })

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const data = {
      email: formdata.get('email')
    }

    if (data.email) {
      const forgotRes = await forgotPassword(data)
      if (forgotRes.data.success) {
        setAlertData({
          status: true,
          message: forgotRes.data.message,
          type: 'success'
        })
        document.getElementById('forgot-form').reset()
      } else {
        setAlertData({
          status: true,
          message: forgotRes.data.message,
          type: 'error'
        })
      }
    } else {
      setAlertData({
        status: true,
        message: 'Please! add email.',
        type: 'error'
      })
    }
  }

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item sm={12} md={6} lg={6}>
          <Box
            component='form'
            noValidate
            sx={{ width: '80%', margin: '30px auto' }}
            id='forgot-form'
            onSubmit={e => handleSubmit(e)}
          >
            <Typography variant='h5' gutterBottom component='div'>
              Forgot Password
            </Typography>
            <TextField
              label='Email'
              required
              fullWidth
              id='email'
              name='email'
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
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ForgotPassword
