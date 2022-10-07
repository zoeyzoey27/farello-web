import { gql } from "@apollo/client"

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($updateUserInfoId: ID!, $userUpdateInput: UserUpdateInput) {
    updateUserInfo(id: $updateUserInfoId, userUpdateInput: $userUpdateInput) {
      id
      userId
      fullName
      email
      phoneNumber
      provinceCode
      districtCode
      communeCode
      address
      idCard
      birthday
      status
      updatedAt
    }
  }
`;

export const GET_USER_INFO = gql`
query User($userId: ID!) {
   user(id: $userId) {
    id
    userId
    fullName
    email
    phoneNumber
    address
    idCard
    birthday
    provinceCode
    districtCode
    communeCode
   }
}
`;