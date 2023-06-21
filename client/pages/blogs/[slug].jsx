import React from "react";
import BlogsApi from "../../src/services/BlogsApi";
import MainLayout from "../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import CardPosts from "../../src/components/cards/CardPosts";
import PaginationAdmin from "../../src/components/paginations/PaginationAdmin";
import Meta from "../../src/components/Meta";

export default function BlogSlug({ arrBlogs }) {
    console.log({ arrBlogs });
    const { blog, rows } = arrBlogs;
    return (
        <>
            <Meta title={`${arrBlogs.blog.title} | MISSOUT`} />
            <MainLayout>
                <Breadcrumbs nameCategory={blog.title} />

                <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px] mb-[30px]">
                    <h1 className="text-2xl font-bold text-center mb-[30px] pb-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
                        {blog.title}
                    </h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {rows.map((item, index) => {
                            return <CardPosts key={index} item={item} />;
                        })}
                    </div>
                </div>
                {/* Pagination */}
                {arrBlogs && (
                    <div className="mt-2">
                        <PaginationAdmin
                            to={
                                arrBlogs.rows.length > 0
                                    ? arrBlogs.offset + 1
                                    : 0
                            }
                            from={arrBlogs.offset + arrBlogs.rows.length}
                            count={arrBlogs.count}
                            pre={arrBlogs.page > 1 && arrBlogs.page - 1}
                            next={
                                arrBlogs.page * arrBlogs.limit <
                                    arrBlogs.count && +arrBlogs.page + 1
                            }
                        />
                    </div>
                )}
                {/* End Pagination */}
            </MainLayout>
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const arrBlogs = await BlogsApi.getArrBlogs(query.slug);
    return { props: { arrBlogs } };
};
