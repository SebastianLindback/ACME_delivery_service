import React, { useState } from 'react'
import CalculateRoute from '../utils/CalculacteRoute';

function DeliveryCost() {
  const [input, setInput] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const result = CalculateRoute(input.toUpperCase());
  // Calculate the cost by adding all the matching routes
  let sum = 0;
  result.forEach(route => {
    sum += route?.cost! 
  });
  
  return (<>
    <div className='row col-sm-12  col-lg-8 d-flex flex-colum justify-content-center mx-auto'>
      <label className="col-6 text-center"><strong>Delivery cost: </strong></label>
      <input
        className="col-6"
        type="text"
        onChange={handleChange}
        value={input}>
      </input>
    
      <div className='row col-12 d-flex flex-colum justify-content-center mx-auto'>
      <div className='alert alert-dark col-12 text-center'>
        {(result.length > 0)
        ? <span> The delivery cost for route <strong> {input.toUpperCase()} </strong> is <strong>{sum}</strong></span>
        : <strong>No Such Route</strong>}
        </div>
    </div>
    </div>
    
    </>)
}

export default DeliveryCost