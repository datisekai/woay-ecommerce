import axiosClient from "../config"

const RateApi = {
    getAllByProductId:async(productId) => {
        const result = await axiosClient.get(`/rate/${productId}`)
        return result.data.data
    },
    add:async({productId, data}) => {
        const result = await axiosClient.post(`/rate/${productId}`,data)
        return result.data
    },
    update:async({id, data}) => {
        const result = await axiosClient.put(`/rate/${id}`,data)
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/rate/${id}`)
        return result.data
    }
}

export default RateApi