import React, { Component } from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

export type CalculateRouteProps = {
    validRoutes: string[],
    UserInput : string
  };

function CalculateRoute({validRoutes, UserInput}: CalculateRouteProps) {
    const currentRoutes = ParseJsonToRoutes(validRoutes);
    const userNodes = UserInput.split("-");
    
    // Match the user nodes with the valid routes
    let result : DeliveryRoute[] = [];
    for (let index = 1; index < userNodes.length; index++) {
      const matchingRoutes = currentRoutes.find(
        route => (
          (route.node_ofOrigin == userNodes[index-1]) 
        &&(route.node_ofDestination == userNodes[index])));
      
      if (matchingRoutes != undefined) result.push(matchingRoutes!);
    }

    // Calculate the cost by adding all the matching routes
    let sum = 0;
    result.forEach(route => {
      sum += route?.cost! 
    });
    console.log(result, "Total Cost: " + sum);

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
     
    return (<p>{(result.length >= userNodes.length-1 && result.length > 0)
      ? `The delivery cost for route ${UserInput} is ${sum}` 
      : `No Such Route`}</p>)
  
  };

export default CalculateRoute