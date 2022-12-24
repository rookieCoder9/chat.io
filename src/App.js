import "./App.css";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,Navigate,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/Authcontext";



function App() {
  
  const {currentUser}= useContext(AuthContext);
 const ProtectedRoute = ({children}) => {
  if (!currentUser) {
    return <Navigate to="/login"></Navigate>
  }
  return children
 }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
