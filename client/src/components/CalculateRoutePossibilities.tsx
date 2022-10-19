import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

export type CalculateRoutePossibilitiesProps = {
    validRoutes: string[],
    UserInput : string
  };
function CalculateRoutePossibilities({validRoutes, UserInput}  : CalculateRoutePossibilitiesProps)  {
    
    /*
    "AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"
    E - E, total: 5
    EB3 - BE3 (complete route)

    EA2 - AB1 - BE3 (complete route)
    EA2 - AC4 - CD4 - DE1 (complete route)
    EA2 - AC4 - CF2 - FD1 - DE1 (complete route)
    EA2 - AD10 - DE1 (complete route)

    */
    const routes = ParseJsonToRoutes(validRoutes);
    const userNodes = UserInput.split("-");
    
    const createNewRoutes = (arrayOfRoutes_toAdd: DeliveryRoute[], currentRoute : DeliveryRoute[]) : DeliveryRoute[][] => {
      const results : DeliveryRoute[][] = [];
      
      arrayOfRoutes_toAdd.forEach(routeToAdd => {    
        results.push([...currentRoute, routeToAdd])
      });

      return results;
    };

    const findNextDestinationFromRoute = (routeDestination :string, currentRoutes : DeliveryRoute[]) => {
      const result = currentRoutes.filter(
          route => (
            (route.node_ofOrigin === routeDestination) 
          ));
      return result;
    }

    const compareRoutesToCollection = (oldCollection :DeliveryRoute[][]) => {
      const results = new Set([...oldCollection]);
      
      return Array.from(results);
    }
    // init multidimensionalArray with the first results of possible routes
    let CollectionOfDeliveryRoutes : DeliveryRoute[][] = [];
    let initialQuery = findNextDestinationFromRoute(userNodes[0], routes);
    initialQuery.forEach(route => CollectionOfDeliveryRoutes.push([route]));

    // Step by step. Loop the Collection of Delivery Routes for Possible routes. 
    // loop will finalize when no more possible routes is found.
    const maxSearches = 10;
    let y : DeliveryRoute[][] = [];
    for (let searches = 0; searches < maxSearches; searches++){ 
      if (JSON.stringify( y) ===  JSON.stringify( CollectionOfDeliveryRoutes)) searches += maxSearches;
      y = [...CollectionOfDeliveryRoutes];
      let collection : DeliveryRoute[][] = [];
      

      CollectionOfDeliveryRoutes.forEach(possibleRoute => {
        const routes_lastRoute = possibleRoute[possibleRoute.length-1];
        if (routes_lastRoute.node_ofDestination === userNodes[1]) return;
        
        const matchingRoutes = findNextDestinationFromRoute(routes_lastRoute.node_ofDestination, routes);
        const newRoutes = createNewRoutes(matchingRoutes, possibleRoute) ;
        
        if (newRoutes.length < 1) return;
        newRoutes.forEach(item => {
          collection.push(item);
        });

      });
      if (collection.length < 1) break;
      CollectionOfDeliveryRoutes = [...compareRoutesToCollection([...collection])];
      console.log(collection);
      
    }
    
    // Cleanup and remove incomplete routes.
    CollectionOfDeliveryRoutes = CollectionOfDeliveryRoutes.filter(deliveryRoute => {
      return deliveryRoute[deliveryRoute.length-1].node_ofDestination === userNodes[1];
    })
    const setOfDeliveryRoutes = new Set(CollectionOfDeliveryRoutes); 
    
    
    console.log(setOfDeliveryRoutes, "deliveryRoutes");
    
    
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
  </>)
}

export default CalculateRoutePossibilities


