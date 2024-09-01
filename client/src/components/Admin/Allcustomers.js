import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Home/Nav';
import * as jose from 'jose';
const Allcustomers = () => {
    const [allusers, setallusers] = useState([]);
   
    useEffect(() => {
        const token=window.localStorage.getItem('token');
        if(token)
        {
            const userid=jose.decodeJwt(token).id;
            fetchuser(userid); 
            fetchAllCustomers();     
        }
        else{
            window.location.href="/user/login";
        }
    }, [])
    
    const fetchAllCustomers=async()=>{
          const response= await fetch("http://localhost:5003/user/allusers",{
            method:'GET',
            headers:
            {
                'Content-Type': 'application/json',
            }
          });
          const json=await response.json();
        
          setallusers(json.data);
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

        <h1> Admin Panel- All Customers</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Admin</Link></span>
        </div>
      <div className='main'>
            <div className='leftBar'>
                <ul>
                    <li>
                        <Link  to="/admin/allcars" >
                            <i className="fa-solid fa-car"></i>
                        </Link>
                    </li>
                    <li  className='active'>
                        <Link to="/admin/allcustomers">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                    <li >
                        <Link to="/admin/allorders">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allmails">
                            <i className="fa-solid fa-envelope"></i>
                            
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='tablecontainer'>
                <div className='top'>
                    <h3>List of all Customers</h3>
                </div>
                <div className='table'>
                    <table>
                        <tr style={{position:"sticky",top:"0%"}}>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                          
                        </tr>
                        {
                            allusers.map((e,i)=>{
                               if(e.email!="admin@admin.com") return <tr className='row' key={i} style={i%2==0?{backgroundColor:"#c0dbff"}:{backgroundColor:"#fff"}}>
                                    <td>{i+1}</td>
                                    <td>{e.fname} {e.lname}</td>
                                    <td>{e.phonenumber}</td>
                                    <td>{e.email}</td>
                                    {/* <td>{e.orders.length}</td> */}
                                    
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

export default Allcustomers;



