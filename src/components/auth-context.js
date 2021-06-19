import React, {useState} from 'react'

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login : (token) => {},
    logout: () => {}

});

export const AuthContextProvider = (props) => {
    const [token, SetToken] = useState(null)
    const userIsLoggedIn = !!token;
    const loginhandler = (token) => {
        SetToken(token);
    }
    const logouthandler = () => {
        SetToken(null);
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginhandler,
        logout : logouthandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

export default AuthContext;