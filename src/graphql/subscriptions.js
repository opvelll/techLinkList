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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
        }
        nextToken
      }
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
    }
  }
`;
