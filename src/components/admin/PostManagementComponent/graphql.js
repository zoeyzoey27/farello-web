import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query Posts($postSearchInput: PostSearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    posts(postSearchInput: $postSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      postId
      title
      category {
        id
        title
      }
      createdBy {
        id
        fullName
      }
      createdAt
      updatedAt
    }
  }
`
export const GET_CATEGORY_POST = gql`
 query PostCategories($skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    postCategories(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      categoryId
      title
      createdAt
    }
  }
`