export const OrderStatus = [
    {
        value: 'WAITING_FOR_CONFIRMATION',
        name: 'Chờ xác nhận'
    },
    {
        value: 'CONFIRMED',
        name: 'Đã xác nhận'
    },
    {
        value: 'PACKING',
        name: 'Đang đóng gói'
    },
    {
        value: 'DELIVERED_TO_THE_CARRIER',
        name: 'Đã giao cho ĐVVC'
    },
    {
        value: 'SUCCESSFUL_DELIVERY',
        name: 'Giao hàng thành công'
    },
    {
        value: 'CANCEL',
        name: 'Hủy'
    }
]
export const OrderStatusDisable = [
    "DELIVERED_TO_THE_CARRIER",
    "SUCCESSFUL_DELIVERY",
    "CANCEL"
]