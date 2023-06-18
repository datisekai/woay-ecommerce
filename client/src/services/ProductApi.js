import axios from "axios";
import axiosClient from "../config";

const productApi = {
    allProduct: async () => {
        try {
            const response = await axiosClient.get("/product/search");
            return response.data.data.rows;
        } catch (e) {
            return e;
        }
    },
    getAllAdmin:async(query) => {
        const result = await axiosClient.get('/product',{params:query});
        return result.data.data
    }
};

export default productApi;
