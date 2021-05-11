/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAppliance = /* GraphQL */ `
  query GetAppliance($id: ID!) {
    getAppliance(id: $id) {
      id
      appliance_name
      appliance_status
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
