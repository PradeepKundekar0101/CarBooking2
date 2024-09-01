import React,{useState,useEffect} from 'react'


const DeleteCar = () => {
    const [maker, setmaker] = useState("");
    const [model, setmodel] = useState("");
    const [confirmationword,setconfirmationword] = useState("");
    const [userword,setuserword]=useState("");
    const fetchCar=async()=>{
        const id=window.location.pathname.split('/').slice(1).pop();
        const res=await fetch(`http://localhost:5003/admin/getcar/${id}`);
        const mycar=await res.json();   
        // console.log(mycar.data[0])
        setmaker(mycar.data[0].maker);
        setmodel(mycar.data[0].model);
    
    }   
    useEffect(() => {
        fetchCar();
        setconfirmationword(maker.toLowerCase(),model.toLowerCase());
    },[confirmationword]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setconfirmationword(".");
        setuserword("");
        const id=window.location.pathname.split('/').slice(1).pop();
        const res=await fetch(`http://localhost:5003/admin/deletecar/${id}`,{
            method:"DELETE"
        });
        const json=await res.json();
        if(json.success)
        {
            alert("Delete");
            window.location.href="/admin/allcars"
        }else{
            alert("Failed to delete");
        }
    }
    const handleuserword=(e)=>{
        setuserword(e.target.value);
    }
  return (
    <div className='form delete'>
        <div className='formcontainer'>
        <h1 style={{fontWeight:"400",marginBottom:"20px"}}>Delete {maker} {model}?</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='confirm'>Type <span>{maker.toLowerCase().concat(model.toLowerCase())} </span>to Confirm  </label>
            <input type="text" onChange={handleuserword} value={userword}></input>
            <br></br>
            <input type="submit" className='btn-primary'  disabled={userword!=maker.toLowerCase().concat(model.toLowerCase())} value="Delete"/>
        </form>
            <button className="btn-primary" onClick={()=>{window.location.href="/admin/allcars"}}>Cancel</button>

        </div>
       
    </div>
  )
}

export default DeleteCar