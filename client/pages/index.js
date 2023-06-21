import CardProduct from "../src/components/cards/CardProduct";
import CardPosts from "../src/components/cards/CardPosts";
import CarouselHomePages from "../src/components/Carousel/CarouselHomePages";
import MainLayout from "../src/components/layouts/MainLayout";
import Meta from "../src/components/Meta";
import productApi from "../src/services/ProductApi";
import PostApi from "../src/services/PostApi";

export default function Home({ arrData }) {
    const [arrProduct, arrPosts] = arrData;
    return (
        <>
            <Meta title={"Trang chủ | MISSOUT"} />
            <MainLayout>
                <CarouselHomePages />
                {/* render các cardProduct */}
                <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px]">
                    <div className=" mt-[30px]">
                        <h2 className="uppercase text-center font-bold p-4 text-2xl mb-[30px]">
                            Sản phẩm mới
                        </h2>
                        <div className=" mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {arrProduct?.map((item, index) => {
                                return <CardProduct key={index} item={item} />;
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 className="uppercase text-center font-bold p-4 text-2xl mb-[30px]">
                            BÀI VIẾT MỚI NHẤT
                        </h2>
                        <div className=" mb-6 px-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
                            {arrPosts.rows.map((item, index) => {
                                return <CardPosts key={index} item={item} />;
                            })}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export const getServerSideProps = async () => {
    const arrData = await Promise.all([
        productApi.allProduct(),
        PostApi.getSearchPosts({ limit: 3 }),
    ]);

    // call api lấy về mảng item prroduct
    return { props: { arrData } };
};
