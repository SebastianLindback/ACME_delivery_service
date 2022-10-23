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
    const formatInput = (input: string) => {
      if (!input.includes("-")) input = input.substring(0,1) + "-" + input.substring(2,1);
      return input.toUpperCase();;
    }
    const userNodes = formatInput(UserInput).split("-");

    
    const getPossibleRoutes = (possibleRoutes : DeliveryRoute[], node_userDestination : string, node_userOrigin : string) => {

      const createNewRoutes = (arrayOfRoutes_toAdd: DeliveryRoute[], currentRoute : DeliveryRoute[]) : DeliveryRoute[][] => {
        return arrayOfRoutes_toAdd.map(
          routeToAdd => ( [...currentRoute, routeToAdd] )
        );
      };
  
      const filter_RoutesMatchingNode = (nodeOfDestination :string, currentRoutes : DeliveryRoute[]) => {
        return currentRoutes.filter(
            route => (
              (route.node_ofOrigin === nodeOfDestination) 
            ));
      }
  
      const filter_CompleteRoutes = (arrayOfRoutes : DeliveryRoute[][], node_userDestination : string) => {
        return arrayOfRoutes.filter(route => {
          return route[route.length-1].node_ofDestination === node_userDestination;
        });
      }

      // init an array with the first check of routes from user origin
      let currentRoutePossibilities : DeliveryRoute[][] = [];
      let initialQuery = filter_RoutesMatchingNode(node_userOrigin, possibleRoutes);
      initialQuery.forEach(route => currentRoutePossibilities.push([route]));

      // loop for each current route until all route possibilities been found
      const maxSearches = 10;
      for (let searches = 0; searches < maxSearches; searches++){ 
        let routesToRemove : DeliveryRoute[][] = [];
        let searchResults : DeliveryRoute[][] = [...currentRoutePossibilities];;
        
        currentRoutePossibilities.forEach(routePossibility => {
          const lastDestinationInRoute = routePossibility[routePossibility.length-1].node_ofDestination;
          
          // return if the route is complete
          if (lastDestinationInRoute === node_userDestination) return;
          routesToRemove.push(routePossibility);
          
          // search and get further routes
          const matchingRoutes = filter_RoutesMatchingNode(lastDestinationInRoute, possibleRoutes);
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
      const result = filter_CompleteRoutes(currentRoutePossibilities, node_userDestination)
      return result;
    }
    
  return (getPossibleRoutes(validRoutes, userNodes[1], userNodes[0]))
}

export default CalculateRoutePossibilities


