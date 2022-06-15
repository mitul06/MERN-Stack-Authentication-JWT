import React, { useState } from 'react'
import { Grid, Card, Tabs, Tab, Box } from '@mui/material'
import shopImage from '../../assets/img/shop.png'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

const TabPanel = props => {
  const { children, value, index } = props

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

const LoginReg = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <>
      <Grid container sx={{ height: '90vh' }}>
        <Grid
          item
          lg={7}
          sm={5}
          sx={{
            backgroundImage: `url(${shopImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: { xs: 'none', sm: 'block' }
          }}
        ></Grid>
        <Grid item lg={5} sm={7} xs={12}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  textColor='secondary'
                  indicatorColor='secondary'
                  value={value}
                  onChange={handleChange}
                >
                  <Tab
                    label='login'
                    sx={{ textTransform: 'capitalize', fontWeight: 700 }}
                  ></Tab>
                  <Tab
                    label='Registration'
                    sx={{ textTransform: 'capitalize', fontWeight: 700 }}
                  ></Tab>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <LoginPage />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <RegistrationPage />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default LoginReg
