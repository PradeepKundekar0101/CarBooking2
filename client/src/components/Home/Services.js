import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

const Services = () => {
   
    const [allcars, setallcars] = useState([]);

    useEffect(() => {
        fetchAllCars();
    }, [allcars])
    
    const fetchAllCars=async()=>{ 
        let url="http://localhost:5003/admin/getallcars"
       
        const response= await fetch(url,{
          method:'GET',
          headers:
          {
              'Content-Type': 'application/json',
          }
        });
        const json=await response.json();
        setallcars(json);
  }
  return (
    <div className='services'>
        <h3>Best Services</h3>
        <h1>Check out top deals</h1>
        <div className='cardContainer'>
                {
                    allcars.map((e,i)=>{if (i<3) return <div className={e.booked?"bookedcard":"card"}>
                        .
                    <div className='top'>
                            <img src={`/uploads/cars/${e.thumbnail}`}></img>
                        </div>

                        <div className='bottom'>
                            <span className='type'>{e.cartype}</span>  
                            <span className='carname'><h3>{e.maker} {e.model} {new Date(e.year).getFullYear()} </h3></span>
                            <span className='price'><h3>$<b>{e.price}</b> per day</h3></span>
                            <div className='specs'>
                                <span>
                                    <i class="fa-solid fa-gauge"></i>  {e.hp} HP &nbsp;&nbsp;
                                </span>
                                <span>
                                    <i class="fa-solid fa-gas-pump"></i>  {e.mileage} KMPL
                                </span>
                            </div>
                            <button className='btn-primary' onClick={()=>{window.location.href=`http://localhost:3000/listing/car/${e._id}`}}>Book</button>
                        </div>

                    </div>})
                }
        </div>

        <Link to="/listing"  className='showmore'> Show more<i class="fa-solid fa-arrow-right-long"></i></Link>
            
    </div>
  )
}

export default Services