import axiosClient from "../config"

const ColorApi = {
    getAll:async() => {
        const result = await axiosClient.get('/color');
        return result.data.data
    }
}

export default ColorApi