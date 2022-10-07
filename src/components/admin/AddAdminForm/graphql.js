import { gql } from '@apollo/client'

export const ADD_ADMIN = gql`
   mutation RegisterAdmin($adminRegisterInput: AdminRegisterInput) {
    registerAdmin(adminRegisterInput: $adminRegisterInput) {
      id
      adminId
      fullName
      email
      password
      token
      phoneNumber
      address
      idCard
      birthday
      status
      createdAt
      updatedAt
      deletedAt
      provinceCode
      districtCode
      communeCode
    }
  }
`;
export const GET_ADMIN = gql`
  query Admin($adminId: ID!) {
    admin(id: $adminId) {
      id
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
export const UPDATE_ADMIN_INFO = gql`
  mutation UpdateAdmin($updateAdminId: ID!, $adminUpdateInput: AdminUpdateInput) {
    updateAdmin(id: $updateAdminId, adminUpdateInput: $adminUpdateInput) {
      id
      fullName
      email
      phoneNumber
      address
      idCard
      birthday
      status
      updatedAt
      provinceCode
      districtCode
      communeCode
    }
  }
`;