import React from 'react'

const Steps = () => {
  return (
    <div className='steps'>
       <div>
        <h2>How it works?</h2>
        <br></br>
        <h1> Rent with 3 Easy steps</h1>
       </div>
        <div className='container'>
                <div className='box' data-aos="fade-up">
                <i class="fa-solid fa-car"></i>
                <h2>Choose a Car</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className='box'>
                <i class="fa-solid fa-calendar"></i>
                <h2>Select Pick up date</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className='box'>
                <i class="fa-solid fa-credit-card"></i>
                <h2>Book the car</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
        </div>
    </div>
  )
}

export default Steps