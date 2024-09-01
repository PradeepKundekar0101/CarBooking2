import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Login = () => {
    const success = () => toast.success("Login Successful",{position: "bottom-center"});
    const error = () => toast.error("Invalid Credentials",{position: "bottom-center",});
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleEmail=(e)=>{
        setemail(e.target.value);
    }
    const handlePassword=(e)=>{
        setpassword(e.target.value);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5003/user/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data=await response.json();
        if(data.success)
        {
            success();
           setTimeout(()=>{

               localStorage.setItem('token',data.token);
               window.location.href="/user/profile";
           },1500);
        }else{
            
            error();
        }
    }
    
    

  return (
    
     
    <div className='formpage'>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        <Link to="/" className='back'>Back</Link>
        <div className='formcontainer'>
        <h1 className='heading'>Login</h1>
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                placeholder='Email ID' 
                value={email} 
                onChange={handleEmail} 
                required/>
            <br/>
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                placeholder='Password' 
                value={password} 
                onChange={handlePassword}/>
            <br/>
            
            <p>Need a Account?  <Link to="/user/register" style={{color:"ButtonFace"}}>Sign Up</Link></p>
            <button
                type="submit" 
                onClick={handleSubmit}
                className="btn-secondary">
                    Login
            </button>
        </form>
        </div>
        
    </div>
   
  )
}

export default Login