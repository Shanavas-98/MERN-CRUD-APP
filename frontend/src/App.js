import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { useUserContext,useAdminContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';

function App() {
  const {user}=useUserContext()
  const {admin}=useAdminContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={user ?<Home />:<Navigate to="/login"/>} />
            <Route path="/signup" element={!user?<Signup />:<Navigate to="/"/>}/>
            <Route path="/login" element={!user?<Login/>:<Navigate to="/"/>}/>
            <Route path="/admin/login" element={!admin?<AdminLogin/>:<Navigate to="/admin"/>}/>
            {/* <Route path="/admin" element={admin?<AdminHome/>:<Navigate to="/admin/login"/>}/>
            <Route path="/admin/add-user" element={admin?<AddUser/>:<Navigate to="/admin/login"/>}/>
            <Route path="/admin/edit-user" element={admin?<EditUser/>:<Navigate to="/admin/login"/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;