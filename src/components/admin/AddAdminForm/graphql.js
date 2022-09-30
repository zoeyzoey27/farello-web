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
        }
    }
`;