import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ background: '#9575cd' }}>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
              Auths
            </Typography>
            <Button
              component={NavLink}
              to='/'
              sx={{ color: 'white', textTransform: 'capitalize' }}
              style={({ isActive }) => {
                return { color: isActive ? '#b71c1c' : '' }
              }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to='/contact'
              sx={{ color: 'white', textTransform: 'capitalize' }}
              style={({ isActive }) => { 
                return { color: isActive ? '#b71c1c' : '' }
              }}
            >
              Contact
            </Button>
            <Button
              component={NavLink}
              to='/login'
              sx={{ color: 'white', textTransform: 'capitalize' }}
              style={({ isActive }) => {
                return { color: isActive ? '#b71c1c' : '' }
              }}
            >
              Login / Reg
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Navbar
