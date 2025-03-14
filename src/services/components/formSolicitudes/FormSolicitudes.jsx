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
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../../../assets/LogoConsti.png';
import axios from 'axios';
import { UserContext } from '../../../context/user.context';
import { useNavigate } from 'react-router-dom';

const FormSolicitudes = () => {
  const { employeeId } = useContext(UserContext);

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
    setOrders((prevOrders) => [...prevOrders, data]);
    reset();
  };

  const removeOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    // Verifica que `employeeId` contenga la información necesaria
    const { building_id, company_id, department_id } = employeeId;
  
    // Construimos el JSON para la API de `requests`
    const requestToInsert = {
      employee_id: employeeId.employee_id,
      building_id: building_id,
      company_id: company_id,
      department_id: department_id,
      STSSOL: 'PENDING',
      USRREG: employeeId.CEDEMP,
      FECREG: today,
    };
  
    try {
      // Inserta la solicitud en la tabla `requests`
      const responseRequests = await axios.post('http://localhost:3030/api/requests', requestToInsert);
      
      if (responseRequests.status === 201) {
        const requestId = responseRequests.data.request_id; // Asegúrate de que response.data contenga request_id
  
        // Prepara las órdenes a insertar utilizando el request_id obtenido
        const ordersToInsert = orders.map(order => ({
          request_id: requestId, // Usamos el mismo request_id para todas las órdenes
          CODART: order.itemCode,  // Suponiendo que itemCode es el código del artículo
          CANT: order.quantity,
          STSORD: 'PENDING',  // O el estado que desees asignar
          USRREG: employeeId.CEDEMP,
          FECREG: today,
        }));
  
        // Inserta las órdenes en la tabla `orders`
        const responseOrders = await axios.post('http://localhost:3030/api/requests/orders', ordersToInsert);
        
        if (responseOrders.status === 201) {
          console.log('Órdenes enviadas correctamente:', responseOrders.data);
          setOrders([]); // Reinicia el estado de órdenes
          alert('Solicitud y órdenes enviadas correctamente!');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error al enviar la solicitud o las órdenes:', error);
      alert('Ocurrió un error al enviar la solicitud.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <h2>
        <img src={logo} alt="logo" />
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
                {articles.map(({ CODART, NOMART }) => (
                  <MenuItem key={CODART} value={CODART}>
                    {NOMART}
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
            <Button type="submit" variant="contained" color="secondary" fullWidth>
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
                  {articles.find((a) => a.CODART === order.itemCode)?.NOMART} - {order.quantity} unidades
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
          <Button variant="contained" color="primary" fullWidth onClick={onSubmit}>
            Enviar Solicitud
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default FormSolicitudes;