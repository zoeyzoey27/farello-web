import { gql } from "@apollo/client"

export const GET_ADMIN = gql`
  query Admin($adminId: ID!) {
    admin(id: $adminId) {
      id
      fullName
    }
  }
`;