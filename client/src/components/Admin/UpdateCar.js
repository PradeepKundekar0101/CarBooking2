import React,{useEffect,useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateCar = () => {
    const success = () => toast.success("Car Updated successfully",{position: "bottom-center"});
    const error = () => toast.error("Failed to Update   ",{position: "bottom-center"});
    const [cardetails, setcardetails] = useState({
        maker:"",model:"",year:"",fuel:"",description:"",price:"",cartype:"",hp:"",noofseats:"",mileage:""
    });
    const handleChange=(e)=>{
        setcardetails({...cardetails,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const id=window.location.pathname.split('/').pop();
        const res=await fetch(`http://localhost:5003/admin/updatecar/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(cardetails)
        });

        const json = await res.json();
        if(json.success)
        {
           success();
           setTimeout(() => {
               window.location.href="/admin/allcars"
           }, 1500);
        }
        else{
           error();
        }
    }
   
    const fetchCar=async()=>{
        const id=window.location.pathname.split('/').pop();
        const res=await fetch(`http://localhost:5003/admin/getcar/${id}`);
        const mycar=await res.json();
        setcardetails(mycar.data[0]);
    }
    useEffect(() => {
     fetchCar();
    }, [])
    
  return (
    <div className='form updatecar'>
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
        <h1>
            Update 
        </h1>
        <form 
        method='POST' 
        
        onSubmit={handleSubmit}
        >
            <input
            name='maker'
            type="text"
            list='makers'
            value={cardetails.maker}
            onChange={handleChange} 
            placeholder='Maker'/>
                <datalist id='makers'>
                    <option>BWM</option>
                    <option>Audi</option>
                    <option>Maruti</option>
                    <option>Honda</option>
                </datalist>
            <br/>
            <input 
            name='carname' 
            value={cardetails.model} 
            onChange={handleChange} 
            placeholder='Car Model'/>
            
            <br/>

            <input 
            type='number' 
            name='price'
            value={cardetails.price} 
            onChange={handleChange} 
            placeholder="Price"/>
            
            <br/>
            
            <input 
            name='cartype' 
            type="text" 
            list='cartype' 
            value={cardetails.cartype} 
            onChange={handleChange} 
            placeholder='Car Type'/>
                <datalist id='cartype'>
                    <option>Sedan</option>
                    <option>Sports</option>
                    <option>SUV</option>
                    <option>Mini</option>
                </datalist>
            
            <br/>
            
            
            <textarea 
            placeholder='Description' 
            name='description'
            cols="15" 
            rows="10" 
            onChange={handleChange} 
            value={cardetails.description}>
            </textarea>
            
            <br/>

          
            
            <input type="submit" onClick={handleSubmit} style={{background:"#45aaf2",border:"None",padding:"10px 0px"}} value="Update"/>
            <br></br>
            <input style={{background:"#fc5c65",border:"None",padding:"10px 0px"}} type="submit" onClick={()=>{window.location.href="/admin/allcars"}} value="Cancel"/>
        
        </form>
    </div>
  )
}

export default UpdateCar