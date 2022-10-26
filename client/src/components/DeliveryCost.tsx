import React, { useRef, useState } from 'react'
import CalculateRoute from '../utils/CalculateRoute';

function DeliveryCost() {
  const inputRef = useRef<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<JSX.Element>(<span>...</span>)
  const getValidRoute = () => {
    if (inputRef.current === undefined) return <></>
    
    const routes = CalculateRoute(inputRef!.current!.value);
    if (routes === undefined) return <strong>No Such Route</strong>
    
    return (<span> 
      The delivery cost for route <strong> 
        {routes.node_ofOrigin + "-" + routes.node_ofDestination} 
      </strong> is <strong>
        {routes.cost}
      </strong>
    </span>)
    
  }
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onclick();
      }
    }
  
  const onclick = () => {
    setSearchResult(getValidRoute());
    
    
  }
  return (
    <div className='row col-sm-12  col-lg-8 d-flex flex-colum justify-content-center mx-auto case' >
      <div className='col-12 text-center mx-auto'><span><strong> CASE 1 </strong></span></div>
      <label className="col-6 text-center"><strong>Delivery cost for route: </strong></label>
      <input
        ref={inputRef as React.LegacyRef<HTMLInputElement>}
        className="col-4"
        type="text"
        placeholder={'For example "A-C"'}
        onKeyDown={onKeyPress}
        maxLength={3}
        >
      </input>
      <button className='col-2' onClick={onclick}>check routes</button>
      <div className='row col-12 d-flex flex-colum justify-content-center mx-auto'>
        <div className='alert alert-dark col-12 text-center'>
          {searchResult}
          </div>
      </div>
    </div>
    )
}

export default DeliveryCost