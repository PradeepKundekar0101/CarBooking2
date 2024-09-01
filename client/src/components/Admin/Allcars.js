import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Home/Nav';
import * as jose from 'jose';
const Allcars = () => {
    const [allcars, setallcars] = useState([]);

    useEffect(() => {
        fetchAllCars();     
    }, [allcars]);
    useEffect(() => {
        const token=window.localStorage.getItem('token');
        if(token)
        {
            const userid=jose.decodeJwt(token).id;
            fetchuser(userid); 
        }
        else{
            window.location.href="/user/login";
        }
    }, [window]);
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
    const fetchAllCars=async()=>{
      
          const response= await fetch("http://localhost:5003/admin/getallcars",{
            method:'GET',
            headers:
            {
                'Content-Type': 'application/json',
            }
          });
          const json=await response.json();
          setallcars(json);
    }
    const unbook=async(id)=>{
        const res=await fetch(`http://localhost:5003/admin/updatecar/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({booked:false})
        });
    }
  return (
    <div className='admin allcars'>
   
        <div className='hero'>
        <Nav/>

        <h1> Admin Panel- All Cars</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Admin</Link></span>
        </div>
      <div className='main'>
            <div className='leftBar'>
                <ul>
                    <li className='active'><Link  to="/admin/allcars" ><i class="fa-solid fa-car"></i></Link></li>
                    <li><Link to="/admin/allcustomers"><i class="fa-solid fa-user"></i></Link></li>
                    <li><Link to="/admin/allorders"><i class="fa-solid fa-cart-shopping"></i></Link></li>
                    <li>
                        <Link to="/admin/allmails">
                            <i class="fa-solid fa-envelope"></i></Link>
                    </li>
                </ul>
            </div>
            <div className='tablecontainer'>
                <div className='top'>
                    <h3>List of all cars</h3>
                    <button className='btn-secondary' onClick={()=>{window.location.href="/admin/addcar"}}> Add new Car</button>
                </div>
                <div className='table'>
                    <table>
                        <tr style={{position:"sticky",top:"0%"}}>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Available</th>
                        </tr>
                        {
                            allcars.map((e,i)=>{
                                return <tr className='row' style={i%2==0?{backgroundColor:"#c0dbff"}:{backgroundColor:"#fff"}}>
                                    <td>{i+1}</td>
                                 
                                    <td>{e.maker} {e.model}</td>
                                    <td>{e.cartype}</td>
                                    <td>{e.price}</td>
                                    <td>
                                        <button 
                                            style={{backgroundColor:"#4b7bec"}}
                                            onClick={()=>{ window.location.href=`/admin/updatecar/${e._id}`}}
                                            >
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                        <button
                                            style={{backgroundColor:"#fc5c65",marginLeft:"10px"}}
                                            onClick={()=>{window.location.href=`/admin/deletecar/${e._id}`}}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                        disabled={!e.booked}
                                        onClick={ ()=>{unbook(e._id)}}
                                        style={e.booked?{background:"#20bf6b"}:{background:"#fff5",color:"#000"}}
                                        >
                                            {e.booked?"Booked":"Available"}</button>
                                    </td>
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

export default Allcars



