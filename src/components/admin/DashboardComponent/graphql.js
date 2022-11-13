import { gql } from "@apollo/client"

export const GET_ORDERS = gql`
  query Orders($orderSearchInput: OrderSearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    orders(orderSearchInput: $orderSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      orderId
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products($productSearchInput: ProductSearchInput, $skip: Int, $take: Int, $orderBy: ProductOrderByInput) {
    products(productSearchInput: $productSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
        id
        productId
        name
        priceOut
        priceSale
        colours
        status
        quantity
        images
        category {
            id
            name
        }
    }
  }
`
export const GET_USERS = gql`
  query Users($userInput: UserInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    users(userInput: $userInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      userId
      fullName
      email
      idCard
      phoneNumber
      address
      birthday
    }
  }
`
export const GET_CATEGORIES = gql`
  query Categories($categorySearchInput: CategorySearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    categories(categorySearchInput: $categorySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      categoryId
      name
      imageKey
      description
      products {
        id
        name
      }
    }
  }
`;