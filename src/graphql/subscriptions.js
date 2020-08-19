/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePage = /* GraphQL */ `
  subscription OnCreatePage {
    onCreatePage {
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
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePage = /* GraphQL */ `
  subscription OnUpdatePage {
    onUpdatePage {
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
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePage = /* GraphQL */ `
  subscription OnDeletePage {
    onDeletePage {
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
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLinkData = /* GraphQL */ `
  subscription OnCreateLinkData {
    onCreateLinkData {
      id
      pageId
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
export const onUpdateLinkData = /* GraphQL */ `
  subscription OnUpdateLinkData {
    onUpdateLinkData {
      id
      pageId
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
export const onDeleteLinkData = /* GraphQL */ `
  subscription OnDeleteLinkData {
    onDeleteLinkData {
      id
      pageId
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
