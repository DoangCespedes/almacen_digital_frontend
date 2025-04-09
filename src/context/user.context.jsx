import { createContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [userDetails, setUserDetails] = useState({}); // Nuevo estado para almacenar detalles del usuario

    const login = async (userId, password) => {
        try {
            const response = await axios.post('http://localhost:3030/api/auth/login', {
                user_name: userId,
                password: password
            });

            if (response.status === 200) {
                setUser(response.data.usuario); // Establece el usuario en el estado
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            throw new Error('Error al iniciar sesión. Por favor, revisa tus credenciales.');
        }
    };

    const employees = async (userId) => {
        try {
            const response = await axios.post('http://localhost:3030/api/auth/employee', {
                CEDEMP: userId
            });

            if (response.status === 200) {
                setEmployeeId(response.data); // Establece el employeeId
                const buildingId = response.data.building_id;
                const companyId = response.data.company_id;
                const departmentId = response.data.department_id;

                // Realizando los llamados a las APIs
                const resBuilding = await axios.post('http://localhost:3030/api/utils/get_building', { building_id: buildingId });
                const resCompany = await axios.post('http://localhost:3030/api/utils/get_company', { company_id: companyId });
                const resDepartament = await axios.post('http://localhost:3030/api/utils/get_departament', { department_id: departmentId });

                // Almacena los datos en el estado userDetails
                const details = {
                    towerName: resBuilding.data.NOMTORRE,
                    companyName: resCompany.data.NOMCOMP,
                    departmentName: resDepartament.data.NOMDPTO,
                    email: response.data.CORREO,
                    employeeName: response.data.NOMEMP,
                };

                setUserDetails(details); // Actualiza el estado userDetails

                console.log(details, " User Details "); // Puedes conservar esto para verificar que los datos están correctamente almacenados

                setUser(response.data); // Mantiene el usuario básico
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            throw new Error('Error al obtener los datos del empleado.');
        }
    };

    

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
            userDetails, // Añadir el userDetails al contexto
            setUserDetails,
            login,
            employees,
            setEmployeeId,
            employeeId
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProviderWrapper };