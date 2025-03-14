import { useContext } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import logo from '../../assets/logo_sin_fondo.png';
import { UserContext } from '../../context/user.context';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 3, color: '#333' }}
          textAlign='center'
        >
          Bienvenido al Almacén Digital de Seguros Constitución
        </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // En móviles, columna; en pantallas grandes, fila
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100vh', 
        // width: '100vw',
        padding: 2,
        // bgcolor: '#f5f5f5',
      }}
    >
      
      {/* Caja de datos */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: { xs: 'auto', md: '15rem' }, // Ajustable en móviles
          zIndex: 1,
          mb: { xs: 3, md: 0 }, // Espaciado en móviles
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            textAlign: 'center',
            bgcolor: '#ffffff',
            width: { xs: '90%', sm: '300px', md: '250px' }, // Responsivo
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            DATOS DEL MANAGER:
          </Typography>
          <Typography variant="body1"><strong>Usuario:</strong> {user.user_name}</Typography>
          <Typography variant="body1"><strong>Nombre:</strong> {user.first_name}</Typography>
          <Typography variant="body1"><strong>Apellido:</strong> {user.last_name}</Typography>
        </Paper>
      </Box>

      {/* Contenido con el logo */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        

        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: { xs: '90%', sm: '90%', md: '90%' }, // Ajuste responsivo
            // maxWidth: '400px',
          }}
        />
      </Box>
    </Box>
    </>
  );
};

export default Home;
