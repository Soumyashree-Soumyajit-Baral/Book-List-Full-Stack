import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import Protected from './components/protected/protected';
import Bookmark from './components/bookmark/bookmark';
import Addbook from './components/addbook/addbook';
import Favorite from './components/cart/cart';
import Editbook from './components/edit/edit';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route element={<Protected />}>
            <Route path="/bookmark" element={<Bookmark />}></Route>
            <Route path="/addbook" element={<Addbook />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/editbook" element={<Editbook />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
