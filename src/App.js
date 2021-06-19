import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useContext } from "react";
import Navbar from './components/Navbar'
import Home from './components/Home'
import Eventdetail from "./components/Eventdetail";
import Signup from './components/Signup'
import Login from './components/Login'
import Listevent from "./components/Listevent";
import NotLoggedInevent from './components/NotLoggedInevent';
import AuthContext from './components/auth-context'

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/listevent">
            {isLoggedIn && <Listevent />}
            {!isLoggedIn && <NotLoggedInevent />}         
          </Route>
          <Route exact path="/myevents">
            <h1>myevents</h1>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/:eventID">
            <Eventdetail />
          </Route>
          <Route exact path="/edit/:eventID">
            <h1>eventId edit</h1>
          </Route>
           <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
