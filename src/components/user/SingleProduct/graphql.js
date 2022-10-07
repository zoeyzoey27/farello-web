import { gql } from "@apollo/client"

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      productId
      name
      priceOut
      priceSale
      colours
      images
      description
    }
  }
`