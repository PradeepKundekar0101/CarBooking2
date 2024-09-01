
// import React,{useEffect,useState} from 'react'

// import { Link } from 'react-router-dom';
  
// const Admin = () => {
//   const [allcars, setallcars] = useState([]);
//   useEffect(() => {
//     console .log(allcars)
//       fetchAllCars();     
//   }, [])
  
//   const fetchAllCars=async()=>{
//         const response= await fetch("http://localhost:5003/admin/getallcars",{
//           method:'GET',
//           headers:
//           {
//               'Content-Type': 'application/json',
//           }
//         });
//         const json=await response.json();
//         setallcars(json);
//   }
  
//   const toggleStatus=()=>{

//   }
//   return (
//     <div  className='admin'>

//     <div className='hero'>
//         <div class="nav">
//         <input type="checkbox" id="nav-check"/>
//         <div class="nav-header">

//         </div>
//         <div class="nav-btn">
//           <label for="nav-check">
//             <span></span>
//             <span></span>
//             <span></span>
//           </label>
//         </div>
        
//         <div class="nav-links">
//           <Link to="#" style={{color:"#fff"}} target="_blank">Home</Link>
//           <Link to="" style={{color:"#fff"}} target="_blank">Ride</Link>
//           <Link to="" style={{color:"#fff"}} target="_blank">Service</Link>
//           <a href="" style={{color:"#fff"}} target="_blank">About</a>
//          <Link style={{color:"#fff"}} to='/user/register' >Sign up</Link>
//          <Link style={{color:"#fff"}} to='/user/login' className='btn-primary' >Sign in</Link>
//         </div>
//       </div>

//         <h1> Admin Panel</h1>
//         <span><Link to={"/"}>Home</Link> / <Link to={"/adminr"}>Admin</Link></span>
//         </div>

//       <div class="tabset">

//       <input type="radio" name="tabset" id="tab1" aria-controls="cars" defaultChecked/>
//       <label for="tab1">All Cars</label>
      
     
      
//       <input type="radio" name="tabset" id="tab3" aria-controls="orders"/>
//       <label for="tab3">Orders</label>

//       <input type="radio" name="tabset" id="tab4" aria-controls="customers"/>
//       <label for="tab4">Customers</label>
      
//       <input type="radio" name="tabset" id="tab5" aria-controls="contactforum"/>
//       <label for="tab5">Contact Forum</label>
  
  
//         {allcars.map((e,i)=>{
//           return <tr style={i%2==0?{background:"#f5f6fa"}:{background:"#dcdde1"}}>
//             <td>{i+1}</td>
//             <td>{e.maker} {e.model}</td>
//             <td>{e.cartype}</td>
//             <td>{e.price}</td>
//             <td>{e.booked?"Booked":"Available"}</td>
//             <td>
           
//               <button onClick={()=>{window.location.href=`http://localhost:3000/admin/updatecar/${e._id}`}}>Update</button>
//               <button onClick={()=>{window.location.href=`http://localhost:3000/admin/deletecar/${e._id}`}} >Delete</button></td>
//             </tr>
//         })}
       
//     </section>



   

//     <section id="orders" class="tab-panel">
//       <h2>Orders</h2>
//           <table>
//             <tr>
//                 <th>Sno</th>
//                 <th>Customer id</th>
//                 <th>Customer Name</th>
//                 <th>Car Id</th>
//                 <th>Car Name</th>
//                 <th>Order Amoount</th>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Status</th>
//             </tr>
//           </table>
          
//     </section>


//     <section id="customers" class="tab-panel">
//       <h2>Customers</h2>
//       <table>
//             <tr>
//                 <th>Sno</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Phone Number</th>
//                 <th>Email</th>
//             </tr>
//           </table>
     
//     </section>
//     <section id="contactforum" class="tab-panel">
//       <h2>Contact Us</h2>
//       <table>
//             <tr>
//                 <th>Sno</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Message</th>
//             </tr>
//           </table>
//     </section>
//   </div>
  
// </div>
          
   


    

//     </div>
//   )
// }

// export default Admin