import axiosClient from "../config"

const OrderApi = {
    getAll:async(query) => {
        const result = await axiosClient.get('/order',{params:query});
        return result.data.data
    },
    update:async({id,data}) => {
        const result = await axiosClient.put(`/order/${id}`,data)
        return result.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/order',data)
        return result.data.data
    },
    getMyOrder:async(query) => {
        const result = await axiosClient.get('/order/me',{params:query})
        return result.data.data
    }
}

export default OrderApi