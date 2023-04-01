import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

const UserLogin = ()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {login,isLoading,error}=useLogin()

    const handleLogin=async(e)=>{
        e.preventDefault();
        await login(email,password)
    }

    return(
        <form className="login-form" onSubmit={handleLogin}>
            <h3>Login</h3>
            <label htmlFor="">Email</label>
            <input type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button>{isLoading?(<Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />): "Login"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserLogin