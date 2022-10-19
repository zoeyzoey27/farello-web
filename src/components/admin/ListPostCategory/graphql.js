import { gql } from "@apollo/client"

export const CREATE_POST_CATEGORY = gql`
  mutation CreatePostCategory($postCategoryInput: PostCategoryInput!) {
    createPostCategory(postCategoryInput: $postCategoryInput) {
      id
      categoryId
      title
      posts {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`
export const GET_POST_CATEGORY = gql`
  query PostCategories($skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    postCategories(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      categoryId
      title
      createdAt
    }
  }
`
export const UPDATE_POST_CATEGORY = gql`
  mutation UpdatePostCategory($updatePostCategoryId: ID!, $postCategoryUpdateInput: PostCategoryUpdateInput!) {
    updatePostCategory(id: $updatePostCategoryId, postCategoryUpdateInput: $postCategoryUpdateInput) {
      id
      categoryId
      title
      updatedAt
    }
  }
`
export const GET_POST_CATEGORY_BY_ID = gql`
  query PostCategory($postCategoryId: ID!) {
    postCategory(id: $postCategoryId) {
      id
      categoryId
      title
    }
  }
`
export const DELETE_POST_CATEGORY = gql`
  mutation DeletePostCategory($deletePostCategoryId: ID!) {
    deletePostCategory(id: $deletePostCategoryId)
  }
`