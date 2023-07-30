import React from "react";

const Description = ({ description }) => {
  return (
    <div className="p-4 my-3 bg-gray-50 rounded-md shadow-md">
      <p className="font-semibold text-2xl">Description</p>

      {description?.map((info, i) => (
        <div key={i} className="my-4">
          <h2 className="text-2xl font-bold">{info.title}</h2>
          <p>{info?.details} </p>
        </div>
      ))}
    </div>
  );
};

export default Description;
