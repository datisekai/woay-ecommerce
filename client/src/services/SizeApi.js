import axiosClient from "../config"

const SizeApi = {
    getAll:async() => {
        const result = await axiosClient.get('/size');
        return result.data.data
    }
}

export default SizeApi