import { gql } from '@apollo/client'

export const GET_INQUIRIES = gql`
  query GetInquiries($inquirySearchInput: InquirySearchInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
    getInquiries(inquirySearchInput: $inquirySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      fullName
      email
      phoneNumber
      content
      isRead
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
`;

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