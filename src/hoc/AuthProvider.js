import React, {createContext, useState} from 'react';
import ky from "ky";
import {Link} from "react-router-dom";
import sha256 from 'js-sha256';

export const AuthContext = createContext({ })

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ })
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginUser = async (email, password) => {
        password = sha256(password)
        const result = await ky.get('http://192.168.0.107:7119/api/users?email=' + email + 'password=' + password, {
                headers: {
                    'x-apikey': '59a7ad19f5a9fa0808f11931',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
        ).json();

        console.log(result)

        if (result && result.password === password) {
            setUser(result);
            setIsLoggedIn(true);
            alert("Удачная авторизация")
        } else {
            setIsLoggedIn(false);
            console.log('Invalid login credentials');
            alert("Неверные данные")
        }
    }

    const logoutUser = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={ {user, isLoggedIn, loginUser, logoutUser} }>
            {children}
        </AuthContext.Provider>
    );
};
