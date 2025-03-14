import React, { useState } from 'react';
import LoginForm from '../../services/components/login/LoginForm';
import logo from '../../assets/logo_sin_fondo.png';
import { Box, Switch, Typography } from '@mui/material';
import AuthEmployee from '../../services/components/authEmploy/AuthEmployee';

const Login = () => {
  const [validator, setValidator] = useState(false); // Estado para controlar el switch

  const handleSwitchChange = () => {
    setValidator((prev) => !prev); // Cambia el estado del switch
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '4rem' }}>Almacen Digital</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" style={{ marginRight: '10px' }}>
          {validator ? 'Crear solicitud' : 'Ingresar a la app'}
        </Typography>
        <Switch {...label} checked={validator} onChange={handleSwitchChange} />
      </div>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }} // Cambia a columna en pantallas pequeñas
        alignItems="stretch" // Cambiar a stretch para asegurar que las cajas ocupen el mismo alto
        justifyContent="center"
        sx={{ backgroundColor: '#fff' }}
      >
        <Box
          flex={1} // Ocupa el 50% del espacio en pantallas grandes
          display={{ xs: 'none', md: 'flex' }} // Oculta el logo en pantallas pequeñas
          justifyContent="center"
          alignItems="center"
          sx={{ padding: { xs: 2, md: 0 }, minHeight: '500px' }} // Altura mínima
        >
          <img
            src={logo}
            alt='logoSC'
            style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} // Controla el tamaño del logo
          />
        </Box>
        <Box
          flex={1} // Ocupa el 50% del espacio en pantallas grandes
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: { xs: 2, md: 0 }, minHeight: '500px' }} // Altura mínima
        >
          {validator ? <AuthEmployee /> : <LoginForm />}
        </Box>
      </Box>
    </>
  );
};

export default Login;