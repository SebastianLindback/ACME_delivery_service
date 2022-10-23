import React, { useState } from 'react'
import CalculateRoute from '../utils/CalculateRoute';

function DeliveryCost() {
  const [input, setInput] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
  

  const result = CalculateRoute(input);
  
  
  return (
    <div className='row col-sm-12  col-lg-8 d-flex flex-colum justify-content-center mx-auto case' >
      <div className='col-12 text-center mx-auto'><span><strong> CASE 1 </strong></span></div>
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