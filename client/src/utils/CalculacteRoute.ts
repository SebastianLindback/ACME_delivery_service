import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

function CalculateRoute(UserInput : string) {
  const {Routes} = require('../context/routes.json');
    const validRoutes : DeliveryRoute[] = Routes.map((route: string) => (
      {
      node_ofOrigin: route.substring(0,1),
      node_ofDestination : route.substring(1,2),
      cost : parseInt(route.substring(2))}
    ) )
    const userNodes = UserInput.split("-");
    
    // Match the user nodes with the valid routes
    let result : DeliveryRoute[] = [];
    for (let index = 1; index < userNodes.length; index++) {
      const matchingRoutes = validRoutes.find(
        route => (
          (route.node_ofOrigin === userNodes[index-1]) 
        &&(route.node_ofDestination === userNodes[index])));
      
      if (matchingRoutes !== undefined) result.push(matchingRoutes!);
    }
     
    return (result)
  
  };

export default CalculateRoute