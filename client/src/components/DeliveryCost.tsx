import React, { useState } from 'react'
import CalculateRoute from './CalculacteRoute';

function DeliveryCost() {
  const {Routes} = require('../context/routes.json');
  const [input, setInput] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
  return (<>
    <div>
      <label>Delivery cost: </label>
      <input
        type="text"
        onChange={handleChange}
        value={input}
      />
    </div>
    <CalculateRoute validRoutes={Routes}  UserInput={input.toUpperCase()}/>
    </>)
}

export default DeliveryCost