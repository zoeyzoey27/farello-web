import { gql } from "@apollo/client"

export const CREATE_COMMENT = gql`
  mutation CreateComment($commentInput: CommentInput!) {
    createComment(commentInput: $commentInput) {
      id
      content
      ratePoint
      rateDescription
      likes
      dislikes
      createdBy {
        id
        fullName
      }
      product {
        id
        name
      }
      createdAt
    }
  }
`