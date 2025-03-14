import { createContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);

    

    const login = async (userId, password) => {
        try {
            const response = await axios.post('http://localhost:3030/api/auth/login', {
                user_name: userId,
                password: password
            },);

            if (response.status === 200) {
                // Aquí deberías manejar lo que devuleve el login,
                // como establecer el usuario en el estado
                setUser(response.data.usuario); // Por ejemplo, si tu respuesta tiene el objeto de usuario
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
            },);

            if (response.status === 200) {
                // Aquí deberías manejar lo que devuleve el login,
                // como establecer el usuario en el estado
                setEmployeeId(response.data); // Por ejemplo, si tu respuesta tiene el objeto de usuario
                console.log(employeeId, 'AHOARA SI, VAMONOS CANOA ')
                console.log(response.data, 'test')
                setUser(response.data); // ligera trampa para que me deje acceder a la ruta 
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            throw new Error('Error al iniciar sesión. Por favor, revisa tus credenciales.');
        }
    };

    

    

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
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