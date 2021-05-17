/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAppliance = /* GraphQL */ `
  mutation CreateAppliance(
    $input: CreateApplianceInput!
    $condition: ModelApplianceConditionInput
  ) {
    createAppliance(input: $input, condition: $condition) {
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
export const updateAppliance = /* GraphQL */ `
  mutation UpdateAppliance(
    $input: UpdateApplianceInput!
    $condition: ModelApplianceConditionInput
  ) {
    updateAppliance(input: $input, condition: $condition) {
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
export const deleteAppliance = /* GraphQL */ `
  mutation DeleteAppliance(
    $input: DeleteApplianceInput!
    $condition: ModelApplianceConditionInput
  ) {
    deleteAppliance(input: $input, condition: $condition) {
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
