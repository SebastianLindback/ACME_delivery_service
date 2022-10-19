import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

function CalculateRoute(UserInput : string) {
  const {Routes} = require('../context/routes.json');
    const currentRoutes = ParseJsonToRoutes(Routes);
    const userNodes = UserInput.split("-");
    
    // Match the user nodes with the valid routes
    let result : DeliveryRoute[] = [];
    for (let index = 1; index < userNodes.length; index++) {
      const matchingRoutes = currentRoutes.find(
        route => (
          (route.node_ofOrigin === userNodes[index-1]) 
        &&(route.node_ofDestination === userNodes[index])));
      
      if (matchingRoutes !== undefined) result.push(matchingRoutes!);
    }
    
    function ParseJsonToRoutes(routes: string[]) : DeliveryRoute[]
    {
        let result : DeliveryRoute[] = [];
        try {
          routes.forEach((rawRoute : string) => {
          let route : DeliveryRoute = {
            node_ofOrigin: rawRoute.substring(0,1),
            node_ofDestination : rawRoute.substring(1,2),
            cost : parseInt(rawRoute.substring(2))
          }
          result.push(route);
          });
        } 
        catch (error) {
          console.log(`Route failed parsing \n error:`, error);  
        }
        return (result)
        
    }
     
    return (result)
  
  };

export default CalculateRoute