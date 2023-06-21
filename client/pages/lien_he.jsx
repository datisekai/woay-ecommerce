import React from "react";
import MainLayout from "../src/components/layouts/MainLayout";
import Breadcrumbs from "../src/components/Breadcrumbs/Breadcrumbs";
import Meta from "../src/components/Meta";

export default function lien_he() {
    return (
        <>
            <Meta title={"Liên Hệ | MISSOUT"} />
            <MainLayout>
                <Breadcrumbs nameCategory={"Liên hệ"} />

                <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px] mb-[15px] md:mb-[30px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="w-full overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1405.9175074320149!2d106.66735219737502!3d10.7711092766592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc4a98617b%3A0xa921473a4b34903e!2zSOG6u20gNDA3IFPGsCBW4bqhbiBI4bqhbmgsIFBoxrDhu51uZyAxMCwgUXXhuq1uIDEwLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1603357529074!5m2!1svi!2s"
                                width={600}
                                height={450}
                                style={{ border: 0 }}
                                aria-hidden="false"
                                tabIndex={0}
                            />
                        </div>

                        <div className="">
                            <h1 className="text-2xl font-bold text-center mb-[30px] pb-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
                                Liên hệ
                            </h1>
                            <div className="py-[15px]">
                                <ul className="list-info">
                                    <li>
                                        <p className="mb-[8px]">
                                            Địa chỉ chúng tôi
                                        </p>
                                        <p className="mb-[8px]">
                                            <strong>
                                                CN1: The New Playground, 90 Lê
                                                Lai, Q.1 <br />
                                                CN2: The New Playground, 26 Lý
                                                Tự Trọng, Q.1
                                            </strong>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="mb-[8px]">
                                            Email chúng tôi
                                        </p>
                                        <p className="mb-[8px]">
                                            <strong>
                                                missoutclo.social@gmail.com
                                            </strong>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="mb-[8px]">Điện thoại</p>
                                        <p className="mb-[8px]">
                                            <strong>0772011702</strong>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="mb-[8px]">
                                            Thời gian làm việc
                                        </p>
                                        <p className="mb-[8px]">
                                            <strong>
                                                Từ 9:30 sáng - 9h30 tối các ngày
                                                trong tuần
                                            </strong>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
