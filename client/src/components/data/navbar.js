import axiosClient from "../../config";
let navbars = [
    {
        url: "/",
        title: "Sản phẩm",
        children: [],
    },
    {
        url: "/about",
        title: "About us",
    },
    {
        url: "/blogs",
        title: "Blog",
    },
    {
        url: "/lien_he",
        title: "Liên hệ",
    },
    {
        url: "/login",
        title: "Đăng nhập",
        isHidden: true,
    },
];

export default navbars;
