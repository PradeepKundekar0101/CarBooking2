import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import * as jose from 'jose';
import Nav from '../Home/Nav';
const Allmails = () => {
    const [allmessages, setallmessage] = useState([]);
    
    useEffect(() => {
        const token=window.localStorage.getItem('token');
        if(token)
        {
            const userid=jose.decodeJwt(token).id;
            fetchuser(userid); 
            fetchAllMessages();     
           
        }
        else{
            window.location.href="/user/login";
        }
    }, []);
    
    const fetchAllMessages=async()=>{
          const response= await fetch("http://localhost:5003/admin/contact",{
            method:'GET',
            headers:
            {
                'Content-Type': 'application/json',
            }
          });
         
          const json=await response.json();
          setallmessage(json.data);     
    }
    const fetchuser=async(id)=>{
        const userresponse= await fetch(`http://localhost:5003/user/${id}`,{
            method:"GET",
            headers:
            {
              'Content-Type': 'application/json',
            }
        })
        const userdata= await userresponse.json();
        if(userdata.data.email!="admin@admin.com")
        {
            window.location.href="/notfound";
        }
    }
  return (
    <div className='admin allcustomer'>
   
        <div className='hero'>
        <Nav/>

        <h1> Admin Panel- All Mails</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Admin</Link></span>
        </div>
      <div className='main'>
            <div className='leftBar'>
                <ul>
                    <li>
        
                        <Link  to="/admin/allcars" style={{position:"relative"}} >
                            <i className="fa-solid fa-car"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allcustomers" className='active'>
                            <i class="fa-solid fa-user"></i>
                        </Link>
                    </li>
                    <li >
                        <Link to="/admin/allorders">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li  className='active'>
                        <Link to="/admin/allmails">
                            <i class="fa-solid fa-envelope"></i>
                          
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='tablecontainer'>
                <div className='top'>
                    <h3>List of all Mails</h3>
                    
                </div>
                <div className='table'>
                    <table>
                        <tr style={{position:"sticky",top:"0%"}}>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Message</th>
                           
                        </tr>
                        {
                            allmessages.map((e,i)=>{
                                return <tr className='row' style={i%2==0?{backgroundColor:"#c0dbff"}:{backgroundColor:"#fff"}}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.phonenumber}</td>
                                    <td>{e.email}</td>
                                    <td style={{maxWidth:"30rem",overflowX:"auto"}}>{e.message}</td>
                                </tr>
                            })
                        }
                    </table>
                </div>
            </div>
      </div>
        </div>
  )
}

export default Allmails



