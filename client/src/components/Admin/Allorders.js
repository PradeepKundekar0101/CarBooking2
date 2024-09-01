import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import * as jose from 'jose';
import Nav from '../Home/Nav';
const Allorders = () => {
    const [allorders, setallorders] = useState([]);

    useEffect(() => {
        const token=window.localStorage.getItem('token');
        if(token)
        {
            const userid=jose.decodeJwt(token).id;
            fetchuser(userid); 
            fetchAllOrders();     
        }
        else{
            window.location.href="/user/login";
        }
    }, []);
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
    const fetchAllOrders=async()=>{
          const response= await fetch("http://localhost:5003/order/allorders",{
            method:'GET',
            headers:
            {
                'Content-Type': 'application/json',
            }
          });
          const json=await response.json();    
          setallorders(json.data);  
    }
    
  return (
    <div className='admin allcars'>
   
        <div className='hero'>
        <Nav/>

        <h1> Admin Panel- All Orders</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Admin</Link></span>
        </div>
      <div className='main'>
            <div className='leftBar'>
                <ul>
                    <li>
                        <Link  to="/admin/allcars" >
                            <i class="fa-solid fa-car"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allcustomers">
                            <i class="fa-solid fa-user"></i>
                        </Link>
                    </li>
                    <li className='active'>
                        <Link to="/admin/allorder">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allmails">
                            <i class="fa-solid fa-envelope"></i>
                            
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='tablecontainer'>
                <div className='top'>
                    <h3>List of all Orders</h3>
                </div>
                <div className='table'>
                    <table>
                        <tr style={{position:"sticky",top:"0%"}}>
                            <th>Sno</th>
                            <th>User Email</th>
                            <th>Car Name</th>
                            <th>Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                        {
                            allorders.map((e,i)=>{
                                return <tr className='row' style={i%2==0?{backgroundColor:"#c0dbff"}:{backgroundColor:"#fff"}}>
                                    <td>{i+1}</td>
                                    <td>{e.useremail}</td>
                                    <td>{e.carname}</td>
                                    <td>{e.price}</td>
                                    <td>{e.startdate}</td>
                                    <td>{e.enddate}</td>
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

export default Allorders



