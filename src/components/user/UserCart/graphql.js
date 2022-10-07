import { gql } from "@apollo/client"

export const GET_USER_CART = gql`
  query GetProductsAddedToCart($userId: ID!) {
    getProductsAddedToCart(userId: $userId) {
      id
      productId
      name
      color
      quantity
      imageKey
      price
      addedBy {
        id
        fullName
        provinceCode
      }
      totalPayment
      createdAt
      updatedAt
    }
  }
`
export const UPDATE_CART = gql`
  mutation UpdateCart($updateCartId: ID!, $quantity: Int!, $updatedAt: String, $totalPayment: Int!) {
    updateCart(id: $updateCartId, quantity: $quantity, updatedAt: $updatedAt, totalPayment: $totalPayment) {
      id
      productId
      name
      color
      quantity
      price
      totalPayment
      updatedAt
    }
  }
`