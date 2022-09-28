import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

export type CalculateRoutePossibilitiesProps = {
    validRoutes: string[],
    UserInput : string
  };
  interface DeliveryRoutes {
    array : DeliveryRoute[]
  }
function CalculateRoutePossibilities({validRoutes, UserInput}  : CalculateRoutePossibilitiesProps)  {
    const routes = ParseJsonToRoutes(validRoutes);
    const userNodes = UserInput.split("-");

    function getMatchingRoutes(routeDestination :string, currentRoutes : DeliveryRoute[]) {
        const result = currentRoutes.filter(
            route => (
              (route.node_ofOrigin == routeDestination) 
            ));
        return result;
    }
    
    // Match the user nodes with the valid routes
    function getPossibleRoute() {
        let result = getMatchingRoutes(userNodes.at(0)!, routes);
        
        if (result.length == 0) return;
        if (userNodes.length <2)return;
        let deliveryRoutes : DeliveryRoutes[] = [];
        result.forEach((item) => {
            deliveryRoutes.push({array: [item]});
        })
        
        let x = 0;
        let change = false;
        while(x < 3){
            result.forEach((item) => {
                change = false;
                
                deliveryRoutes.forEach((deliveryRoute) => {
                    if (deliveryRoute.array.filter(x => x == item).length == 0){
                        if (deliveryRoute.array[deliveryRoute.array.length-1].node_ofDestination.includes(item.node_ofOrigin) ){
                        deliveryRoute.array.push(item);
                        
                        change = true;
                        }
                    }
                });
                if (!change){
                    result.forEach((item) => {
                        deliveryRoutes.push({array: [item]});
                    })
                    
                    change = false;
                }
                result = getMatchingRoutes(item.node_ofDestination, routes)
        });
        x++;
        }
        return deliveryRoutes;

    }
    let route;
    let result = getPossibleRoute();
    route = result?.filter((arrays => 
        (arrays.array[0].node_ofOrigin.includes(userNodes[0])) && 
        (arrays.array[arrays.array.length-1].node_ofDestination.includes(userNodes[1]))));

    route && console.log(route);
    
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
    
  return (<>
    <div></div>
  </>)
}

export default CalculateRoutePossibilities