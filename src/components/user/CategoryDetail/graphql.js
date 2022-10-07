import { gql } from "@apollo/client"

export const GET_CATEGORY = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
      imageKey
      description
    }
  }
`;