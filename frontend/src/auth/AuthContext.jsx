import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { loggedinUserlink } from "../utils/links.js";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const res = await axios.get(loggedinUserlink, { withCredentials: true });
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
