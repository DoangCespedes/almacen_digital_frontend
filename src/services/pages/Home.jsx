import { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import logo from '../../assets/img.jpg';
import imagePopUp from '../../assets/almace2.jpg';
import { UserContext } from '../../context/user.context';

const Home = () => {
  const { user } = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {/* Contenedor central para el logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            marginTop:'4rem',
            width: '80%', 
            maxWidth: '50rem', 
          }}
        />
      </Box>

      {/* Diálogo de bienvenida */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{background:'#213555' , color:'#fff'}}>Hola {user.first_name} {user.last_name}! </DialogTitle>
        <DialogContent  style={{ display:'flex', justifyContent:'center', marginTop:'2rem'}}>
          <p>
            Bienvenido al Almacén Digital de Seguros Constitución.
          </p>
          <img src={imagePopUp} style={{width:'40%', display:'flex', justifyContent:'center'}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;