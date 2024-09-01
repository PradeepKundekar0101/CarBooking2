import React from 'react'
import Services from './Home/Services'
import Steps from './Home/Steps'
import Aboutus from './Home/Aboutus'
import Contact from './Home/Contact'
import Nav from './Home/Nav'
const Home = () => {
  return (
    <div className='home'>
      
      <Nav/>
      <div className='hero'>
        <div className='left'>
            <h1>
              Need a <span>Car</span> for Rent?
            </h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
           <button className='btn-primary'>Book Now</button>
        </div>
        <div className='right'>
          <div className='container'>
            <img src='pngcar.png'></img>
          </div>
        </div>
      </div>
      <Steps/>
      <Services/>
      <Aboutus id="aboutus"/>
      <Contact/>
      <div  className='footer'></div>
    </div>
  )
}

export default Home