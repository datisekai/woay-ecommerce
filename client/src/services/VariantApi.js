import axiosClient from "../config"

const VariantApi = {
    update:async({id, data}) => {
        const result = await axiosClient.put(`/product/variant/${id}`,data)
        return result.data
    },
    add:async(data) => {
        const result = await axiosClient.post(`/product/variant`,data)
        return result.data.data
    }
}

export default VariantApi