import React, {useState} from 'react'

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    userid : '',
    login : (token, userid) => {},
    logout: () => {}

});

export const AuthContextProvider = (props) => {

    const initialstorage = localStorage.getItem('token');
    const initialuserid = localStorage.getItem('userid');

    const [userid, Setuserid] = useState(initialuserid);
    const [token, SetToken] = useState(initialstorage);

    const userIsLoggedIn = !!token;
    const loginhandler = (token, userid) => {
        SetToken(token);
        Setuserid(userid);
        localStorage.setItem('token', token);
        localStorage.setItem('userid', userid);
    }
    const logouthandler = () => {
        SetToken(null);
        Setuserid(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
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