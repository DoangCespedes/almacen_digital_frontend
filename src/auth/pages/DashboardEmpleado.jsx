import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Card, CardContent, Typography, Box, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { format } from 'date-fns';
import SyncIcon from "@mui/icons-material/Sync";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { UserContext } from "../../context/user.context";
import axios from "axios";
import ReusableTable from "../../services/components/tables/simpleTable/SimpleTable";
import logo from "../../assets/mundo.jpg"

const DashboardEmpleado = () => {
    const [statusCounts, setStatusCounts] = useState({});
    const [requests, setRequests] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const { employeeId } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getRequestByEmployee = async () => {
            try {
                const response = await axios.post("http://localhost:3030/api/requests/get_requests_by_employee", {
                    employee_id: employeeId.employee_id,
                });

                if (response.status === 200) {
                    filterByStatus(response.data);
                    setRequests(response.data); // Guardamos todas las solicitudes
                }
            } catch (error) {
                console.error("Error al hacer la solicitud:", error);
            }
        };

        getRequestByEmployee();
    }, [employeeId]);

    const filterByStatus = (requests) => {
        const counts = requests.reduce((acc, request) => {
            acc[request.STSSOL] = (acc[request.STSSOL] || 0) + 1;
            return acc;
        }, {});
        setStatusCounts(counts);
    };

    const handleCardClick = (status) => {
        setSelectedStatus(status);
    };

    const filteredRequests = selectedStatus ? requests.filter(request => request.STSSOL === selectedStatus) : [];

    // Mapeamos los estados para mostrar en español
    const statusMap = {
        PENDING: 'Pendiente',
        DELIVERED: 'Entregado',
        REJECTED: 'Rechazado',
    };

    const columns = [
        { field: 'request_id', headerName: 'ID Solicitud' },
        { field: 'NOMEMP', headerName: 'Nombre Empleado' },
        { field: 'NOMDPTO', headerName: 'Departamento' },
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

    const cardData = [
        { status: "DELIVERED", label: "Entregadas", icon: <ShoppingCartIcon fontSize="large" />, gradient: "linear-gradient(135deg, #AEC6CF, #B2C2C8)" },
        { status: "PROCESSED", label: "Aprobadas", icon: <RocketLaunchIcon fontSize="large" />, gradient: "linear-gradient(135deg, #B0E0E6, #A3C6C4)" },
        { status: "PENDING", label: "Pendientes", icon: <SyncIcon fontSize="large" />, gradient: "linear-gradient(135deg, #F0E68C, #D3D3D3)" },
        { status: "REJECTED", label: "Rechazadas", icon: <CreditCardIcon fontSize="large" />, gradient: "linear-gradient(135deg, #FFB6C1, #D3D3D3)" },
    ];

    // console.log(selectedStatus, 'AQUI FUE')

    return (
        <>
            <Grid container sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Grid item xs={12} sm={8} sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                    <Card sx={{
                        background: "#f5f5f5",
                        color: "black",
                        borderRadius: 3,
                        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                        padding: 3,
                        // display: "flex",
                        // alignItems: "center",
                        gap: 2,
                        width: "30%",
                    }}>
                        {/* <Box sx={{
                            width: 60,
                            height: 60,
                            background: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            {/* <Typography variant="h4"><PersonIcon /></Typography> 
                            
                        </Box> */}
                        <img 
                          style={{display:'block', width:'80%'}}
                          src={logo}
                        />

                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Empleado: {employeeId.NOMEMP}</Typography>
                            <Typography variant="h6">C.I: {employeeId.CEDEMP}</Typography>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/"
                        sx={{
                            background: "#506C9A",
                            color: "white",
                            borderRadius: 3,
                            padding: "10px 16px",
                            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            "&:hover": {
                                background: "#425a85",
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <ExitToAppIcon sx={{ fontSize: 24 }} />
                        Salir
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Grid container spacing={2} sx={{ width: "80%" }}>
                    {cardData.map(({ status, label, icon }) => (
                        <Grid item xs={12} sm={3} key={status}>
                            <Card
                                sx={{
                                    background: "#f0f0f0",
                                    color: "black",
                                    borderRadius: 2,
                                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                                }}
                                onClick={() => handleCardClick(status)} // Agregado para manejar el clic
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {icon} {label}
                                    </Typography>
                                    <Typography variant="h4" component="div">
                                        {statusCounts[status] || 0}
                                    </Typography>
                                    <Typography variant="body2">Solicitudes {label}: {statusCounts[status] || 0}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Tabla mostrando las solicitudes filtradas dentro de un Container para centrado */}
            {selectedStatus && (
                <Container sx={{ mt: 3 }}>
                    <ReusableTable
                        title={`Solicitudes 
                          
                          `}
                        columns={columns}
                        tableData={filteredRequests}
                    />
                </Container>
            )}

            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/empleado/solicitudes")}
                    sx={{
                        background: "#506C9A",
                        color: "white",
                        borderRadius: 3,
                        padding: "12px 24px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginBottom: '4rem',
                        textTransform: "none",
                        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            background: "#425a85",
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    Crear nueva Solicitud
                </Button>
            </Box>
        </>
    );
};

export default DashboardEmpleado;