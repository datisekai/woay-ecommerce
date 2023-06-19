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
    queryProduct: async ({ query }) => {
        const res = await axiosClient.get(`/product/search?`, {
            params: query,
        });
        return res.data.data;
    },
    getProductByslug: async ({ query }) => {
        const res = await axiosClient.get(`/product/detail/${query.slug}`);
        return res.data.data;
    },
};

export default productApi;
