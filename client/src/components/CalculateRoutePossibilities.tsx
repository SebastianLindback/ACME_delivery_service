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
    
    
    // init multidimentionalArray with the first results of possible routes
    let CollectionOfDeliveryRoutes : DeliveryRoute[][] = [];
    let initalQuery = getMatchingRoutes(userNodes[0], routes);
    initalQuery.forEach(route => CollectionOfDeliveryRoutes.push([route]));

    // Step by step. Loop the Collection of Delivery Routes for Possible routes. 
    // loop will finalize when no more possible routes is found. Hard coded maxSearch in order to prevent infinite loop.
    let searches = 0;
    const maxSearches = 10;
    let y : DeliveryRoute[][] = [];
    while (searches < maxSearches){ 
      if (JSON.stringify( y) ==  JSON.stringify( CollectionOfDeliveryRoutes)) searches += maxSearches;
      y = [...CollectionOfDeliveryRoutes];

      CollectionOfDeliveryRoutes.forEach(deliveryRoutes => {

        let routes_lastRoute = deliveryRoutes[deliveryRoutes.length-1];
        if (routes_lastRoute.node_ofDestination == userNodes[1]) return;
        
        let route = [...deliveryRoutes];
        
        let MatchingRoutes = getMatchingRoutes(routes_lastRoute.node_ofDestination, routes);
        MatchingRoutes.forEach(MatchingRoute => {
          
          if (route.includes(MatchingRoute)) return; 
          
          if (MatchingRoutes.indexOf(MatchingRoute) == 0) deliveryRoutes.push(MatchingRoute);
          else {
            let result = [...route];
            result.push(MatchingRoute);
            let existingRoute = false;
            CollectionOfDeliveryRoutes.forEach(deliveryRoute => {
              if (JSON.stringify(deliveryRoute) == JSON.stringify(result)){
              existingRoute = true;
              }
            });            
            
            if (!existingRoute){
            CollectionOfDeliveryRoutes.push(result)}
          }
          
        });
        
      });
      
      searches++;
    }
    // Cleanup and remove incomplete routes.
    CollectionOfDeliveryRoutes = CollectionOfDeliveryRoutes.filter(deliveryRoute => {
      return deliveryRoute[deliveryRoute.length-1].node_ofDestination === userNodes[1];
    })
    
    console.log(CollectionOfDeliveryRoutes, "deliveryRoutes");
    
    
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
    function getMatchingRoutes(routeDestination :string, currentRoutes : DeliveryRoute[]) {
      const result = currentRoutes.filter(
          route => (
            (route.node_ofOrigin == routeDestination) 
          ));
      return result;
  }
  return (<>
  </>)
}

export default CalculateRoutePossibilities


