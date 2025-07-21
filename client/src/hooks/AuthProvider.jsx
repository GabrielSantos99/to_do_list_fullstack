import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        setIsAuthenticated(!!token);
    }, []);

    const login = async (props) => {
        const response = await api.post('/users/login', props);
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
    }

    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => { return useContext(AuthContext); };

