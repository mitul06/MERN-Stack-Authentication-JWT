import React from 'react'
import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import ChangePassword from './auth/ChangePassword'
import { getToken, removeToken } from '../utils/TokenStore'
import { useIsLoggedInQuery } from '../redux/apis/Auth'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unSetUserToken } from '../redux/AuthSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  const handleLogout = () => {
    removeToken('token')
    dispatch(unSetUserToken())
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const token = getToken()
  const { data, isSuccess } = useIsLoggedInQuery(token)

  useEffect(() => {
    if (data && isSuccess) {
      setUserData(data?.user)
    }
  }, [data, isSuccess])

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: '#fff' }}>
          <Typography variant='h4' sx={{ mb: 5 }}>
            {' '}
            Dashboard{' '}
          </Typography>
          <Typography variant='h5'>
            {' '}
            Full Name : {userData?.fullName}{' '}
          </Typography>
          <Typography variant='h5'> Email: {userData?.email} </Typography>
          <Typography variant='h5'>
            {' '}
            BirthDate: {moment(userData?.birthDate).format('DD-MM-YYYY')}{' '}
          </Typography>
          <Typography variant='h5'> Gender: {userData?.gender} </Typography>
          <Typography variant='h5'> Phone: {userData?.phone} </Typography>
          <Button
            variant='contained'
            color='warning'
            size='large'
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
