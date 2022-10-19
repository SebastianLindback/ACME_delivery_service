import React, { useState } from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';
import CalculateRoutePossibilities from '../utils/CalculateRoutePossibilities';

function RoutePossibilityComponent() {
    const {Routes} = require('../context/routes.json');
    const [input, setInput] = useState("")
    const [tableBody, setTableBody] = useState<JSX.Element[]>();
    const [tableHeader, setTableHeader] = useState<JSX.Element>();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
      
      
    };
    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        btn();
      }
  }
    const tableClick = (route : DeliveryRoute[]) =>{
      console.log(route);
      const row: JSX.Element[] = [];
      route.forEach(item => {
         row.push(<tr onClick={() =>tableClick(route)}>
        <th scope="row">{route.indexOf(item) +1}</th>
        <td>{item.node_ofOrigin}</td>
        <td>{item.node_ofDestination}</td>
        <td>{item.cost}</td>
      </tr>);
      
    });
    setTableHeader(<tr>
      <th scope="col">Stop</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Cost</th>
    </tr>);
    setTableBody(row);
    }
    const createPossibleRouteResult = (possibleRoutes : DeliveryRoute[][]) => {
      console.log(possibleRoutes);
      const row: JSX.Element[] = [];
      
      possibleRoutes.forEach(route => {
      let sum = 0;
      route.forEach(item => {
        sum += item.cost;
      });
         row.push(<tr onClick={() =>tableClick(route)} >
        <th scope="row">{possibleRoutes.indexOf(route) +1}</th>
        <td>{route.length}</td>
        <td>{sum}</td>
      </tr>);
    });
      setTableHeader(<tr>
        <th scope="col">Route</th>
        <th scope="col">Nr. of stops</th>
        <th scope="col">Total cost</th>
      </tr>);
      setTableBody(row);
      
    }
    const btn = () => {
      createPossibleRouteResult(CalculateRoutePossibilities(Routes, input.toUpperCase()));
    }
    //
    
    return (<>
      <div className='col-12 '>
      <div className='row col-12 d-flex flex-colum justify-content-between '>
        <label className='col-4 text-center'><strong> Possible routes: </strong></label>
          <input
            className='col-4 '
            type="text"
            onChange={handleChange}
            placeholder='For example "E-E"'
            value={input}
            maxLength={3}
            onKeyPress={onKeyPress}
          />
          <button className='col-4' onClick={btn}>check routes</button>
        </div>
        <div className='row col-12'>
        <table className=" table table-striped ">
          
        <thead></thead>
        <thead className="thead">
          {tableHeader}
        </thead>
        <tbody >
          {tableBody}
        </tbody>
        </table>
          
        </div>
      </div>
      </>)
}

export default RoutePossibilityComponent