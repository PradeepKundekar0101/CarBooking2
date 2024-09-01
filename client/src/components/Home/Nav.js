import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
const Nav = (color) => {
  const [authenticated,setauthenticated]=useState(false);
  useEffect(() => {
    if(window.localStorage.getItem('token'))
    {
        setauthenticated(true);
    }
  }, [])
  
  return (
    <div class="nav">
        <input type="checkbox" id="nav-check"/>
        <div class="nav-header">
          <div class="nav-title">
           
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div class="nav-links">
          
          <Link to="/">Home</Link>
          <Link to="/listing">Shop</Link>
          <Link to="user/profile" style= {authenticated? {display:"inline"}:{display:"none"}} onClick={()=>{window.location.href="/user/profile"}}>Profile</Link>
          <Link to='user/register' style= {!authenticated? {display:"inline"}:{display:"none"}}>Sign up</Link>
          <Link to='user/login' className='btn-primary' style= {!authenticated? {display:"inline",color:"#fff"}:{display:"none"}} >Sign in</Link>
        </div>
      </div>
  )
}

export default Nav