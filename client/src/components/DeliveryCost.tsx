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
    <div className='row col-6 d-flex flex-colum justify-content-center mx-auto'>
      <label className="col-6 text-center"><strong>Delivery cost: </strong></label>
      <input
        className="col-6"
        type="text"
        onChange={handleChange}
        value={input}>
      </input>
    
    
    </div>
    <div className='row col-4 d-flex flex-colum justify-content-center mx-auto'>
      <span>{(result.length > 0)
      ? `The delivery cost for route ${input.toUpperCase()} is ${sum}` 
      : `No Such Route`}</span>
    </div>
    </>)
}

export default DeliveryCost