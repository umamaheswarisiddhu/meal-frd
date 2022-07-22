import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import ErrorPage from './Pages/404/404';
import Login from './Pages/login/login';
import Signup from './Pages/Signup/Signup';
import {useContext, useEffect}from 'react';
import { MyContext } from './context';
import axios from './Axios';
import Favorites from './Pages/Favorites/Favorites';


function App() {
 
const {user , setUser}= useContext(MyContext);
 useEffect(()=>{
 
  axios.post("/auto-login")
  .then(({data})=>setUser(data));

 },[]);

  return (
<Router>
    
    <Navbar />
    <Switch>
      <Route exact path="/">
      <Home />
        </Route>

     {!user&&(
        <>

        <Route exact path="/login">
      <Login />
        </Route>
        <Route exact path="/signup">
      <Signup />
        </Route>
        </>
     )}
     {user && (
       <Route exact path="/my-favorites">
         <Favorites />
       </Route>
     )}
        <Route>
          <ErrorPage />
        </Route> 
    
    </Switch>
    
    </Router>
  );
}

export default App;
