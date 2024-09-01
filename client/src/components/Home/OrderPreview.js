import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import * as jose from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav'
const OrderPreview = (id) => {
    const success = () => toast.success("Order Placed Successful",{position: "top-right"});
    const error = () => toast.error("Failed",{position: "top-right",});
    
    const [car,setcar]=useState({});
    const [user,setuser]=useState({});
    
    useEffect(() => {
        if(!localStorage.getItem('token'))
          window.location.href="/user/login"
        
        const token=localStorage.getItem('token');
        const userid=jose.decodeJwt(token).id;
        
        fetchCar();
        fetchUser(userid);
       
    }, []);

    //Fetch Car Details
    const fetchCar=async()=>{
        const id=window.location.pathname.split('/').slice().pop();
        const res=await fetch(`http://localhost:5003/admin/getcar/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const json=await res.json();   
        setcar(json.data[0]);
    }

    //Fetch User Details:
    const fetchUser=async(id)=>{
      const response= await fetch(`http://localhost:5003/user/${id}`,{
          method:"GET",
          headers:
          {
            'Content-Type': 'application/json',
          }
      })
      const data= await response.json();
      setuser(data.data);
  }
    const order=async(e)=>{
      e.preventDefault();
      const carname=car.maker+" "+car.model;
      const reqbody={
        useremail: user.email,
        carname: carname,
        startdate: localStorage.getItem('startdate'),
        enddate: localStorage.getItem('enddate'),
        price:localStorage.getItem('quantity')*car.price
      }
      
      //Add Order 
      const res= await fetch("http://localhost:5003/order",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(reqbody)
      });
      const json=await res.json();

      //MARk Booked= True in Car Model
      const bookCar= await fetch(`http://localhost:5003/admin/updatecar/${car._id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({booked:true})
      })
      const bookedJson= await bookCar.json();
      
      
      if(json.success && bookedJson.success)
      {
        success();
        setTimeout(() => {
          window.location.href="/listing";
        }, 1500);
      }else{
        error();
      }
    }
    
   

  return (
    <div className='carpreview'>
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
        <div className='hero'>
        <Nav/>

        <h1> Confirm Order</h1>
        <span><Link to={"/"}>Home /</Link><Link to={"/listing"}> Listing / </Link> <Link to={"/car"}> Preview /</Link><Link to={""}> Confirm</Link></span>    
        </div>
        
        <div className='billcontainer'>
        
            <div className='box'>
                <table>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                  <tr>
                    <td></td>
                    
                    <td rowSpan={4}><img src={`/uploads/cars/${car.thumbnail}`} width="100"/></td>
                    <td>{car.maker} {car.model}<br/>
                    Start Date: {window.localStorage.getItem("startdate")}<br/>
                    End Date: {window.localStorage.getItem("enddate")}<br/>
                    </td>
                    <td rowSpan={4}>${car.price}</td>
                    <td rowSpan={4}>{localStorage.getItem('quantity')} Days</td>
                    <td rowSpan={4}>${localStorage.getItem('quantity')*car.price}</td>
                  </tr>
                </table>
            </div>
            <h1>Total:${localStorage.getItem('quantity')*car.price}</h1>
            <h1>Payment Mode:</h1>
            <form onSubmit={order}>

            <label htmlFor='cash'>Cash</label>
            <input type="radio" name='cash' id='cash' required/>
            <label htmlFor='card'>Credit/Debit Card</label>
            <input type="radio" name='card' id='card' disabled/>
            <input className='btn-primary' type="submit" value="Place Order"/>
            </form>
        </div>

    </div>
  )
}

export default OrderPreview