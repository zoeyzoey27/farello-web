import { gql } from '@apollo/client'

export const ADMIN_LOGIN = gql`
  mutation LoginAdmin($loginInput: LoginInput) {
    loginAdmin(loginInput: $loginInput) {
      id
      fullName
      email
      token
    }
  }
`;