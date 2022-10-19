import { gql } from '@apollo/client'

export const GET_ADMIN_LIST = gql`
    query Admins($adminInput: AdminInput, $skip: Int, $take: Int, $orderBy: OrderByInputByTime) {
        admins(adminInput: $adminInput, skip: $skip, take: $take, orderBy: $orderBy) {
            id
            adminId
            fullName
            email
            phoneNumber
            address
            idCard
            birthday
        }
    }
`;