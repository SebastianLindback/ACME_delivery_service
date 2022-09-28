# ACME_delivery_service

A test case to see how relevant my skills are to the workplace

- Routes/nodes will be hardcoded in the application with a assumed value.
- Current node network will be A --> F. And routes will only go one way.
- Routes will follow the format of: [node_ofOrigin] + [node_ofDestination] + [cost]. example: AB1 (from A to B with a cost of 1)

- Case 1: (Incomplete) User should be able to customize his own delivery with the current routes.
  example: A delivery from A to E by using routes AB1 + BE3. Cost of this should be 4.

- Case 2: (Incomplete) Calculate the number of possible delivery route that can be constructed by the given
  conditions. ( Do not count the route that has 0 costs)
  example: The number of the possible delivery routes from E to E without using
  the same 5 route twice in a delivery route. [result: 5]

- Case 3: (Incomplete) Calculate the cheapest delivery route between two towns.
  example: The cost of the cheapest delivery route between E to D. [result: 9]
