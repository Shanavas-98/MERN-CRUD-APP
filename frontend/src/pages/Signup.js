import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const Signup=()=>{
    const [fullname,setFullname]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [password,setPassword]=useState('');
    const {signup,error,isLoading}=useSignup();

    const handleSignup = async(e)=>{
        e.preventDefault()
        const userData = {fullname,mobile,email,password}
        await signup(userData)
    }

    return(
        <form className="signup-form" onSubmit={handleSignup}>
            <h3>Signup</h3>
            <label htmlFor="">Fullname</label>
            <input 
            type="text" 
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
            />
            <label htmlFor="">Mobile</label>
            <input 
            type="tel" 
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input 
            type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input 
            type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default Signup