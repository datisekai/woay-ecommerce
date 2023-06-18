import React from "react";
import MainLayout from "../../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../../src/components/Breadcrumbs/Breadcrumbs";

export default function product() {
    return (
        <MainLayout>
            <div className="container mx-auto">
                <Breadcrumbs nameCategory={"name"} />
            </div>
        </MainLayout>
    );
}
