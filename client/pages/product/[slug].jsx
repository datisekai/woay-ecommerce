import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import SliderDetailProduct from "../../src/components/Carousel/SliderDetailProduct";
import CardProduct from "../../src/components/cards/CardProduct";
import MainLayout from "../../src/components/layouts/MainLayout";
import productApi from "../../src/services/ProductApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Meta from "../../src/components/Meta";
import Rate from "../../src/components/rates/Rate";
import { maxMinPrice } from "../../src/utils/maxMinPrice";

export default function Product({ itemProduct }) {
  const { ProductImages, colors, sizes, productRecommends, variants } =
    itemProduct;
  const { user } = useSelector((state) => state.user);

  const [cart, setCart] = useLocalStorage("cart", []);
  const router = useRouter();

  const { slug } = router.query;

  const handleFindListColor = (sizeId) => {
    return itemProduct.variants
      .filter((item) => item.sizeId === sizeId)
      .map((item) => item.colorId);
  };

  const handleFindListSize = (colorId) => {
    return itemProduct.variants
      .filter((item) => item.colorId === colorId)
      .map((item) => item.sizeId);
  };

  const [active, setActive] = useState({
    colorId: 0,
    sizeId: 0,
    colors: itemProduct.variants.map((item) => item.colorId),
    sizes: itemProduct.variants.map((item) => item.sizeId),
  });

  useEffect(() => {
    setActive({
      colorId: 0,
      sizeId: 0,
      colors: itemProduct.variants.map((item) => item.colorId),
      sizes: itemProduct.variants.map((item) => item.sizeId),
    });
  }, [slug]);

  const price = useMemo(() => {
    let result;
    if (active.colorId == 0 || active.sizeId == 0) {
      const [min, max] = maxMinPrice(itemProduct.variants);
      if (min === max) {
        result = `${min.toLocaleString("en-US")}đ`;
      } else {
        result = `${min.toLocaleString("en-US")}đ - ${max.toLocaleString(
          "en-US"
        )}đ`;
      }
    }

    return result;
  }, [active]);

  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(() => {
    return variants.find(
      (item) => item.colorId === active.colorId && item.sizeId === active.sizeId
    );
  }, [active]);

  const handleAddToCart = () => {
    if (active.sizeId == 0 || active.colorId == 0) {
      toast.error("Vui lòng chọn thuộc tính");
      return;
    }

    if(variant.quantity === 0){
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    const isFound = cart.some((item) => item.variantId === variant.id);
    if (isFound) {
      setCart(
        cart.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { variantId: variant.id, quantity }]);
    }

    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleBuyNow = () => {
    if (active.sizeId == 0 || active.colorId == 0) {
      toast.error("Vui lòng chọn thuộc tính");
      return;
    }

    if(variant.quantity === 0){
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    const isFound = cart.some((item) => item.variantId === variant.id);
    if (isFound) {
      setCart(
        cart.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { variantId: variant.id, quantity }]);
    }
    router.push("/cart");
  };

  return (
    <>
      <Meta
        title={`${itemProduct.name} | MISSOUT`}
        description={itemProduct.description}
        image={ProductImages[0].src}
      />
      <MainLayout>
        <Breadcrumbs nameCategory={itemProduct.name} danhMuc={"Danh mục"} />

        <div className="container mx-auto mt-[20px] px-2">
          <div className="wrap grid grid-cols-1 lg:grid-cols-2 ">
            <div className="left">
              <SliderDetailProduct data={ProductImages} />
            </div>
            <div className="right">
              <div className="pb-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                <h1 className="text-xl font-bold text-[#5c5c5c] mb-[5px]md:text-3xl mt-2">
                  {itemProduct.name}
                </h1>
              </div>
              <div className="py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                <span className="text-[#ff0000] font-bold text-lg">
                  {price ? price : `${variant.price.toLocaleString("en-US")}đ`}
                </span>
              </div>
              <div className="color py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                <div className="div flex gap-4">
                  {colors.map((item, index) => {
                    return (
                      <p
                        key={index}
                        disabled={!active.colors.includes(item.id)}
                        className={`btn btn-neutral ${
                          active.colorId !== item.id ? "btn-outline" : ""
                        }`}
                        onClick={() =>
                          setActive({
                            ...active,
                            colorId: item.id,
                            sizes: handleFindListSize(item.id),
                          })
                        }
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className=" py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted flex gap-4">
                {sizes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      disabled={!active.sizes.includes(item.id)}
                      className={`btn btn-neutral ${
                        active.sizeId !== item.id ? "btn-outline" : ""
                      }`}
                      onClick={() =>
                        setActive({
                          ...active,
                          sizeId: item.id,
                          colors: handleFindListColor(item.id),
                        })
                      }
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              <button
                className="btn btn-sm mt-2"
                onClick={() =>
                  setActive({
                    colorId: 0,
                    sizeId: 0,
                    colors: itemProduct.variants.map((item) => item.colorId),
                    sizes: itemProduct.variants.map((item) => item.sizeId),
                  })
                }
              >
                Xóa bộ lọc
              </button>

              <div className="flex  mt-[10px] my-[25px] items-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-[32px] h-[32px] bg-[#f3f4f4]  rounded  "
                >
                  -
                </button>
                <input
                  className="w-[70px] outline-none text-center border-y-[1px]"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    +e.target.value > 0 && setQuantity(+e.target.value)
                  }
                />
                <button
                  onClick={() =>
                    quantity < variant?.quantity && setQuantity(quantity + 1)
                  }
                  className="w-[32px] h-[32px] bg-[#f3f4f4] rounded "
                >
                  +
                </button>
                <span className="ml-2">{variant?.quantity || 0} sản phẩm có sẵn</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full uppercase font-bold bg-[#000] text-[#fff] py-[14px] px-[15px] border-[1px] border-[#000] hover:bg-transparent hover:text-[#000] transition-all duration-75"
                >
                  thêm giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full uppercase font-bold bg-[red] text-[#fff] py-[14px] px-[15px] border-[1px] border-[red] hover:bg-transparent hover:text-[#000] transition-all duration-75 "
                >
                  mua ngay
                </button>
              </div>
              <div className="mota mt-[20px]">
                <p className="font-bold underline py-[16px]">Mô tả</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: itemProduct.description,
                  }}
                />
              </div>
            </div>
          </div>
          {/* ĐÁNH GIÁ SẢN PHẨM */}
          <Rate productId={itemProduct.id} />
          <div className="sanPhamLienQuan">
            <h1 className="text-center font-bold text-3xl my-[60px] py-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
              Sản phẩm liên quan
            </h1>
            <div className=" mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {productRecommends.map((item, index) => {
                return <CardProduct key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const itemProduct = await productApi.getProductByslug({ query: params });
  return { props: { itemProduct }, revalidate: 60 };
};
