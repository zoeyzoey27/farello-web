import { gql } from "@apollo/client"

export const ADMIN_DELETE_ACCOUNT = gql`
  mutation DeleteAdminAccount($deleteAdminAccountId: ID!) {
    deleteAdminAccount(id: $deleteAdminAccountId)
  }
`;