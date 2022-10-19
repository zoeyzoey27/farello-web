import { gql } from "@apollo/client"

export const CREATE_INQUIRY = gql`
  mutation UserCreateInquiry($inquiryInput: InquiryInput) {
    userCreateInquiry(inquiryInput: $inquiryInput) {
      id
      fullName
      email
      phoneNumber
      content
      isRead
    }
  }
`;