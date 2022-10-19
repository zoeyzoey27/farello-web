import { gql } from '@apollo/client'

export const GET_ORDERS  = gql`
  query Orders($orderSearchInput: OrderSearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    orders(orderSearchInput: $orderSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
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
        productId
        name
        color
        quantity
        price
      }
      createdAt
    }
  }
`;