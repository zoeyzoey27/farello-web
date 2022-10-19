import { gql } from "@apollo/client"
export const GET_USER = gql`
  query Users($skip: Int, $take: Int, $orderBy: OrderByInputByTime, $userInput: UserInput) {
    users(skip: $skip, take: $take, orderBy: $orderBy, userInput: $userInput) {
      id
      fullName
      email
    }
  }
`