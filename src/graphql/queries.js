/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAppliance = /* GraphQL */ `
  query GetAppliance($id: ID!) {
    getAppliance(id: $id) {
      id
      appliance_name
      appliance_status
      appliance_type
      appliance_room
      heavy_count
      moderate_count
      low_count
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAppliances = /* GraphQL */ `
  query ListAppliances(
    $filter: ModelApplianceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppliances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        appliance_name
        appliance_status
        appliance_type
        appliance_room
        heavy_count
        moderate_count
        low_count
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
