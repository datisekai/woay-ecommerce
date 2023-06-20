import axiosClient from "../config"

const InfoApi = {
    getAll:async() => {
        const result = await axiosClient.get('/info')
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/info',data)
        return result.data
    }
}

export default InfoApi