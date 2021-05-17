/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newOnCreateAppliance = /* GraphQL */ `
  subscription NewOnCreateAppliance {
    newOnCreateAppliance {
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
export const newOnUpdateAppliance = /* GraphQL */ `
  subscription NewOnUpdateAppliance {
    newOnUpdateAppliance {
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
export const newOnDeleteAppliance = /* GraphQL */ `
  subscription NewOnDeleteAppliance {
    newOnDeleteAppliance {
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
export const onCreateAppliance = /* GraphQL */ `
  subscription OnCreateAppliance($owner: String!) {
    onCreateAppliance(owner: $owner) {
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
export const onUpdateAppliance = /* GraphQL */ `
  subscription OnUpdateAppliance($owner: String!) {
    onUpdateAppliance(owner: $owner) {
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
export const onDeleteAppliance = /* GraphQL */ `
  subscription OnDeleteAppliance($owner: String!) {
    onDeleteAppliance(owner: $owner) {
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
