import { React, useEffect, useState} from "react";
import AddNote from "./components/AddNote";
import EditNote from './components/EditNote'
import Notes from "./components/Notes";
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import PrivateRoute from './PrivateRoute'
import Cookies from 'js-cookie';




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const navigate = useNavigate();

 useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(token);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      setIsAuthenticated(null);
      navigate('/');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (

        <div className="w-full">
          <header className="border-y-2 h-[70px] w-full mb-[7px] px-12 ">
            <nav className="flex flex-row justify-between items-center py-4 text-black">
              <span className="text-3xl">
                <span className="text-yellow-400 font-bold">Note</span>
              </span>
              <ul className="text-2xl space-x-8">
                <Link to="/">Home</Link>

                  {isAuthenticated && (
                    <>
                     <Link to="/notes/add_note">Add</Link>
                     <Link onClick={() => handleLogout()}>Logout</Link>
                     </>
                  )}

                 {!isAuthenticated && (
                  <>
                    <Link to="login">Login</Link>
                    <Link to="register">Register</Link>
                    </>
                  )}
              

                {isAuthenticated && (
                <Link to="profile">Profile</Link>
                )}
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/notes/add_note" element={<AddNote />}>
               <Route path="/notes/add_note" element={<PrivateRoute />} />
            </Route>
          <Route path="/notes/edit_note/:id" element={<EditNote />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<Notes />}></Route>
          </Routes>
        </div>
      );
    }
    
    

export default App;