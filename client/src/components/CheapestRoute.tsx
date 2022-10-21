import React, { useState } from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';
import CalculateRoutePossibilities from '../utils/CalculateRoutePossibilities';

function CheapestRoute() {
    const [input, setInput] = useState("");
    const [tableBody, setTableBody] = useState<JSX.Element[]>([<tr>
      <th scope="row">.</th>
      <td>..</td>
      <td>...</td>
      <td>....</td>
      
    </tr>]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const getCostSum = (array : DeliveryRoute[]) => {
    let sum = 0;
    array.forEach(item =>  {
      sum += item.cost;
    })
    return sum;
  };
  const possibleRoutes = CalculateRoutePossibilities(input.toUpperCase());
  let result : DeliveryRoute[] = [];
  possibleRoutes.forEach(route => {
    if (result.length === 0) {result = [...route]}
    if (getCostSum(result) > getCostSum(route)) {result = [...route]}
  })
  

  const createPossibleRouteResult = (possibleRoutes : DeliveryRoute[]) => {
    const row: JSX.Element[] = [];
    
    possibleRoutes.forEach(route => {
    
       row.push(<tr key={"A" + possibleRoutes.indexOf(route) }>
      <th scope="row">{possibleRoutes.indexOf(route) +1}</th>
      <td>{route.cost}</td>
      <td>{route.node_ofOrigin}</td>
      <td>{route.node_ofDestination}</td>
      
    </tr>);
      
  });
  row.push(<tr>
    <th scope="row">TOTAL COST:</th>
    <td><strong> {getCostSum(possibleRoutes)}</strong></td>
    <td></td>
    <td></td>
  </tr>);
    
    setTableBody(row);
    
  }
  const calculateTable = () => {
    createPossibleRouteResult(result);
  }
  
  
  
  return (
    <div className='row col-sm-12  col-lg-8 d-flex flex-colum justify-content-center mx-auto'>
      <label className="col-6 text-center"><strong>Cheapest route in between two stops: </strong></label>
      <input
        className="col-4"
        type="text"
        onChange={handleChange}
        value={input}
        placeholder='For example "E-E"'
        >
        
      </input>
      <button className='col-2' onClick={calculateTable}>check routes</button>

      <div className='row col-12'>
        <table className=" table table-striped ">
          
        <thead></thead>
        <thead className="thead">
        <tr>
          <th scope="col">Stop</th>
          <th scope="col">Cost</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          
        </tr>
        </thead>
        <tbody >
          {tableBody}
        </tbody>
        </table>
          
      </div>
    </div>
    
  )
}

export default CheapestRoute