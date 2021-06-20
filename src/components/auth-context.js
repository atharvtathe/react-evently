import React, {useState} from 'react'

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    userid : '',
    login : (token, userid) => {},
    logout: () => {}

});

export const AuthContextProvider = (props) => {
    const [userid, Setuserid] = useState(null);

    const initialstorage = localStorage.getItem('token');


    const [token, SetToken] = useState(initialstorage);

    const userIsLoggedIn = !!token;
    const loginhandler = (token, userid) => {
        SetToken(token);
        Setuserid(userid);
        localStorage.setItem('token', token);
    }
    const logouthandler = () => {
        SetToken(null);
        Setuserid(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginhandler,
        logout : logouthandler,
        userid : userid
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

export default AuthContext;