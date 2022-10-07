import { gql } from '@apollo/client'

export const GET_USER_LIST = gql`
  query Users($userInput: UserInput, $skip: Int, $take: Int, $orderBy: UserOrderByInput) {
    users(userInput: $userInput, skip: $skip, take: $take, orderBy: $orderBy) {
        id
        userId
        fullName
        email
        phoneNumber
        address
        idCard
        birthday
    }
  }
`;