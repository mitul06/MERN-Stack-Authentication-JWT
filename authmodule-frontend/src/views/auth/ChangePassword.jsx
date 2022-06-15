import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useChangePasswordMutation } from '../../redux/apis/Auth'
import { getToken } from '../../utils/TokenStore'

const ChangePassword = () => {
  const [alertData, setAlertData] = useState({
    status: false,
    message: '',
    type: ''
  })

  const token = getToken()
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const handleSubmit = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const data = {
      oldPassword: formdata.get('old_password'),
      cPassword: formdata.get('confirm_password'),
      password: formdata.get('new_password')
    }

    if (data.oldPassword && data.cPassword && data.password) {
      if (data.password === data.cPassword) {
        const changeData = {
          currentPassword: data.oldPassword,
          newPassword: data.password,
          token
        }
        if (changeData) {
          const changeRes = await changePassword(changeData)
          if (changeRes.data?.success) {
            document.getElementById('change-form').reset()
            setAlertData({
              status: true,
              message: changeRes.data?.message,
              type: 'success'
            })
          } else {
            setAlertData({
              status: true,
              message: changeRes.error?.data?.message ?? changeRes.data.message,
              type: 'error'
            })
          }
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
        message: 'Old Password, New Password & Confirm password is required!',
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
        id='change-form'
        onSubmit={e => handleSubmit(e)}
      >
        <Typography variant='h5' gutterBottom component='div'>
          Change Password
        </Typography>
        <TextField
          label='Old Password'
          required
          fullWidth
          id='old_password'
          name='old_password'
          type='password'
          margin='normal'
        />
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
            {isLoading ? 'Changing' : 'Change Password'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ChangePassword
