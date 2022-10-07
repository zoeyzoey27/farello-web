import { gql } from '@apollo/client'

export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductToCart($productsAddedToCartInput: ProductsAddedToCartInput!) {
    addProductToCart(productsAddedToCartInput: $productsAddedToCartInput) {
      id
      productId
      name
      color
      quantity
      price
      imageKey
      addedBy {
        id
        userId
        fullName
      }
      totalPayment
      createdAt
      updatedAt
    }
  }
`;