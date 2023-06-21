import React from "react";

export default function DiaChi({ item, handleUpdate,handleSetDefault,isLoadingDefault }) {


  return (
    <section className="py-6 bg-base-100 flex-col md:flex-row rounded px-8 flex justify-between items-center relative  ">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex gap-2">
            <h5 className="text-neutral">{item.name}</h5>
            <div className="divider divider-horizontal"></div>
            <h5>{item.phone}</h5>
          </div>
          <p>{item.address}</p>
        </div>
        {item.isDefault ? (
          <div className="text-secondary">Mặc định</div>
        ) : null}
      </div>

      <div className="flex flex-row md:flex-col gap-4 mt-2 md:mt-0">
        <button className="btn btn-sm md:btn-md btn-outline" onClick={handleUpdate}>Cập nhật</button>
       <button disabled={item.isDefault} className="btn btn-sm md:btn-md" onClick={handleSetDefault}>Thiết lập mặc định</button>
      </div>
    </section>
  );
}
