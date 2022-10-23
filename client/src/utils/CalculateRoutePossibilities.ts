import React from 'react'
import { DeliveryRoute } from '../models/DeliveryRoute';

const CalculateRoutePossibilities = (UserInput: string ) => {
    const {Routes} = require('../context/routes.json');
    const validRoutes : DeliveryRoute[] = Routes.map((route: string) => (
      {
      node_ofOrigin: route.substring(0,1),
      node_ofDestination : route.substring(1,2),
      cost : parseInt(route.substring(2))}
    ) );

    const userNodes = UserInput.split("-");

    
    const getPossibleRoutes = (possibleRoutes : DeliveryRoute[], userDestination : string, userOrigin : string) => {

      const createNewRoutes = (arrayOfRoutes_toAdd: DeliveryRoute[], currentRoute : DeliveryRoute[]) : DeliveryRoute[][] => {
        const results : DeliveryRoute[][] = arrayOfRoutes_toAdd.map(
          routeToAdd => (    
            [...currentRoute, routeToAdd]
          )
        );
        return results;
      };
  
      const findNextDestinationFromRoute = (routeDestination :string, currentRoutes : DeliveryRoute[]) => {
        const result = currentRoutes.filter(
            route => (
              (route.node_ofOrigin === routeDestination) 
            ));
        return result;
      }
  
      const filter_CompleteRoutes = (arrayOfRoutes : DeliveryRoute[][], userDestination : string) => {
        arrayOfRoutes = arrayOfRoutes.filter(route => {
          return route[route.length-1].node_ofDestination === userDestination;
        })
        return arrayOfRoutes;
  
      }
      // init an array with the first check of routes from user origin
      let currentRoutePossibilities : DeliveryRoute[][] = [];
      let initialQuery = findNextDestinationFromRoute(userOrigin, possibleRoutes);
      initialQuery.forEach(route => currentRoutePossibilities.push([route]));

      // loop for each current route until all route possibilities been found
      const maxSearches = 10;
      for (let searches = 0; searches < maxSearches; searches++){ 
        let routesToRemove : DeliveryRoute[][] = [];
        let searchResults : DeliveryRoute[][] = [...currentRoutePossibilities];;
        
        currentRoutePossibilities.forEach(routePossibility => {
          const lastDestinationInRoute = routePossibility[routePossibility.length-1].node_ofDestination;
          
          // return if the route is complete
          if (lastDestinationInRoute === userDestination) return;
          routesToRemove.push(routePossibility);
          
          // search and get further routes
          const matchingRoutes = findNextDestinationFromRoute(lastDestinationInRoute, possibleRoutes);
          const newSearchResults = createNewRoutes(matchingRoutes, routePossibility) ;
          
          
          // return if none where found
          if (newSearchResults.length === 0) { return;}

          searchResults = [...searchResults,...newSearchResults];          
        });
        
        // remove routes with no further use
        routesToRemove.forEach(routeToRemove => {
            searchResults.splice(searchResults.indexOf(routeToRemove), 1); 
        })

        // Break the loop if no more search data is collected
        if (JSON.stringify(searchResults) ===  JSON.stringify( currentRoutePossibilities)) break;

        else  
        currentRoutePossibilities = [ ...searchResults];
        
      }
      const result = filter_CompleteRoutes(currentRoutePossibilities, userDestination)
      return result;
    }
    
  return (getPossibleRoutes(validRoutes, userNodes[1], userNodes[0]))
}

export default CalculateRoutePossibilities


