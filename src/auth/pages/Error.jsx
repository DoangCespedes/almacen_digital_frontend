import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center', padding: 4, borderRadius: 2, backgroundColor: '#f3f4f6', boxShadow: 3 }}>
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
        <Grid item>
          <ErrorOutlineIcon sx={{ fontSize: 80, color: '#f44336' }} />
        </Grid>
        <Grid item>
          <Typography variant="h3" color="text.primary" gutterBottom>
            Error 404
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Lo sentimos, la página que estás buscando no se encuentra disponible.
          </Typography>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ mt: 2 }} 
          >
            Volver a la Página Principal
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error;