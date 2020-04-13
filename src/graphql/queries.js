/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
      id
      name
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
export const listPages = /* GraphQL */ `
  query ListPages(
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        linkDatas {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getLinkData = /* GraphQL */ `
  query GetLinkData($id: ID!) {
    getLinkData(id: $id) {
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
export const listLinkDatas = /* GraphQL */ `
  query ListLinkDatas(
    $filter: ModelLinkDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinkDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
