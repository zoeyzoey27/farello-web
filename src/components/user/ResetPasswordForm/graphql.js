import { gql } from "@apollo/client"

export const RESET_PASSWORD = gql`
  mutation UserResetPassword($userResetPasswordId: ID!, $password: String!) {
    userResetPassword(id: $userResetPasswordId, password: $password) {
      id
      fullName
      email
      password
    }
  }
`