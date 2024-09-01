import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
   
    const phonenumbererror = () => toast.error("Invalid Phonenumber",{position:"bottom-center"});
    const success = () => toast.success("Updated Successfully",{position: "bottom-center"});
    const emailexisterror = (e) => toast.error(e,{position: "bottom-center"});
    const [credentials,setcredentials]=useState({
        fname:"",
        lname:"",
        phonenumber:"",
        email:"",
    });
    useEffect(() => {
      fecthUser();
    }, [])
    
    const handleChange=(e)=>
    {
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    const fecthUser=async(id)=>{
        const _id=window.location.pathname.split('/').pop();
        const response= await fetch(`http://localhost:5003/user/${_id}`,{
            method:"GET",
            headers:
            {
              'Content-Type': 'application/json',
            }
        })
        const data= await response.json();
        setcredentials(data.data);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(credentials.phonenumber.length!=10) phonenumbererror();
        else{
            const {fname,lname,email,phonenumber,password}=credentials;
            const id=window.location.pathname.split('/').pop();
        
                const response=await fetch(`http://localhost:5003/user/update/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({fname,lname,phonenumber,email})
                })
                const data=await response.json();
                console.log(data)
                if(data.success)
                {
                    success();
                    setTimeout(()=>{
                        window.location.href="/user/profile";
                    },1500);
                    
                }else{
                   emailexisterror(data.data);
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
        <h1 className='heading'>Update Account</h1>
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
           
            <button
                type="submit" 
                className='btn-secondary'
                >
                    Update
            </button>
        </form>
    </div>
    </div>
  )
}

export default UpdateUser;