import Topbar from './components/Topbar/Topbar';
import Home from "./pages/home/Home";
import Single from './pages/home/single/single';
import Write from './pages/home/write/Write';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Settings from './pages/settings/Settings';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';

function App() {
  const {user} = useContext(Context);
  return (
    <>
    
    <BrowserRouter>
    <ToastContainer />
    <Topbar />
    <Routes> 
      <Route path='/' element={<Home />}></Route>
      <Route path='/write' element={user ? <Write /> :<Login />}></Route>
      <Route path='/login' element={user ? <Home /> :<Login />}></Route>
      <Route path='/register' element={user ? <Home /> :<Register />}></Route>
      <Route path='/settings' element={user ? <Settings /> :<Register />}></Route>
      <Route path='/post/:postId' element={<Single />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
