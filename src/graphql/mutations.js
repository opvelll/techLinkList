/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
      id
      name
      address
      linkDatas {
        items {
          id
          pageId
          title
          description
          url
          tag
          createdAt
          updatedAT
        }
        nextToken
      }
    }
  }
`;
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
      id
      name
      address
      linkDatas {
        items {
          id
          pageId
          title
          description
          url
          tag
          createdAt
          updatedAT
        }
        nextToken
      }
    }
  }
`;
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
      id
      name
      address
      linkDatas {
        items {
          id
          pageId
          title
          description
          url
          tag
          createdAt
          updatedAT
        }
        nextToken
      }
    }
  }
`;
export const createLinkData = /* GraphQL */ `
  mutation CreateLinkData(
    $input: CreateLinkDataInput!
    $condition: ModelLinkDataConditionInput
  ) {
    createLinkData(input: $input, condition: $condition) {
      id
      pageId
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
      pageId
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
      pageId
      title
      description
      url
      tag
      createdAt
      updatedAT
    }
  }
`;
