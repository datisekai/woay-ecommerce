import React from "react";
import BlogsApi from "../../src/services/BlogsApi";
import MainLayout from "../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import Meta from "../../src/components/Meta";

export default function DetailPost({ itemPost }) {
    return (
        <>
            <Meta title={`${itemPost.data.title}  | MISSOUT`} />
            <MainLayout>
                <Breadcrumbs nameCategory={itemPost.data.title} />
                <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px]">
                    <h1 className="text-center text-bold text-3xl">
                        {itemPost.data.title}
                    </h1>
                    <p className="my-5">{itemPost.data.description}</p>
                    <article className="prose mx-auto lg:prose-xl">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: itemPost.data.body,
                            }}
                        />
                    </article>
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
    const itemPost = await BlogsApi.getDetailPost({ query: params });
    return { props: { itemPost }, revalidate: 60 };
};
