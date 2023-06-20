import React from "react";

export default function DiaChi({ item, handleUpdate,handleSetDefault,isLoadingDefault }) {


  return (
    <section className="py-6 bg-base-100 rounded px-8 flex justify-between items-center relative  ">
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

      <div className="flex flex-col gap-4">
        <button className="btn btn-outline" onClick={handleUpdate}>Cập nhật</button>
       {!item.isDefault &&  <button disabled={isLoadingDefault} className="btn" onClick={handleSetDefault}>Thiết lập mặc định</button>}
      </div>
    </section>
  );
}
