import React,{useEffect,useState}from 'react'
import Nav from '../Home/Nav';
import { Link } from 'react-router-dom';
import * as jose from 'jose';
const UserProfile = () => {
    const [user, setuser] = useState({});
    const [orders,setorders]=useState([]);
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
    }, [orders,window]);
    const fetchuser=async(id)=>{
        const userresponse= await fetch(`http://localhost:5003/user/${id}`,{
            method:"GET",
            headers:
            {
              'Content-Type': 'application/json',
            }
        })
        const userdata= await userresponse.json();
        setuser(userdata.data);
        

        const orderresponse=await fetch("http://localhost:5003/order/allorders",{
            method:"GET"
        });
        const orderdata=await orderresponse.json();

        const myorders=orderdata.data.filter((e)=>{return e.useremail==user.email});
        setorders(myorders);

    }
    const fetchorders=async()=>{
    }
    
  return (
    <div className='profile'>
        <Nav/>
        <div className='container'>
            <div className='left'>
                <img src='https://thumbs.dreamstime.com/b/avatar-icon-avatar-flat-symbol-isolated-white-avatar-icon-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-124920496.jpg'></img>
                <h1>{user.fname}<br/> {user.lname}</h1>
                <button className='btn-primary' onClick={()=>{window.localStorage.removeItem('token');window.location.reload()}}>Log Out</button>
            </div>
            <div className='right'>
                <h1>Personal Information : <button onClick={()=>{window.location.href=`/user/profile/update/${user._id}`}}><i class="fa-solid fa-pen"></i></button></h1>
                <h2>First Name :<span> {user.fname}</span> </h2>
                <h2>Last Name :<span> {user.lname}</span> </h2>
                <h2>Email :<span> {user.email}</span> </h2>
                <h2>Phone Number :<span> {user.phonenumber}</span> </h2>

                <h2>Orders:<span className='ordercontainer'>{orders.map((e)=>{
                    return  <div className='orderitem'> CarName: {e.carname} From: {e.startdate} to: {e.enddate} </div>
                })}</span> {orders.length==0?"No Orders":""}</h2>
                <Link to="/admin/allcars" style={ user.email=="admin@admin.com"? {color:"ButtonText",padding:"30px 0px"}:{display:"none"}}>Go to Panel</Link>
            </div>
        </div>
    </div>
  )
}

export default UserProfile