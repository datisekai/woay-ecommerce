import axiosClient from "../config"

const CategoryApi = {
    getAll:async() => {
        const result = await axiosClient.get('/category');
        return result.data.data
    }
}

export default CategoryApi