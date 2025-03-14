import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReusableTable from '../tables/simpleTable/SimpleTable';

const Inbox = () => {
    const [data, setData] = useState([]);

    const columns = [
        { field: 'request_id', headerName: 'Request ID' },
        { field: 'employee_id', headerName: 'Employee ID' },
        { field: 'building_id', headerName: 'Building ID' },
        { field: 'company_id', headerName: 'Company ID' },
        { field: 'department_id', headerName: 'Department ID' },
        { field: 'STSSOL', headerName: 'Status' },
        { field: 'USRREG', headerName: 'Registered User' },
        { field: 'FECREG', headerName: 'Registration Date' },
        { field: 'USRMOD', headerName: 'Modified User' },
        { field: 'FECMOD', headerName: 'Modification Date' },
      ];


    useEffect(() => {
        const getArticles = async () => {
            try {
                // Aquí puedes definir el estado que deseas filtrar. Por ejemplo, 'PENDING'
                const sttsSol = 'PENDING'; 

                // Realiza la solicitud POST enviando el status en el cuerpo
                const response = await axios.post('http://localhost:3030/api/requests/get_requests', {
                    status: sttsSol
                });

                if (response.status === 200) {
                    // Aquí podrías manejar los datos obtenidos
                    // Por ejemplo, si tuvieras un estado para los artículos, podrías usar setArticles(response.data);
                    console.log(response.data); // Imprime los resultados en la consola
                    setData(response.data)
                }
            } catch (error) {
                console.error('Error al hacer la solicitud:', error);
            }
        };

        getArticles();
    }, []); // Dependencias vacías para que se ejecute solo al montar el componente

    return (
        <>
            <h3>Bandeja de solicitudes</h3>
            <ReusableTable
              title="Requests List"
              columns={columns}
              tableData={data}
              onRowSelect={(row) => console.log('Selected Row:', row)} // Maneja la selección de fila
            />
        </>
    );
}

export default Inbox;