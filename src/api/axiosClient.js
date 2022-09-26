import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://api.mysupership.vn/v1/partner/areas/',
    headers: {
        'content-type': 'application/json',
    }
})
export default axiosClient

