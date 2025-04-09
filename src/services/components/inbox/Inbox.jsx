import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ReusableTable from '../tables/simpleTable/SimpleTable';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import DialogForm from '../dialog/dialogForm/DialogForm';
import { useForm } from 'react-hook-form';
import DialogError from '../dialog/dialogError/DialogError';

const Inbox = () => {
    const { register, handleSubmit, watch } = useForm();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [rowSelected, setRowSelected] = useState(null);
    const [orderSelected, setOrderSelected] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Mapeamos los estados para mostrar en español
    const statusMap = {
        PENDING: 'Pendiente',
        DELIVERED: 'Entregado',
        REJECTED: 'Rechazado',
    };

    const columns = [
        { field: 'request_id', headerName: 'Solicitud' },
        { field: 'NOMCOMP', headerName: 'Compañia' },
        { field: 'NOMTORRE', headerName: 'Torre' },
        { field: 'NOMDPTO', headerName: 'Departamento' },
        { field: 'NOMEMP', headerName: 'Solicitante' },
        { field: 'USRREG', headerName: 'Codigo-EMP' },
        { field: 'CORREO', headerName: 'Correo' },
        { 
            field: 'STSSOL', 
            headerName: 'Status', 
            renderCell: (params) => statusMap[params.value] || params.value 
        },
        { 
            field: 'FECREG', 
            headerName: 'Fecha de registro', 
            renderCell: (params) => formatDate(params.value) 
        },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        const date = new Date(dateString); 
        return format(date, 'dd/MM/yyyy'); 
    }

    const onFilterSubmit = async (formData) => {
        try {
            const status = formData.estatus || 'PENDING';
            const solicitante = formData.solicitante?.trim() || '';
            const empresa = formData.empresa?.trim() || '';
            const fecha = formData.fecha || ''; // Aquí usas el formato YYYY/MM/DD

            const response = await axios.post('http://localhost:3030/api/requests/get_requests', {
                status,
                solicitante,
                fecha, // Enviar la fecha en el formato original
                empresa,
            });

            if (response.status === 200) {
                setData(response.data);
                setFilteredData(response.data);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            const message = error.response?.data?.message || error.message || 'Ocurrió un error inesperado.';
            setErrorMessage(`Ocurrió un error al obtener las solicitudes: ${message}`);
            setErrorDialogOpen(true);
        }
    };

    const handleRowSelect = (row) => {
        setRowSelected(row);
        setOpenDialog(true);
    };

    useEffect(() => {
        const getOrders = async () => {
            try {
                const resOrders = await axios.post('http://localhost:3030/api/requests/get_orders', {
                    request_id: rowSelected.request_id
                });

                if (resOrders.status === 200) {
                    setOrderSelected(resOrders.data);
                }
            } catch (error) {
                console.error('Error al hacer la solicitud:', error);
                const message = error.response?.data?.message || error.message || 'Ocurrió un error inesperado.';
                setErrorMessage(`Ocurrió un error al obtener los pedidos: ${message}`);
                setErrorDialogOpen(true);
            }
        };

        if (rowSelected) {
            getOrders();
        }
    }, [rowSelected]);

    return (
        <>
            <h3>Bandeja de solicitudes</h3>

            <form onSubmit={handleSubmit(onFilterSubmit)} style={{ marginBottom: '2rem' }}>
                <Grid container spacing={2} alignItems="center" justifyContent='center'>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Solicitante"
                            variant="outlined"
                            fullWidth
                            {...register('solicitante')}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Estatus</InputLabel>
                            <Select
                                {...register('estatus')}
                                defaultValue=""
                            >
                                <MenuItem value=""><em>Todos</em></MenuItem>
                                <MenuItem value="PENDING">Pendiente</MenuItem>
                                <MenuItem value="DELIVERED">Entregado</MenuItem>
                                <MenuItem value="REJECTED">Rechazado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Fecha"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register('fecha')}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Empresa</InputLabel>
                            <Select 
                                {...register('empresa')}
                                defaultValue="">
                                <MenuItem value=""><em>Seleccione</em></MenuItem>
                                <MenuItem value="Seguros Constitu">Seguros Constitución</MenuItem>
                                <MenuItem value="ASISTANET">Asistanet</MenuItem>
                                <MenuItem value="EMERGENCIAS_24">Emergencias 24</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            style={{ 
                                marginTop: '16px', 
                                background: "#506C9A",
                                "&:hover": {
                                    background: "#425a85",
                                    transform: "scale(1.05)",
                                },
                            }} 
                        >
                            Filtrar
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <ReusableTable
                columns={columns}
                tableData={filteredData}
                onRowSelect={handleRowSelect}
            />

            {orderSelected != null && 
                <DialogForm
                    rowSelected={rowSelected}
                    orderSelected={orderSelected}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    onSubmit={() => setOpenDialog(false)}
                />
            }

            <DialogError
                open={errorDialogOpen}
                onClose={() => setErrorDialogOpen(false)}
                message={errorMessage}
            />
        </>
    );
};

export default Inbox;