import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { useLocalStorage } from "usehooks-ts";
import CardCart from "../src/components/cards/CardCart";
import MainLayout from "../src/components/layouts/MainLayout";
import DotCenter from "../src/components/loadings/DotCenter";
import SpinnerCenter from "../src/components/loadings/SpinnerCenter";
import ModalAddUserInfo from "../src/components/modals/ModalAddUserInfo";
import ModalChooseAddress from "../src/components/modals/ModalChooseAddress";
import { requiredLogin } from "../src/config/requiredLogin";
import InfoApi from "../src/services/InfoApi";
import productApi from "../src/services/ProductApi";
import Meta from "../src/components/Meta";
import OrderApi from "../src/services/OrderApi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Cart = () => {
    const [cart, setCart] = useLocalStorage("cart", []);

    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const { data: userInfo, isLoading: isLoadingInfo } = useQuery(
        ["userInfo"],
        InfoApi.getAll
    );

    const router = useRouter();

    const [shippingInfo, setShippingInfo] = useState();

    const { mutate: payment, isLoading: isLoadingPayment } = useMutation(
        OrderApi.add,
        {
            onSuccess: () => {
                setCart([]);
                setProducts([]);
                toast.success("Đặt hàng thành công");
                router.push("/history-order");
            },
            onError: (error) => {
                error && error.message && toast.error(error.message);
            },
        }
    );

    useEffect(() => {
        if (userInfo) {
            let result;
            const defaultShipping = userInfo.find((item) => item.isDefault);
            if (!defaultShipping) {
                if (userInfo.length > 0) {
                    result = userInfo[0];
                }
            }
            setShippingInfo(defaultShipping || result);
        }
    }, [userInfo]);

    const handleDeleteProductCart = (id) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setProducts(products.filter((item) => item.id !== id));
                setCart(cart.filter((item) => item.variantId !== id));
            }
        });
    };

    useEffect(() => {
        const confirmCart = async () => {
            setIsLoading(true);
            const result = await productApi.confirmCart(
                cart.map((item) => item.variantId)
            );
            setProducts(
                result.map((item) => {
                    const quantity = cart.find(
                        (element) => element.variantId === item.id
                    )?.quantity;
                    return { ...item, quantityStore: item.quantity, quantity };
                })
            );
            setIsLoading(false);
        };
        if (cart.length > 0) {
            confirmCart();
        }
    }, []);

    const total = useMemo(() => {
        return products.reduce((pre, cur) => pre + cur.price * cur.quantity, 0);
    }, [products]);

    const handleChangeQuantity = (id, quantity) => {
        setProducts(
            products.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
        setCart(
            cart.map((item) =>
                item.variantId === id ? { ...item, quantity } : item
            )
        );
    };

    const handlePayment = () => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const infoId = shippingInfo.id;
                const variants = products.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                }));

                payment({ infoId, variants });
            }
        });
    };

    return (
        <>
            <Meta title={"Giỏ hàng | MISSOUT"} />
            <MainLayout>
                <div className="min-h-[70vh] max-w-[1200px] mx-auto pb-10 px-2  ">
                    <div className="text-sm breadcrumbs ">
                        <ul>
                            <li>
                                <Link href={"/"}>Trang chủ</Link>
                            </li>
                            <li>Giỏ hàng</li>
                        </ul>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <h1 className="uppercase text-center text-xl md:text-3xl font-bold mt-2">
                                Giỏ hàng của bạn
                            </h1>
                            <div className="p-4 bg-base-200 mt-4 relative">
                                <h3 className="font-bold">
                                    Bạn đang có {products.length || 0} sản phẩm
                                    trong giỏ hàng
                                </h3>
                                <div className="mt-4 space-y-2">
                                    {!isLoading ? (
                                        products?.map((item) => (
                                            <CardCart
                                                key={item.id}
                                                {...item}
                                                handleDeleteProductCart={
                                                    handleDeleteProductCart
                                                }
                                                handleChangeQuantity={
                                                    handleChangeQuantity
                                                }
                                            />
                                        ))
                                    ) : (
                                        <SpinnerCenter />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[250px] mt-2 md:mt-[60px] ">
                            <div className="border p-4 rounded space-y-4">
                                <h2 className="font-bold border-none md:border-b pb-2">
                                    Thông tin đơn hàng
                                </h2>
                                <div className="flex border-b pb-2 items-center justify-between font-bold">
                                    <h3>Tổng tiền:</h3>
                                    <h3> {total.toLocaleString("en-US")}đ</h3>
                                </div>
                                {!isLoadingInfo ? (
                                    <div className="">
                                        <h3 className="font-bold">
                                            Địa chỉ nhận hàng
                                        </h3>
                                        {shippingInfo ? (
                                            <>
                                                {" "}
                                                <h3 className="mt-1">
                                                    {`${shippingInfo.name} ${shippingInfo.phone} ${shippingInfo.address}`}
                                                </h3>
                                                <ModalChooseAddress
                                                    shippingInfo={shippingInfo}
                                                    handleChangeShipping={(
                                                        data
                                                    ) => setShippingInfo(data)}
                                                    data={userInfo}
                                                    elementClick={
                                                        <div className="btn mt-2 btn-sm text-secondary">
                                                            Thay đổi
                                                        </div>
                                                    }
                                                />
                                            </>
                                        ) : (
                                            <ModalAddUserInfo
                                                elementClick={
                                                    <div className="btn mt-2 btn-sm text-secondary">
                                                        Thêm địa chỉ
                                                    </div>
                                                }
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <DotCenter />
                                )}

                                <button
                                    onClick={handlePayment}
                                    className="btn btn-secondary mt-2 w-full"
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                    {isLoadingPayment && (
                        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)]">
                            <SpinnerCenter />
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default Cart;

export const getServerSideProps = requiredLogin;
