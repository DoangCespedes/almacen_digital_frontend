// Navbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../../assets/mundo.jpg'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Función para abrir/cerrar el drawer
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(!drawerOpen);
    };

    // Definiendo enlaces
    const links = [
        { text: 'Home', path: '/app', icon: <HomeIcon /> },
        { text: 'Solicitudes', path: '/solicitudes', icon: <FileOpenIcon /> },
        { text: 'Carga Articulos', path: '/articulos', icon: <AddToPhotosIcon /> },
        { text: 'Inventario', path: '/inventario', icon: <PlagiarismIcon /> },
        { text: 'Entregas', path: '/entregas', icon: <ShoppingCartIcon /> },
        { text: 'Salir', path: '/', icon: <LogoutIcon /> },
    ];

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#F1EFEC", zIndex: '1000000000' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {/* Mi Aplicación */}
                        <img src={logo} style={{ width:'12rem'}}/>
                    </Typography>
                    {/* Icono del menú hamburguesa que aparece en pantallas pequeñas */}
                    <IconButton edge="end" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer para el menú hamburguesa */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div style={{ marginTop: '4rem', width: '200px', display:'flex', justifyContent: 'center'  }}> {/* Ajusta el ancho según tus necesidades */}
                    <List>
                        {links.map((link) => (
                            <ListItem button key={link.text} onClick={toggleDrawer(false)} component={Link} to={link.path}>
                                {/* Agregar un div contenedor para los iconos y el texto */}
                                <div style={{ display: 'flex', justifyContent:'space-between'}}>
                                    <div style={{ marginRight: '2rem' }}> {/* Espacio entre el ícono y el texto */}
                                        {link.icon}
                                    </div>
                                    <ListItemText primary={link.text} />
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default Navbar;