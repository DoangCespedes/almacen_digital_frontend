import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; // Importar useForm
import { Container, Grid, Box, Typography, TextField, Button } from '@mui/material';
import { UserContext } from '../../../context/user.context';
import { useNavigate } from 'react-router-dom';

const AuthEmployee = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm(); // Inicializar useForm

  const { employees } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userId = `${data.numeroDocumento}`;

    try {
        await employees(userId);
        navigate('/empleado'); // Llama al método de login
        // navigate('/app'); // Redirigir después de un inicio de sesión exitoso
    } catch (error) {
        setErrorMessage(error.message); // Maneja el error si se lanza
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ p: 3, borderRadius: 2, background: 'rgba(255,255,255, 0.7)' }}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Box sx={{
              width: 80,
              height: 80,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}>
              {/* Aquí puedes añadir tu ícono SVG si lo deseas */}
            </Box>
          </Grid>

          <Grid item>
            <Typography component="h1" variant="h5" color="black" mb={2}>
              Autentincar como empleado
            </Typography>
          </Grid>

          <Grid item xs={12} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                label="Número de documento"
                variant="outlined"
                fullWidth
                {...register('numeroDocumento', { 
                  required: 'Número de documento es requerido', 
                  // pattern: { 
                  //   value: /^[0-9]+$/, 
                  //   message: 'El número de documento debe ser numérico' 
                  // } 
                })}
                error={!!errors.numeroDocumento}
                helperText={errors.numeroDocumento?.message}
              />
            </Grid>
            
            <Grid item xs={12} mt={2}>
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary"
                sx={{
                  background: "#506C9A",
                  "&:hover": {
                              background: "#425a85",
                              transform: "scale(1.05)",
                          },
                }}
              >
                LOGIN
              </Button>
            </Grid>

            {/* Si deseas ver mensajes de error, puedes descomentar esto */}
            {errorMessage && (
              <Grid item xs={12} mt={1}>
                <Typography color="error">{errorMessage}</Typography> 
              </Grid> 
            )} 
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AuthEmployee;