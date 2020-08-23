/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLinkData = /* GraphQL */ `
  query GetLinkData($id: ID!) {
    getLinkData(id: $id) {
      id
      title
      description
      url
      tag
      createdAt
      updatedAT
      updatedAt
    }
  }
`;
export const listLinkDatas = /* GraphQL */ `
  query ListLinkDatas(
    $filter: ModelLinkDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinkDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        url
        tag
        createdAt
        updatedAT
        updatedAt
      }
      nextToken
    }
  }
`;
