import React from 'react'
import FormSolicitudes from '../../services/components/formSolicitudes/FormSolicitudes';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Solicitudes = () => {
  

  return (
    <>
      <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "start", alignItems: "center", mt: 2 , marginLeft: 2 }}>
        <Button
              variant="contained"
              component={Link}
              to="/empleado"
              sx={{
              background: "#506C9A",
              color: "white",
              borderRadius: 3,
              padding: "10px 16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&:hover": {
                            background: "#425a85",
                            transform: "scale(1.05)",
                        },
              }}
          >
              <FastRewindIcon sx={{ fontSize: 24 }} />
              Regresar
          </Button>

        </Grid>

      
      <FormSolicitudes />
    </>
  );
}

export default Solicitudes;