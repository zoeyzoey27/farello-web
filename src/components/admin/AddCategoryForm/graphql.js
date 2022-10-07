import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($categoryInput: CategoryInput) {
    createCategory(categoryInput: $categoryInput) {
      id
      categoryId
      name
      imageKey
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
      imageKey
      description
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryId: ID!, $categoryUpdateInput: CategoryUpdateInput) {
    updateCategory(id: $updateCategoryId, categoryUpdateInput: $categoryUpdateInput) {
      id
      name
      imageKey
      description
    }
  }
`;