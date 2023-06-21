import axiosClient from "../config"

const StatisticApi = {
    getAll:async() => {
        const result = await axiosClient.get('/statistic');
        return result.data.data
    }
}

export default StatisticApi