import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
  query Categories($categorySearchInput: CategorySearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    categories(categorySearchInput: $categorySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      name
    }
  }
`
export const GET_TOTAL_CART = gql`
  query GetProductsAddedToCart($userId: ID!) {
    getProductsAddedToCart(userId: $userId) {
      id
      productId
      name
      color
      addedBy {
        id
        fullName
      }
    }
  }
`
export const GET_POSTS = gql `
  query PostCategories($skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    postCategories(skip: $skip, take: $take, orderBy: $orderBy) {
      id
      title
    }
  }
`