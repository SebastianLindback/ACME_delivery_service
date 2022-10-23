# ACME_delivery_service

A test case to see how relevant my skills are to the workplace

- Routes/nodes will be hardcoded in the application with a assumed values : "AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"

- Current node network will be A --> F. And routes will only go one way.
- Routes will follow the format of: [node_ofOrigin] + [node_ofDestination] + [cost]. example: AB1 (from A to B with a cost of 1)

- Case 1: (Complete) User should be able to customize his own delivery with the current routes.
  example:
  [A-B-E] output: 4
  [A-D] output: 10
  [E-A-C-F] output: 8
  [A-D-F] output: "No such route"
- Case 2: (Complete) Calculate the number of possible delivery route that can be constructed by the given
  conditions. ( Do not count the route that has 0 costs)
  example: The number of the possible delivery routes from E to E without using
  the same route twice in a delivery route. [result: 5]
  [E - E],
  EB3 - BE3 (complete route)
  EA2 - AB1 - BE3 (complete route)
  EA2 - AC4 - CD4 - DE1 (complete route)
  EA2 - AC4 - CF2 - FD1 - DE1 (complete route)
  EA2 - AD10 - DE1 (complete route)

- Case 3: (Complete) Calculate the cheapest delivery route between two towns.
  example: The cost of the cheapest delivery route between E to D. [result: 9]
