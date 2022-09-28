import React, { useState } from 'react'
import CalculateRoutePossibilities from '../components/CalculateRoutePossibilities';

function PossibleRoute() {
    const {Routes} = require('../context/routes.json');
    const [input, setInput] = useState("")
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    };
    
    return (<>
      <div>
        <label>Possible routes: </label>
        <input
          type="text"
          onChange={handleChange}
          value={input}
          maxLength={3}

        />
        <CalculateRoutePossibilities validRoutes={Routes} UserInput={input.toUpperCase()}/>
      </div>
      </>)
}

export default PossibleRoute