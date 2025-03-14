import React from 'react'
import FormSolicitudes from '../../services/components/formSolicitudes/FormSolicitudes'
import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Solicitudes = () => {
  return (
    <>
      <Grid item
        sx={{ 
          mt: 2, 
          display: 'flex',
          justifyContent: 'end'
        }}
      >
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ 
              mt: 1, 
              mr: 1
            }} 
          >
            <ExitToAppIcon/>
          </Button>
        </Grid>
      <FormSolicitudes/>
    </>

  )
}

export default Solicitudes