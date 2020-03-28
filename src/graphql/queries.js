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
      }
      nextToken
    }
  }
`;
export const searchLinkDatas = /* GraphQL */ `
  query SearchLinkDatas(
    $filter: SearchableLinkDataFilterInput
    $sort: SearchableLinkDataSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchLinkDatas(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        url
        tag
      }
      nextToken
      total
    }
  }
`;
