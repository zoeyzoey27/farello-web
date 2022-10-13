import { gql } from "@apollo/client"

export const GET_CATEGORIES_POST = gql`
  query PostCategories($skip: Int, $take: Int, $orderBy: PostCategorySortInput) {
    postCategories(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      categoryId
      title
      createdAt
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      id
      postId
      title
      category {
        id
        title
        posts {
          id
          title
        }
      }
      content
      imageKey
      createdBy {
        id
        fullName
      }
      createdAt
    }
  }
`
export const GET_POST_DETAIL = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      id
      postId
      title
      category {
        id
        title
      }
      content
      imageKey
      createdBy {
        id
        fullName
      }
      updatedAt
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostId: ID!, $postUpdateInput: PostUpdateInput!) {
    updatePost(id: $updatePostId, postUpdateInput: $postUpdateInput) {
      id
      postId
      title
      category {
        id
        title
      }
      content
      imageKey
      updatedAt
    }
  }
`