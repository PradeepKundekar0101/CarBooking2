import React,{useState,useEffect} from 'react'
import Nav from './Nav';
import { Link } from 'react-router-dom'


const Shop = () => {
    const [type,settype]=useState("all");
    const [allcars, setallcars] = useState([]);
  
    useEffect(() => {
        const list = document.querySelector('.typecontainer');
        const listItems = list.children;
        const array = Array.from(listItems)
        array.forEach(el => { el.classList.remove('activetype')});
        array.forEach(el => { if(el.getAttribute('name')==type) {el.classList.add('activetype');console.log(el)} })      
       fetchAllCars();
    }, [type])
    const fetchAllCars=async()=>{ 
        let url="http://localhost:5003/admin/getallcars"
        if(type!="all") {
            url=`http://localhost:5003/admin/getcar/type/${type}`
        }
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
    <div className='shop'>
        <div className='hero'>
        
        <Nav color="white"/>
        <h1> Available Cars</h1>
        <span><Link to={"/"}>Home</Link> / <Link to={"/listing"}>Listing</Link></span>
        </div>


    <div className='grid'>
       
            <div className='top'>
                <div className='typecontainer'>
                <div className='type' name="all"  onClick={()=>{ settype("all")}}>
                        <img src='icons/all.png'/>
                        <h3>All</h3>
                    </div>
                    <div className='type' name="Sedan" onClick={()=>{ settype("Sedan")}}>
                        <img src='icons/sedan.png'/>
                        <h3>Sedan</h3>
                    </div>
                    <div className='type' name="SUV" onClick={()=>{ settype("SUV")}}>
                        <img src='icons/suv.png'/>
                     
                        <h3>SUV</h3>
                    </div>
                    <div className='type' name="Sports"  onClick={()=>{ settype("Sports")}}>
                        <img src='icons/sports.png'/>
                        <h3>Sports</h3>
                    </div>
                    <div className='type' name="Coupe" onClick={()=>{ settype("Coupe")}}>
                        <img src='icons/coupe.png'/>
                       
                        <h3>Coupe</h3>
                    </div>
                    <div className='type' name="Hatchback"  onClick={()=>{ settype("Hatchback")}}>
                        <img src='icons/hatchback.png'/>
                     
                        <h3>Hatchback</h3>
                    </div>

                </div>
            </div>
            <div className='bottom'>
            <div className='cardContainer'>
                {
                    allcars.map((e)=>{return <div className={e.booked?"bookedcard":"card"}>
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
            </div>
        </div>
        
    </div>












   
  )
}

export default Shop