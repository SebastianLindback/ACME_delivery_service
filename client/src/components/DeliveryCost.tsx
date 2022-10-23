import React, { useState } from 'react'
import CalculateRoute from '../utils/CalculacteRoute';

function DeliveryCost() {
  const [input, setInput] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
  const formatInput = (input: string) => {
    if (!input.includes("-")) input = input.substring(0,1) + "-" + input.substring(2,1);
    return input.toUpperCase();;
  }

  const result = CalculateRoute(formatInput(input));
  
  
  
  return (
    <div className='row col-sm-12  col-lg-8 d-flex flex-colum justify-content-center mx-auto'>
      <label className="col-6 text-center"><strong>Delivery cost for route: </strong></label>
      <input
        className="col-6"
        type="text"
        onChange={handleChange}
        placeholder={'For example "A-C"'}
        value={input}>
      </input>
    
      <div className='row col-12 d-flex flex-colum justify-content-center mx-auto'>
        <div className='alert alert-dark col-12 text-center'>
          {(result)
          ? <span> The delivery cost for route <strong> {result.node_ofOrigin + "-" + result.node_ofDestination} </strong> is <strong>{result.cost}</strong></span>
          : <strong>No Such Route</strong>}
          </div>
      </div>
    </div>
    )
}

export default DeliveryCost