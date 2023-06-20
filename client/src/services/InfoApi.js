import axiosClient from "../config"

const InfoApi = {
    getAll:async() => {
        const result = await axiosClient.get('/info')
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/info',data)
        return result.data
    },
    update:async({id, data}) => {
        const result = await axiosClient.put(`/info/${id}`,data)
        return result.data
    },
    setDefault:async(id) => {
        const result = await axiosClient.put(`/info/default/${id}`);
        return result.data
    }
}

export default InfoApi