import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($productSearchInput: ProductSearchInput, $skip: Int, $take: Int, $orderBy: ProductOrderByInput) {
    products(productSearchInput: $productSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      productId
      name
      priceIn
      priceOut
      priceSale
      quantity
      colours
      category {
        id
        name
      }
      images
      description
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
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;