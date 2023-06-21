import {AiOutlineDashboard} from 'react-icons/ai'
import {LuUsers} from 'react-icons/lu'
import {MdOutlineCategory,MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {BiCategory} from 'react-icons/bi'
import {BsFillFilePostFill,BsCartCheck} from 'react-icons/bs'
import {CgUiKit} from 'react-icons/cg'

const adminbars = [
  {
    url: "/admin",
    title: "Dashboard",
    icon:AiOutlineDashboard
  },
  {
    url: "/admin/user",
    title: "Quản lý người dùng",
    icon:LuUsers
  },
  {
    url: "/admin/category",
    title: "Quản lý danh mục",
    icon:MdOutlineCategory
  },
  {
    url: "/admin/product",
    title: "Quản lý sản phẩm",
    icon:MdOutlineProductionQuantityLimits
  },
  {
    url: "/admin/attribute",
    title: "Quản lý thuộc tính",
    icon:CgUiKit
  },
  {
    url: "/admin/blog",
    title: "Quản lý blog",
    icon:BiCategory
  },
  {
    url: "/admin/post",
    title: "Quản lý post",
    icon:BsFillFilePostFill
  },
  {
    url: "/admin/order",
    title: "Quản lý đơn hàng",
    icon:BsCartCheck
  },
];

export default adminbars