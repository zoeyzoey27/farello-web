import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
    query User($userId: ID!) {
    user(id: $userId) {
        id
        userId
        fullName
        email
        phoneNumber
        provinceCode
        districtCode
        communeCode
    }
    }
`;
export const GET_PRODUCT_ADDED = gql`
  query GetProductsAddedToCart($userId: ID!) {
    getProductsAddedToCart(userId: $userId) {
      id
      totalPayment
      addedBy {
        id
        provinceCode
      }
    }
  }
`;
export const CREATE_ORDER = gql`
  mutation CreateOrder($orderInput: OrderInput!) {
    createOrder(orderInput: $orderInput) {
      id
      orderId
      receiverName
      address
      email
      phoneNumber
      createdBy {
        id
        fullName
      }
      status
      paymentMethod
      userNote
      transferFee
      totalPaymentWithoutShipment
      totalPayment
      products {
        id
        name
        color
        quantity
        price
        totalPayment
      }
    }
  }
`;