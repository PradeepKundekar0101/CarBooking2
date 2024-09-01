import React,{useState}from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateCar = () => {
    const success = () => toast.success("Car added successfully",{position: "bottom-center"});
    const error = () => toast.error("Failed to Save",{position: "bottom-center"});
    const [maker, setmaker] = useState("");
    const [model, setmodel] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [cartype, settype] = useState("");
    const [seats, setseats] = useState("");
    const [fuel, setfuel] = useState("");
    const [year, setyear] = useState("");
    const [mileage, setmileage] = useState("");
    const [hp, sethp] = useState("");
    const [thumbnail, setthumbnail] = useState("");


    const handleModelChange=(e)=>{
        setmodel(e.target.value);
    }
    const handleMakerChange=(e)=>{
        setmaker(e.target.value);
    }
    const handlePriceChange=(e)=>{
        setprice(e.target.value);
    }
    const handleDescriptionChange=(e)=>{
        setdescription(e.target.value);
    }
    const handleTypeChange=(e)=>{
        settype(e.target.value);
    }
    const handleMileageChange=(e)=>{
        setmileage(e.target.value);
    }
    const handleFuelChange=(e)=>{
        setfuel(e.target.value);
    }
    const handleYearChange=(e)=>{
        setyear(e.target.value);
    }
    const handleHpChange=(e)=>{
        sethp(e.target.value);
    }
    const handleSeatChange=(e)=>{
        setseats(e.target.value);
    }
    const handleThumbnailChange=(e)=>{
        setthumbnail(e.target.files[0]);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("model",model);
        formData.append("maker",maker);
        formData.append("cartype",cartype);
        formData.append("price",price);
        formData.append("noofseats",seats);
        formData.append("mileage",mileage);
        formData.append("year",year);
        formData.append("fuel",fuel);
        formData.append("hp",hp);
        formData.append("description",description);
        formData.append("thumbnail",thumbnail);
        
        const res=await fetch("http://localhost:5003/admin/addcar",{
            method:"POST",
            body:formData,
        });
        const json=await res.json();
        console.log(json);
        if(json.success)
        {
            success();
            setTimeout(()=>{
                window.location.href="/admin/allcars";
            },1500);

        }else{
           error();
        }
    }

  return (
    <div className='form updatecar' style={{position:"relative"}}>
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
        <Link to="/admin/allcars" className="back">  Back </Link>
        <h1> Add a New Car into your Business</h1>
        <form 
        method='POST' 
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        >
            <input
            name='maker'
            type="text"
            list='makers'
            value={maker}
            onChange={handleMakerChange} 
            required
            minLength={3}
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
            value={model} 
            onChange={handleModelChange} 
            placeholder='Car Model'
            required
            minLength={3}/>
           
            <br/>

            <input 
            type='number' 
            value={price} 
            onChange={handlePriceChange} 
            placeholder="Price"
            required
            minLength={3}/>
            
            <br/>
           
            <input 
            name='cartype' 
            type="text" 
            list='cartype' 
            value={cartype} 
            onChange={handleTypeChange} 
            placeholder='Car Type'
            required
            minLength={3}/>
                <datalist id='cartype'>
                    <option>Sedan</option>
                    <option>Sports</option>
                    <option>SUV</option>
                    <option>Mini</option>
                </datalist>
            
            <br/>
            
            
            
            <input 
            type='number' 
            onChange={handleMileageChange} 
            value={mileage} 
            placeholder="Mileage"
            required
            min={10}/>
            
            <br/>
            <input 
            type='number' 
            onChange={handleHpChange} 
            value={hp} 
            placeholder="Horse Power"
            required
            min={100}/>
            <br/>
            <br/>
            <select 
                onChange={handleFuelChange} 
                value={fuel} 
                required
                minLength={4}>
                <option value="">--Select Fuel Type--</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
            </select>
            <br/>
            <input 
            type="month" 
            onChange={handleYearChange} 
            value={year} 
            placeholder="Year of Manufacture"
            
            />
            
            <br/>
            <input 
            type='number' 
            onChange={handleSeatChange} 
            value={seats} 
            placeholder="Number of Seats"/>
            
            <br/>
            
            <textarea 
            placeholder='Description' 
            cols="15" 
            rows="5" 
            onChange={handleDescriptionChange} 
            value={description}>
            </textarea>
            
            <br/>

            <input 
            type="file" 
            onChange={handleThumbnailChange} required />
            
            <br/>
            
            <input type="submit" style={{background:"#45aaf2",border:"None",padding:"10px 0px"}} onClick={handleSubmit} value="Create"/>
        
        </form>
    </div>
    
  )
}

export default CreateCar