import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
    const success = () => toast.success("Message Sent Successfully",{position: "top-right"});
    const nameerror= () => toast.error("Enter a name with atleast 5 characters",{position: "top-right",});
    const messageerror= () => toast.error("Too short message",{position: "top-right",});
    const phoneerror= () => toast.error("Invalid phone number",{position: "top-right",});
    const emailerror= () => toast.error("Invalid Email",{position: "top-right",});
    const [messagedetails, setmessagedetails] = useState({
        name:"",email:"",phonenumber:"",message:""
    })
    const handleChange=(e)=>{
        setmessagedetails({...messagedetails,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(messagedetails.message.length<10)
        {  
            messageerror();
        }
        else if(messagedetails.name.length<5)
        {
            nameerror();
        }
        else if(messagedetails.phonenumber.length!=10)
        {
            phoneerror();
        }
        else if(messagedetails.email.length<5)
        {
            emailerror();
        }
        else{
            const {name,email,phonenumber,message}=messagedetails;
        const response= await fetch("http://localhost:5003/admin/contact",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(messagedetails)
        })
        const json=await response.json();
        if(json.success)
            success();
        else
            alert("Failed");
        setmessagedetails({name:"",email:"",phonenumber:"",message:""})
    }
    }
  return (
    <div className='map'>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            

      
        <div className='top'>
            <h2 className='heading1'>Contact Us</h2>
            <h1 className='para1'>Let's start a conversation</h1>
        </div>
        
    
        <div className='bottom'>
            <div className='left'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355563606!2d-118.6919209536906!3d34.02073049661072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1652938519312!5m2!1sen!2sin"allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='right'>
                <form>
                    <input 
                        name="name"
                        type='text' 
                        placeholder="Jhon Doe"  
                        minLength={10}
                        onChange={handleChange}
                        value={messagedetails.name}
                        required></input>
                    <input 
                        name="email"
                        type="email"
                        placeholder="JhonDoe@gmail.com" 
                        minLength={10}
                        onChange={handleChange}
                        value={messagedetails.email}
                        required/>

                    <input 
                        name="phonenumber"
                        type="number"
                        placeholder="9123456789" 
                        minLength={10}
                        onChange={handleChange}
                        value={messagedetails.phonenumber}
                        required/>
                    <textarea
                        placeholder='Message' 
                        rows="5"
                        minLength={20}
                        onChange={handleChange}
                        name="message"
                        value={messagedetails.message}
                        />
                    <button className='btn-secondary' onClick={handleSubmit}>Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact