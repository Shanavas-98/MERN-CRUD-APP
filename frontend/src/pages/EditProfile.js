import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

const EditProfile=()=>{
    const [fullname,setFullname]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [password,setPassword]=useState('');
    const [pic,setPic]=useState('')
    const {signup,error,isLoading}=useSignup();

    const postDetails=(pics)=>{
        if(!pics){
            return error("please select an image");
        }
        if(pics.type==='image/jpeg'||pics.type === 'image/png'){
            const data = new FormData();
            data.append('file',pics);
            data.append('upload preset','mern-crud-app');
            data.append('cloud_name','da9cwfdqx');
            fetch("https://api.cloudinary.com/v1_1/da9cwfdqx",{
                method:'post',
                body:data,
            }).then((res)=>{
                res.json()
            }).then((data)=>{
                setPic(data.url.toString())
            }).catch((err)=>{
                console.error(err);
            })
        }else{
            return error("please select an image")
        }
    }

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
            <label>Profile Picture</label>
            <input 
            type="file" 
            value={pic}
            onChange={(e)=>postDetails(e.target.files[0])}
            />
            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default EditProfile