import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
const CarPreview = (id) => {
    const success = () => toast.error("Sorry. We dont accept order right now",{position: "top-right"});
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [car,setcar]=useState({});
    
    const confirm=(e)=>{
        if(!localStorage.getItem('token'))
          window.location.href="/user/login";
        e.preventDefault();
        alert("Sorry. We dont accept order now");
        setTimeout(() => {
            window.location.href=`/listing`;
        }, 3000);
        // const carid=window.location.pathname.split('/').slice().pop();
        // localStorage.setItem("startdate",startDate);
        // localStorage.setItem("enddate",endDate);
        // localStorage.setItem("carid",carid);
        // const date1=new Date(startDate);
        // const date2=new Date(endDate);
        // var Difference_In_Time = date2.getTime() - date1.getTime();
        // var quantity = Difference_In_Time / (1000 * 3600 * 24)
        // localStorage.setItem("quantity",quantity);
        
       
    }
    useEffect(() => {
        fetchCar();
    }, []);
    const handlestartdatechange=(e)=>{
        setstartDate(e.target.value);
    }
    const handleenddatechange=(e)=>{
        setendDate(e.target.value);
    }
    const fetchCar=async()=>{
        const id=window.location.pathname.split('/').slice().pop();
        const res=await fetch(`http://localhost:5003/admin/getcar/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const json=await res.json();
        console.log(json)
        setcar(json.data[0]);
        console.log(car)
    }
  
    
  return (
    <div className='carpreview'>
        <div className='hero'>
        <Nav/>

        <h1> Preview Car</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Listing</Link>/ <Link to={"/car"}>Preview</Link></span>
        </div>
        
        <div className='container'>
            <div className='bottom'>
                <img src={`/uploads/cars/${car.thumbnail}`}/>
               
                <p className='desc'>{car.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                <div className='book'>
                    <form onSubmit={confirm}>
                        <p className='price'>Price ${car.price}</p>
                        <label htmlFor='startdate'> Start Date </label>
                        <input 
                            type="date" 
                            name='startdate'
                            onChange={handlestartdatechange}
                            value={startDate}
                            min={Date.now()}
                            disabled
                            required
                            />
                        <label htmlFor='enddate'> DropOff Date </label>
                        <input 
                            type="date" 
                            name='enddate'
                            onChange={handleenddatechange}
                            value={endDate}
                            disabled
                            required
                            />
                        <input type="submit"  className='btn-primary' value="Order"/> 
                     
                    </form>
                </div>
                <h3 className='heading'>Specifications</h3>
                <div className='speccontainer'>
                    <div><h3>Make</h3><h3>{car.maker}</h3></div>
                    <div><h3>Model</h3><h3>{car.model}</h3></div>
                    <div><h3>Year</h3><h3>{new Date(car.year).getFullYear()}</h3></div>
                    <div><h3>Mileage</h3><h3>{car.mileage}</h3></div>
                    <div><h3>Fuel Type</h3><h3>{car.fuel}</h3></div>
                    <div><h3>Horse Power</h3><h3>{car.hp}</h3></div>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default CarPreview