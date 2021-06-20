import React from 'react'
import { useState, useContext } from 'react'
import validator from 'validator';
import Warning from './Warning';
import AuthContext from './auth-context'
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');

  const [errorofemail, Seterrorofemail] = useState(false);
  const [errorofpassword, Seterrorofpassword] = useState(false);


  const [aftersubmiterr, Setaftersubmiterr] = useState(false);
  
  const [message, Setmessage] = useState('');
  const authCtx = useContext(AuthContext);

  const emailhandler = event => {
    Setemail(event.target.value);
  };

  const passwordhandler = event => {
    Setpassword(event.target.value);
  };

  const focushandleremail = () => {
    Seterrorofemail(false);
  }
  const focushandlerpassword = () => {
    Seterrorofpassword(false);
  }


  const formsubmithandler = event => {
    event.preventDefault();

    if(!validator.isEmail(email.trim())){
      Seterrorofemail(true); 
    }
    if(password.trim().length < 8){
      Seterrorofpassword(true); 
    }
    if(!validator.isEmail(email.trim()) || (password.trim().length < 8)){
      return;
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password : password })
    };
    fetch(`${process.env.REACT_APP_backend_url}/api/users/login`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.message){
            Setmessage(data.message);
            // console.log(data);
            // console.log(message);
            Setaftersubmiterr(true);
          }else{
            // console.log(data);
            authCtx.login(data.token, data.userId);
            history.replace('/');
          }
        });

  
  }






    return <form action="/" method="post" className="pt-7 max-w-2xl mx-auto px-5">
      {aftersubmiterr && <Warning message={message} delay={5000}/>}
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="email">Email</label>
    <input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-purple-800 rounded " type="email" name="email" id="email" onChange={emailhandler} onFocus={focushandleremail} value={email || ""}/>
    {errorofemail && <p className="text-red-500 text-xs">Enter valid email</p>}
  </div>
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-medium text-lg text-grey-darkest" htmlFor="password">Password</label>
    <input className="border py-2 px-3 text-grey-darkest focus:outline-none focus:ring-2 focus:ring-purple-800 rounded" type="password" name="password" id="password" onChange={passwordhandler} onFocus={focushandlerpassword} value={password || ""}/>
    {errorofpassword && <p className="text-red-500 text-xs">enter atleast 8 characters!</p>}
  </div>
  
  <button className="block bg-purple-600 hover:bg-purple-800  text-white  text-lg mx-auto px-3 py-2 rounded" type="submit" onClick={formsubmithandler}>Login</button>
</form>
}

export default Login
