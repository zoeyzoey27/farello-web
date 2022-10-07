import { gql } from '@apollo/client'

export const USER_DELETE_ACCOUNT = gql`
  mutation DeleteUserAccount($deleteUserAccountId: ID!) {
    deleteUserAccount(id: $deleteUserAccountId)
  }
`;