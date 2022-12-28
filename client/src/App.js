
import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import Protected from './components/protected/protected';
import Bookmark from './components/bookmark/bookmark';
import Addbook  from './components/addbook/addbook';
// import { useState } from 'react';
import ContextProvider from './components/context/context';
import Favorite from './components/cart/cart';


function App() {
  // const token=localStorage.getItem("Authorization")
  // const [cart,setCart]=useState([])
  // const navigate=useNavigate()
  
  return (
    <>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          {/* <Route path="/bookmark" element={(token)?<Bookmark/> : <Navigate to="/"/>}></Route> */}
          {/* <Route path="/bookmark" element={<Bookmark cart={cart} setCart={setCart}/>}></Route> */}
          <Route element={<Protected/>}>
            <Route path="/bookmark" element={<Bookmark/>}></Route>
            <Route path="/addbook" element={<Addbook/>}></Route>
            <Route path="/favorite" element={<Favorite/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
