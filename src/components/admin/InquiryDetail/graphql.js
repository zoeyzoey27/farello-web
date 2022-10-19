import { gql } from "@apollo/client"

export const GET_INQUIRY = gql`
  query GetInquiry($getInquiryId: ID!) {
    getInquiry(id: $getInquiryId) {
      id
      fullName
      email
      content
      adminRepInquiry {
        id
        content
        createdBy {
          id
          adminId
          fullName
        }
        createdAt
      }
      createdAt
    }
  }
`

export const UPDATE_STATUS_INQUIRY = gql`
  mutation UpdateStatusInquiry($updateStatusInquiryId: ID!, $isRead: Boolean!, $updatedAt: String) {
    updateStatusInquiry(id: $updateStatusInquiryId, isRead: $isRead, updatedAt: $updatedAt) {
      id
      fullName
      email
      phoneNumber
      content
      isRead
      updatedAt
    }
  }
`
export const ADMIN_REP_INQUIRY = gql`
  mutation AdminRepInquiry($adminRepInquiryInput: AdminRepInquiryInput) {
    adminRepInquiry(adminRepInquiryInput: $adminRepInquiryInput) {
      id
      content
      createdBy {
        id
        adminId
        fullName
      }
      createdAt
    }
  }
`