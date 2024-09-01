import React from 'react'

const NotFound = () => {
  return (
    <div className='notfound'>
        <h1>404</h1>
        <h1>Page Not Found :(</h1>
        <button className='btn-primary' onClick={()=>{window.location.href="/user/profile"}}>Back to Profile</button>
    </div>
  )
}

export default NotFound