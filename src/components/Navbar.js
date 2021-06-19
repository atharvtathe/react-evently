import React, {useState, useContext} from 'react'
import {
  Link
} from "react-router-dom";
import AuthContext from './auth-context'
import {BiMenu} from 'react-icons/bi';
import {GiCancel} from 'react-icons/gi';



const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [open, setOpen] = useState(false);
  const openhandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  let newname;  
  newname = open ? "" : "hidden";



    return (
      <div>
        <nav className="flex justify-between items-center bg-purple-600 text-white p-4">
          <ul className="flex text-2xl font-bold">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>Evently</Link>
            </li>
          </ul>
          
          <ul className="hidden items-center text-base space-x-4 sm:block sm:flex">
            
            <li className= "bg-purple-800 px-1 rounded">
              <Link to="/listevent">List Event</Link>
            </li>
            {isLoggedIn && <li>
              <Link to="/myevents">My Events</Link>
            </li>}
            {!isLoggedIn && <li>
              <Link to="/login">Login</Link>
            </li>}
            {!isLoggedIn && <li>
              <Link to="/signup">SignUp</Link>
            </li>}
          </ul>

          <ul className="flex text-lg items-center sm:hidden">
            <li className="cursor-pointer" onClick = {openhandler}>
              {open || <BiMenu/>}
              {open && <GiCancel/>}
            </li>
          </ul>
        </nav>

        <ul className={`flex ${newname} flex-col text-base bg-purple-500 text-white px-4 pt-2 pb-2 sm:hidden`}>
            <li>
              <Link to="/listevent" onClick={() => setOpen(false)} className= "bg-purple-800 px-1 rounded">List Event</Link>
            </li>
            {isLoggedIn && <li>
              <Link to="/myevents" onClick={() => setOpen(false)}>My Events</Link>
            </li>}
            {!isLoggedIn && <li>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            </li>}
            {!isLoggedIn && <li>
              <Link to="/signup" onClick={() => setOpen(false)}>SignUp</Link>
            </li>} 
          </ul>
        </div>
    )
}

export default Navbar
