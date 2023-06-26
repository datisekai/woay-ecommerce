import axiosClient from "../config";

const BlogsApi = {
    getArrBlogs: async (query) => {
        try {
            let reuslt = await axiosClient.get(
                `/post/search`,{params:query}
            );
            return reuslt.data.data;
            //trả về cái token
        } catch (e) {
            console.log(e)
            return e;
        }
    },
    getDetailPost: async ({ query }) => {
        try {
            let reuslt = await axiosClient.get(`/post/detail/${query.slug}`);
            return reuslt.data;
            //trả về cái token
        } catch (e) {
            return e;
        }
    },
};

export default BlogsApi;
