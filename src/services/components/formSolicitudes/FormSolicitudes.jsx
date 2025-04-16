import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../../../assets/mundo.jpg';
import axios from 'axios';
import { UserContext } from '../../../context/user.context';
import { useNavigate } from 'react-router-dom';

const FormSolicitudes = () => {
  const { employeeId, userDetails } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [orders, setOrders] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemCode: '',
      quantity: '',
    },
  });

  // Estado para el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/store');
        if (response.status === 200) {
          setArticles(response.data);
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
      }
    };

    getArticles();
  }, []);

  const addOrder = (data) => {
    const selectedArticle = articles.find(article => article.store_id === data.itemCode);

    // Validación de cantidad
    if (data.quantity < 1) {
      setDialogMessage('La cantidad debe ser al menos 1.');
      setDialogOpen(true);
      return; // Salir de la función si la cantidad es inválida
    }

    // Validación de stock
    if (selectedArticle && selectedArticle.CANTSTOCK < data.quantity) {
      setDialogMessage('Cantidad solicitada supera el stock disponible.');
      setDialogOpen(true);
      return; // Salir de la función si hay un problema
    }

    if (selectedArticle) {
      const orderWithFullDetails = {
        ...selectedArticle,
        quantity: data.quantity
      };
      setOrders((prevOrders) => [...prevOrders, orderWithFullDetails]);
      setDialogMessage('Orden agregada correctamente.');
      setDialogOpen(true);
    }

    // Restablece los valores del formulario
    reset({ itemCode: '', quantity: '' });
  };

  const removeOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (orders.length === 0) {
      setDialogMessage('No hay órdenes para enviar.');
      setDialogOpen(true);
      return; // Salir si no hay órdenes
    }

    const { building_id, company_id, department_id } = employeeId;
  
    const requestToInsert = {
      employee_id: employeeId.employee_id,
      building_id: building_id,
      company_id: company_id,
      department_id: department_id,
      STSSOL: 'PENDING',
      USRREG: employeeId.CEDEMP,
      FECREG: today,
      NOMEMP: userDetails.employeeName,
      CORREO: userDetails.email,
      NOMDPTO: userDetails.departmentName,
      NOMCOMP: userDetails.companyName,
      NOMTORRE: userDetails.towerName,
    };
  
    try {
      const responseRequests = await axios.post('http://localhost:3030/api/requests', requestToInsert);
      
      if (responseRequests.status === 201) {
        const requestId = responseRequests.data.request_id; 
  
        const ordersToInsert = orders.map(order => ({
          request_id: requestId,
          store_id: order.store_id,
          NOMART: order.NOMART,
          UNIDADMED: order.UNIDADMED,
          CANT: order.quantity,
          STSORD: 'PENDING',  
          USRREG: employeeId.CEDEMP,
          FECREG: today,
        }));
  
        const responseOrders = await axios.post('http://localhost:3030/api/requests/orders', ordersToInsert);
        
        if (responseOrders.status === 201) {
          console.log('Órdenes enviadas correctamente:', responseOrders.data);
          setOrders([]); 
          setDialogMessage('Solicitud y órdenes enviadas correctamente!');
          setDialogOpen(true); // Abre el diálogo
          navigate('/empleado');
        }
      }
    } catch (error) {
      console.error('Error al enviar la solicitud o las órdenes:', error);
      setDialogMessage('Ocurrió un error al enviar la solicitud.');
      setDialogOpen(true); // Abre el diálogo
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <h2>
        <img src={logo} alt="logo" style={{ width: '19rem' }} />
        Solicitud de Artículos
      </h2>

      <form onSubmit={handleSubmit(addOrder)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Fecha de Solicitud" type="text" value={today} disabled fullWidth />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Artículo</InputLabel>
              <Select
                defaultValue=""
                {...register('itemCode', { required: 'Seleccione un artículo' })}
                error={!!errors.itemCode}
              >
                {articles.map(({ store_id, NOMART, CANTSTOCK }) => (
                  <MenuItem
                    key={store_id}
                    value={store_id}
                    disabled={CANTSTOCK <= 0} // Desactivar si no hay stock
                  >
                    {NOMART} {CANTSTOCK <= 0 ? '(Sin stock)' : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              {...register('quantity', {
                required: 'Este campo es requerido',
                min: { value: 1, message: 'La cantidad debe ser al menos 1' },
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "#506C9A",
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                padding: '10px 15px',
                "&:hover": {
                  background: "#425a85",
                  transform: "scale(1.05)",
                },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Agregar Orden
            </Button>
          </Grid>
        </Grid>
      </form>

      {orders.length > 0 && (
        <Card sx={{ mt: 3, p: 2 }}>
          <CardContent>
            <h3>Órdenes Agregadas</h3>
            {orders.map((order, index) => (
              <Grid container key={index} alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={8}>
                  {articles.find((a) => a.store_id === order.store_id)?.NOMART} - {order.quantity} unidades
                </Grid>
                <Grid item xs={4}>
                  <IconButton color="error" onClick={() => removeOrder(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      )}

      {orders.length > 0 && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onSubmit}
            sx={{
              background: "#506C9A",
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '10px 15px',
              marginBottom: '2rem',
              "&:hover": {
                background: "#425a85",
                transform: "scale(1.05)",
              },
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Enviar Solicitud
          </Button>
        </Grid>
      )}

      {/* Diálogo de mensajes */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <div>{dialogMessage}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormSolicitudes;