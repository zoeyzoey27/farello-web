import { gql } from "@apollo/client"

export const GET_ORDER_DETAIL = gql`
  query Order($orderId: ID!) {
    order(id: $orderId) {
      id
      orderId
      receiverName
      address
      email
      phoneNumber
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
        imageKey
      }
      cancelReason
      cancelBy
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($updateOrderStatusId: ID!, $orderUpdateInput: OrderUpdateInput!) {
    updateOrderStatus(id: $updateOrderStatusId, orderUpdateInput: $orderUpdateInput) {
      id
      status
      cancelReason
      cancelBy
      updatedAt
    }
  }
`;
