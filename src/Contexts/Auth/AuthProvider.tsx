import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { User } from "../../Types/User";
import { useUserApi } from "../../Hooks/UseUserApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User| null>(null);
    const api = useUserApi({
        baseURL: "http://localhost:5041",
        timeout: 5000,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('authToken')}
    }
    );

    useEffect(() => {
        const exec = async () => {
            const tokenData = localStorage.getItem('authToken');
            const userData = localStorage.getItem('authUser');
            if (tokenData && userData && user == null) {
                setUser({"login": userData});
            }
        }
        exec();
    }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.username && data.token) {
            setUser(data.username);
            setAuthInStorage(data.username, data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        console.log("signout está sendo executada.");
        setUser(null);
        setAuthInStorage('', '');
     
    }

    const setAuthInStorage = (username: string, token: string) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', username);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}