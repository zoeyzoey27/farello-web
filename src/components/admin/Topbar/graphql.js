import { gql } from "@apollo/client"

export const GET_ADMIN = gql`
  query Admin($adminId: ID!) {
    admin(id: $adminId) {
      id
      fullName
    }
  }
`;
export const GET_INQUIRIES = gql`
  query GetInquiries($inquirySearchInput: InquirySearchInput, $skip: Int, $take: Int, $orderBy: InquirySortInput) {
    getInquiries(inquirySearchInput: $inquirySearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
      id
      isRead
    }
  }
`;