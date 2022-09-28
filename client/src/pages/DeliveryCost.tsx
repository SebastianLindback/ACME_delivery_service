import React, { useState } from 'react'
import CalculateRoute from '../components/CalculacteRoute';
import { DeliveryRoute } from '../models/DeliveryRoute'

function DeliveryCost() {
  const {Routes} = require('../context/routes.json');
  const [input, setInput] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
  return (<>
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={input}
      />
    </div>
    <CalculateRoute validRoutes={Routes}  UserInput={input.toUpperCase()}/>
    </>)
}

export default DeliveryCost