/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLinkData = /* GraphQL */ `
  mutation CreateLinkData(
    $input: CreateLinkDataInput!
    $condition: ModelLinkDataConditionInput
  ) {
    createLinkData(input: $input, condition: $condition) {
      id
      title
      description
      url
      tag
      createdAt
      updatedAT
    }
  }
`;
export const updateLinkData = /* GraphQL */ `
  mutation UpdateLinkData(
    $input: UpdateLinkDataInput!
    $condition: ModelLinkDataConditionInput
  ) {
    updateLinkData(input: $input, condition: $condition) {
      id
      title
      description
      url
      tag
      createdAt
      updatedAT
    }
  }
`;
export const deleteLinkData = /* GraphQL */ `
  mutation DeleteLinkData(
    $input: DeleteLinkDataInput!
    $condition: ModelLinkDataConditionInput
  ) {
    deleteLinkData(input: $input, condition: $condition) {
      id
      title
      description
      url
      tag
      createdAt
      updatedAT
    }
  }
`;
