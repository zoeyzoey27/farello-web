import { gql } from "@apollo/client"

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      productId
      name
      priceIn
      priceOut
      priceSale
      quantity
      colours
      images
      description
      category {
        id
        name
      }
    }
  }
`;