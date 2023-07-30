import React from "react";

const Specification = ({ specification }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <p className="font-semibold text-2xl">Specification</p>

      {specification?.map((info, i) => (
        <div className="my-4 " key={i}>
          <p className="bg-violet-300/20 p-3 font-bold rounded-md">
            {info?.name}
          </p>

          {info?.details.map((detail, i) => (
            <div
              key={i}
              className="flex justify-start items-center p-2 border-b "
            >
              <p className="w-[300px]">{detail?.key}</p>
              <p> {detail?.value}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Specification;
