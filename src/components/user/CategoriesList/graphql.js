import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
  query Categories($categorySearchInput: CategorySearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    categories(categorySearchInput: $categorySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      name
      imageKey
      description
    }
  }
`