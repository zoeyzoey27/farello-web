import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query Posts($postSearchInput: PostSearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    posts(postSearchInput: $postSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      postId
      title
      imageKey
      category {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`