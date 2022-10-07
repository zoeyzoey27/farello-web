import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation RegisterUser($userRegisterInput: UserRegisterInput) {
    registerUser(userRegisterInput: $userRegisterInput) {
      id
      userId
      fullName
      email
      password
      phoneNumber
      provinceCode
      districtCode
      communeCode
      address
      idCard
      birthday
      status
      createdAt
    }
  }
`