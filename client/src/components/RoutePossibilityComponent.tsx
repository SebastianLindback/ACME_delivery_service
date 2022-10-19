import React, { useState } from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';
import CalculateRoutePossibilities from '../utils/CalculateRoutePossibilities';

function RoutePossibilityComponent() {
    const {Routes} = require('../context/routes.json');
    const [input, setInput] = useState("")
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    };
    const createPossibleRouteResult = (possibleRoutes : DeliveryRoute[][]) => {
      if (!possibleRoutes || possibleRoutes.length < 1 ) return <span>results:...</span>
      

      return <span>{possibleRoutes.length} possible routes </span>
    }

    const resultsOfRoutePossibility = createPossibleRouteResult(CalculateRoutePossibilities(Routes, input.toUpperCase()));
    
    return (<>
      <div className='col-12 d-flex flex-colum'>
        <div className='row'>
          <label>Possible routes: </label>
          <input
            type="text"
            onChange={handleChange}
            placeholder='For example "E-E"'
            value={input}
            maxLength={3}

          />
        </div>
        <div>
          {resultsOfRoutePossibility}
        </div>
      </div>
      </>)
}

export default RoutePossibilityComponent