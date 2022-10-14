import { gql } from "@apollo/client"

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($updateCommentId: ID!, $commentUpdateInput: CommentUpdateInput!) {
    updateComment(id: $updateCommentId, commentUpdateInput: $commentUpdateInput) {
      id
      likes
      dislikes
      userLiked
      userDisLiked
    }
  }
`