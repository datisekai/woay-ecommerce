import React from "react";
import BlogsApi from "../../src/services/BlogsApi";
import MainLayout from "../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";

export default function DetailPost({ itemPost }) {

    return (
        <MainLayout>
            <Breadcrumbs nameCategory={itemPost.data.title} />
            <h1 className="text-center text-bold text-3xl">
                {itemPost.data.title}
            </h1>
            <p>{itemPost.data.description}</p>
            <article className="prose mx-auto lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: itemPost.data.body }} />
            </article>
        </MainLayout>
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
