import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const passworderror = () => toast.error("Passwords are not matching",{position:"bottom-center"});
    const phonenumbererror = () => toast.error("Invalid Phonenumber",{position:"bottom-center"});
    const success = () => toast.success("Account created successfully",{position: "bottom-center"});
    const emailexisterror = (e) => toast.error(e,{position: "bottom-center"});
    const [credentials,setcredentials]=useState({
        fname:"",
        lname:"",
        phonenumber:"",
        email:"",
        password:"",
        cpassword:"",
    });
    const handleChange=(e)=>
    {
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(credentials.cpassword!=credentials.password) passworderror();
        else if(credentials.phonenumber.length!=10) phonenumbererror();
        else{
            const {fname,lname,email,phonenumber,password}=credentials
                const response=await fetch("http://localhost:5001/user/register",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({ fname,lname,phonenumber,email,password})
                })
                const data=await response.json();
                console.log(data)
                if(data.success)
                {
                    success();
                    setTimeout(()=>{
                        window.location.href="/user/login";
                    },1500);
                    
                }else{
                   emailexisterror(data.message);
                }
        }
    }

  return (
    <div className='formpage registerpage'>
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

        <div className='formcontainer register'>
            <Link to="/" className='back'>Back</Link>
        <h1 className='heading'>Create a Account</h1>
        <form onSubmit={handleSubmit} >
            
            <label htmlFor="fname">First Name:</label>
            <input 
                type="text" 
                placeholder='Jhon' 
                value={credentials.fname} 
                onChange={handleChange} 
                name="fname"
                minLength={3}
                required/>
            <br/>
            <label htmlFor="lname">Last Name:</label>
            <input 
                type="text" 
                placeholder='Doe' 
                value={credentials.lname} 
                onChange={handleChange} 
                name="lname"
                minLength={3}
                required/>
            <br/>
            <label htmlFor="phonenumber">Phone Number:</label>
            <input 
                type="number" 
                placeholder='Phone Number' 
                value={credentials.phonenumber} 
                onChange={handleChange} 
                minLength={10}
                name="phonenumber"
                required/>
            <br/>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                placeholder='Email ID' 
                value={credentials.email} 
                onChange={handleChange} 
                name="email"
                required/>
            <br/>
          
            
            <br/>
           
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                placeholder='Password' 
                value={credentials.password} 
                onChange={handleChange} 
                name="password"
                minLength={5}
                required/>
            <br/>
            <label htmlFor="cpassword">Confirm Password:</label>
            <input 
                type="password" 
                placeholder='Confirm Password' 
                value={credentials.cpassword} 
                onChange={handleChange} 
                name="cpassword"
                minLength={5}
                required/>
            <br/>
            <p>Already have a Account? <Link to="/user/login" style={{color:"ButtonFace"}}>Sign In</Link></p>
            <button
                type="submit" 
                className='btn-secondary'
                >
                    Register
            </button>
        </form>
    </div>
    </div>
  )
}

export default Register;