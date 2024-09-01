import React from 'react'

const Aboutus = () => {
  return (
    <div className='aboutus' id="aboutus">
        <div className='top'>
            <h2>Aboutus</h2>
            <h1>Best Customer Experience</h1>
        </div>
        <div className='bottom'>
            <div className='left'>
                <img src='pngcar3.png'></img>
            </div>
            <div className="right">
                <h3>
                    About us
                </h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
                <button className='btn-secondary'>Learn More</button>
            </div> 
        </div>

    </div>
  )
}

export default Aboutus