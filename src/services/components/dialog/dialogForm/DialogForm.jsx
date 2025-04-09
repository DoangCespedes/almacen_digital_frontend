import React, { useContext } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { UserContext } from '../../../../context/user.context';

const DialogFormTable = ({ open, onClose, orderSelected, rowSelected }) => {


  const { user } = useContext(UserContext);


  const [formData, setFormData] = React.useState(() => {
    return orderSelected.reduce((acc, order) => {
      acc[`CANT_${order.order_id}`] = order.CANT || '';
      acc[`FECREG_${order.order_id}`] = order.FECREG ? format(new Date(order.FECREG), 'dd/MM/yyyy') : '';
      acc[`NOMART_${order.order_id}`] = order.NOMART || '';
      acc[`STSORD_${order.order_id}`] = order.STSORD || '';
      acc[`UNIDADMED_${order.order_id}`] = order.UNIDADMED || '';
      acc[`USRREG_${user.user_name}`] = order.USRREG || '';
      return acc;
    }, {});
  });

  const orderStatuses = [
    { value: '', label: <em>Todos</em> },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'REJECTED', label: 'Rechazado' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const deliveriesToSubmit = orderSelected.flatMap((order) => {
      const orderStatus = formData[`STSORD_${order.order_id}`];
      if (orderStatus === 'DELIVERED') {
        return {
          request_id: rowSelected.request_id,
          order_id: order.order_id,
          store_id: order.store_id,
          NOMART: order.NOMART,
          UNIDADMED: order.UNIDADMED,
          CANT: parseInt(formData[`CANT_${order.order_id}`], 10),
          USRREG: order.USRREG || 'default_user',
        };
      }
      return [];
    });
  
    if (deliveriesToSubmit.length === 0) {
      alert('No hay entregas con estado DELIVERED');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3030/api/requests/deliveries', deliveriesToSubmit);
      console.log('Entregas registradas:', response.data);
      onClose();
    } catch (error) {
      console.error('Error al registrar entregas:', error);
      alert('Error al enviar entregas');
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" style={{ marginTop: '3rem' }}>
      <DialogTitle style={{ color: '#213599' }}>Detalle de la Solicitud Nro {rowSelected.request_id}</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#213555' }}>
                <TableCell sx={{ color: '#fff' }}>Orden</TableCell>
                <TableCell sx={{ color: '#fff' }}>Cantidad</TableCell>
                <TableCell sx={{ color: '#fff' }}>Fecha de Registro</TableCell>
                <TableCell sx={{ color: '#fff' }}>Artículo</TableCell>
                <TableCell sx={{ color: '#fff' }}>Estado</TableCell>
                <TableCell sx={{ color: '#fff' }}>Unidad</TableCell>
                <TableCell sx={{ color: '#fff' }}>Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderSelected.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>
                    <TextField
                      name={`CANT_${order.order_id}`}
                      value={formData[`CANT_${order.order_id}`]}
                      onChange={handleChange}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {formData[`FECREG_${order.order_id}`]}
                  </TableCell>
                  <TableCell>{order.NOMART}</TableCell>
                  <TableCell>
                    <Select
                      name={`STSORD_${order.order_id}`}
                      value={formData[`STSORD_${order.order_id}`]}
                      onChange={handleChange}
                      size="small"
                    >
                      {orderStatuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{order.UNIDADMED}</TableCell>
                  <TableCell>{order.USRREG}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Enviar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFormTable;