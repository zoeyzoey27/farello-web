import { gql } from "@apollo/client"

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
export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`