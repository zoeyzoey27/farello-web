import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
    mutation CreateProduct($productInput: ProductInput) {
        createProduct(productInput: $productInput) {
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
export const GET_CATEGORIES = gql`
  query Categories($categorySearchInput: CategorySearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    categories(categorySearchInput: $categorySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      name
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: ID!, $productUpdateInput: ProductUpdateInput) {
    updateProduct(id: $updateProductId, productUpdateInput: $productUpdateInput) {
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
      updatedAt
    }
  }
`;
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