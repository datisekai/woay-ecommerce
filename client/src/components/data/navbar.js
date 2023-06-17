import axiosClient from "../../config";
let navbars = [
    {
        url: "/",
        title: "Sản phẩm",
        children: [
            {
                url: "/",
                title: "T-Shirt",
            },
            {
                url: "/",
                title: "T-Shirt",
            },
            {
                url: "/",
                title: "T-Shirt",
            },
            {
                url: "/",
                title: "T-Shirt",
            },
            {
                url: "/",
                title: "T-Shirt",
            },
            {
                url: "/",
                title: "T-Shirt",
            },
        ],
    },
    {
        url: "/about-us",
        title: "About us",
    },
    {
        url: "/blogs",
        title: "Blog",
    },
    {
        url: "/about-us",
        title: "Liên hệ",
    },
];

// const getDataSanPham = async () => {
//     let result = await axiosClient.get("/category");
//     return result.data.data;
// };
// const newSanPham = getDataSanPham();
// newSanPham.then((data) => {
//     data.map(({ slug, name }) => {
//         navbars[0].children = {
//             url: slug,
//             title: name,
//         };
//     });
// });
// console.log({ navbars });
export default navbars;
